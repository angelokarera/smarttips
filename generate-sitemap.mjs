import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = __dirname

const toolsPath = path.join(rootDir, 'src', 'data', 'tools.ts')
const blogPath = path.join(rootDir, 'src', 'data', 'blog.ts')
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')

const toolsContent = fs.readFileSync(toolsPath, 'utf8')
const toolMatches = toolsContent.matchAll(/path:\s*['"](\/tools\/[^'"]+)['"]/g)

const blogContent = fs.readFileSync(blogPath, 'utf8')
const blogMatches = blogContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)

const locales = ['en', 'fr', 'de', 'es', 'pt', 'it', 'nl', 'ar'];

const urls = ['/', '/categories', '/tools', '/about', '/contact', '/blog']
// Collect unique URLs in case of duplicates
const uniqueUrls = new Set(urls)

for (const match of toolMatches) {
  uniqueUrls.add(match[1])
}

for (const match of blogMatches) {
  uniqueUrls.add(`/blog/${match[1]}`)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Array.from(uniqueUrls).flatMap(url => {
  return locales.map(locale => {
    const localizedUrl = `/${locale}${url === '/' ? '' : url}`;
    
    const hreflangLinks = locales.map(l => 
      `    <xhtml:link rel="alternate" hreflang="${l}" href="https://smartdigitaltips.com/${l}${url === '/' ? '' : url}" />`
    ).join('\n');
    
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="https://smartdigitaltips.com/en${url === '/' ? '' : url}" />`;

    return `  <url>
    <loc>https://smartdigitaltips.com${localizedUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url.startsWith('/tools/') ? '0.8' : '0.6'}</priority>
${hreflangLinks}
${xDefault}
  </url>`;
  });
}).join('\n')}
</urlset>`

fs.writeFileSync(sitemapPath, sitemap)
console.log(`Generated sitemap with ${uniqueUrls.size * locales.length} URLs.`)
