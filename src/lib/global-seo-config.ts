// Global SEO Configuration for Maximum Visibility
export const GLOBAL_SEO_CONFIG = {
  // Site Information
  siteName: 'SmartDigitalTips',
  siteUrl: 'https://smartdigitaltips.com',
  defaultLocale: 'en',
  
  // Supported Languages for Global Reach
  supportedLocales: [
    { code: 'en', name: 'English', region: 'US' },
    { code: 'fr', name: 'French', region: 'FR' },
    { code: 'sw', name: 'Swahili', region: 'KE' },
    { code: 'ar', name: 'Arabic', region: 'AR' },
    { code: 'es', name: 'Spanish', region: 'ES' },
    { code: 'pt', name: 'Portuguese', region: 'BR' },
    { code: 'zh', name: 'Chinese', region: 'CN' },
  ],

  // Global Keywords for Maximum Reach
  globalKeywords: [
    // Primary
    'free online tools',
    'web tools',
    'browser tools',
    'online utilities',
    
    // Year-specific
    'online tools 2025',
    'best free tools 2025',
    'top web tools 2025',
    
    // Feature-based
    'no signup tools',
    'no registration required',
    'instant online tools',
    'secure online tools',
    'privacy-focused tools',
    
    // Device-based
    'mobile online tools',
    'desktop web tools',
    'cross-platform tools',
    
    // Global reach
    'worldwide online tools',
    'international web tools',
    'multilingual tools',
    'global free tools',
  ],

  // High-Value Tool Categories for SEO
  priorityCategories: [
    'pdf-converter',
    'image-compressor',
    'qr-code-generator',
    'word-counter',
    'json-formatter',
    'password-generator',
    'unit-converter',
    'gpa-calculator',
  ],

  // Search Engine Specific Settings
  searchEngines: {
    google: {
      verificationCode: 'G-4P8GW43EWX',
      adsenseId: 'ca-pub-3519891152775398',
      searchConsole: true,
    },
    bing: {
      verificationCode: '',
      webmasterTools: true,
    },
    yandex: {
      verificationCode: '',
      webmaster: true,
    },
    baidu: {
      verificationCode: '',
      siteVerification: true,
    },
  },

  // Social Media for Global Reach
  socialMedia: {
    twitter: 'https://twitter.com/smartdigitaltips',
    facebook: 'https://facebook.com/smartdigitaltips',
    linkedin: 'https://linkedin.com/company/smartdigitaltips',
    instagram: 'https://instagram.com/smartdigitaltips',
    youtube: 'https://youtube.com/@smartdigitaltips',
  },

  // Structured Data Templates
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SmartDigitalTips',
      url: 'https://smartdigitaltips.com',
      logo: 'https://smartdigitaltips.com/logo.png',
      description: 'Free online tools for productivity, development, and everyday tasks',
      foundingDate: '2024',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'support@smartdigitaltips.com',
        availableLanguage: ['English', 'French', 'Spanish', 'Arabic', 'Portuguese', 'Chinese', 'Swahili'],
      },
    },
  },

  // SEO Best Practices
  seo: {
    titleMaxLength: 60,
    descriptionMaxLength: 160,
    keywordsMaxCount: 30,
    imageAltRequired: true,
    canonicalRequired: true,
    hreflangRequired: true,
    schemaRequired: true,
    openGraphRequired: true,
    twitterCardRequired: true,
  },

  // Performance & Core Web Vitals
  performance: {
    targetLCP: 2.5, // Largest Contentful Paint (seconds)
    targetFID: 100, // First Input Delay (milliseconds)
    targetCLS: 0.1, // Cumulative Layout Shift
    imageLazyLoad: true,
    preconnectDomains: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://pagead2.googlesyndication.com',
    ],
  },

  // Content Strategy for SEO
  contentStrategy: {
    minWordCount: 300,
    headingStructure: true,
    internalLinking: true,
    externalLinking: true,
    imageOptimization: true,
    mobileFirst: true,
    accessibilityCompliant: true,
  },

  // Robots & Crawling
  robots: {
    allowAll: true,
    allowAI: true, // Allow AI crawlers (GPTBot, Claude, etc.)
    crawlDelay: 0,
    sitemap: 'https://smartdigitaltips.com/sitemap.xml',
    disallowPaths: ['/api/', '/admin/', '/private/'],
  },

  // Analytics & Tracking
  analytics: {
    googleAnalytics: 'G-4P8GW43EWX',
    trackPageViews: true,
    trackEvents: true,
    trackConversions: true,
    privacyCompliant: true,
  },
}

// SEO Helper Functions
export function generateMetaTags(page: {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
}) {
  return {
    title: page.title.length > GLOBAL_SEO_CONFIG.seo.titleMaxLength 
      ? page.title.substring(0, GLOBAL_SEO_CONFIG.seo.titleMaxLength - 3) + '...'
      : page.title,
    description: page.description.length > GLOBAL_SEO_CONFIG.seo.descriptionMaxLength
      ? page.description.substring(0, GLOBAL_SEO_CONFIG.seo.descriptionMaxLength - 3) + '...'
      : page.description,
    keywords: page.keywords?.slice(0, GLOBAL_SEO_CONFIG.seo.keywordsMaxCount) || [],
    image: page.image || `${GLOBAL_SEO_CONFIG.siteUrl}/logo.png`,
    url: page.url || GLOBAL_SEO_CONFIG.siteUrl,
  }
}

export function generateHreflangTags(path: string) {
  return GLOBAL_SEO_CONFIG.supportedLocales.map(locale => ({
    rel: 'alternate',
    hreflang: locale.code,
    href: `${GLOBAL_SEO_CONFIG.siteUrl}/${locale.code}${path}`,
  }))
}

export function generateCanonicalUrl(path: string, locale = 'en') {
  return `${GLOBAL_SEO_CONFIG.siteUrl}/${locale}${path}`
}
