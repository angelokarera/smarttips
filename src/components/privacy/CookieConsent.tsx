import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { useLocalizedPath } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'

const CONSENT_KEY = 'sdt_cookie_consent'

type ConsentChoice = 'accepted' | 'rejected'

type ConsentWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

export function CookieConsent() {
  const lp = useLocalizedPath()
  const { t } = useTranslations()
  const [choice, setChoice] = useState<ConsentChoice | null>(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(CONSENT_KEY) as ConsentChoice | null
  })

  useEffect(() => {
    if (!choice) return
    updateGoogleConsent(choice)
  }, [choice])

  const saveChoice = (nextChoice: ConsentChoice) => {
    localStorage.setItem(CONSENT_KEY, nextChoice)
    setChoice(nextChoice)
    if (nextChoice === 'accepted') {
      window.dispatchEvent(new Event('sdt_consent_accepted'))
    }
  }

  if (choice) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold">{t('cookie.title')}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t('cookie.body')}
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs">
            <Link to={lp('/privacy')} className="font-medium text-primary hover:underline">
              {t('cookie.privacy')}
            </Link>
            <Link to={lp('/cookies')} className="font-medium text-primary hover:underline">
              {t('cookie.cookiesLink')}
            </Link>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="rounded-xl" onClick={() => saveChoice('rejected')}>
            {t('cookie.reject')}
          </Button>
          <Button className="rounded-xl" onClick={() => saveChoice('accepted')}>
            {t('cookie.accept')}
          </Button>
        </div>
      </div>
    </div>
  )
}

function updateGoogleConsent(choice: ConsentChoice) {
  const consentWindow = window as ConsentWindow
  const value = choice === 'accepted' ? 'granted' : 'denied'

  consentWindow.gtag?.('consent', 'update', {
    ad_storage: value,
    analytics_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  })
}
