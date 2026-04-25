import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = __dirname

const toolsPath = path.join(rootDir, 'src', 'data', 'tools.ts')
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')

const content = fs.readFileSync(toolsPath, 'utf8')
const matches = content.matchAll(/path:\s*['"](\/tools\/[^'"]+)['"]/g)

const urls = ['/', '/categories', '/tools', '/about', '/contact']
// Collect unique URLs in case of duplicates
const uniqueUrls = new Set(urls)

for (const match of matches) {
  uniqueUrls.add(match[1])
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(uniqueUrls).map(url => `  <url>
    <loc>https://smartdigitaltips.com${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url.startsWith('/tools/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`

fs.writeFileSync(sitemapPath, sitemap)
console.log(`Generated sitemap with ${uniqueUrls.size} URLs.`)
