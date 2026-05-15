// Sitemap generator — aligned with app routes and hreflang
import type { Tool, ToolCategory } from '@/data/tools'
import type { BlogPost } from '@/data/blog'
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, SITE_URL } from './locale-config.ts'

const MAX_URLS_PER_SITEMAP = 50000

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
  return LOCALES.map((locale) => {
    const href = `${SITE_URL}/${locale}${path === '/' ? '' : path}`
    const code = LOCALE_META[locale].hreflang
    return `    <xhtml:link rel="alternate" hreflang="${code}" href="${escapeXml(href)}" />`
  }).join('\n')
}

function xDefaultLink(path: string): string {
  const href = `${SITE_URL}/${DEFAULT_LOCALE}${path === '/' ? '' : path}`
  return `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(href)}" />`
}

interface SitemapUrl {
  path: string
  lastmod: Date
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

export class SitemapGenerator {
  static collectUrls(tools: Tool[], categories: ToolCategory[], blogPosts: BlogPost[]): SitemapUrl[] {
    const now = new Date()
    const urls: SitemapUrl[] = []

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

    for (const page of staticPages) {
      urls.push({
        path: page.path || '/',
        lastmod: now,
        changefreq: page.changefreq,
        priority: page.priority,
      })
    }

    for (const category of categories) {
      urls.push({
        path: `/category/${category.id}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.7,
      })
    }

    for (const tool of tools) {
      urls.push({
        path: tool.path,
        lastmod: now,
        changefreq: 'weekly',
        priority: tool.popular ? 0.9 : tool.trending ? 0.85 : 0.8,
      })
    }

    for (const post of blogPosts) {
      urls.push({
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

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml +=
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

    for (const locale of LOCALES) {
      for (const entry of entries) {
        const pathSuffix = entry.path === '/' ? '' : entry.path
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
    return `# SmartDigitalTips — production robots.txt
# Updated: ${formatLastmod(new Date())}

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Mobile
Allow: /

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: BingPreview
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Slurp
Allow: /

User-agent: Yandex
Allow: /
Disallow: /api/

User-agent: Baiduspider
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: TelegramBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
  }

}

export default SitemapGenerator
