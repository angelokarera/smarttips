#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const LOCALES = ['en', 'fr', 'sw', 'ar', 'es', 'pt', 'zh']
const SITE = 'https://smartdigitaltips.com'
const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')

let failed = 0
function fail(msg) {
  console.error(`❌ ${msg}`)
  failed++
}
function ok(msg) {
  console.log(`✅ ${msg}`)
}

if (!existsSync(sitemapPath)) {
  console.error('Missing public/sitemap.xml — run: npm run build:seo')
  process.exit(1)
}

const xml = readFileSync(sitemapPath, 'utf8')

// Basic XML structure
if (!xml.startsWith('<?xml')) fail('Missing XML declaration')
if (!xml.includes('<urlset') || !xml.trimEnd().endsWith('</urlset>')) fail('Invalid urlset wrapper')
if (xml.includes('/rw/') || xml.includes('hreflang="rw"')) fail('Removed locale rw still present')
if (xml.includes('/search')) fail('Broken /search URL in sitemap')
if (xml.includes('sitemap-index')) fail('Unexpected sitemap-index reference')

const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const hreflangs = [...xml.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1])

if (locs.length === 0) fail('No <loc> entries found')

const uniqueLocs = new Set(locs)
if (uniqueLocs.size !== locs.length) fail(`Duplicate <loc> entries: ${locs.length - uniqueLocs.size}`)

for (const loc of locs) {
  if (!loc.startsWith(`${SITE}/`)) fail(`Invalid base URL: ${loc}`)
  const locale = loc.slice(SITE.length + 1).split('/')[0]
  if (!LOCALES.includes(locale)) fail(`Unknown locale in URL: ${loc}`)
}

// Expected: 8 static + 11 categories + 56 tools + 7 blog = 82 pages × 7 locales = 574
const expectedPages = 82
const expectedUrls = expectedPages * LOCALES.length
if (locs.length !== expectedUrls) {
  fail(`Expected ${expectedUrls} URLs, got ${locs.length}`)
} else {
  ok(`${locs.length} URLs (${expectedPages} pages × ${LOCALES.length} locales)`)
}

// Each URL should have 7 hreflang + x-default = 8 per url block
const urlBlocks = xml.split('<url>').length - 1
const expectedHreflangPerBlock = LOCALES.length + 1
const hreflangPerBlock = hreflangs.length / urlBlocks
if (Math.round(hreflangPerBlock) !== expectedHreflangPerBlock) {
  fail(`Expected ${expectedHreflangPerBlock} hreflang links per URL, avg ${hreflangPerBlock}`)
} else {
  ok(`${expectedHreflangPerBlock} hreflang alternates per URL (incl. x-default)`)
}

if (existsSync(join(process.cwd(), 'public', 'sitemap-index.xml'))) {
  fail('sitemap-index.xml should not exist (single sitemap only)')
} else {
  ok('No sitemap-index.xml (single sitemap strategy)')
}

const robots = readFileSync(join(process.cwd(), 'public', 'robots.txt'), 'utf8')
if (!robots.includes('Sitemap: https://smartdigitaltips.com/sitemap.xml')) {
  fail('robots.txt missing correct Sitemap directive')
} else {
  ok('robots.txt points to sitemap.xml')
}

if (failed > 0) {
  console.error(`\n${failed} validation error(s)`)
  process.exit(1)
}

console.log('\n🎉 Sitemap validation passed')
