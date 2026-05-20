#!/usr/bin/env node
/**
 * Validates public/sitemap.xml and public/robots.txt.
 * Run via: npm run validate:sitemap  (uses tsx for registry imports)
 */
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { tools, categories } from '../src/data/tools.ts'
import { blogPosts } from '../src/data/blog.ts'
import { SitemapGenerator } from '../src/lib/sitemap-generator.ts'
import { SITE_URL } from '../src/lib/locale-config.ts'

const publicDir = join(process.cwd(), 'public')
const sitemapPath = join(publicDir, 'sitemap.xml')
const robotsPath = join(publicDir, 'robots.txt')

let failed = 0
function fail(msg) {
  console.error(`❌ ${msg}`)
  failed++
}
function ok(msg) {
  console.log(`✅ ${msg}`)
}

if (!existsSync(sitemapPath)) {
  console.error('Missing public/sitemap.xml — run: npm run generate:sitemaps')
  process.exit(1)
}

if (!existsSync(robotsPath)) {
  console.error('Missing public/robots.txt — run: npm run generate:sitemaps')
  process.exit(1)
}

const xml = readFileSync(sitemapPath, 'utf8')
const robots = readFileSync(robotsPath, 'utf8')
const stats = SitemapGenerator.getStats(tools, categories, blogPosts)

console.log(
  `📊 Registry: ${stats.staticPages} static + ${stats.categories} categories + ${stats.tools} tools + ${stats.blogPosts} blog = ${stats.logicalPages} pages × ${stats.locales} locales = ${stats.totalUrls} URLs\n`
)

const xmlErrors = SitemapGenerator.validateSitemapXml(xml, tools, categories, blogPosts)
if (xmlErrors.length === 0) {
  ok(`sitemap.xml structure valid (${stats.totalUrls} URLs)`)
} else {
  xmlErrors.forEach(fail)
}

if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  fail('robots.txt missing absolute Sitemap directive')
} else {
  ok(`robots.txt points to ${SITE_URL}/sitemap.xml`)
}

if (!robots.includes('User-agent: Googlebot')) {
  fail('robots.txt missing Googlebot rules')
} else {
  ok('robots.txt includes Googlebot')
}

if (existsSync(join(publicDir, 'sitemap-index.xml'))) {
  fail('sitemap-index.xml should not exist (single sitemap strategy)')
} else {
  ok('No conflicting sitemap-index.xml')
}

if (failed > 0) {
  console.error(`\n${failed} validation error(s)`)
  process.exit(1)
}

console.log('\n🎉 Sitemap and robots.txt validation passed')
