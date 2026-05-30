// Sitemap generator — Google Search-compliant, hreflang-aware, multilingual
// Strategy: ONE sitemap.xml with all localized URLs + hreflang alternates.
// - Every logical page gets one <url> entry per locale
// - Every entry includes hreflang alternates for all locales + x-default
// - x-default always points to the bare root canonical (https://smartdigitaltips.com/...)
// - Bare root URLs (no /en prefix) are included so Google can discover them
import type { Tool, ToolCategory } from '@/data/tools'
import type { BlogPost } from '@/data/blog'
import { LOCALES, LOCALE_META, SITE_URL } from './locale-config.ts'

// Google's hard limit per sitemap file
const MAX_URLS_PER_SITEMAP = 50_000

// Number of static pages (must match the staticPages array below)
const STATIC_PAGE_COUNT = 8

// ─── Utilities ────────────────────────────────────────────────────────────────

function normalizePath(path: string): string {
  if (!path || path === '/') return '/'
  const cleaned = path.startsWith('/') ? path : `/${path}`
  return cleaned.replace(/\/+/g, '/')
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatLastmod(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Build the canonical bare URL for a given path.
 * e.g. path="/tools/word-counter" → "https://smartdigitaltips.com/tools/word-counter"
 *       path="/"                  → "https://smartdigitaltips.com"
 */
function canonicalUrl(path: string): string {
  const normalized = normalizePath(path)
  return normalized === '/' ? SITE_URL : `${SITE_URL}${normalized}`
}

/**
 * Build the localized URL for a given path + locale.
 * e.g. locale="en", path="/tools/word-counter"
 *      → "https://smartdigitaltips.com/en/tools/word-counter"
 */
function localizedUrl(path: string, locale: string): string {
  const normalized = normalizePath(path)
  const suffix = normalized === '/' ? '' : normalized
  return `${SITE_URL}/${locale}${suffix}`
}

/**
 * Build all <xhtml:link> alternate tags for a given path.
 * Includes one entry per supported locale + an x-default pointing to the
 * bare canonical (no locale prefix), which is the Google-recommended approach.
 */
function hreflangBlock(path: string): string {
  const lines: string[] = []

  // One alternate per locale
  for (const locale of LOCALES) {
    const code = LOCALE_META[locale].hreflang
    const href = localizedUrl(path, locale)
    lines.push(`    <xhtml:link rel="alternate" hreflang="${code}" href="${escapeXml(href)}" />`)
  }

  // x-default → bare canonical URL (no locale prefix)
  // This tells Google this is the language-selection / default page
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(canonicalUrl(path))}" />`)

  return lines.join('\n')
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface SitemapUrl {
  path: string
  lastmod: Date
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  /** Optional comment label shown above this block in the XML */
  groupLabel?: string
}

export interface SitemapStats {
  staticPages: number
  categories: number
  tools: number
  blogPosts: number
  logicalPages: number
  locales: number
  totalUrls: number
}

// ─── Core Collection ─────────────────────────────────────────────────────────

export class SitemapGenerator {
  static getStats(tools: Tool[], categories: ToolCategory[], blogPosts: BlogPost[]): SitemapStats {
    const logicalPages = this.collectUrls(tools, categories, blogPosts).length
    return {
      staticPages: STATIC_PAGE_COUNT,
      categories: categories.length,
      tools: tools.length,
      blogPosts: blogPosts.length,
      logicalPages,
      locales: LOCALES.length,
      totalUrls: logicalPages * LOCALES.length,
    }
  }

  /**
   * Collect all logical pages in priority order.
   * Duplicate paths are automatically skipped with a warning.
   */
  static collectUrls(tools: Tool[], categories: ToolCategory[], blogPosts: BlogPost[]): SitemapUrl[] {
    const now = new Date()
    const urls: SitemapUrl[] = []
    const seenPaths = new Set<string>()

    const addUrl = (entry: SitemapUrl) => {
      const path = normalizePath(entry.path)
      if (seenPaths.has(path)) {
        console.warn(`[sitemap] Skipping duplicate path: ${path}`)
        return
      }
      seenPaths.add(path)
      urls.push({ ...entry, path })
    }

    // ── 1. Static / Core Pages ─────────────────────────────────────────────
    const staticPages: Array<{
      path: string
      priority: number
      changefreq: SitemapUrl['changefreq']
      groupLabel?: string
    }> = [
      { path: '/',           priority: 1.0, changefreq: 'daily',   groupLabel: 'Core Pages' },
      { path: '/about',      priority: 0.7, changefreq: 'monthly' },
      { path: '/contact',    priority: 0.6, changefreq: 'monthly' },
      { path: '/blog',       priority: 0.8, changefreq: 'weekly' },
      // Legal pages — low crawl priority, rarely change
      { path: '/privacy',    priority: 0.3, changefreq: 'yearly',  groupLabel: 'Legal Pages' },
      { path: '/cookies',    priority: 0.3, changefreq: 'yearly' },
      { path: '/terms',      priority: 0.3, changefreq: 'yearly' },
      { path: '/disclaimer', priority: 0.3, changefreq: 'yearly' },
    ]

    for (const page of staticPages) {
      addUrl({
        path: page.path || '/',
        lastmod: now,
        changefreq: page.changefreq,
        priority: page.priority,
        groupLabel: page.groupLabel,
      })
    }

    // ── 2. Tool Category Pages ─────────────────────────────────────────────
    let firstCategory = true
    for (const category of categories) {
      addUrl({
        path: `/category/${category.id}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.75,
        groupLabel: firstCategory ? 'Category Pages' : undefined,
      })
      firstCategory = false
    }

    // ── 3. Individual Tool Pages ───────────────────────────────────────────
    // Popular tools get slightly higher priority to signal importance to Google
    let firstTool = true
    for (const tool of tools) {
      addUrl({
        path: tool.path,
        lastmod: now,
        changefreq: 'weekly',
        priority: tool.popular ? 0.9 : tool.trending ? 0.85 : 0.8,
        groupLabel: firstTool ? 'Tool Pages' : undefined,
      })
      firstTool = false
    }

    // ── 4. Blog Posts ──────────────────────────────────────────────────────
    let firstPost = true
    for (const post of blogPosts) {
      addUrl({
        path: `/blog/${post.slug}`,
        lastmod: new Date(post.date),
        changefreq: 'monthly',
        priority: 0.65,
        groupLabel: firstPost ? 'Blog Posts' : undefined,
      })
      firstPost = false
    }

    return urls
  }

  // ─── XML Generation ────────────────────────────────────────────────────────

  /**
   * Generate the complete sitemap.xml content.
   *
   * Structure per logical page:
   *   - One <url> entry for each of the 7 supported locales
   *   - Each entry's <loc> is the localized URL (e.g. /en/tools/word-counter)
   *   - Each entry has full hreflang alternates for all 7 locales
   *   - x-default points to the bare canonical URL (no locale prefix)
   *
   * This satisfies Google's requirements for:
   *   - Multilingual hreflang implementation
   *   - Complete sitemap coverage
   *   - Canonical URL signals
   */
  static generateSitemapXml(tools: Tool[], categories: ToolCategory[], blogPosts: BlogPost[]): string {
    const entries = this.collectUrls(tools, categories, blogPosts)
    const totalUrls = entries.length * LOCALES.length
    const generated = formatLastmod(new Date())

    if (totalUrls > MAX_URLS_PER_SITEMAP) {
      console.warn(
        `[sitemap] WARNING: ${totalUrls} URLs exceeds Google's 50,000 limit per sitemap. ` +
        `Consider splitting into multiple sitemap files using a sitemap index.`
      )
    }

    const lines: string[] = []

    // ── XML declaration & root element ────────────────────────────────────
    lines.push('<?xml version="1.0" encoding="UTF-8"?>')
    lines.push(`<!-- ============================================================`)
    lines.push(`     SmartDigitalTips — sitemap.xml`)
    lines.push(`     Generated: ${generated}`)
    lines.push(`     Total URLs: ${totalUrls} (${entries.length} pages × ${LOCALES.length} locales)`)
    lines.push(`     Namespace: http://www.sitemaps.org/schemas/sitemap/0.9`)
    lines.push(`     hreflang:  http://www.w3.org/1999/xhtml`)
    lines.push(``)
    lines.push(`     Submit to Google Search Console:`)
    lines.push(`     https://search.google.com/search-console`)
    lines.push(`     Sitemap URL: ${SITE_URL}/sitemap.xml`)
    lines.push(`     ============================================================ -->`)
    lines.push(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
      '\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    )
    lines.push('')

    let currentGroup = ''

    // ── Iterate: for each page, emit one <url> per locale ─────────────────
    for (const entry of entries) {
      const normalized = normalizePath(entry.path)
      const pathSuffix = normalized === '/' ? '' : normalized

      // Emit section header comment when group changes
      if (entry.groupLabel && entry.groupLabel !== currentGroup) {
        currentGroup = entry.groupLabel
        lines.push(`  <!-- ═══════════════════════════════════ ${currentGroup} ═══════════════════════════════════ -->`)
        lines.push('')
      }

      for (const locale of LOCALES) {
        const loc = localizedUrl(normalized, locale)
        const localeName = LOCALE_META[locale].name

        lines.push(`  <!-- ${localeName}: ${normalized === '/' ? '(home)' : normalized} -->`)
        lines.push(`  <url>`)
        lines.push(`    <loc>${escapeXml(loc)}</loc>`)
        lines.push(`    <lastmod>${formatLastmod(entry.lastmod)}</lastmod>`)
        lines.push(`    <changefreq>${entry.changefreq}</changefreq>`)
        lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`)
        lines.push(hreflangBlock(pathSuffix))
        lines.push(`  </url>`)
      }

      lines.push('')
    }

    lines.push('</urlset>')
    lines.push('')

    return lines.join('\n')
  }

  // ─── robots.txt Generation ─────────────────────────────────────────────────

  static generateRobotsTxt(): string {
    const updated = formatLastmod(new Date())
    return `# SmartDigitalTips — https://smartdigitaltips.com
# Updated: ${updated}
# Submit sitemap in Google Search Console: ${SITE_URL}/sitemap.xml

# ──────────────────────────────────────────────────────────
# Sitemap Declaration
# ──────────────────────────────────────────────────────────
Sitemap: ${SITE_URL}/sitemap.xml

# ──────────────────────────────────────────────────────────
# Google Search
# ──────────────────────────────────────────────────────────
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Mobile
Allow: /

# ──────────────────────────────────────────────────────────
# Bing Search
# ──────────────────────────────────────────────────────────
User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/

# ──────────────────────────────────────────────────────────
# International Search Engines
# ──────────────────────────────────────────────────────────
User-agent: Yandex
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: Baiduspider
Allow: /
Disallow: /api/
Disallow: /admin/

# ──────────────────────────────────────────────────────────
# AI Search & Recommendation Crawlers (explicitly allowed)
# ──────────────────────────────────────────────────────────
User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: ClaudeBot
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: Applebot-Extended
Allow: /

# ──────────────────────────────────────────────────────────
# Blocked: Aggressive / Low-quality Bots
# ──────────────────────────────────────────────────────────
User-agent: PetalBot
Disallow: /

User-agent: Bytespider
Disallow: /

# ──────────────────────────────────────────────────────────
# All Other Crawlers (default policy)
# ──────────────────────────────────────────────────────────
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
`
  }

  // ─── Validation ────────────────────────────────────────────────────────────

  /**
   * Validate the generated sitemap XML.
   * Returns an array of error strings (empty = valid).
   */
  static validateSitemapXml(
    xml: string,
    tools: Tool[],
    categories: ToolCategory[],
    blogPosts: BlogPost[]
  ): string[] {
    const errors: string[] = []
    const stats = this.getStats(tools, categories, blogPosts)

    // ── Document-level checks ──────────────────────────────────────────────
    if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
      errors.push('Missing UTF-8 XML declaration')
    }
    if (!xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      errors.push('Missing sitemap 0.9 urlset namespace')
    }
    if (!xml.trimEnd().endsWith('</urlset>')) {
      errors.push('Invalid or unclosed </urlset>')
    }

    // ── Tag balance ────────────────────────────────────────────────────────
    const openUrls  = (xml.match(/<url>/g)   || []).length
    const closeUrls = (xml.match(/<\/url>/g) || []).length
    if (openUrls !== closeUrls) {
      errors.push(`Mismatched <url> tags: ${openUrls} open, ${closeUrls} close`)
    }

    // ── URL count ──────────────────────────────────────────────────────────
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    if (locs.length !== stats.totalUrls) {
      errors.push(`Expected ${stats.totalUrls} <loc> entries, found ${locs.length}`)
    }

    // ── Duplicate detection ────────────────────────────────────────────────
    const uniqueLocs = new Set(locs)
    if (uniqueLocs.size !== locs.length) {
      errors.push(`Duplicate <loc> URLs found: ${locs.length - uniqueLocs.size} duplicates`)
    }

    // ── URL format checks ──────────────────────────────────────────────────
    for (const loc of locs) {
      if (!loc.startsWith(`${SITE_URL}/`)) {
        errors.push(`Invalid URL (must start with ${SITE_URL}/): ${loc}`)
      }
      if (loc.includes(' ')) {
        errors.push(`URL contains spaces: ${loc}`)
      }
      // Check that the locale segment is valid
      const afterSite = loc.slice(SITE_URL.length + 1) // remove "https://.../"
      const localeSegment = afterSite.split('/')[0]
      if (!LOCALES.includes(localeSegment as (typeof LOCALES)[number])) {
        errors.push(`Unknown locale in URL: ${loc}`)
      }
    }

    // ── Date format ────────────────────────────────────────────────────────
    const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1])
    if (!lastmods.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))) {
      errors.push('Invalid lastmod format (expected YYYY-MM-DD)')
    }

    // ── Priority range ─────────────────────────────────────────────────────
    const priorities = [...xml.matchAll(/<priority>([^<]+)<\/priority>/g)].map((m) => parseFloat(m[1]))
    if (priorities.some((p) => Number.isNaN(p) || p < 0 || p > 1)) {
      errors.push('Invalid priority value (must be 0.0–1.0)')
    }

    // ── hreflang count ─────────────────────────────────────────────────────
    // Each URL should have: one per locale + one x-default = LOCALES.length + 1
    const hreflangs = [...xml.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1])
    const expectedHreflangsPerUrl = LOCALES.length + 1 // +1 for x-default
    if (openUrls > 0 && Math.round(hreflangs.length / openUrls) !== expectedHreflangsPerUrl) {
      errors.push(
        `Expected ${expectedHreflangsPerUrl} hreflang links per URL ` +
        `(got ~${Math.round(hreflangs.length / openUrls)})`
      )
    }

    // ── x-default check ───────────────────────────────────────────────────
    if (!xml.includes('hreflang="x-default"')) {
      errors.push('Missing x-default hreflang links')
    }

    // ── Broken URL check ──────────────────────────────────────────────
    // Only scan actual <loc> URLs — not comments or namespace declarations
    if (locs.some((loc) => /\/search($|\/)/.test(new URL(loc).pathname))) {
      errors.push('Broken /search URL found in sitemap <loc>')
    }

    // ── Tool coverage: ensure every tool appears in the sitemap ───────────
    for (const tool of tools) {
      const expectedEn = `${SITE_URL}/en${normalizePath(tool.path)}`
      if (!locs.includes(expectedEn)) {
        errors.push(`Missing tool URL in sitemap: ${expectedEn}`)
      }
    }

    return errors
  }
}

export default SitemapGenerator
