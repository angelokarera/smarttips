import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { ADSENSE_CLIENT_ID } from '@/lib/locale-config'

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

export function SidebarAd() {
  const location = useLocation()

  useEffect(() => {
    try {
      const adWindow = window as AdSenseWindow
      ;(adWindow.adsbygoogle = adWindow.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [location.pathname])

  return (
    <div className="p-4 rounded-xl border border-border/80 bg-card/65 glass-card shadow-xs text-center">
      <p className="text-[10px] font-mono tracking-widest text-muted-foreground/60 uppercase mb-2">
        Advertisement
      </p>
      <div className="min-h-[250px] flex items-center justify-center bg-secondary/35 rounded-lg overflow-hidden border border-dashed border-border/60">
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

