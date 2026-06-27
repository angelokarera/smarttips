import { LOCALES, LOCALE_META, type AppLocale } from '@/lib/locale-config'

export const supportedLocales = LOCALES
export type SupportedLocale = AppLocale

export const defaultLocale: SupportedLocale = 'en'

export const localeNames: Record<SupportedLocale, string> = Object.fromEntries(
  LOCALES.map(loc => [loc, LOCALE_META[loc].name])
) as Record<SupportedLocale, string>

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
