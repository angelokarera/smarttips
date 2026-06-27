import { useState, useEffect } from 'react'
import { Link } from 'react-router'

const CONSENT_KEY = 'sdt_cookie_consent'

export default function AdConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
      })
    }
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
    // Keep consent denied (already denied by default in index.html)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.97)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-start',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            lineHeight: '1.6',
            color: 'rgba(255,255,255,0.78)',
            flex: '1 1 300px',
          }}
        >
          We use cookies for analytics and personalised ads (Google AdSense, Publisher:{' '}
          <strong style={{ color: 'rgba(255,255,255,0.9)' }}>ca-pub-3519891152775398</strong>).
          By clicking "Accept", you agree to our{' '}
          <Link to="/privacy" style={{ color: '#e85d34', textDecoration: 'underline' }}>
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/cookies" style={{ color: '#e85d34', textDecoration: 'underline' }}>
            Cookie Policy
          </Link>
          .
        </p>

        <div style={{ display: 'flex', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
          {/* Decline button */}
          <button
            id="consent-decline"
            onClick={handleDecline}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.12)',
              textDecoration: 'none',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            }}
          >
            Decline
          </button>

          {/* Learn More link */}
          <Link
            to="/privacy"
            id="consent-learn-more"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,255,255,0.15)',
              textDecoration: 'none',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            Learn More
          </Link>

          {/* Accept button */}
          <button
            id="consent-accept"
            onClick={handleAccept}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              background: '#e85d34',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#c94d27')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#e85d34')}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
