import { CONTACT_EMAIL } from '@/lib/locale-config'

// Global SEO Configuration for Maximum Visibility
export const GLOBAL_SEO_CONFIG = {
  // Site Information
  siteName: 'SmartDigitalTips',
  siteUrl: 'https://smartdigitaltips.com',
  defaultLocale: 'en',
  
  // Supported Languages for Global Reach (EXPANDED)
  supportedLocales: [
    { code: 'en', name: 'English', region: 'US', markets: ['USA', 'UK', 'Canada', 'Australia', 'India'] },
    { code: 'fr', name: 'French', region: 'FR', markets: ['France', 'Belgium', 'Switzerland', 'Canada'] },
    { code: 'sw', name: 'Swahili', region: 'KE', markets: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda'] },
    { code: 'ar', name: 'Arabic', region: 'SA', markets: ['Saudi Arabia', 'UAE', 'Egypt', 'Morocco'] },
    { code: 'es', name: 'Spanish', region: 'ES', markets: ['Spain', 'Mexico', 'Argentina', 'Colombia'] },
    { code: 'pt', name: 'Portuguese', region: 'BR', markets: ['Brazil', 'Portugal', 'Angola', 'Mozambique'] },
    { code: 'zh', name: 'Chinese', region: 'CN', markets: ['China', 'Taiwan', 'Hong Kong', 'Singapore'] },
  ],

  // Global Keywords for Maximum Reach (Grouped by User Search Intent)
  globalKeywords: [
    // ── Informational Intent (User seeking guides & knowledge) ────────────────
    'how to compress images offline',
    'how to merge pdfs safely',
    'how to format json in browser',
    'why use local browser tools',
    'guide to secure passwords free',
    'best way to convert pdf online',
    'how to generate qr code free',
    'what are browser based tools',
    'secure online file conversion',
    'privacy focused web tools',
    
    // ── Navigational Intent (User seeking the brand & hubs) ────────────────────
    'smartdigitaltips online tools',
    'smart digital tips free utilities',
    'smartdigitaltips developer tools',
    'smartdigitaltips pdf converter',
    'smartdigitaltips image compressor',
    
    // ── Transactional / Utility Intent (User seeking action) ─────────────────
    'free online tools no signup',
    'secure browser utilities no registration',
    'instant client-side web tools',
    'privacy-first image tools',
    'free pdf tools in browser',
    'local text converter tools',
    'cross-platform browser utilities',
    'global web tools',
    'best free online tools 2025',
    'top rated free tools',
    'professional online utilities',
    'business online tools free',
    'student web tools free',
    'developer browser tools',
    
    // ── Comparison Intent (User comparing options) ────────────────────────────
    'free vs paid online tools',
    'best alternative to smallpdf',
    'best alternative to ilovepdf',
    'free online tools comparison',
    'which online tool is best',
    
    // ── Problem-Solving Intent ────────────────────────────────────────────────
    'reduce pdf file size online free',
    'compress image without quality loss',
    'merge multiple pdf files free',
    'convert pdf to word accurate',
    'generate strong password online',
    'create qr code with logo free',
    'format json code online',
    'validate json syntax free',
    
    // ── Global & Regional Keywords ─────────────────────────────────────────────
    'worldwide free online tools',
    'international web utilities',
    'multilingual online tools',
    'tools for global users',
    'free online tools all countries',
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
        email: CONTACT_EMAIL,
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
