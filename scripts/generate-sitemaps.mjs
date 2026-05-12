#!/usr/bin/env node

// Generate Sitemaps Script
import { tools, categories } from '../src/data/tools.ts';
import { SitemapGenerator } from '../src/lib/sitemap-generator.ts';

console.log('🚀 Generating sitemaps...\n');

try {
  await SitemapGenerator.saveAllSitemaps(tools, categories, './public');
  console.log('\n✅ Sitemap generation complete!');
} catch (error) {
  console.error('\n❌ Error:', error);
  process.exit(1);
}
