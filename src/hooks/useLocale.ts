import { useLocation } from 'react-router'
import {
  defaultLocale,
  getLocaleFromPath,
  localizePath,
  stripLocaleFromPath,
  type SupportedLocale,
} from '@/lib/i18n'

export function useLocale(): SupportedLocale {
  const { pathname } = useLocation()
  return getLocaleFromPath(pathname)
}

export function useLocalizedPath() {
  const locale = useLocale()
  return (path: string) => localizePath(stripLocaleFromPath(path), locale)
}

export function useLocalePrefix(): string {
  const locale = useLocale()
  return locale === defaultLocale ? '' : `/${locale}`
}
