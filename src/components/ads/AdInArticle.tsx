import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle?: any[]
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
    } catch (err) {
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
        data-ad-client="ca-pub-3519891152775398"
        data-ad-slot="YOUR_IN_ARTICLE_SLOT_ID"
      />
    </div>
  )
}
