import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = __dirname
const publicDir = path.join(rootDir, 'public')
const sitemapPath = path.join(publicDir, 'sitemap.xml')
const siteUrl = 'https://smartdigitaltips.com'
const today = new Date().toISOString().split('T')[0]

const toolsPath = path.join(rootDir, 'src', 'data', 'tools.ts')
const blogPath = path.join(rootDir, 'src', 'data', 'blog.ts')

const locales = ['en', 'fr', 'rw', 'sw', 'ar', 'es', 'pt', 'zh']

const toolsContent = fs.readFileSync(toolsPath, 'utf8')
const blogContent = fs.readFileSync(blogPath, 'utf8')

const toolPaths = uniqueMatches(toolsContent, /path:\s*['"](\/tools\/[^'"]+)['"]/g, 1)
const categoryPaths = uniqueMatches(toolsContent, /id:\s*['"]([^'"]+)['"],\s*\n\s*label:/g, 1)
  .map((id) => `/category/${id}`)

const blogUrls = Array.from(blogContent.matchAll(/slug:\s*['"]([^'"]+)['"][\s\S]*?date:\s*['"]([^'"]+)['"]/g))
  .map((match) => ({
    path: `/blog/${match[1]}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: match[2],
  }))

const urls = [
  { path: '/', changefreq: 'daily', priority: '1.0', lastmod: today },
  { path: '/about', changefreq: 'monthly', priority: '0.6', lastmod: today },
  { path: '/contact', changefreq: 'monthly', priority: '0.5', lastmod: today },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3', lastmod: today },
  { path: '/terms', changefreq: 'yearly', priority: '0.3', lastmod: today },
  { path: '/disclaimer', changefreq: 'yearly', priority: '0.3', lastmod: today },
  { path: '/blog', changefreq: 'weekly', priority: '0.7', lastmod: today },
  ...categoryPaths.map((urlPath) => ({
    path: urlPath,
    changefreq: 'weekly',
    priority: '0.7',
    lastmod: today,
  })),
  ...toolPaths.map((urlPath) => ({
    path: urlPath,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: today,
  })),
  ...blogUrls,
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.flatMap((entry) => locales.map((locale) => buildUrlEntry(entry, locale))).join('\n')}
</urlset>
`

fs.writeFileSync(sitemapPath, sitemap)

const sitemapDir = path.join(publicDir, 'sitemaps')
if (fs.existsSync(sitemapDir)) {
  fs.rmSync(sitemapDir, { recursive: true, force: true })
}

console.log(`Generated one sitemap with ${urls.length * locales.length} localized URLs.`)

function uniqueMatches(content, regex, groupIndex) {
  return Array.from(new Set(Array.from(content.matchAll(regex)).map((match) => match[groupIndex])))
}

function localizedUrl(urlPath, locale) {
  return `${siteUrl}/${locale}${urlPath === '/' ? '' : urlPath}`
}

function buildUrlEntry(entry, locale) {
  const alternates = locales
    .map((alternateLocale) => `    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${localizedUrl(entry.path, alternateLocale)}" />`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(entry.path, 'en')}" />`)
    .join('\n')

  return `  <url>
    <loc>${localizedUrl(entry.path, locale)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${alternates}
  </url>`
}
