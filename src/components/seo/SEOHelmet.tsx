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

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`
const GA4_ID = 'G-4P8GW43EWX'

/**
 * SEOHelmet — renders ALL per-page <head> tags via react-helmet-async.
 *
 * 2026 requirements covered:
 * - Google AdSense: publisher meta + script + consent mode v2
 * - Google Analytics 4: inline gtag with consent defaults
 * - E-E-A-T: author, publisher, organization signals
 * - Core Web Vitals: preconnect, dns-prefetch
 * - International SEO: hreflang + x-default
 * - AI search: speakable, ai-content-declaration
 * - Social virality: OG, Twitter, Pinterest, LinkedIn
 * - Voice search: speakable CSS selectors
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

  const location = useLocation()
  const detectedLocale = metaLocale || getLocaleFromPath(location.pathname)
  const locale: SupportedLocale = supportedLocales.includes(detectedLocale as SupportedLocale)
    ? (detectedLocale as SupportedLocale)
    : defaultLocale

  const cleanPath = stripLocaleFromPath(canonical || location.pathname)
  const localizedCanonicalPath = localizePath(cleanPath, locale)
  const fullCanonical = `${SITE_URL}${localizedCanonicalPath}`
  const bareCanonical = !cleanPath || cleanPath === '/' ? SITE_URL : `${SITE_URL}${cleanPath}`

  const fullOgImage = ogImage
    ? ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`
    : DEFAULT_OG_IMAGE

  const htmlLang = LOCALE_META[locale].hreflang
  const htmlDir  = LOCALE_META[locale].dir

  const fullTitle = title.includes('SmartDigitalTips')
    ? title
    : `${title} | SmartDigitalTips`

  // GA4 + Consent Mode v2 inline script (GDPR compliant)
  const ga4Script = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  'ad_storage':'denied',
  'analytics_storage':'denied',
  'ad_user_data':'denied',
  'ad_personalization':'denied',
  'functionality_storage':'denied',
  'personalization_storage':'denied',
  'wait_for_update':500
});
gtag('js',new Date());
gtag('config','${GA4_ID}',{
  'send_page_view':true,
  'anonymize_ip':true,
  'allow_google_signals':false,
  'allow_ad_personalization_signals':false
});`

  return (
    <Helmet>
      {/* ── Document language ─────────────────────────────────────────── */}
      <html lang={htmlLang} dir={htmlDir} />

      {/* ── Title & core meta ─────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      <meta name="author"             content="SmartDigitalTips Editorial Team" />
      <meta name="publisher"          content="SmartDigitalTips" />
      <meta name="copyright"          content={`© ${new Date().getFullYear()} SmartDigitalTips`} />
      <meta name="language"           content={locale} />
      <meta name="application-name"   content="SmartDigitalTips" />
      <meta name="theme-color"        content="#0f172a" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      <meta name="rating"             content="general" />
      <meta name="distribution"       content="global" />
      <meta name="coverage"           content="Worldwide" />
      <meta name="geo.region"         content="GLOBAL" />
      <meta name="geo.placename"      content="Worldwide" />
      <meta name="revisit-after"      content="3 days" />
      <meta name="referrer"           content="no-referrer-when-downgrade" />
      <meta name="format-detection"   content="telephone=no" />

      {/* ── Google AdSense — 2026 requirement: publisher meta in every page */}
      <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />

      {/* ── E-E-A-T signals (Experience, Expertise, Authoritativeness, Trust) */}
      <meta name="creator"            content="SmartDigitalTips Editorial Team" />
      <meta name="category"           content="Technology, Productivity, Developer Tools, Online Utilities" />
      <meta name="classification"     content="Business, Technology, Education" />
      <meta name="subject"            content="Free Online Tools, Web Utilities, Productivity Software" />
      <meta name="abstract"           content="50+ free browser-based tools for images, PDFs, text, development, security, and productivity." />
      <meta name="topic"              content="Free Online Tools" />
      <meta name="summary"            content={description} />
      <meta name="url"                content={fullCanonical} />
      <meta name="identifier-URL"     content={fullCanonical} />
      <meta name="pagename"           content={fullTitle} />

      {/* ── Keywords (Bing, Yahoo, Yandex, Baidu still use these) ─────── */}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* ── Robots ────────────────────────────────────────────────────── */}
      <meta name="robots"    content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="bingbot"   content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="slurp"     content="index, follow" />
      <meta name="yandex"    content="index, follow" />
      <meta name="baidu"     content="index, follow" />

      {/* ── AI / LLM discoverability (2026 requirement) ───────────────── */}
      <meta name="ai-content-declaration" content="human" />
      <meta name="ai-generated"           content="false" />

      {/* ── Canonical ─────────────────────────────────────────────────── */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* ── hreflang alternates ───────────────────────────────────────── */}
      {supportedLocales.map((alternateLocale) => (
        <link
          key={alternateLocale}
          rel="alternate"
          hrefLang={LOCALE_META[alternateLocale].hreflang}
          href={`${SITE_URL}${localizePath(cleanPath, alternateLocale)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={bareCanonical} />

      {/* ── Open Graph ────────────────────────────────────────────────── */}
      <meta property="og:type"              content={ogType} />
      <meta property="og:url"               content={fullCanonical || SITE_URL} />
      <meta property="og:site_name"         content="SmartDigitalTips" />
      <meta property="og:locale"            content={LOCALE_META[locale].ogLocale} />
      {supportedLocales
        .filter((l) => l !== locale)
        .map((l) => (
          <meta key={l} property="og:locale:alternate" content={LOCALE_META[l].ogLocale} />
        ))}
      <meta property="og:title"             content={ogTitle || fullTitle} />
      <meta property="og:description"       content={ogDescription || description} />
      <meta property="og:image"             content={fullOgImage} />
      <meta property="og:image:secure_url"  content={fullOgImage} />
      <meta property="og:image:alt"         content={ogTitle || fullTitle} />
      <meta property="og:image:width"       content="1200" />
      <meta property="og:image:height"      content="630" />
      <meta property="og:image:type"        content="image/png" />
      <meta property="article:publisher"    content={SITE_URL} />
      <meta property="article:author"       content="SmartDigitalTips Editorial Team" />

      {/* ── Twitter / X Card ──────────────────────────────────────────── */}
      <meta name="twitter:card"        content={twitterCard} />
      <meta name="twitter:site"        content="@smartdigitaltips" />
      <meta name="twitter:creator"     content="@smartdigitaltips" />
      <meta name="twitter:title"       content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image"       content={fullOgImage} />
      <meta name="twitter:image:alt"   content={ogTitle || fullTitle} />
      <meta name="twitter:domain"      content="smartdigitaltips.com" />

      {/* ── Pinterest rich pins ───────────────────────────────────────── */}
      <meta name="pinterest-rich-pin"  content="true" />

      {/* ── PWA / Mobile ──────────────────────────────────────────────── */}
      <meta name="mobile-web-app-capable"                content="yes" />
      <meta name="apple-mobile-web-app-capable"          content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title"            content="SmartDigitalTips" />
      <meta name="msapplication-TileImage"               content="/logo.png" />

      {/* ── Performance: preconnect & dns-prefetch ────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />

      {/* ── Manifest ──────────────────────────────────────────────────── */}
      <link rel="manifest" href="/manifest.json" />

      {/* ── Google Analytics 4 — async load + Consent Mode v2 ────────── */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
      <script>{ga4Script}</script>

      {/* ── Google AdSense — async, non-render-blocking ───────────────── */}
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
      />
    </Helmet>
  )
}
