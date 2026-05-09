import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

const CONSENT_KEY = 'smartdigitaltips-cookie-consent'

type ConsentChoice = 'accepted' | 'rejected'

type ConsentWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

export function CookieConsent() {
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
  }

  if (choice) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold">Cookies, ads, and analytics</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            We use essential storage for preferences and may use Google Analytics and Google AdSense cookies for measurement, ad delivery, fraud prevention, and personalized ads where allowed. You can accept or reject optional cookies.
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs">
            <Link to="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="font-medium text-primary hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="rounded-xl" onClick={() => saveChoice('rejected')}>
            Reject optional
          </Button>
          <Button className="rounded-xl" onClick={() => saveChoice('accepted')}>
            Accept all
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
