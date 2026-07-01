import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT_ID } from '@/lib/locale-config'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export default function AdInArticle() {
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    if (typeof window === 'undefined') return

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // Fail silently if AdSense is blocked or not loaded.
    }
  }, [])

  return (
    <div
      className="ad-in-article-wrapper"
      aria-label="Advertisement"
      style={{ margin: '32px auto', maxWidth: '680px', textAlign: 'center' }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot="YOUR_IN_ARTICLE_SLOT_ID"
      />
    </div>
  )
}
