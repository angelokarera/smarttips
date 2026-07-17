import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { tools, categories } from '../src/data/tools'
import { blogPosts } from '../src/data/blog'
import { getToolEditorial } from '../src/lib/tool-editorial'
import { getCategoryEditorial } from '../src/lib/category-editorial'
import { getToolKeywords, getCategoryKeywords, getBlogKeywords, uniqueKeywords, platformKeywords } from '../src/lib/seoKeywords'
import { LOCALES as SUPPORTED_LOCALES } from '../src/lib/locale-config'

// Load translations from pre-generated files.
// Locale list comes from locale-config (single source of truth) so the set of
// prerendered pages always matches the sitemap and hreflang alternates.
const LOCALES: string[] = [...SUPPORTED_LOCALES]
type SeoEntry = { title?: string; description?: string }
type LabelEntry = { label?: string; name?: string; description?: string }
type TranslationCatalog = {
  ui?: Record<string, Record<string, string>>
  labels?: {
    categories?: Record<string, LabelEntry>
    tools?: Record<string, LabelEntry>
  }
  tools?: Record<string, SeoEntry>
  categories?: Record<string, SeoEntry>
  blog?: Record<string, SeoEntry>
  pages?: Record<string, SeoEntry>
}

const messages: Record<string, TranslationCatalog> = {}
for (const locale of LOCALES) {
  const filePath = join(process.cwd(), 'messages', `${locale}.json`)
  if (existsSync(filePath)) {
    messages[locale] = JSON.parse(readFileSync(filePath, 'utf8'))
  } else {
    console.warn(`⚠️ Warning: Translation file messages/${locale}.json not found!`)
    messages[locale] = {}
  }
}

// Translation helpers mirroring client-side i18n
function t(locale: string, key: string, fallback = ''): string {
  const [section, field] = key.split('.')
  const value = messages[locale]?.ui?.[section]?.[field] ?? messages['en']?.ui?.[section]?.[field]
  return value ?? fallback
}

function getCategoryLabel(categoryId: string, locale: string, fallback: { label: string; description: string }) {
  const labels = messages[locale]?.labels?.categories?.[categoryId]
  const fb = messages['en']?.labels?.categories?.[categoryId]
  return {
    label: labels?.label ?? fb?.label ?? fallback.label,
    description: labels?.description ?? fb?.description ?? fallback.description,
  }
}

function getToolLabel(toolId: string, locale: string, fallback: { name: string; description: string }) {
  const labels = messages[locale]?.labels?.tools?.[toolId]
  const fb = messages['en']?.labels?.tools?.[toolId]
  return {
    name: labels?.name ?? fb?.name ?? fallback.name,
    description: labels?.description ?? fb?.description ?? fallback.description,
  }
}

function getToolSeo(toolId: string, locale: string, fallback: { title: string; description: string }) {
  const labels = messages[locale]?.tools?.[toolId]
  const fb = messages['en']?.tools?.[toolId]
  return {
    title: labels?.title ?? fb?.title ?? fallback.title,
    description: labels?.description ?? fb?.description ?? fallback.description,
  }
}

function getCategorySeo(categoryId: string, locale: string, fallback: { title: string; description: string }) {
  const labels = messages[locale]?.categories?.[categoryId]
  const fb = messages['en']?.categories?.[categoryId]
  return {
    title: labels?.title ?? fb?.title ?? fallback.title,
    description: labels?.description ?? fb?.description ?? fallback.description,
  }
}

function getBlogSeo(slug: string, locale: string, fallback: { title: string; description: string }) {
  const labels = messages[locale]?.blog?.[slug]
  const fb = messages['en']?.blog?.[slug]
  return {
    title: labels?.title ?? fb?.title ?? fallback.title,
    description: labels?.description ?? fb?.description ?? fallback.description,
  }
}

function getPageSeo(pageId: string, locale: string, fallback: { title: string; description: string }) {
  const labels = messages[locale]?.pages?.[pageId]
  const fb = messages['en']?.pages?.[pageId]
  return {
    title: labels?.title ?? fb?.title ?? fallback.title,
    description: labels?.description ?? fb?.description ?? fallback.description,
  }
}

function escapeHtml(text: string): string {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ─── Per-page structured data (JSON-LD) ──────────────────────────────────────
// The base template already carries site-wide WebSite/Organization schema.
// These builders add page-specific schema (breadcrumbs, tool/app, FAQ, article)
// so Google can surface rich results for every tool, category, and blog post.
const SITE = 'https://smartdigitaltips.com'

/** Serialize a schema object into a safe <script type="application/ld+json"> block. */
function jsonLdScript(obj: Record<string, unknown>): string {
  // Escape "<" so post content or titles can never break out of the script tag.
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`
}

function breadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

function faqSchema(faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

function getToolStructuredData(locale: string, toolId: string): Record<string, unknown>[] {
  const tool = tools.find((t) => t.id === toolId)
  if (!tool) return []
  const l = getToolLabel(toolId, locale, { name: tool.name, description: tool.description })
  const catLabel = getCategoryLabel(tool.category, locale, { label: tool.categoryLabel, description: '' }).label
  const editorial = getToolEditorial(tool)
  const url = `${SITE}/${locale}${tool.path}`

  const schemas: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE}/${locale}` },
      { name: catLabel, url: `${SITE}/${locale}/category/${tool.category}` },
      { name: l.name, url },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: l.name,
      description: l.description,
      url,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      isAccessibleForFree: true,
      inLanguage: locale,
      publisher: { '@type': 'Organization', name: 'SmartDigitalTips', url: SITE },
    },
  ]
  if (editorial.faqs.length > 0) schemas.push(faqSchema(editorial.faqs))
  return schemas
}

function getCategoryStructuredData(locale: string, categoryId: string): Record<string, unknown>[] {
  const category = categories.find((c) => c.id === categoryId)
  if (!category) return []
  const labelData = getCategoryLabel(categoryId, locale, { label: category.label, description: category.description })
  const editorial = getCategoryEditorial(categoryId)
  const categoryTools = tools.filter((t) => t.category === categoryId)
  const url = `${SITE}/${locale}/category/${categoryId}`

  const schemas: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE}/${locale}` },
      { name: labelData.label, url },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: labelData.label,
      description: labelData.description,
      url,
      numberOfItems: categoryTools.length,
      itemListElement: categoryTools.map((tool, i) => {
        const tl = getToolLabel(tool.id, locale, { name: tool.name, description: tool.description })
        return {
          '@type': 'ListItem',
          position: i + 1,
          name: tl.name,
          url: `${SITE}/${locale}${tool.path}`,
        }
      }),
    },
  ]
  if (editorial && editorial.faqs.length > 0) schemas.push(faqSchema(editorial.faqs))
  return schemas
}

function getBlogStructuredData(locale: string, slug: string): Record<string, unknown>[] {
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return []
  const url = `${SITE}/${locale}/blog/${post.slug}`
  const published = new Date(post.date).toISOString()

  return [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE}/${locale}` },
      { name: 'Blog', url: `${SITE}/${locale}/blog` },
      { name: post.title, url },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: published,
      dateModified: published,
      inLanguage: locale,
      articleSection: post.category,
      image: `${SITE}/og-image.png`,
      author: { '@type': 'Person', name: post.author },
      publisher: {
        '@type': 'Organization',
        name: 'SmartDigitalTips',
        logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
      },
    },
  ]
}

// HTML layouts for prerendering
function generatePageWrapper(locale: string, title: string, contentHtml: string): string {
  const homeLink = `/${locale}`
  const categoriesList = categories.map(cat => {
    const label = getCategoryLabel(cat.id, locale, { label: cat.label, description: '' }).label
    return `<li><a href="/${locale}/category/${cat.id}">${escapeHtml(label)}</a></li>`
  }).join('\n      ')

  return `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #1f2937;">
      <!-- Header -->
      <header style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="font-weight: 800; font-size: 20px; color: #e85d34;"><a href="${homeLink}" style="text-decoration: none; color: inherit;">SmartDigitalTips</a></div>
        <nav style="display: flex; gap: 15px; font-weight: 500; font-size: 14px;">
          <a href="${homeLink}" style="color: #4b5563; text-decoration: none;">${escapeHtml(t(locale, 'nav.home', 'Home'))}</a>
          <a href="/${locale}/blog" style="color: #4b5563; text-decoration: none;">${escapeHtml(t(locale, 'nav.blog', 'Blog'))}</a>
          <a href="/${locale}/about" style="color: #4b5563; text-decoration: none;">${escapeHtml(t(locale, 'nav.about', 'About'))}</a>
          <a href="/${locale}/contact" style="color: #4b5563; text-decoration: none;">${escapeHtml(t(locale, 'nav.contact', 'Contact'))}</a>
        </nav>
      </header>

      <!-- Category Links Sub-Nav -->
      <div style="background-color: #f9fafb; padding: 10px 15px; border-radius: 8px; margin-bottom: 30px; font-size: 13px;">
        <ul style="display: flex; flex-wrap: wrap; gap: 15px; list-style: none; padding: 0; margin: 0; font-weight: 600;">
          ${categoriesList}
        </ul>
      </div>

      <!-- Main Body -->
      <main style="min-height: 500px;">
        ${contentHtml}
      </main>

      <!-- Footer -->
      <footer style="margin-top: 60px; padding-top: 30px; border-t: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; text-align: center;">
        <p>${escapeHtml(t(locale, 'footer.footerTagline', '50+ browser-based tools. No uploads, no accounts, no nonsense.'))}</p>
        <p style="margin-top: 10px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
          <a href="/${locale}/privacy" style="color: inherit; text-decoration: none;">${escapeHtml(t(locale, 'footer.privacy', 'Privacy Policy'))}</a>
          <a href="/${locale}/cookies" style="color: inherit; text-decoration: none;">${escapeHtml(t(locale, 'footer.cookies', 'Cookie Policy'))}</a>
          <a href="/${locale}/terms" style="color: inherit; text-decoration: none;">${escapeHtml(t(locale, 'footer.terms', 'Terms of Service'))}</a>
          <a href="/${locale}/disclaimer" style="color: inherit; text-decoration: none;">${escapeHtml(t(locale, 'footer.disclaimer', 'Disclaimer'))}</a>
        </p>
        <p style="margin-top: 15px;">© ${new Date().getFullYear()} SmartDigitalTips. ${escapeHtml(t(locale, 'footer.rights', 'All rights reserved.'))}</p>
      </footer>
    </div>
  `
}

/** Force a noindex robots directive on an already-processed HTML string. */
function forceNoindex(html: string): string {
  return html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    '<meta name="robots" content="noindex, follow" />',
  )
}

/** Static content for the 404 page: helpful links so it is never a dead end. */
function getNotFoundHtml(locale: string): string {
  const popular = tools.filter(tool => tool.popular).slice(0, 8)
  const toolCards = popular.map(tool => {
    const l = getToolLabel(tool.id, locale, { name: tool.name, description: tool.description })
    return `<a href="/${locale}${tool.path}" style="display:block; border:1px solid #e5e7eb; border-radius:12px; padding:16px; text-decoration:none; color:inherit;">
        <div style="font-weight:600; font-size:14px; margin-bottom:4px;">${escapeHtml(l.name)}</div>
        <div style="font-size:12px; color:#6b7280;">${escapeHtml(l.description)}</div>
      </a>`
  }).join('\n      ')

  const categoryChips = categories.map(cat => {
    const label = getCategoryLabel(cat.id, locale, { label: cat.label, description: '' }).label
    return `<a href="/${locale}/category/${cat.id}" style="border:1px solid #e5e7eb; border-radius:999px; padding:8px 16px; font-size:14px; font-weight:500; text-decoration:none; color:#374151;">${escapeHtml(label)}</a>`
  }).join('\n      ')

  return `
      <div style="text-align:center; max-width:640px; margin:0 auto 48px;">
        <div style="font-size:72px; font-weight:800; color:#e5e7eb; line-height:1;">404</div>
        <h1 style="font-size:32px; font-weight:800; margin:12px 0;">This page took a wrong turn</h1>
        <p style="color:#6b7280; font-size:18px;">We couldn't find the page you were looking for. It may have been moved, renamed, or never existed.</p>
        <p style="margin-top:24px;"><a href="/${locale}" style="display:inline-block; background:#e85d34; color:#fff; padding:12px 24px; border-radius:12px; text-decoration:none; font-weight:600;">Back to Home</a></p>
      </div>
      <h2 style="font-size:20px; font-weight:700; margin-bottom:16px;">Popular free tools</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:12px; margin-bottom:40px;">
      ${toolCards}
      </div>
      <h2 style="font-size:20px; font-weight:700; margin-bottom:16px;">Browse by category</h2>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
      ${categoryChips}
      </div>
  `
}

function processHtmlTemplate(templateHtml: string, routePath: string, locale: string, title: string, description: string, contentHtml: string, keywords?: string[], structuredData?: Record<string, unknown>[]): string {
  let html = templateHtml

  // Clean title & description templates
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`)
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${escapeHtml(description)}"`)
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"/i, `<meta property="og:description" content="${escapeHtml(description)}"`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"/i, `<meta name="twitter:description" content="${escapeHtml(description)}"`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"/i, `<meta property="og:title" content="${escapeHtml(title)}"`)
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"/i, `<meta name="twitter:title" content="${escapeHtml(title)}"`)

  // Keywords template replacement
  if (keywords && keywords.length > 0) {
    const kwString = uniqueKeywords(keywords).join(', ')
    html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"/i, `<meta name="keywords" content="${escapeHtml(kwString)}"`)
  }

  // Canonical URLs
  const fullUrl = `https://smartdigitaltips.com${routePath}`
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"/i, `<link rel="canonical" href="${fullUrl}"`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"/i, `<meta property="og:url" content="${fullUrl}"`)
  html = html.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"/i, `<meta name="twitter:url" content="${fullUrl}"`)

  // Language attribute
  html = html.replace(/<html lang="[^"]*"/i, `<html lang="${locale}"`)

  // Inject page-specific structured data (JSON-LD) before </head>
  if (structuredData && structuredData.length > 0) {
    const blocks = structuredData.map(jsonLdScript).join('\n    ')
    html = html.replace('</head>', `    ${blocks}\n  </head>`)
  }

  // Inject content inside <div id="root">
  const pageWrapper = generatePageWrapper(locale, title, contentHtml)
  html = html.replace('<div id="root"></div>', `<div id="root">${pageWrapper}</div>`)

  return html
}


// Content generation helpers for each page type
function getHomeHtml(locale: string): string {
  const heroTitle = t(locale, 'home.heroTitle', 'Stop uploading your files to strangers.')
  const heroSubtitle = t(locale, 'home.heroSubtitle', 'Free browser-based tools.')

  const cats = categories.map(cat => {
    const labelData = getCategoryLabel(cat.id, locale, { label: cat.label, description: cat.description })
    return `
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; margin-bottom: 15px;">
        <h3 style="margin-top: 0; color: #111827; font-weight: 700;"><a href="/${locale}/category/${cat.id}" style="text-decoration: none; color: inherit; hover: color: #e85d34;">${escapeHtml(labelData.label)}</a></h3>
        <p style="color: #4b5563; font-size: 14px; margin-bottom: 0;">${escapeHtml(labelData.description)}</p>
      </div>
    `
  }).join('\n')

  return `
    <section style="margin-bottom: 40px; text-align: center; max-width: 800px; margin: 0 auto 50px auto;">
      <h1 style="font-size: 40px; font-weight: 900; line-height: 1.1; margin-bottom: 20px; color: #111827;">${escapeHtml(heroTitle)}</h1>
      <p style="font-size: 18px; color: #4b5563; margin-bottom: 30px;">${escapeHtml(heroSubtitle)}</p>
      <div style="background-color: #f3f4f6; padding: 12px; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 14px; color: #e85d34;">
        ${escapeHtml(t(locale, 'home.badge'))}
      </div>
    </section>

    <section style="margin-bottom: 50px;">
      <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 20px; color: #111827; text-align: center;">${escapeHtml(t(locale, 'home.pickCategoryTitle', 'Browse by Category'))}</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
        ${cats}
      </div>
    </section>

    <section style="background-color: #f9fafb; padding: 40px; border-radius: 16px; border: 1px solid #f3f4f6; margin-bottom: 40px;">
      <h2 style="font-size: 24px; font-weight: 800; margin-top: 0; margin-bottom: 15px; color: #111827;">Free online tools that respect your privacy</h2>
      <div style="color: #4b5563; font-size: 15px; display: flex; flex-direction: column; gap: 15px;">
        <p>SmartDigitalTips is a collection of browser-based utilities for images, PDFs, writing, developers, security, and everyday productivity. Each tool page explains what the feature does, who it helps, and how to get accurate results—so you are never staring at a blank box without context.</p>
        <p>Where possible, processing happens on your device instead of a remote server. That matters when you compress client photos, merge contracts, test regular expressions against API samples, or check password strength before saving credentials in a manager. We do not require accounts, and we aim to label simulations clearly when a tool cannot measure real-world network speed.</p>
        <p>Browse by category—Text, Developer, Security, Productivity, Image, PDF, and more—or search above to jump straight to a tool. New utilities ship with step-by-step instructions, FAQs, and related links so you can finish one task and move to the next without leaving the site.</p>
      </div>
    </section>
  `
}

function getCategoryHtml(locale: string, categoryId: string): string {
  const category = categories.find(c => c.id === categoryId)
  if (!category) return ''

  const labelData = getCategoryLabel(categoryId, locale, { label: category.label, description: category.description })
  const categoryEditorial = getCategoryEditorial(categoryId)
  const categoryTools = tools.filter(t => t.category === categoryId)

  const toolsList = categoryTools.map((tool, i) => {
    const l = getToolLabel(tool.id, locale, { name: tool.name, description: tool.description })
    return `
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <h3 style="margin-top: 0; color: #111827; font-weight: 700; font-size: 16px;">
          <a href="/${locale}${tool.path}" style="text-decoration: none; color: inherit; hover: color: #e85d34;">
            ${String(i + 1).padStart(2, '0')}. ${escapeHtml(l.name)}
          </a>
        </h3>
        <p style="color: #4b5563; font-size: 13px; line-height: 1.5; margin-bottom: 0;">${escapeHtml(l.description)}</p>
      </div>
    `
  }).join('\n')

  let editorialHtml = ''
  if (categoryEditorial) {
    const highlights = categoryEditorial.highlights.map(h => `<li style="margin-bottom: 8px;">${escapeHtml(h)}</li>`).join('\n')
    const faqs = categoryEditorial.faqs.map(faq => `
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 6px; color: #111827;">${escapeHtml(faq.question)}</h4>
        <p style="color: #4b5563; font-size: 14px; margin-top: 0;">${escapeHtml(faq.answer)}</p>
      </div>
    `).join('\n')

    editorialHtml = `
      <section style="margin-top: 40px; display: flex; flex-direction: column; gap: 30px;">
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${categoryEditorial.overview.map(p => `<p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">${escapeHtml(p)}</p>`).join('\n')}
        </div>
        
        <div>
          <h3 style="font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #e85d34; margin-bottom: 15px;">What you can do here</h3>
          <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.7;">
            ${highlights}
          </ul>
        </div>

        ${categoryEditorial.faqs.length > 0 ? `
          <div style="border-top: 1px solid #e5e7eb; padding-top: 30px;">
            <h3 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 20px;">Frequently Asked Questions</h3>
            <div style="display: flex; flex-direction: column; gap: 15px;">
              ${faqs}
            </div>
          </div>
        ` : ''}
      </section>
    `
  }

  return `
    <nav style="font-size: 13px; color: #6b7280; margin-bottom: 15px;">
      <a href="/${locale}" style="color: inherit; text-decoration: none;">Home</a> &gt; <span>${escapeHtml(labelData.label)}</span>
    </nav>

    <h1 style="font-size: 32px; font-weight: 900; color: #111827; margin-bottom: 10px;">${escapeHtml(labelData.label)}</h1>
    <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px; max-w-3xl;">${escapeHtml(labelData.description)}</p>

    <div style="background-color: #f9fafb; padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 40px;">
      <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-top: 0; margin-bottom: 10px;">Free ${escapeHtml(labelData.label)} — browser-based and private</h2>
      <p style="color: #4b5563; font-size: 14px; margin: 0; line-height: 1.6;">Every tool in ${escapeHtml(labelData.label)} runs in your web browser when possible, so files and text stay on your device. Pick a utility below, read the guide on each tool page, and use related links to move between similar features. No account is required to start.</p>
    </div>

    <section>
      <h2 style="font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 20px;">Tools Directory</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
        ${toolsList}
      </div>
    </section>

    ${editorialHtml}
  `
}

function getToolHtml(locale: string, toolId: string): string {
  const tool = tools.find(t => t.id === toolId)
  if (!tool) return ''

  const l = getToolLabel(toolId, locale, { name: tool.name, description: tool.description })
  const catLabel = getCategoryLabel(tool.category, locale, { label: tool.categoryLabel, description: '' }).label
  const editorial = getToolEditorial(tool)

  const howToUseList = tool.howToUse.map(step => `<li style="margin-bottom: 8px;">${escapeHtml(step)}</li>`).join('\n')
  const benefitsList = tool.benefits.map(benefit => `<li style="margin-bottom: 8px;">${escapeHtml(benefit)}</li>`).join('\n')
  const useCasesList = editorial.useCases.map(item => `<li style="margin-bottom: 8px;">${escapeHtml(item)}</li>`).join('\n')
  const tipsList = editorial.tips.map(tip => `<li style="margin-bottom: 8px;">${escapeHtml(tip)}</li>`).join('\n')

  const faqs = editorial.faqs.map(faq => `
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 6px; color: #111827;">${escapeHtml(faq.question)}</h4>
      <p style="color: #4b5563; font-size: 14px; margin-top: 0; line-height: 1.6;">${escapeHtml(faq.answer)}</p>
    </div>
  `).join('\n')

  return `
    <nav style="font-size: 13px; color: #6b7280; margin-bottom: 15px;">
      <a href="/${locale}" style="color: inherit; text-decoration: none;">Home</a> &gt; 
      <a href="/${locale}/category/${tool.category}" style="color: inherit; text-decoration: none;">${escapeHtml(catLabel)}</a> &gt; 
      <span>${escapeHtml(l.name)}</span>
    </nav>

    <h1 style="font-size: 32px; font-weight: 900; color: #111827; margin-bottom: 10px;">${escapeHtml(l.name)}</h1>
    <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px; max-w-3xl;">${escapeHtml(l.description)}</p>

    <!-- Interactive Tool Placeholder -->
    <div style="margin: 40px 0; padding: 40px 20px; border: 2px dashed #d1d5db; border-radius: 16px; background-color: #f9fafb; text-align: center;">
      <div style="font-size: 24px; color: #9ca3af; margin-bottom: 10px;">🛠️</div>
      <h3 style="font-size: 18px; font-weight: 700; color: #374151; margin-top: 0; margin-bottom: 5px;">Interactive Tool Interface</h3>
      <p style="color: #6b7280; font-size: 13px; max-width: 400px; margin: 0 auto;">This tool runs 100% locally in your web browser. Enable JavaScript or wait for the application to mount to start processing.</p>
    </div>

    <!-- Editorial Sections -->
    <div style="display: flex; flex-direction: column; gap: 40px; margin-top: 50px; max-w-3xl;">
      
      <section>
        <h2 style="font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 15px;">About ${escapeHtml(l.name)}</h2>
        <div style="display: flex; flex-direction: column; gap: 12px; color: #4b5563; font-size: 15px; line-height: 1.6;">
          ${editorial.overview.map(p => `<p style="margin: 0;">${escapeHtml(p)}</p>`).join('\n')}
        </div>
      </section>

      <section style="display: grid; grid-template-columns: 1fr; md:grid-template-columns: 1fr 1fr; gap: 30px;">
        <div>
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 15px;">How to use</h2>
          <ol style="padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.7; margin: 0;">
            ${howToUseList}
          </ol>
        </div>
        <div>
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 15px;">Why use this tool</h2>
          <ul style="padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.7; margin: 0; list-style-type: square;">
            ${benefitsList}
          </ul>
        </div>
      </section>

      <section>
        <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 15px;">Common use cases</h2>
        <ul style="padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.7; margin: 0;">
          ${useCasesList}
        </ul>
      </section>

      <section style="padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb;">
        <h3 style="font-size: 16px; font-weight: 800; color: #111827; margin-top: 0; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          🛡️ Privacy &amp; security
        </h3>
        <p style="color: #4b5563; font-size: 14px; margin: 0; line-height: 1.6;">
          SmartDigitalTips is designed for privacy-first workflows. Where supported, ${escapeHtml(l.name)} processes your input locally in the browser instead of uploading files to our servers. Do not submit passwords, medical records, or classified material through any online tool. For legal, financial, or academic decisions, verify results with a qualified professional.
        </p>
      </section>

      <section>
        <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 15px;">Tips for best results</h2>
        <ul style="padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.7; margin: 0;">
          ${tipsList}
        </ul>
      </section>

      ${editorial.faqs.length > 0 ? `
        <section style="border-top: 1px solid #e5e7eb; padding-top: 30px;">
          <h2 style="font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 20px;">Frequently Asked Questions</h2>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            ${faqs}
          </div>
        </section>
      ` : ''}
    </div>
  `
}

function getBlogListHtml(locale: string): string {
  const postsList = blogPosts.map(post => {
    return `
      <article style="padding: 25px; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 20px; background-color: #ffffff;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #e85d34; tracking-wide: 0.05em;">${escapeHtml(post.category)}</span>
        <h2 style="font-size: 22px; font-weight: 800; margin-top: 5px; margin-bottom: 10px; color: #111827;">
          <a href="/${locale}/blog/${post.slug}" style="text-decoration: none; color: inherit; hover: color: #e85d34;">${escapeHtml(post.title)}</a>
        </h2>
        <div style="font-size: 12px; color: #6b7280; margin-bottom: 15px;">By ${escapeHtml(post.author)} • ${new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-bottom: 0;">${escapeHtml(post.excerpt)}</p>
      </article>
    `
  }).join('\n')

  return `
    <nav style="font-size: 13px; color: #6b7280; margin-bottom: 15px;">
      <a href="/${locale}" style="color: inherit; text-decoration: none;">Home</a> &gt; <span>Blog</span>
    </nav>

    <h1 style="font-size: 32px; font-weight: 900; color: #111827; margin-bottom: 10px;">Digital Tips &amp; Guides</h1>
    <p style="font-size: 16px; color: #4b5563; margin-bottom: 40px; max-w-3xl;">Guides on image optimization, PDF tools, SEO, and productivity — free tutorials from SmartDigitalTips.</p>

    <section style="max-width: 800px;">
      ${postsList}
    </section>
  `
}

function getBlogPostHtml(locale: string, slug: string): string {
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return ''

  return `
    <nav style="font-size: 13px; color: #6b7280; margin-bottom: 15px;">
      <a href="/${locale}" style="color: inherit; text-decoration: none;">Home</a> &gt; 
      <a href="/${locale}/blog" style="color: inherit; text-decoration: none;">Blog</a> &gt; 
      <span>${escapeHtml(post.title)}</span>
    </nav>

    <article style="max-width: 800px; margin: 0 auto;">
      <header style="margin-bottom: 30px; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #e85d34;">${escapeHtml(post.category)}</span>
        <h1 style="font-size: 36px; font-weight: 900; line-height: 1.2; margin-top: 5px; margin-bottom: 15px; color: #111827;">${escapeHtml(post.title)}</h1>
        <div style="font-size: 13px; color: #6b7280;">By ${escapeHtml(post.author)} • ${new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
      </header>

      <!-- Post Body (contains HTML markup) -->
      <div class="prose" style="font-size: 16px; color: #374151; line-height: 1.7; display: flex; flex-direction: column; gap: 20px;">
        ${post.content}
      </div>

      <div style="margin-top: 50px; padding: 30px; border-radius: 16px; border: 1px solid #e5e7eb; background-color: #f9fafb; text-align: center;">
        <h3 style="font-size: 18px; font-weight: 800; color: #111827; margin-top: 0; margin-bottom: 8px;">Looking for free digital tools?</h3>
        <p style="color: #4b5563; font-size: 14px; max-width: 500px; margin: 0 auto 20px auto; line-height: 1.5;">SmartDigitalTips offers 50+ completely free tools for images, PDFs, text, and developers that run 100% locally in your browser.</p>
        <a href="/${locale}" style="display: inline-block; background-color: #e85d34; color: #ffffff; padding: 10px 22px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(232,93,52,0.15);">Explore all tools</a>
      </div>
    </article>
  `
}

function getStaticPageHtml(pageId: string): string {
  if (pageId === 'about') {
    return `
      <h1 style="font-size: 36px; font-weight: 900; line-height: 1.1; color: #111827; margin-bottom: 20px;">We got tired of "free" tools that aren't free.</h1>
      <p style="font-size: 18px; color: #4b5563; max-width: 600px; margin-bottom: 40px; line-height: 1.6;">So we built the platform we wished existed. Every tool runs in your browser. Your files never leave your device. No catch.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-bottom: 50px;">
        <div>
          <p style="font-size: 32px; font-weight: 900; color: #e85d34; margin: 0;">50+</p>
          <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">Free tools</p>
        </div>
        <div>
          <p style="font-size: 32px; font-weight: 900; color: #111827; margin: 0;">0</p>
          <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">Files uploaded to servers</p>
        </div>
        <div>
          <p style="font-size: 32px; font-weight: 900; color: #111827; margin: 0;">0</p>
          <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">Accounts required</p>
        </div>
        <div>
          <p style="font-size: 32px; font-weight: 900; color: #111827; margin: 0;">0</p>
          <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">Premium paywalls</p>
        </div>
      </div>

      <div style="max-width: 700px; display: flex; flex-direction: column; gap: 30px;">
        <div>
          <h2 style="font-size: 14px; text-transform: uppercase; font-weight: 800; color: #e85d34; margin-bottom: 10px; letter-spacing: 0.05em;">The backstory</h2>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.7; margin: 0;">SmartDigitalTips started in 2024 because every "free" online tool had a catch. Sign up with your email. Wait for the server to process. See a watermark on the output. Pay $9.99/month to remove it. We thought that was ridiculous.</p>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.7; margin-top: 15px; margin-bottom: 0;">What started as a single image compressor grew into 50+ tools spanning image processing, PDF manipulation, text analysis, calculators, and unit converters. Every single one shares the same principles: open it, use it, close the tab.</p>
        </div>

        <div>
          <h2 style="font-size: 14px; text-transform: uppercase; font-weight: 800; color: #e85d34; margin-bottom: 15px; letter-spacing: 0.05em;">How we build</h2>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <div style="padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; background-color: #ffffff;">
              <h3 style="font-size: 16px; font-weight: 800; margin-top: 0; margin-bottom: 5px;">Privacy by architecture</h3>
              <p style="color: #4b5563; font-size: 13.5px; line-height: 1.6; margin: 0;">We don't "promise" to delete your files — we never receive them. Most tools use the Canvas API, Web Workers, and browser-native processing. Your data physically cannot reach our servers because there's nothing to reach.</p>
            </div>
            <div style="padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; background-color: #ffffff;">
              <h3 style="font-size: 16px; font-weight: 800; margin-top: 0; margin-bottom: 5px;">No growth hacking</h3>
              <p style="color: #4b5563; font-size: 13.5px; line-height: 1.6; margin: 0;">No mandatory accounts. No "share to unlock." No artificial usage limits designed to push you into a paid plan. If the tool works, you shouldn't need to do anything else.</p>
            </div>
            <div style="padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; background-color: #ffffff;">
              <h3 style="font-size: 16px; font-weight: 800; margin-top: 0; margin-bottom: 5px;">Quality over quantity</h3>
              <p style="color: #4b5563; font-size: 13.5px; line-height: 1.6; margin: 0;">50 tools that work well beat 500 that barely function. Every tool is tested across browsers, handles edge cases gracefully, and gets refined based on real usage patterns.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 style="font-size: 14px; text-transform: uppercase; font-weight: 800; color: #e85d34; margin-bottom: 10px; letter-spacing: 0.05em;">The team</h2>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.7; margin: 0;">A small, distributed team of developers and designers who care more about making tools that work than about quarterly growth metrics. We're across three time zones, united by the belief that software can be useful without being predatory.</p>
        </div>
      </div>
    `
  }

  if (pageId === 'contact') {
    return `
      <h1 style="font-size: 32px; font-weight: 900; color: #111827; margin-bottom: 15px;">Contact Us</h1>
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; max-w-xl; margin-bottom: 30px;">Have questions, bug reports, or tool suggestions? We read all user emails. Get in touch with our team directly.</p>
      
      <div style="padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; max-width: 500px;">
        <h3 style="font-size: 18px; font-weight: 800; color: #111827; margin-top: 0; margin-bottom: 10px;">Email Address</h3>
        <p style="color: #4b5563; font-size: 15px; margin: 0 0 15px 0;">Send an email directly to:</p>
        <a href="mailto:nkusikarera@hotmail.com" style="font-size: 18px; font-weight: 700; color: #e85d34; text-decoration: underline;">nkusikarera@hotmail.com</a>
      </div>
    `
  }

  if (pageId === 'privacy') {
    return `
      <h1 style="font-size: 32px; font-weight: 900; color: #111827; margin-bottom: 5px;">Privacy Policy</h1>
      <p style="color: #6b7280; font-size: 13px; margin-bottom: 30px;">Last updated: January 15, 2024</p>
      
      <div style="max-width: 800px; display: flex; flex-direction: column; gap: 25px; color: #374151; font-size: 14.5px; line-height: 1.6;">
        <section>
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 10px;">1. Introduction</h2>
          <p>This Privacy Policy explains how SmartDigitalTips handles information when you use our website and tools. By using SmartDigitalTips, you agree to the practices described in this policy.</p>
        </section>
        
        <section>
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 10px;">2. Information We Do Not Collect</h2>
          <p>Most of our tools process data entirely within your web browser using client-side JavaScript. This means:</p>
          <ul style="padding-left: 20px; margin-top: 8px;">
            <li>Images you compress or convert are not uploaded to our servers</li>
            <li>PDFs you merge or split are processed locally</li>
            <li>Text you analyze or convert never leaves your device</li>
            <li>We cannot access, view, or store your files or data</li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 10px;">3. Information We Collect</h2>
          <p>We may collect limited information to operate and improve our service:</p>
          <ul style="padding-left: 20px; margin-top: 8px;">
            <li><strong>Usage Analytics:</strong> Aggregated usage information about which tools and pages are used most frequently, helping us prioritize improvements.</li>
            <li><strong>Technical Information:</strong> Browser type, device type, and operating system (for optimizing compatibility).</li>
            <li><strong>Error Reports:</strong> Technical error information to help us fix bugs.</li>
            <li><strong>Contact Information:</strong> If you contact us, we use the information you provide, such as your name, email, and message, to respond to your inquiry.</li>
          </ul>
        </section>

        <section>
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 10px;">4. Cookies and Tracking</h2>
          <p>We use essential cookies to remember your preferences (such as dark mode setting). We also use Google Analytics to understand how users interact with our site. You can disable cookies in your browser settings at any time.</p>
        </section>

        <section style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-top: 0; margin-bottom: 10px;">5. Third-Party Advertising &amp; Cookies (Google AdSense)</h2>
          <p>We use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
          <ul style="padding-left: 20px; margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
            <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting the Google Ads Settings page.</li>
            <li>Third parties may place or read cookies on your browser, or use web beacons, IP addresses, device identifiers, and similar technologies as a result of ad serving on this website.</li>
          </ul>
        </section>
      </div>
    `
  }

  if (pageId === 'terms') {
    return `
      <h1 style="font-size: 32px; font-weight: 900; color: #111827; margin-bottom: 5px;">Terms of Service</h1>
      <p style="color: #6b7280; font-size: 13px; margin-bottom: 30px;">Last updated: January 15, 2024</p>
      
      <div style="max-width: 800px; display: flex; flex-direction: column; gap: 25px; color: #374151; font-size: 14.5px; line-height: 1.6;">
        <section>
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 10px;">1. Acceptance of Terms</h2>
          <p>By accessing and using SmartDigitalTips, you agree to these Terms and Conditions. If you do not agree with any part of these terms, you should stop using the website.</p>
        </section>
        
        <section>
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 10px;">2. Description of Service</h2>
          <p>SmartDigitalTips provides free online tools for image processing, PDF manipulation, text analysis, calculations, and conversions. The tools are provided for general use and may change over time.</p>
        </section>

        <section>
          <h2 style="font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 10px;">3. User Conduct</h2>
          <p>When using our tools, you agree not to:</p>
          <ul style="padding-left: 20px; margin-top: 8px;">
            <li>Use the tools for any illegal purpose or to violate any laws.</li>
            <li>Upload or process content that infringes on third-party intellectual property rights.</li>
            <li>Attempt to disrupt or compromise the security of the Website.</li>
            <li>Use automated systems or scraping code to access the tools without permission.</li>
          </ul>
        </section>
      </div>
    `
  }

  if (pageId === 'cookies') {
    return `
      <h1 style="font-size: 32px; font-weight: 900; color: #111827; margin-bottom: 5px;">Cookie Policy</h1>
      <p style="color: #6b7280; font-size: 13px; margin-bottom: 30px;">Last updated: January 15, 2024</p>
      <div style="max-width: 800px; color: #374151; font-size: 14.5px; line-height: 1.6;">
        <p>This Cookie Policy explains how SmartDigitalTips uses cookies and similar technologies. We use essential storage for user preferences (like your dark mode settings) and may use optional cookies from Google Analytics and Google AdSense to measure site traffic and deliver personalized advertisements. You can manage or revoke cookie consent in your browser settings or using the controls in our footer.</p>
      </div>
    `
  }

  if (pageId === 'disclaimer') {
    return `
      <h1 style="font-size: 32px; font-weight: 900; color: #111827; margin-bottom: 5px;">Disclaimer</h1>
      <p style="color: #6b7280; font-size: 13px; margin-bottom: 30px;">Last updated: January 15, 2024</p>
      <div style="max-width: 800px; color: #374151; font-size: 14.5px; line-height: 1.6; display: flex; flex-direction: column; gap: 20px;">
        <p>The calculations, metrics, conversions, and results generated by SmartDigitalTips tools are provided for educational and general informational purposes only. We do not warrant that any results are 100% accurate, complete, or suitable for any critical purpose.</p>
        <p>For legal, financial, architectural, academic, or medical decisions, please verify all calculations and details with a qualified professional. SmartDigitalTips, its developers, and operators are not liable for any losses or damages arising from reliance on our website utilities.</p>
      </div>
    `
  }

  return ''
}

// MAIN RUNNER
function runPrerender() {
  console.log('🏁 Starting SPA route pre-rendering...\n')
  const templatePath = join(process.cwd(), 'dist', 'index.html')
  if (!existsSync(templatePath)) {
    console.error('❌ Error: dist/index.html not found! Make sure you run vite build first.')
    process.exit(1)
  }

  const templateHtml = readFileSync(templatePath, 'utf8')
  let generatedCount = 0

  for (const locale of LOCALES) {
    console.log(`🌐 Prerendering routes for locale: [${locale.toUpperCase()}]`)

    // 1. Home Route
    const homePath = `/${locale}`
    const homeSeo = getPageSeo('home', locale, {
      title: 'Free Online Tools — Word Counter, PDF, Image & Developer Utilities',
      description: 'Use 50+ free browser tools. Private, instant, no signup required.',
    })
    const homeHtml = getHomeHtml(locale)
    const homeFileHtml = processHtmlTemplate(templateHtml, homePath, locale, homeSeo.title, homeSeo.description, homeHtml, platformKeywords)
    const homeDir = join(process.cwd(), 'dist', locale)
    mkdirSync(homeDir, { recursive: true })
    writeFileSync(join(homeDir, 'index.html'), homeFileHtml, 'utf8')
    generatedCount++

    // 2. Static Pages
    const staticPages = ['about', 'contact', 'privacy', 'cookies', 'terms', 'disclaimer']
    for (const pageId of staticPages) {
      const pagePath = `/${locale}/${pageId}`
      const pageSeo = getPageSeo(pageId, locale, {
        title: `${pageId.toUpperCase()} | SmartDigitalTips`,
        description: `Read our ${pageId} information page.`,
      })
      const pageHtml = getStaticPageHtml(pageId)
      const pageFileHtml = processHtmlTemplate(templateHtml, pagePath, locale, pageSeo.title, pageSeo.description, pageHtml, platformKeywords)
      const pageDir = join(process.cwd(), 'dist', locale, pageId)
      mkdirSync(pageDir, { recursive: true })
      writeFileSync(join(pageDir, 'index.html'), pageFileHtml, 'utf8')
      generatedCount++
    }

    // 3. Category Pages
    for (const cat of categories) {
      const catPath = `/${locale}/category/${cat.id}`
      const catLabel = getCategoryLabel(cat.id, locale, { label: cat.label, description: cat.description })
      const catSeo = getCategorySeo(cat.id, locale, {
        title: `${catLabel.label} — Free Online Tools | SmartDigitalTips`,
        description: catLabel.description,
      })
      const catHtml = getCategoryHtml(locale, cat.id)
      const catKeywords = getCategoryKeywords(cat)
      const catSchema = getCategoryStructuredData(locale, cat.id)
      const catFileHtml = processHtmlTemplate(templateHtml, catPath, locale, catSeo.title, catSeo.description, catHtml, catKeywords, catSchema)
      const catDir = join(process.cwd(), 'dist', locale, 'category', cat.id)
      mkdirSync(catDir, { recursive: true })
      writeFileSync(join(catDir, 'index.html'), catFileHtml, 'utf8')
      generatedCount++
    }

    // 4. Tool Pages
    for (const tool of tools) {
      const toolRoutePath = `/${locale}${tool.path}` // e.g. /en/tools/image-compressor
      const l = getToolLabel(tool.id, locale, { name: tool.name, description: tool.description })
      const toolSeo = getToolSeo(tool.id, locale, {
        title: `${l.name} — Free Online Tool | SmartDigitalTips`,
        description: l.description,
      })
      const toolHtml = getToolHtml(locale, tool.id)
      const toolKeywords = getToolKeywords(tool)
      const toolSchema = getToolStructuredData(locale, tool.id)
      const toolFileHtml = processHtmlTemplate(templateHtml, toolRoutePath, locale, toolSeo.title, toolSeo.description, toolHtml, toolKeywords, toolSchema)
      
      // tool.path is /tools/tool-name, so we join locale and tool.path (skipping leading slash of tool.path)
      const cleanToolPath = tool.path.replace(/^\//, '')
      const toolDir = join(process.cwd(), 'dist', locale, cleanToolPath)
      mkdirSync(toolDir, { recursive: true })
      writeFileSync(join(toolDir, 'index.html'), toolFileHtml, 'utf8')
      generatedCount++
    }

    // 5. Blog List Page
    const blogListPath = `/${locale}/blog`
    const blogListSeo = getPageSeo('blog', locale, {
      title: 'Digital Tips & Guides | SmartDigitalTips',
      description: 'Useful guides and articles on image optimization, PDF editing, and productivity.',
    })
    const blogListHtml = getBlogListHtml(locale)
    const blogListFileHtml = processHtmlTemplate(templateHtml, blogListPath, locale, blogListSeo.title, blogListSeo.description, blogListHtml, platformKeywords)
    const blogListDir = join(process.cwd(), 'dist', locale, 'blog')
    mkdirSync(blogListDir, { recursive: true })
    writeFileSync(join(blogListDir, 'index.html'), blogListFileHtml, 'utf8')
    generatedCount++

    // 6a. Locale 404 page — served at /<locale>/404 for the client router / crawlers
    const nf404Html = getNotFoundHtml(locale)
    let nf404FileHtml = processHtmlTemplate(
      templateHtml,
      `/${locale}/404`,
      locale,
      'Page Not Found (404) — SmartDigitalTips',
      'The page you were looking for could not be found. Browse our free online tools, categories, and guides.',
      nf404Html,
    )
    nf404FileHtml = forceNoindex(nf404FileHtml)
    const nf404Dir = join(process.cwd(), 'dist', locale, '404')
    mkdirSync(nf404Dir, { recursive: true })
    writeFileSync(join(nf404Dir, 'index.html'), nf404FileHtml, 'utf8')
    generatedCount++

    // 6. Blog Post Pages
    for (const post of blogPosts) {
      const postPath = `/${locale}/blog/${post.slug}`
      const postSeo = getBlogSeo(post.slug, locale, {
        title: `${post.title} | SmartDigitalTips`,
        description: post.excerpt,
      })
      const postHtml = getBlogPostHtml(locale, post.slug)
      const postKeywords = getBlogKeywords(post)
      const postSchema = getBlogStructuredData(locale, post.slug)
      const postFileHtml = processHtmlTemplate(templateHtml, postPath, locale, postSeo.title, postSeo.description, postHtml, postKeywords, postSchema)
      const postDir = join(process.cwd(), 'dist', locale, 'blog', post.slug)
      mkdirSync(postDir, { recursive: true })
      writeFileSync(join(postDir, 'index.html'), postFileHtml, 'utf8')
      generatedCount++
    }

  }

  // Root 404.html — Netlify serves this with an HTTP 404 status for any request
  // that matches neither a static file nor a redirect rule. Built from the
  // default locale and force-set to noindex.
  const rootNfHtml = getNotFoundHtml('en')
  let rootNfFileHtml = processHtmlTemplate(
    templateHtml,
    '/404',
    'en',
    'Page Not Found (404) — SmartDigitalTips',
    'The page you were looking for could not be found. Browse our free online tools, categories, and guides.',
    rootNfHtml,
  )
  rootNfFileHtml = forceNoindex(rootNfFileHtml)
  writeFileSync(join(process.cwd(), 'dist', '404.html'), rootNfFileHtml, 'utf8')
  generatedCount++
  console.log('   ✓ 404.html (noindex)')

  console.log(`\n🎉 Success! Pre-rendered ${generatedCount} static pages across all locales.`)
}

runPrerender()
