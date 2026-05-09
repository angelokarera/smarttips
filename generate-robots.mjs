import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const robotsPath = path.join(__dirname, 'public', 'robots.txt')

const robots = `# SmartDigitalTips Robots.txt
# Generated automatically during build

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/
Disallow: /*?*

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://smartdigitaltips.com/sitemap.xml
Host: https://smartdigitaltips.com
`

fs.writeFileSync(robotsPath, robots)
console.log('Generated robots.txt.')
