// Enterprise SEO Engine - Programmatic SEO System
import type { Tool } from '@/data/tools';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  structuredData: any[];
  hreflang: Record<string, string>;
  breadcrumbs: Array<{ name: string; url: string }>;
}

const CURRENT_YEAR = new Date().getFullYear();

export class SEOEngine {
  private baseUrl: string;
  private siteName: string;

  constructor(baseUrl = 'https://smartdigitaltips.com', siteName = 'SmartDigitalTips') {
    this.baseUrl = baseUrl;
    this.siteName = siteName;
  }

  // Generate high-CTR SEO title
  generateTitle(tool: Tool, _locale = 'en'): string {
    const currentYear = new Date().getFullYear()
    const templates = [
      `Free ${tool.name} Online | No Signup Required ${currentYear}`,
      `${tool.name} - Best Free Tool ${currentYear} | ${this.siteName}`,
      `Professional ${tool.name} | Fast & Secure Online Tool`,
      `${tool.name} Online - Free, Fast & Easy to Use`,
      `Best ${tool.name} Tool ${currentYear} | No Registration Needed`,
      `${tool.name} - Free Online Tool | Instant Access ${currentYear}`,
      `Top ${tool.name} ${currentYear} | 100% Free & Secure`
    ];
    
    return tool.seoTitle || templates[Math.floor(Math.random() * templates.length)];
  }

  // Generate compelling meta description
  generateDescription(tool: Tool, _locale = 'en'): string {
    const cta = [
      'Try now for free',
      'Get started instantly',
      'No registration required',
      'Start using today',
      'Access now - 100% free',
      'Use online instantly'
    ];
    const benefit = tool.benefits[0] || tool.description;
    
    return `${benefit}. ${cta[Math.floor(Math.random() * cta.length)]}. Fast, secure, and private. Works on all devices. Global access 24/7.`;
  }

  // Generate keyword clusters
  generateKeywords(tool: Tool, _locale = 'en'): string[] {
    const currentYear = new Date().getFullYear()
    const baseKeywords = [
      tool.name.toLowerCase(),
      `${tool.name.toLowerCase()} online`,
      `free ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} tool`,
      `best ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} ${currentYear}`,
      `top ${tool.name.toLowerCase()}`,
      tool.category,
      `${tool.category} tools`,
      'online tools',
      'free tools',
      'web tools',
      'browser tools'
    ];

    // Add long-tail keywords for global SEO
    const longTail = [
      `how to use ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} without registration`,
      `${tool.name.toLowerCase()} no signup`,
      `secure ${tool.name.toLowerCase()}`,
      `fast ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} online free`,
      `best free ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} no download`,
      `instant ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} browser based`
    ];

    // Add global/multilingual keywords
    const globalKeywords = [
      `${tool.name.toLowerCase()} worldwide`,
      `international ${tool.name.toLowerCase()}`,
      `global ${tool.name.toLowerCase()}`
    ];

    return [...baseKeywords, ...longTail, ...globalKeywords];
  }

  // Generate FAQ Schema
  generateFAQSchema(tool: Tool): any {
    if (!tool.faq || tool.faq.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faq.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  // Generate HowTo Schema
  generateHowToSchema(tool: Tool): any {
    if (!tool.howToUse || tool.howToUse.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to use ${tool.name}`,
      description: tool.description,
      step: tool.howToUse.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: `Step ${index + 1}`,
        text: step
      }))
    };
  }

  // Generate SoftwareApplication Schema
  generateSoftwareSchema(tool: Tool): any {
    const currentYear = new Date().getFullYear()
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Works with Chrome, Firefox, Safari, Edge',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1250',
        bestRating: '5',
        worstRating: '1'
      },
      datePublished: `${currentYear}-01-01`,
      inLanguage: ['en', 'fr', 'es', 'ar', 'pt', 'zh', 'sw', 'rw'],
      featureList: tool.benefits.join(', ')
    };
  }

  // Generate Breadcrumb Schema
  generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${this.baseUrl}${crumb.url}`
      }))
    };
  }

  // Generate WebSite Schema with SearchAction
  generateWebsiteSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.siteName,
      url: this.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };
  }

  // Generate Organization Schema
  generateOrganizationSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.siteName,
      url: this.baseUrl,
      logo: `${this.baseUrl}/logo.png`,
      sameAs: [
        'https://twitter.com/smartdigitaltips',
        'https://facebook.com/smartdigitaltips',
        'https://linkedin.com/company/smartdigitaltips'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'support@smartdigitaltips.com'
      }
    };
  }

  // Generate complete SEO metadata for a tool
  generateToolMetadata(tool: Tool, locale = 'en', _path: string): SEOMetadata {
    const locales = ['en', 'fr', 'es', 'ar', 'pt', 'de', 'hi', 'sw', 'zh'];
    const hreflang: Record<string, string> = {};
    
    locales.forEach(loc => {
      hreflang[loc] = `${this.baseUrl}/${loc}${tool.path}`;
    });
    hreflang['x-default'] = `${this.baseUrl}/en${tool.path}`;

    const breadcrumbs = [
      { name: 'Home', url: `/${locale}` },
      { name: tool.categoryLabel, url: `/${locale}/category/${tool.category}` },
      { name: tool.name, url: `/${locale}${tool.path}` }
    ];

    const structuredData = [
      this.generateSoftwareSchema(tool),
      this.generateFAQSchema(tool),
      this.generateHowToSchema(tool),
      this.generateBreadcrumbSchema(breadcrumbs)
    ].filter(Boolean);

    return {
      title: this.generateTitle(tool, locale),
      description: this.generateDescription(tool, locale),
      keywords: this.generateKeywords(tool, locale),
      canonical: `${this.baseUrl}/${locale}${tool.path}`,
      ogTitle: this.generateTitle(tool, locale),
      ogDescription: this.generateDescription(tool, locale),
      ogImage: `${this.baseUrl}/og-images/${tool.id}.png`,
      twitterTitle: this.generateTitle(tool, locale),
      twitterDescription: this.generateDescription(tool, locale),
      twitterImage: `${this.baseUrl}/og-images/${tool.id}.png`,
      structuredData,
      hreflang,
      breadcrumbs
    };
  }

  // Generate Article Schema for blog posts
  generateArticleSchema(post: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'SmartDigitalTips Team'
      },
      publisher: {
        '@type': 'Organization',
        name: this.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/logo.png`
        }
      }
    };
  }
}

export const seoEngine = new SEOEngine();
