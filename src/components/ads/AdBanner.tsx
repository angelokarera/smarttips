/**
 * AdBanner — Full-width leaderboard banner
 * SidebarAd — 300×250 rectangle for tool page sidebars
 *
 * Both are consent-gated (GDPR / Google policy compliant).
 * Ads only render after the user accepts the cookie banner.
 */
import { useEffect, useRef, useState } from 'react'
import { ADSENSE_CLIENT_ID } from '@/lib/locale-config'

const CONSENT_KEY = 'sdt_cookie_consent'

type AdSenseWindow = Window & { adsbygoogle?: unknown[] }

function useConsent() {
  const [hasConsent, setHasConsent] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem(CONSENT_KEY) === 'accepted'
  )

  useEffect(() => {
    const handler = () =>
      setHasConsent(localStorage.getItem(CONSENT_KEY) === 'accepted')
    window.addEventListener('storage', handler)
    // Also poll once in case the banner fires a custom event
    window.addEventListener('sdt_consent_accepted', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('sdt_consent_accepted', handler)
    }
  }, [])

  return hasConsent
}

function useAdPush(enabled: boolean) {
  const pushed = useRef(false)
  useEffect(() => {
    if (!enabled || pushed.current || typeof window === 'undefined') return
    try {
      const w = window as AdSenseWindow
      ;(w.adsbygoogle = w.adsbygoogle || []).push({})
      pushed.current = true
    } catch (e) {
      console.error('[AdBanner] AdSense error:', e)
    }
  }, [enabled])
}

/** Full-width responsive leaderboard banner */
export function AdBanner() {
  const hasConsent = useConsent()
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
  const hasConsent = useConsent()
  useAdPush(hasConsent)

  if (!hasConsent) return null

  return (
    <div className="p-4 rounded-xl border border-border/80 bg-card/65 glass-card shadow-xs text-center">
      <p className="text-[10px] font-mono tracking-widest text-muted-foreground/60 uppercase mb-2">
        Advertisement
      </p>
      <div className="min-h-[250px] flex items-center justify-center bg-secondary/35 rounded-lg overflow-hidden border border-dashed border-border/60">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '300px', height: '250px' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot="6092595232"
          data-ad-format="rectangle"
        />
      </div>
    </div>
  )
}
