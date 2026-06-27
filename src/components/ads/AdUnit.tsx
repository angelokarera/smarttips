/**
 * AdUnit — Universal Google AdSense component
 * Publisher: ca-pub-3519891152775398 | Customer: 9066894802
 *
 * Only renders ads if the user has accepted cookie consent.
 * Prevents duplicate push() calls using a ref guard.
 */
import { useEffect, useRef } from 'react'

const CONSENT_KEY = 'sdt_cookie_consent'
const ADSENSE_CLIENT = 'ca-pub-3519891152775398'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

interface AdUnitProps {
  /** AdSense ad slot ID (from your AdSense account) */
  slot: string
  /** Ad format: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'fluid' */
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'fluid'
  /** Layout: used for in-article fluid ads */
  layout?: 'in-article'
  /** CSS style overrides for the wrapper div */
  style?: React.CSSProperties
  /** Additional CSS classes for the wrapper */
  className?: string
  /** Whether to enable full-width responsive */
  responsive?: boolean
}

export default function AdUnit({
  slot,
  format = 'auto',
  layout,
  style = {},
  className = '',
  responsive = true,
}: AdUnitProps) {
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
    } catch (e) {
      console.error('[AdUnit] AdSense push error:', e)
    }
  }, [hasConsent])

  // Don't render anything until consent is given
  if (!hasConsent) return null

  return (
    <div
      className={`ad-unit-wrapper ${className}`}
      style={{ textAlign: 'center', margin: '1.5rem 0', ...style }}
      aria-label="Advertisement"
    >
      <p
        style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#9ca3af',
          marginBottom: '4px',
          userSelect: 'none',
        }}
      >
        Advertisement
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(responsive ? { 'data-full-width-responsive': 'true' } : {})}
      />
    </div>
  )
}
