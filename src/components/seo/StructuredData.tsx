interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data]
  
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...schema,
            }),
          }}
        />
      ))}
    </>
  )
}

export function generateWebsiteSchema() {
  return {
    '@type': 'WebSite',
    name: 'SmartDigitalTips',
    alternateName: ['Smart Digital Tips', 'Free Online AI Tools'],
    url: 'https://smartdigitaltips.com',
    inLanguage: ['en', 'fr', 'rw', 'sw', 'ar', 'es', 'pt', 'zh'],
    description: 'Free online AI, SEO, developer, image, PDF, text, student, business, and conversion tools that run in your browser.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://smartdigitaltips.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    name: 'SmartDigitalTips',
    url: 'https://smartdigitaltips.com',
    logo: 'https://smartdigitaltips.com/logo.png',
    sameAs: [
      'https://twitter.com/smartdigitaltips',
      'https://facebook.com/smartdigitaltips',
      'https://linkedin.com/company/smartdigitaltips',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@smartdigitaltips.com',
      availableLanguage: ['English', 'French', 'Kinyarwanda', 'Swahili', 'Arabic', 'Spanish', 'Portuguese', 'Chinese'],
    },
  }
}

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

export function generateToolSchema(tool: {
  name: string
  description: string
  category: string
  path: string
  seoTitle?: string
  benefits?: string[]
}) {
  return {
    '@type': 'WebApplication',
    name: tool.name,
    headline: tool.seoTitle || tool.name,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    softwareApplicationCategory: tool.category,
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    url: `https://smartdigitaltips.com${tool.path}`,
    isAccessibleForFree: true,
    featureList: tool.benefits || [],
    creator: {
      '@type': 'Organization',
      name: 'SmartDigitalTips',
      url: 'https://smartdigitaltips.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  }
}

export function generateCollectionSchema(name: string, description: string, url: string, items: { name: string; url: string }[]) {
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

export function generateArticleSchema(post: {
  title: string
  excerpt: string
  date: string
  author: string
  slug: string
}) {
  return {
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SmartDigitalTips',
      logo: {
        '@type': 'ImageObject',
        url: 'https://smartdigitaltips.com/logo.png',
      },
    },
    mainEntityOfPage: `https://smartdigitaltips.com/blog/${post.slug}`,
  }
}
