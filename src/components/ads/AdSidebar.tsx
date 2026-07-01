import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT_ID } from '@/lib/locale-config'

const CONSENT_KEY = 'sdt_cookie_consent'

export default function AdSidebar() {
  const pushed = useRef(false)
  const hasConsent =
    typeof window !== 'undefined' &&
    localStorage.getItem(CONSENT_KEY) === 'accepted'

  useEffect(() => {
    if (!hasConsent) return
    if (pushed.current) return
    if (typeof window === 'undefined') return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // Fail silently
    }
  }, [hasConsent])

  if (!hasConsent) return null

  return (
    <div
      className="ad-sidebar-wrapper hidden lg:flex flex-col items-center gap-2"
      aria-label="Advertisement"
      style={{ position: 'sticky', top: '80px' }}
    >
      <span
        style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#9ca3af',
          userSelect: 'none',
        }}
      >
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '300px', height: '250px' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot="6092595232"
        data-ad-format="rectangle"
      />
    </div>
  )
}
