#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { tools, categories } from '../src/data/tools.ts'
import { blogPosts } from '../src/data/blog.ts'
import {
  LOCALES,
  PAGES,
  buildToolSeo,
  buildCategorySeo,
  BRAND,
} from './seo-locale-templates.mjs'

const outDir = join(process.cwd(), 'messages')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

for (const locale of LOCALES) {
  const messages = {
    pages: {},
    tools: {},
    categories: {},
    blog: {},
  }

  for (const [pageId, translations] of Object.entries(PAGES)) {
    const entry = translations[locale] || translations.en
    messages.pages[pageId] = entry
  }

  for (const tool of tools) {
    messages.tools[tool.id] = buildToolSeo(tool, locale)
  }

  for (const category of categories) {
    messages.categories[category.id] = buildCategorySeo(category, locale)
  }

  for (const post of blogPosts) {
    if (locale === 'en') {
      messages.blog[post.slug] = {
        title: post.seoTitle,
        description: post.seoDescription,
      }
    } else {
      messages.blog[post.slug] = {
        title: `${post.title} | ${BRAND}`,
        description: post.excerpt,
      }
    }
  }

  // Legacy Index key for compatibility
  messages.Index = messages.pages.home

  const filePath = join(outDir, `${locale}.json`)
  writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n', 'utf8')
  console.log(`✅ messages/${locale}.json (${Object.keys(messages.tools).length} tools)`)
}

console.log('\n🎉 SEO messages generated for all locales')
