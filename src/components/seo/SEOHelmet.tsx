import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import type { SEOMeta } from '@/types'
import {
  defaultLocale,
  getLocaleFromPath,
  localizePath,
  stripLocaleFromPath,
  supportedLocales,
  type SupportedLocale,
} from '@/lib/i18n'
import { ADSENSE_CLIENT_ID, LOCALE_META, SITE_URL } from '@/lib/locale-config'

interface SEOHelmetProps {
  meta: SEOMeta
}

const DEFAULT_OG_IMAGE = '/logo.png'

/**
 * SEOHelmet — renders all per-page <head> tags via react-helmet-async.
 *
 * Key rules followed:
 * - canonical   → locale-prefixed URL  (e.g. /en/tools/word-counter)
 * - x-default   → BARE canonical path  (no locale prefix, per Google spec)
 * - og:url      → same as canonical
 * - hreflang    → one per supported locale
 * - All robots signals are explicit so Googlebot and Bingbot behave identically
 */
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
    robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    keywords,
    locale: metaLocale,
  } = meta

  // ── Locale detection ──────────────────────────────────────────────────────
  const location = useLocation()
  const detectedLocale = metaLocale || getLocaleFromPath(location.pathname)
  const locale: SupportedLocale = supportedLocales.includes(detectedLocale as SupportedLocale)
    ? (detectedLocale as SupportedLocale)
    : defaultLocale

  // ── URL construction ──────────────────────────────────────────────────────
  const cleanPath = stripLocaleFromPath(canonical || location.pathname)

  // locale-prefixed canonical  →  used in <link rel="canonical"> and og:url
  const localizedCanonicalPath = localizePath(cleanPath, locale)
  const fullCanonical = `${SITE_URL}${localizedCanonicalPath}`

  // bare canonical (no locale)  →  used for x-default per Google recommendation
  // e.g.  https://smartdigitaltips.com/tools/word-counter
  //       https://smartdigitaltips.com  (for root)
  const bareCanonical =
    !cleanPath || cleanPath === '/' ? SITE_URL : `${SITE_URL}${cleanPath}`

  // OG image
  const fullOgImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`

  // html lang/dir
  const htmlLang = LOCALE_META[locale].hreflang
  const htmlDir  = LOCALE_META[locale].dir

  const fullTitle = title.includes('SmartDigitalTips')
    ? title
    : `${title} | SmartDigitalTips`

  return (
    <Helmet>
      {/* ── Document language ───────────────────────────────────────── */}
      <html lang={htmlLang} dir={htmlDir} />

      {/* ── Title & core meta ───────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      <meta name="author"             content="SmartDigitalTips Editorial Team" />
      <meta name="publisher"          content="SmartDigitalTips" />
      <meta name="copyright"          content="SmartDigitalTips" />
      <meta name="language"           content={locale} />
      <meta name="application-name"   content="SmartDigitalTips" />
      <meta name="theme-color"        content="#0f172a" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      <meta name="rating"             content="general" />
      <meta name="distribution"       content="global" />
      <meta name="coverage"           content="Worldwide" />
      <meta name="geo.region"         content="GLOBAL" />
      <meta name="geo.placename"      content="Worldwide" />
      <meta name="ICBM"               content="0.0, 0.0" />
      <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />

      {/* ── Keywords (optional — kept for Bing) ────────────────────── */}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* ── Robots ──────────────────────────────────────────────────── */}
      <meta name="robots"    content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="bingbot"   content="index, follow, max-snippet:-1" />
      <meta name="slurp"     content="index, follow" />
      <meta name="yandex"    content="index, follow" />

      {/* ── Canonical ───────────────────────────────────────────────── */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* ── hreflang alternates (one per locale) ────────────────────── */}
      {supportedLocales.map((alternateLocale) => (
        <link
          key={alternateLocale}
          rel="alternate"
          hrefLang={LOCALE_META[alternateLocale].hreflang}
          href={`${SITE_URL}${localizePath(cleanPath, alternateLocale)}`}
        />
      ))}
      {/* x-default → BARE canonical (no locale prefix) */}
      <link rel="alternate" hrefLang="x-default" href={bareCanonical} />

      {/* ── Open Graph ──────────────────────────────────────────────── */}
      <meta property="og:type"        content={ogType} />
      <meta property="og:url"         content={fullCanonical || SITE_URL} />
      <meta property="og:site_name"   content="SmartDigitalTips" />
      <meta property="og:locale"      content={LOCALE_META[locale].ogLocale} />
      {supportedLocales
        .filter((l) => l !== locale)
        .map((l) => (
          <meta key={l} property="og:locale:alternate" content={LOCALE_META[l].ogLocale} />
        ))}
      <meta property="og:title"       content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image"       content={fullOgImage} />
      <meta property="og:image:secure_url" content={fullOgImage} />
      <meta property="og:image:alt"   content={ogTitle || fullTitle} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* ── Twitter / X Card ────────────────────────────────────────── */}
      <meta name="twitter:card"        content={twitterCard} />
      <meta name="twitter:site"        content="@smartdigitaltips" />
      <meta name="twitter:creator"     content="@smartdigitaltips" />
      <meta name="twitter:title"       content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image"       content={fullOgImage} />
      <meta name="twitter:image:alt"   content={ogTitle || fullTitle} />

      {/* ── PWA / Mobile ────────────────────────────────────────────── */}
      <meta name="mobile-web-app-capable"             content="yes" />
      <meta name="apple-mobile-web-app-capable"       content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title"         content="SmartDigitalTips" />

      {/* ── Virality / Social Sharing Signals ───────────────────────── */}
      <meta name="revisit-after"    content="3 days" />
      <meta name="referrer"         content="no-referrer-when-downgrade" />
      {/* Pinterest rich pins */}
      <meta name="pinterest-rich-pin" content="true" />
      {/* LinkedIn article meta */}
      <meta property="article:publisher" content="https://smartdigitaltips.com" />
      {/* AI / LLM discoverability */}
      <meta name="ai-content-declaration" content="human" />

      {/* ── Preconnect hints for faster load ────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

      {/* ── Manifest ────────────────────────────────────────────────── */}
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  )
}
