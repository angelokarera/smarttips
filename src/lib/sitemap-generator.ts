// Sitemap generator — aligned with app routes and hreflang
import type { Tool, ToolCategory } from '@/data/tools'
import type { BlogPost } from '@/data/blog'
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, SITE_URL } from './locale-config.ts'

const MAX_URLS_PER_SITEMAP = 50000

const STATIC_PAGE_COUNT = 8

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

function hreflangLinks(path: string): string {
  const normalized = normalizePath(path)
  return LOCALES.map((locale) => {
    const href = `${SITE_URL}/${locale}${normalized === '/' ? '' : normalized}`
    const code = LOCALE_META[locale].hreflang
    return `    <xhtml:link rel="alternate" hreflang="${code}" href="${escapeXml(href)}" />`
  }).join('\n')
}

function xDefaultLink(path: string): string {
  const normalized = normalizePath(path)
  const href = `${SITE_URL}/${DEFAULT_LOCALE}${normalized === '/' ? '' : normalized}`
  return `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(href)}" />`
}

interface SitemapUrl {
  path: string
  lastmod: Date
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
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

  static collectUrls(tools: Tool[], categories: ToolCategory[], blogPosts: BlogPost[]): SitemapUrl[] {
    const now = new Date()
    const urls: SitemapUrl[] = []
    const seenPaths = new Set<string>()

    const staticPages: Array<{ path: string; priority: number; changefreq: SitemapUrl['changefreq'] }> = [
      { path: '', priority: 1.0, changefreq: 'daily' },
      { path: '/about', priority: 0.6, changefreq: 'monthly' },
      { path: '/contact', priority: 0.6, changefreq: 'monthly' },
      { path: '/blog', priority: 0.7, changefreq: 'weekly' },
      { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
      { path: '/cookies', priority: 0.3, changefreq: 'yearly' },
      { path: '/terms', priority: 0.3, changefreq: 'yearly' },
      { path: '/disclaimer', priority: 0.3, changefreq: 'yearly' },
    ]

    const addUrl = (entry: SitemapUrl) => {
      const path = normalizePath(entry.path)
      if (seenPaths.has(path)) {
        console.warn(`[sitemap] Skipping duplicate path: ${path}`)
        return
      }
      seenPaths.add(path)
      urls.push({ ...entry, path })
    }

    for (const page of staticPages) {
      addUrl({
        path: page.path || '/',
        lastmod: now,
        changefreq: page.changefreq,
        priority: page.priority,
      })
    }

    for (const category of categories) {
      addUrl({
        path: `/category/${category.id}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.7,
      })
    }

    for (const tool of tools) {
      addUrl({
        path: tool.path,
        lastmod: now,
        changefreq: 'weekly',
        priority: tool.popular ? 0.9 : tool.trending ? 0.85 : 0.8,
      })
    }

    for (const post of blogPosts) {
      addUrl({
        path: `/blog/${post.slug}`,
        lastmod: new Date(post.date),
        changefreq: 'monthly',
        priority: 0.6,
      })
    }

    return urls
  }

  /**
   * Single sitemap.xml with every localized URL (all locales × all pages).
   * Each entry includes hreflang alternates for the full language cluster.
   */
  static generateSitemapXml(tools: Tool[], categories: ToolCategory[], blogPosts: BlogPost[]): string {
    const entries = this.collectUrls(tools, categories, blogPosts)
    const totalUrls = entries.length * LOCALES.length

    if (totalUrls > MAX_URLS_PER_SITEMAP) {
      console.warn(`Sitemap has ${totalUrls} URLs; consider splitting into multiple sitemaps.`)
    }

    const generated = formatLastmod(new Date())
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += `<!-- SmartDigitalTips sitemap | ${totalUrls} URLs | generated ${generated} -->\n`
    xml +=
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

    for (const locale of LOCALES) {
      for (const entry of entries) {
        const normalized = normalizePath(entry.path)
        const pathSuffix = normalized === '/' ? '' : normalized
        const loc = `${SITE_URL}/${locale}${pathSuffix}`

        xml += '  <url>\n'
        xml += `    <loc>${escapeXml(loc)}</loc>\n`
        xml += `    <lastmod>${formatLastmod(entry.lastmod)}</lastmod>\n`
        xml += `    <changefreq>${entry.changefreq}</changefreq>\n`
        xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`
        xml += `${hreflangLinks(pathSuffix)}\n`
        xml += `${xDefaultLink(pathSuffix)}\n`
        xml += '  </url>\n'
      }
    }

    xml += '</urlset>'
    return xml
  }

  static generateRobotsTxt(): string {
    const updated = formatLastmod(new Date())
    return `# SmartDigitalTips — https://smartdigitaltips.com
# Updated: ${updated}
# Submit sitemap in Google Search Console: ${SITE_URL}/sitemap.xml

Sitemap: ${SITE_URL}/sitemap.xml

# Google
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Mobile
Allow: /

# All crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

# Bing
User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
`
  }

  /** Validate generated sitemap XML against live registry data. Returns error messages. */
  static validateSitemapXml(
    xml: string,
    tools: Tool[],
    categories: ToolCategory[],
    blogPosts: BlogPost[]
  ): string[] {
    const errors: string[] = []
    const stats = this.getStats(tools, categories, blogPosts)

    if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
      errors.push('Missing UTF-8 XML declaration')
    }
    if (!xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      errors.push('Missing sitemap 0.9 urlset namespace')
    }
    if (!xml.trimEnd().endsWith('</urlset>')) {
      errors.push('Invalid or unclosed </urlset>')
    }

    const openUrls = (xml.match(/<url>/g) || []).length
    const closeUrls = (xml.match(/<\/url>/g) || []).length
    if (openUrls !== closeUrls) {
      errors.push(`Mismatched <url> tags: ${openUrls} open, ${closeUrls} close`)
    }

    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    if (locs.length !== stats.totalUrls) {
      errors.push(`Expected ${stats.totalUrls} <loc> entries, found ${locs.length}`)
    }

    const uniqueLocs = new Set(locs)
    if (uniqueLocs.size !== locs.length) {
      errors.push(`Duplicate <loc> URLs: ${locs.length - uniqueLocs.size}`)
    }

    for (const loc of locs) {
      if (!loc.startsWith(`${SITE_URL}/`)) {
        errors.push(`Invalid URL (must use ${SITE_URL}): ${loc}`)
      }
      if (loc.includes(' ')) {
        errors.push(`URL contains spaces: ${loc}`)
      }
      const locale = loc.slice(SITE_URL.length + 1).split('/')[0]
      if (!LOCALES.includes(locale as (typeof LOCALES)[number])) {
        errors.push(`Unknown locale in URL: ${loc}`)
      }
    }

    const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1])
    if (!lastmods.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))) {
      errors.push('Invalid lastmod format (expected YYYY-MM-DD)')
    }

    const priorities = [...xml.matchAll(/<priority>([^<]+)<\/priority>/g)].map((m) => parseFloat(m[1]))
    if (priorities.some((p) => Number.isNaN(p) || p < 0 || p > 1)) {
      errors.push('Invalid priority value (must be 0.0–1.0)')
    }

    const hreflangs = [...xml.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1])
    const expectedPerUrl = LOCALES.length + 1
    if (openUrls > 0 && Math.round(hreflangs.length / openUrls) !== expectedPerUrl) {
      errors.push(`Expected ${expectedPerUrl} hreflang links per URL`)
    }

    if (xml.includes('/search')) {
      errors.push('Broken /search URL found in sitemap')
    }

    for (const tool of tools) {
      const sample = `${SITE_URL}/en${normalizePath(tool.path)}`
      if (!locs.includes(sample)) {
        errors.push(`Missing tool URL in sitemap: ${sample}`)
      }
    }

    return errors
  }
}


export default SitemapGenerator
