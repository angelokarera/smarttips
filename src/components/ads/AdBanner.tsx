import { useEffect } from 'react'
import { useLocation } from 'react-router'

type AdSenseWindow = Window & {
  adsbygoogle?: unknown[]
}

export function AdBanner() {
  const location = useLocation()

  useEffect(() => {
    try {
      const adWindow = window as AdSenseWindow
      ;(adWindow.adsbygoogle = adWindow.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [location.pathname]) // Re-trigger on route change

  return (
    <div className="w-full flex justify-center py-4 my-4 border-y border-border/40 bg-secondary/20">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-3519891152775398"
        data-ad-slot="6092595232"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
