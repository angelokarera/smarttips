// SEO System - Main Export File
import { AISearchOptimizer } from './ai-search-optimizer';
import { linkingEngine } from './internal-linking';
import { schemaGenerator } from './schema-generator';
import { seoAnalytics } from './seo-analytics';
import { seoEngine } from './seo-engine';
import type { Tool } from '@/data/tools';

export { SEOEngine, seoEngine } from './seo-engine';
export { SUPPORTED_LOCALES, COUNTRY_TARGETING, SEO_TRANSLATIONS, generateHreflangTags, getLocalizedTitle, detectUserLocale, getGeoTargetingMeta, type Locale } from './multilingual-seo';
export { SchemaGenerator, schemaGenerator } from './schema-generator';
export { InternalLinkingEngine, linkingEngine, type InternalLink } from './internal-linking';
export { WebVitalsOptimizer, registerServiceWorker, generateServiceWorkerContent, type WebVitalsMetrics } from './web-vitals';
export { AISearchOptimizer, aiSearchOptimizer, type AISearchMetadata } from './ai-search-optimizer';
export { SitemapGenerator } from './sitemap-generator';
export { SEOAnalytics, seoAnalytics, type AnalyticsEvent } from './seo-analytics';
export { generateSEOMetadata } from './seo';

// Quick access functions
export const generateToolSEO = (tool: Tool, locale = 'en') => {
  return seoEngine.generateToolMetadata(tool, locale);
};

type ArticleSchemaInput = Parameters<typeof seoEngine.generateArticleSchema>[0]

export const generatePageSchema = (
  type: 'website' | 'article' | 'tool',
  data?: Tool | ArticleSchemaInput
) => {
  switch (type) {
    case 'website':
      return schemaGenerator.generateWebsiteSchema();
    case 'article':
      return data && 'excerpt' in data ? seoEngine.generateArticleSchema(data) : null;
    case 'tool':
      return data && 'path' in data ? seoEngine.generateSoftwareSchema(data) : null;
    default:
      return null;
  }
};

export const trackToolUsage = (toolName: string, action: string) => {
  seoAnalytics.trackToolUsage(toolName, action);
};

export const getRelatedTools = (tool: Tool, allTools: Tool[], limit = 6) => {
  return linkingEngine.getRelatedTools(tool, allTools, limit);
};

export const optimizeForAI = (tool: Tool) => {
  return {
    structuredAnswer: AISearchOptimizer.generateStructuredAnswer(tool),
    featuredSnippet: AISearchOptimizer.generateFeaturedSnippet(tool),
    peopleAlsoAsk: AISearchOptimizer.generatePeopleAlsoAsk(tool),
    aiOverview: AISearchOptimizer.generateAIOverview(tool)
  };
};
