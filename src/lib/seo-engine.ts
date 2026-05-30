// Enterprise SEO Engine — Programmatic SEO for all tool pages
import type { Tool } from '@/data/tools'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/locale-config'
import type { JsonLd } from '@/lib/json-ld-types'

export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  structuredData: JsonLd[]
  hreflang: Record<string, string>
  breadcrumbs: Array<{ name: string; url: string }>
}

const LOCALES = ['en', 'fr', 'sw', 'ar', 'es', 'pt', 'zh'] as const

export class SEOEngine {
  private baseUrl: string
  private siteName: string

  constructor(baseUrl = SITE_URL, siteName = 'SmartDigitalTips') {
    this.baseUrl = baseUrl
    this.siteName = siteName
  }

  // ─── Title Generation ──────────────────────────────────────────────────────

  /**
   * Generate a high-CTR, intent-optimized title under 60 chars.
   * Format: "[Action] [Tool] Free Online | SmartDigitalTips"
   */
  generateTitle(tool: Tool): string {
    if (tool.seoTitle) return tool.seoTitle
    const name = tool.name
    // Action-first title improves CTR vs brand-first
    return `Free ${name} Online — No Signup | SmartDigitalTips`
  }

  // ─── Description Generation ────────────────────────────────────────────────

  /**
   * Generate a compelling 140–155 char meta description.
   * Includes primary benefit, trust signal, and implicit CTA.
   */
  generateDescription(tool: Tool): string {
    if (tool.seoDescription) return tool.seoDescription
    const benefit = tool.benefits?.[0] || tool.description
    return `${benefit}. Free, instant, and 100% private — runs in your browser. No account or software download required.`
  }

  // ─── Keyword Generation ────────────────────────────────────────────────────

  /**
   * Generate intent-clustered keywords.
   * Strategy: informational + navigational + transactional intent.
   * Avoids: year-based keywords (stale), keyword stuffing, duplicate phrases.
   */
  generateKeywords(tool: Tool): string[] {
    const name = tool.name.toLowerCase()
    const cat  = tool.category

    // Informational intent
    const informational = [
      `how to ${name}`,
      `what is ${name}`,
      `${name} guide`,
      `${name} tutorial`,
    ]

    // Navigational intent
    const navigational = [
      name,
      `${name} online`,
      `${name} tool`,
      `free ${name}`,
      `best ${name} online`,
      `${name} web app`,
    ]

    // Transactional / conversion intent
    const transactional = [
      `${name} free online`,
      `${name} no signup`,
      `${name} no registration`,
      `${name} no download`,
      `${name} browser`,
      `instant ${name}`,
      `secure ${name}`,
      `private ${name}`,
    ]

    // Category-level keywords
    const categorical = [
      `${cat} tools`,
      `free ${cat} tools`,
      `online ${cat} tool`,
    ]

    // Platform keywords
    const platform = [
      'free online tools',
      'browser tools',
      'no signup tools',
      'privacy tools',
      'online utilities',
    ]

    // Deduplicate and return
    const all = [...informational, ...navigational, ...transactional, ...categorical, ...platform]
    return [...new Set(all)]
  }

  // ─── Schema Generators ─────────────────────────────────────────────────────

  /** FAQPage schema from tool.faq data */
  generateFAQSchema(tool: Tool): JsonLd | null {
    if (!tool.faq || tool.faq.length === 0) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faq.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }
  }

  /**
   * HowTo schema from tool.howToUse steps.
   * Step names are derived from first clause of each instruction
   * rather than generic "Step N" — improves rich result display.
   */
  generateHowToSchema(tool: Tool): JsonLd | null {
    if (!tool.howToUse || tool.howToUse.length === 0) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to Use ${tool.name} — Step-by-Step`,
      description: tool.description,
      totalTime: 'PT2M',
      tool: [{ '@type': 'HowToTool', name: tool.name }],
      step: tool.howToUse.map((step, index) => {
        // Extract a short name from the first sentence / clause
        const shortName = step.split(/[.,;]/)[0].trim().substring(0, 60)
        return {
          '@type': 'HowToStep',
          position: index + 1,
          name: shortName || `Step ${index + 1}`,
          text: step,
        }
      }),
    }
  }

  /** WebApplication + SoftwareApplication schema for tool pages */
  generateSoftwareSchema(tool: Tool): JsonLd {
    const today = new Date().toISOString().split('T')[0]
    return {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Works with Chrome, Firefox, Safari, and Edge.',
      url: `${this.baseUrl}/en${tool.path}`,
      isAccessibleForFree: true,
      isFamilyFriendly: true,
      dateModified: today,
      inLanguage: ['en', 'fr', 'es', 'ar', 'pt', 'sw', 'zh'],
      featureList: tool.benefits?.join(', ') || '',
      creator: {
        '@type': 'Organization',
        name: this.siteName,
        url: this.baseUrl,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    }
  }

  /** BreadcrumbList schema */
  generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${this.baseUrl}${crumb.url}`,
      })),
    }
  }

  /** WebSite schema with SearchAction */
  generateWebsiteSchema(): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.siteName,
      url: this.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/en?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }
  }

  /** Organization schema with full E-E-A-T trust signals */
  generateOrganizationSchema(): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.siteName,
      alternateName: 'Smart Digital Tips',
      url: this.baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${this.baseUrl}/logo.png`,
        width: 512,
        height: 512,
      },
      foundingDate: '2024',
      areaServed: 'Worldwide',
      knowsLanguage: ['English', 'French', 'Spanish', 'Arabic', 'Portuguese', 'Swahili', 'Chinese'],
      sameAs: [
        'https://twitter.com/smartdigitaltips',
        'https://facebook.com/smartdigitaltips',
        'https://linkedin.com/company/smartdigitaltips',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: CONTACT_EMAIL,
        availableLanguage: ['English', 'French', 'Spanish', 'Arabic', 'Portuguese', 'Swahili', 'Chinese'],
      },
    }
  }

  /**
   * Generate complete SEO metadata for a tool page.
   *
   * hreflang['x-default'] → BARE path (no locale prefix) per Google spec.
   */
  generateToolMetadata(tool: Tool, locale = 'en'): SEOMetadata {
    const hreflang: Record<string, string> = {}

    LOCALES.forEach((loc) => {
      hreflang[loc] = `${this.baseUrl}/${loc}${tool.path}`
    })
    // x-default → bare canonical (no /en prefix)
    hreflang['x-default'] = `${this.baseUrl}${tool.path}`

    const breadcrumbs = [
      { name: 'Home',             url: `/${locale}` },
      { name: tool.categoryLabel, url: `/${locale}/category/${tool.category}` },
      { name: tool.name,          url: `/${locale}${tool.path}` },
    ]

    const structuredData = [
      this.generateSoftwareSchema(tool),
      this.generateFAQSchema(tool),
      this.generateHowToSchema(tool),
      this.generateBreadcrumbSchema(
        breadcrumbs.map((b) => ({ name: b.name, url: `${this.baseUrl}${b.url}` }))
      ),
    ].filter((item): item is JsonLd => item != null)

    const ogImage = `${this.baseUrl}/logo.png`

    return {
      title:              this.generateTitle(tool),
      description:        this.generateDescription(tool),
      keywords:           this.generateKeywords(tool),
      canonical:          `${this.baseUrl}/${locale}${tool.path}`,
      ogTitle:            this.generateTitle(tool),
      ogDescription:      this.generateDescription(tool),
      ogImage,
      twitterTitle:       this.generateTitle(tool),
      twitterDescription: this.generateDescription(tool),
      twitterImage:       ogImage,
      structuredData,
      hreflang,
      breadcrumbs,
    }
  }

  /**
   * Article schema for blog posts.
   * Author is typed as Person (not Organization) for stronger E-E-A-T.
   */
  generateArticleSchema(post: {
    title: string
    excerpt: string
    image?: string
    date: string
    updatedAt?: string
    author?: string
    category?: string
    keywords?: string[]
  }): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.image || `${this.baseUrl}/logo.png`,
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'SmartDigitalTips Editorial Team',
        worksFor: {
          '@type': 'Organization',
          name: this.siteName,
          url: this.baseUrl,
        },
      },
      publisher: {
        '@type': 'Organization',
        name: this.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/logo.png`,
          width: 512,
          height: 512,
        },
      },
      inLanguage: 'en',
      isAccessibleForFree: true,
      ...(post.keywords && { keywords: post.keywords.join(', ') }),
      ...(post.category && { articleSection: post.category }),
    }
  }
}

export const seoEngine = new SEOEngine()
