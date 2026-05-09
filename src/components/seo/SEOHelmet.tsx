import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import type { SEOMeta } from '@/types'
import { defaultLocale, getLocaleFromPath, localizePath, stripLocaleFromPath, supportedLocales, type SupportedLocale } from '@/lib/i18n'

interface SEOHelmetProps {
  meta: SEOMeta
}

const SITE_URL = 'https://smartdigitaltips.com'
const DEFAULT_OG_IMAGE = '/logo.png'
const LOCALE_OG_MAP: Record<string, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  rw: 'rw_RW',
  sw: 'sw_KE',
  ar: 'ar_AR',
  es: 'es_ES',
  pt: 'pt_PT',
  zh: 'zh_CN',
}

export function SEOHelmet({ meta }: SEOHelmetProps) {
  const {
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    robots = 'index, follow',
    keywords,
  } = meta

  const fullTitle = title.includes('SmartDigitalTips') ? title : `${title} | SmartDigitalTips`
  const location = useLocation()
  const detectedLocale = meta.locale || getLocaleFromPath(location.pathname)
  const locale: SupportedLocale = supportedLocales.includes(detectedLocale as SupportedLocale)
    ? (detectedLocale as SupportedLocale)
    : defaultLocale
  const cleanPath = stripLocaleFromPath(canonical || location.pathname)
  const path = localizePath(cleanPath, locale)
  const fullCanonical = `${SITE_URL}${path}`
  const fullOgImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : `${SITE_URL}${DEFAULT_OG_IMAGE}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="language" content={locale} />
      <meta name="author" content="SmartDigitalTips" />
      <meta name="application-name" content="SmartDigitalTips" />
      <meta name="theme-color" content="#0f172a" />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="robots" content={robots} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      {supportedLocales.map((alternateLocale) => (
        <link
          key={alternateLocale}
          rel="alternate"
          hrefLang={alternateLocale}
          href={`${SITE_URL}${localizePath(cleanPath, alternateLocale)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${localizePath(cleanPath, 'en')}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical || SITE_URL} />
      <meta property="og:site_name" content="SmartDigitalTips" />
      <meta property="og:locale" content={LOCALE_OG_MAP[locale]} />
      {supportedLocales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => (
          <meta key={alternateLocale} property="og:locale:alternate" content={LOCALE_OG_MAP[alternateLocale]} />
        ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={fullOgImage} />
    </Helmet>
  )
}
