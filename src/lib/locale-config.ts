/** Single source of truth for supported locales (routes, hreflang, sitemap). */
export const SITE_URL = 'https://smartdigitaltips.com'

/** Primary contact email (support, privacy, legal pages). */
export const CONTACT_EMAIL = 'nkusikarera@hotmail.com'

/** Google AdSense — used in ads.txt, index.html, and ad units */
export const ADSENSE_CLIENT_ID = 'ca-pub-3519891152775398'
/** ads.txt publisher ID (no ca- prefix) */
export const ADSENSE_PUBLISHER_ID = 'pub-3519891152775398'

export const LOCALES = ['en', 'fr', 'sw', 'ar', 'es', 'pt', 'zh', 'de', 'hi', 'ja', 'ko', 'rw'] as const
export type AppLocale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: AppLocale = 'en'

export const LOCALE_META: Record<
  AppLocale,
  { name: string; hreflang: string; ogLocale: string; dir: 'ltr' | 'rtl' }
> = {
  en: { name: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr' },
  fr: { name: 'French', hreflang: 'fr', ogLocale: 'fr_FR', dir: 'ltr' },
  sw: { name: 'Swahili', hreflang: 'sw', ogLocale: 'sw_KE', dir: 'ltr' },
  ar: { name: 'Arabic', hreflang: 'ar', ogLocale: 'ar_SA', dir: 'rtl' },
  es: { name: 'Spanish', hreflang: 'es', ogLocale: 'es_ES', dir: 'ltr' },
  pt: { name: 'Portuguese', hreflang: 'pt', ogLocale: 'pt_BR', dir: 'ltr' },
  zh: { name: 'Chinese', hreflang: 'zh', ogLocale: 'zh_CN', dir: 'ltr' },
  de: { name: 'German', hreflang: 'de', ogLocale: 'de_DE', dir: 'ltr' },
  hi: { name: 'Hindi', hreflang: 'hi', ogLocale: 'hi_IN', dir: 'ltr' },
  ja: { name: 'Japanese', hreflang: 'ja', ogLocale: 'ja_JP', dir: 'ltr' },
  ko: { name: 'Korean', hreflang: 'ko', ogLocale: 'ko_KR', dir: 'ltr' },
  rw: { name: 'Kinyarwanda', hreflang: 'rw', ogLocale: 'rw_RW', dir: 'ltr' },
}

export function isAppLocale(value: string): value is AppLocale {
  return (LOCALES as readonly string[]).includes(value)
}
