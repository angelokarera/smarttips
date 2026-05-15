import { useNavigate, useLocation } from 'react-router'
import { Globe } from 'lucide-react'
import { LOCALES, LOCALE_META, type AppLocale } from '@/lib/locale-config'
import { getLocaleFromPath, localizePath, stripLocaleFromPath } from '@/lib/i18n'

export function LanguageSwitcher() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentLocale = getLocaleFromPath(location.pathname)
  const cleanPath = stripLocaleFromPath(location.pathname)

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as AppLocale
    navigate(localizePath(cleanPath, newLocale))
  }

  return (
    <label className="relative flex items-center gap-1.5">
      <Globe className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
      <span className="sr-only">Language</span>
      <select
        value={currentLocale}
        onChange={handleLanguageChange}
        className="h-9 max-w-[7.5rem] rounded-lg border border-border bg-secondary/50 pl-2 pr-7 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer appearance-none"
        aria-label="Select language"
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_META[code].name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default LanguageSwitcher
