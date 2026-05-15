import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import type { SEOMeta } from '@/types'
import { defaultLocale, getLocaleFromPath, localizePath, stripLocaleFromPath, supportedLocales, type SupportedLocale } from '@/lib/i18n'
import { ADSENSE_CLIENT_ID, LOCALE_META, SITE_URL } from '@/lib/locale-config'

interface SEOHelmetProps {
  meta: SEOMeta
}

const DEFAULT_OG_IMAGE = '/logo.png'

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

  const htmlLang = LOCALE_META[locale].hreflang
  const htmlDir = LOCALE_META[locale].dir

  return (
    <Helmet>
      <html lang={htmlLang} dir={htmlDir} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="language" content={locale} />
      <meta name="author" content="SmartDigitalTips" />
      <meta name="application-name" content="SmartDigitalTips" />
      <meta name="theme-color" content="#0f172a" />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="robots" content={robots} />
      <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      {supportedLocales.map((alternateLocale) => (
        <link
          key={alternateLocale}
          rel="alternate"
          hrefLang={LOCALE_META[alternateLocale].hreflang}
          href={`${SITE_URL}${localizePath(cleanPath, alternateLocale)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${localizePath(cleanPath, 'en')}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={ogTitle || fullTitle} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical || SITE_URL} />
      <meta property="og:site_name" content="SmartDigitalTips" />
      <meta property="og:locale" content={LOCALE_META[locale].ogLocale} />
      {supportedLocales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => (
          <meta key={alternateLocale} property="og:locale:alternate" content={LOCALE_META[alternateLocale].ogLocale} />
        ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={ogTitle || fullTitle} />
    </Helmet>
  )
}
