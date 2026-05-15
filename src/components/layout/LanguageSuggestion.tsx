import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Globe, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LOCALE_META, type AppLocale } from '@/lib/locale-config'
import { getLocaleFromPath, localizePath, stripLocaleFromPath } from '@/lib/i18n'
import { detectUserLocale } from '@/lib/multilingual-seo'
import { LOCALE_SUGGESTION_COPY } from '@/lib/locale-suggestion-copy'

const DISMISS_KEY = 'smartdigitaltips-locale-suggestion-dismiss'

function isDismissed(suggested: AppLocale, current: AppLocale): boolean {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(DISMISS_KEY)
  return stored === `${suggested}:${current}` || stored === 'all'
}

function dismissSuggestion(suggested: AppLocale, current: AppLocale) {
  localStorage.setItem(DISMISS_KEY, `${suggested}:${current}`)
}

export function LanguageSuggestion() {
  const location = useLocation()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const currentLocale = getLocaleFromPath(location.pathname)
  const cleanPath = stripLocaleFromPath(location.pathname)
  const suggestedLocale = detectUserLocale()

  useEffect(() => {
    if (suggestedLocale === currentLocale) {
      setVisible(false)
      return
    }
    setVisible(!isDismissed(suggestedLocale, currentLocale))
  }, [suggestedLocale, currentLocale, location.pathname])

  if (!visible || suggestedLocale === currentLocale) {
    return null
  }

  const copy = LOCALE_SUGGESTION_COPY[suggestedLocale]
  const suggestedName = LOCALE_META[suggestedLocale].name
  const currentName = LOCALE_META[currentLocale].name

  const handleSwitch = () => {
    dismissSuggestion(suggestedLocale, currentLocale)
    navigate(localizePath(cleanPath, suggestedLocale))
    setVisible(false)
  }

  const handleStay = () => {
    dismissSuggestion(suggestedLocale, currentLocale)
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label={copy.title}
      className="border-b border-primary/20 bg-primary/5"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 sm:items-center">
          <Globe className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" aria-hidden />
          <p className="text-sm leading-relaxed text-foreground">{copy.message(suggestedName)}</p>
        </div>
        <div
          className="flex shrink-0 items-center gap-2 sm:pl-4"
        >
          <Button size="sm" className="rounded-lg" onClick={handleSwitch}>
            {copy.switch(suggestedName)}
          </Button>
          <Button size="sm" variant="outline" className="rounded-lg" onClick={handleStay}>
            {copy.stay(currentName)}
          </Button>
          <button
            type="button"
            onClick={handleStay}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Dismiss language suggestion"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
