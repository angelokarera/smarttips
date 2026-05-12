// React SEO Component - Complete Implementation
import { Helmet } from 'react-helmet-async';
import { seoEngine } from '../../lib/seo-engine';
import { SUPPORTED_LOCALES, type Locale } from '../../lib/multilingual-seo';
import { schemaGenerator } from '../../lib/schema-generator';
import type { Tool } from '@/data/tools';

interface SEOProps {
  tool?: Tool;
  locale?: Locale;
  path?: string;
  type?: 'website' | 'article' | 'tool';
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

export function SEO({
  tool,
  locale = 'en',
  path = '/',
  type = 'website',
  customTitle,
  customDescription,
  customImage,
  article
}: SEOProps) {
  const baseUrl = 'https://smartdigitaltips.com';
  const currentUrl = `${baseUrl}/${locale}${path}`;
  
  // Generate metadata
  let title = customTitle || 'SmartDigitalTips - Free Online Tools';
  let description = customDescription || 'Free online tools for productivity, image editing, PDF conversion, text analysis, and more. No registration required.';
  let image = customImage || `${baseUrl}/logo.png`;
  let keywords: string[] = ['online tools', 'free tools', 'web tools', 'productivity'];
  let schemas: any[] = [];

  if (tool) {
    const metadata = seoEngine.generateToolMetadata(tool, locale, path);
    title = metadata.title;
    description = metadata.description;
    keywords = metadata.keywords;
    image = metadata.ogImage;
    schemas = metadata.structuredData;
  } else {
    // Add website and organization schemas for non-tool pages
    schemas = [
      schemaGenerator.generateWebsiteSchema(),
      schemaGenerator.generateOrganizationSchema()
    ];
  }

  const localeData = SUPPORTED_LOCALES[locale];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={localeData.code} dir={localeData.dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Hreflang Tags */}
      {Object.keys(SUPPORTED_LOCALES).map(loc => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={SUPPORTED_LOCALES[loc as Locale].code}
          href={`${baseUrl}/${loc}${path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en${path}`} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SmartDigitalTips" />
      <meta property="og:locale" content={localeData.code.replace('-', '_')} />
      
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@smartdigitaltips" />
      <meta name="twitter:creator" content="@smartdigitaltips" />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content="SmartDigitalTips" />
      <meta name="publisher" content="SmartDigitalTips" />
      <meta name="copyright" content="SmartDigitalTips" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="SmartDigitalTips" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Geo Targeting */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
    </Helmet>
  );
}

export default SEO;
