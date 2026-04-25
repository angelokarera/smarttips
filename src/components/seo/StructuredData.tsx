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
    url: 'https://smartdigitaltips.com',
    description: 'Free online tools for images, PDFs, text, students, business, and conversions.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://smartdigitaltips.com/search?q={search_term_string}',
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
      'https://twitter.com/smartytips',
      'https://facebook.com/smartytips',
      'https://linkedin.com/company/smartytips',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@smartdigitaltips.com',
      availableLanguage: ['English'],
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
}) {
  return {
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    url: `https://smartdigitaltips.com${tool.path}`,
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
