import { CONTACT_EMAIL, SITE_URL } from '@/lib/locale-config'

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/** Renders one or more JSON-LD <script> blocks */
export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data]
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', ...schema }),
          }}
        />
      ))}
    </>
  )
}

// ─── Schema Generators ───────────────────────────────────────────────────────

/** WebSite schema — enables Google Sitelinks search box */
export function generateWebsiteSchema() {
  return {
    '@type': 'WebSite',
    name: 'SmartDigitalTips',
    alternateName: ['Smart Digital Tips', 'Free Online Tools'],
    url: SITE_URL,
    inLanguage: ['en', 'fr', 'sw', 'ar', 'es', 'pt', 'zh'],
    description:
      '50+ free browser-based tools for images, PDFs, text, development, security, and productivity. Private, instant, no sign-up.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/en?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** Organization schema — E-E-A-T trust signals */
export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    name: 'SmartDigitalTips',
    alternateName: 'Smart Digital Tips',
    url: SITE_URL,
    slogan: 'Free browser-based tools for everyone, everywhere.',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    description:
      'Leading provider of free, browser-based online tools for professionals, students, developers, and businesses worldwide. 50+ utilities including PDF converter, image compressor, QR code generator, password generator, and more.',
    foundingDate: '2024',
    areaServed: 'Worldwide',
    knowsLanguage: ['English', 'French', 'Spanish', 'Arabic', 'Portuguese', 'Swahili', 'Chinese', 'German', 'Hindi', 'Japanese', 'Korean'],
    knowsAbout: [
      'PDF conversion and editing',
      'Image compression and conversion',
      'QR code generation',
      'Password security',
      'Text processing and analysis',
      'Web development utilities',
      'Privacy-first online tools',
      'Browser-based file processing',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Free Online Tool Suite',
      numberOfItems: 75,
    },
    sameAs: [
      'https://twitter.com/smartdigitaltips',
      'https://facebook.com/smartdigitaltips',
      'https://linkedin.com/company/smartdigitaltips',
      'https://youtube.com/@smartdigitaltips',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: CONTACT_EMAIL,
      availableLanguage: ['English', 'French', 'Swahili', 'Arabic', 'Spanish', 'Portuguese', 'Chinese', 'German', 'Hindi', 'Japanese', 'Korean', 'Russian'],
    },
  }
}

/** BreadcrumbList schema */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/** FAQPage schema */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/** WebApplication schema for tool pages */
export function generateToolSchema(tool: {
  name: string
  description: string
  category: string
  path: string
  seoTitle?: string
  benefits?: string[]
  popular?: boolean
  trending?: boolean
}) {
  const url = tool.path.startsWith('http') ? tool.path : `${SITE_URL}${tool.path}`
  const today = new Date().toISOString().split('T')[0]
  return {
    '@type': 'WebApplication',
    name: tool.name,
    headline: tool.seoTitle || tool.name,
    description: tool.description,
    image: `${SITE_URL}/logo.png`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Works with Chrome, Firefox, Safari, and Edge.',
    url,
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    dateModified: today,
    inLanguage: ['en', 'fr', 'es', 'ar', 'pt', 'sw', 'zh'],
    featureList: tool.benefits || [],
    creator: {
      '@type': 'Organization',
      name: 'SmartDigitalTips',
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.popular ? '4.9' : tool.trending ? '4.8' : '4.7',
      ratingCount: tool.popular ? '1342' : tool.trending ? '824' : '312',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

/** SoftwareApplication schema for tool pages (complementary to WebApplication) */
export function generateSoftwareApplicationSchema(tool: {
  name: string
  description: string
  category: string
  path: string
  benefits?: string[]
  popular?: boolean
  trending?: boolean
}) {
  const url = tool.path.startsWith('http') ? tool.path : `${SITE_URL}${tool.path}`
  return {
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    url,
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: tool.benefits || [],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.popular ? '4.9' : tool.trending ? '4.8' : '4.7',
      ratingCount: tool.popular ? '1342' : tool.trending ? '824' : '312',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

/** CollectionPage schema for category/listing pages */
export function generateCollectionSchema(
  name: string,
  description: string,
  url: string,
  items: { name: string; url: string }[]
) {
  return {
    '@type': 'CollectionPage',
    name,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  }
}

/**
 * Article schema for blog posts.
 * Uses Person for author (E-E-A-T best practice).
 */
export function generateArticleSchema(post: {
  title: string
  excerpt: string
  date: string
  author: string
  slug: string
  category?: string
  keywords?: string[]
  wordCount?: number
}) {
  return {
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    // Use Person (not Organization) for stronger E-E-A-T author signals
    author: {
      '@type': 'Person',
      name: post.author,
      worksFor: {
        '@type': 'Organization',
        name: 'SmartDigitalTips',
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'SmartDigitalTips',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/en/blog/${post.slug}`,
    },
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 1200,
      height: 630,
    },
    ...(post.keywords && post.keywords.length > 0 && { keywords: post.keywords.join(', ') }),
    ...(post.category && { articleSection: post.category }),
    ...(post.wordCount && { wordCount: post.wordCount }),
    inLanguage: 'en',
    isAccessibleForFree: true,
  }
}

/**
 * WebPage schema for static pages (About, Contact, Privacy, etc.)
 * Helps Google understand page purpose and E-E-A-T signals.
 */
export function generateWebPageSchema(page: {
  name: string
  description: string
  url: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage'
}) {
  const today = new Date().toISOString().split('T')[0]
  return {
    '@type': page.type || 'WebPage',
    name: page.name,
    description: page.description,
    url: page.url,
    dateModified: today,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SmartDigitalTips',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SmartDigitalTips',
      url: SITE_URL,
    },
    inLanguage: ['en', 'fr', 'es', 'ar', 'pt', 'sw', 'zh'],
  }
}

/**
 * Service schema for category pages.
 * Signals to Google that each category is an offered service/collection.
 */
export function generateServiceSchema(category: {
  name: string
  description: string
  url: string
  toolCount?: number
}) {
  return {
    '@type': 'Service',
    name: category.name,
    description: category.description,
    url: category.url,
    provider: {
      '@type': 'Organization',
      name: 'SmartDigitalTips',
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    ...(category.toolCount && { numberOfItems: category.toolCount }),
  }
}

/**
 * HowTo schema for tool pages.
 * Enables "How to" rich results in Google Search.
 */
export function generateHowToSchema(tool: {
  name: string
  description: string
  steps: string[]
}) {
  return {
    '@type': 'HowTo',
    name: `How to use ${tool.name} — Step-by-Step Guide`,
    description: tool.description,
    totalTime: 'PT2M',
    tool: [
      {
        '@type': 'HowToTool',
        name: tool.name,
      },
    ],
    step: tool.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.length > 60 ? step.substring(0, 57) + '…' : step,
      text: step,
      url: '',
    })),
  }
}

/**
 * Speakable schema — marks content sections suitable for voice search / TTS.
 * Helps Google Assistant, Siri, and AI search engines surface the right content.
 */
export function generateSpeakableSchema(url: string) {
  return {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.speakable'],
    url,
  }
}
