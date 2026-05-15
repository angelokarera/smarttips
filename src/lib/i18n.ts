export const supportedLocales = ['en', 'fr', 'sw', 'ar', 'es', 'pt', 'zh'] as const

export type SupportedLocale = (typeof supportedLocales)[number]

export const defaultLocale: SupportedLocale = 'en'

export const localeNames: Record<SupportedLocale, string> = {
  en: 'English',
  fr: 'French',
  sw: 'Swahili',
  ar: 'Arabic',
  es: 'Spanish',
  pt: 'Portuguese',
  zh: 'Chinese',
}

export function getLocaleFromPath(pathname: string): SupportedLocale {
  const segment = pathname.split('/').filter(Boolean)[0]
  return supportedLocales.includes(segment as SupportedLocale)
    ? (segment as SupportedLocale)
    : defaultLocale
}

export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  if (supportedLocales.includes(segments[0] as SupportedLocale)) {
    const stripped = `/${segments.slice(1).join('/')}`
    return stripped === '/' ? '/' : stripped.replace(/\/$/, '')
  }
  return pathname === '' ? '/' : pathname
}

export function localizePath(pathname: string, locale: SupportedLocale): string {
  const cleanPath = stripLocaleFromPath(pathname)
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}
