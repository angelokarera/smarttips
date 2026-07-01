/**
 * AdBanner — Full-width banner ad (leaderboard / responsive)
 * SidebarAd — 300×250 rectangle for tool page sidebars
 *
 * Both components are consent-gated: they only render ad units
 * if the user has clicked "Accept All" in the cookie banner.
 */
import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT_ID } from '@/lib/locale-config'

const CONSENT_KEY = 'sdt_cookie_consent'

type AdSenseWindow = Window & {
  adsbygoogle?: unknown[]
}

function useAdPush(enabled: boolean) {
  const pushed = useRef(false)

  useEffect(() => {
    if (!enabled) return
    if (pushed.current) return
    if (typeof window === 'undefined') return

    try {
      const adWindow = window as AdSenseWindow
      ;(adWindow.adsbygoogle = adWindow.adsbygoogle || []).push({})
      pushed.current = true
    } catch (e) {
      console.error('[AdBanner] AdSense error:', e)
    }
  }, [enabled])
}

/** Full-width responsive leaderboard banner */
export function AdBanner() {
  const hasConsent =
    typeof window !== 'undefined' &&
    localStorage.getItem(CONSENT_KEY) === 'accepted'

  useAdPush(hasConsent)

  if (!hasConsent) return null

  return (
    <aside
      className="w-full py-6 my-6 border-y border-border/40 bg-secondary/20"
      aria-label="Advertisement"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Advertisement
        </p>
        <div className="flex min-h-[90px] justify-center">
          {/* AdSense banner ad unit */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot="6092595232"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </aside>
  )
}

/** 300×250 sidebar rectangle ad for tool pages */
export function SidebarAd() {
  const hasConsent =
    typeof window !== 'undefined' &&
    localStorage.getItem(CONSENT_KEY) === 'accepted'

  useAdPush(hasConsent)

  if (!hasConsent) return null

  return (
    <div className="p-4 rounded-xl border border-border/80 bg-card/65 glass-card shadow-xs text-center">
      <p className="text-[10px] font-mono tracking-widest text-muted-foreground/60 uppercase mb-2">
        Advertisement
      </p>
      <div className="min-h-[250px] flex items-center justify-center bg-secondary/35 rounded-lg overflow-hidden border border-dashed border-border/60">
        {/* AdSense sidebar ad unit */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '250px' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot="6092595232"
          data-ad-format="rectangle"
        />
      </div>
    </div>
  )
}
