// Multilingual SEO — uses locale-config as single source of truth
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  SITE_URL,
  type AppLocale,
} from '@/lib/locale-config'

export const SUPPORTED_LOCALES = Object.fromEntries(
  LOCALES.map((code) => [
    code,
    {
      name: LOCALE_META[code].name,
      dir: LOCALE_META[code].dir,
      code: LOCALE_META[code].hreflang,
    },
  ])
) as Record<AppLocale, { name: string; dir: 'ltr' | 'rtl'; code: string }>

export type Locale = AppLocale

export const COUNTRY_TARGETING: Record<AppLocale, string[]> = {
  en: ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA'],
  fr: ['FR', 'CA', 'BE', 'CH', 'LU', 'MC'],
  es: ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE'],
  ar: ['SA', 'AE', 'EG', 'MA', 'DZ', 'IQ'],
  pt: ['BR', 'PT', 'AO', 'MZ'],
  sw: ['KE', 'TZ', 'UG', 'RW'],
  zh: ['CN', 'TW', 'HK', 'SG'],
}

export const SEO_TRANSLATIONS: Record<
  'free' | 'online' | 'tool',
  Record<AppLocale, string>
> = {
  free: {
    en: 'Free',
    fr: 'Gratuit',
    es: 'Gratis',
    ar: 'مجاني',
    pt: 'Grátis',
    sw: 'Bure',
    zh: '免费',
  },
  online: {
    en: 'Online',
    fr: 'En ligne',
    es: 'En línea',
    ar: 'عبر الإنترنت',
    pt: 'Online',
    sw: 'Mtandaoni',
    zh: '在线',
  },
  tool: {
    en: 'Tool',
    fr: 'Outil',
    es: 'Herramienta',
    ar: 'أداة',
    pt: 'Ferramenta',
    sw: 'Zana',
    zh: '工具',
  },
}

export function generateHreflangTags(basePath: string, baseUrl = SITE_URL): string {
  const tags = LOCALES.map(
    (locale) =>
      `<link rel="alternate" hreflang="${LOCALE_META[locale].hreflang}" href="${baseUrl}/${locale}${basePath}" />`
  )
  tags.push(
    `<link rel="alternate" hreflang="x-default" href="${baseUrl}/${DEFAULT_LOCALE}${basePath}" />`
  )
  return tags.join('\n')
}

export function getLocalizedTitle(toolName: string, locale: Locale): string {
  const free = SEO_TRANSLATIONS.free[locale]
  const online = SEO_TRANSLATIONS.online[locale]
  const tool = SEO_TRANSLATIONS.tool[locale]
  return `${free} ${toolName} ${online} | ${tool}`
}

/** Map BCP-47 tags to a supported site locale (best match). */
function matchBrowserTag(tag: string): Locale | null {
  const normalized = tag.trim().toLowerCase()
  if (!normalized) return null

  const primary = normalized.split('-')[0]
  if (LOCALES.includes(primary as AppLocale)) return primary as AppLocale

  if (normalized.startsWith('zh')) return 'zh'
  if (normalized.startsWith('pt')) return 'pt'
  if (normalized.startsWith('ar')) return 'ar'
  if (normalized.startsWith('sw') || normalized === 'kiswahili') return 'sw'
  if (normalized === 'kin' || normalized.startsWith('rw')) return 'fr'

  return null
}

/** Prefer the visitor's browser language when we support it; otherwise English. */
export function detectUserLocale(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE

  const candidates = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean)

  for (const tag of candidates) {
    const matched = matchBrowserTag(tag)
    if (matched) return matched
  }

  return DEFAULT_LOCALE
}

export function getGeoTargetingMeta(locale: Locale): string {
  return (COUNTRY_TARGETING[locale] || []).join(', ')
}
