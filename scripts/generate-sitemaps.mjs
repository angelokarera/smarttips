#!/usr/bin/env node

import { writeFileSync, unlinkSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { tools, categories } from '../src/data/tools.ts';
import { blogPosts } from '../src/data/blog.ts';
import { SitemapGenerator } from '../src/lib/sitemap-generator.ts';

console.log('🚀 Generating sitemap.xml...\n');

try {
  const outputDir = './public';
  const sitemapXml = SitemapGenerator.generateSitemapXml(tools, categories, blogPosts);
  const robotsTxt = SitemapGenerator.generateRobotsTxt();

  writeFileSync(join(outputDir, 'sitemap.xml'), sitemapXml, 'utf8');
  writeFileSync(join(outputDir, 'robots.txt'), robotsTxt, 'utf8');

  const indexPath = join(outputDir, 'sitemap-index.xml');
  if (existsSync(indexPath)) {
    unlinkSync(indexPath);
  }

  const sitemapsDir = join(outputDir, 'sitemaps');
  if (existsSync(sitemapsDir)) {
    rmSync(sitemapsDir, { recursive: true, force: true });
  }

  const urlCount = (sitemapXml.match(/<loc>/g) || []).length;
  console.log(`✅ sitemap.xml (${urlCount} URLs, all locales) and robots.txt → ${outputDir}`);
  console.log('\n✅ Sitemap generation complete!');
} catch (error) {
  console.error('\n❌ Error:', error);
  process.exit(1);
}
