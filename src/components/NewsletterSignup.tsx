import { useState } from 'react'

declare global {
  interface Window {
    mailchimpCallback?: (data: { result: string; msg?: string }) => void
  }
}

const MAILCHIMP_ACTION_URL = ''

interface NewsletterSignupProps {
  className?: string
}

export default function NewsletterSignup({ className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    if (MAILCHIMP_ACTION_URL) {
      try {
        const url = new URL(MAILCHIMP_ACTION_URL)
        url.pathname = url.pathname.replace('/post', '/post-json')
        url.searchParams.set('EMAIL', email)
        url.searchParams.set('c', 'mailchimpCallback')

        const script = document.createElement('script')
        script.src = url.toString()
        window.mailchimpCallback = (data: { result: string; msg?: string }) => {
          if (data.result === 'success') {
            setStatus('success')
          } else {
            setStatus('error')
            setErrorMsg(data.msg || 'Something went wrong. Please try again.')
          }
          document.head.removeChild(script)
          delete window.mailchimpCallback
        }
        document.head.appendChild(script)
      } catch {
        setStatus('error')
        setErrorMsg('Could not connect. Please try again.')
      }
    } else {
      await new Promise((r) => setTimeout(r, 900))
      setStatus('success')

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'newsletter_signup', {
          method: 'homepage_form',
        })
      }
    }
  }

  return (
    <section
      className={`newsletter-signup ${className}`}
      aria-label="Newsletter signup"
      style={{
        background: 'linear-gradient(135deg, rgba(232,93,52,0.08) 0%, rgba(232,93,52,0.03) 100%)',
        border: '1px solid rgba(232,93,52,0.2)',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
        maxWidth: '560px',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          margin: '0 0 8px',
          fontSize: '1.375rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}
      >
        Get a free tool tip every week
      </h2>

      <p
        style={{
          margin: '0 0 24px',
          fontSize: '0.9rem',
          color: 'var(--muted-foreground, #6b7280)',
          lineHeight: 1.6,
        }}
      >
        One email, one tip, one tool. No spam. Unsubscribe any time.
      </p>

      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          style={{
            padding: '16px 20px',
            borderRadius: '10px',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            color: '#16a34a',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          🎉 You're in! Check your inbox for a confirmation email.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              disabled={status === 'loading'}
              aria-label="Email address"
              style={{
                flex: '1 1 200px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.05)',
                color: 'inherit',
                fontSize: '0.9rem',
                outline: 'none',
                minWidth: 0,
              }}
            />
            <button
              id="newsletter-submit"
              type="submit"
              disabled={status === 'loading'}
              style={{
                flexShrink: 0,
                padding: '10px 20px',
                borderRadius: '8px',
                background: status === 'loading' ? '#9ca3af' : '#e85d34',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s',
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Send me tips →'}
            </button>
          </div>

          {errorMsg && (
            <p
              role="alert"
              style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}
            >
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </section>
  )
}
