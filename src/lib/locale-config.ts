/** Single source of truth for supported locales (routes, hreflang, sitemap). */
export const SITE_URL = 'https://smartdigitaltips.com'

/** Google AdSense — used in ads.txt, index.html, and ad units */
export const ADSENSE_CLIENT_ID = 'ca-pub-3519891152775398'
/** ads.txt publisher ID (no ca- prefix) */
export const ADSENSE_PUBLISHER_ID = 'pub-3519891152775398'

export const LOCALES = ['en', 'fr', 'rw', 'sw', 'ar', 'es', 'pt', 'zh'] as const
export type AppLocale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: AppLocale = 'en'

export const LOCALE_META: Record<
  AppLocale,
  { name: string; hreflang: string; ogLocale: string; dir: 'ltr' | 'rtl' }
> = {
  en: { name: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr' },
  fr: { name: 'French', hreflang: 'fr', ogLocale: 'fr_FR', dir: 'ltr' },
  rw: { name: 'Kinyarwanda', hreflang: 'rw', ogLocale: 'rw_RW', dir: 'ltr' },
  sw: { name: 'Swahili', hreflang: 'sw', ogLocale: 'sw_KE', dir: 'ltr' },
  ar: { name: 'Arabic', hreflang: 'ar', ogLocale: 'ar_AR', dir: 'rtl' },
  es: { name: 'Spanish', hreflang: 'es', ogLocale: 'es_ES', dir: 'ltr' },
  pt: { name: 'Portuguese', hreflang: 'pt', ogLocale: 'pt_BR', dir: 'ltr' },
  zh: { name: 'Chinese', hreflang: 'zh', ogLocale: 'zh_CN', dir: 'ltr' },
}

export function isAppLocale(value: string): value is AppLocale {
  return (LOCALES as readonly string[]).includes(value)
}
