import { useEffect } from 'react'
import { useLocation } from 'react-router'

export function useEzoicPageRefresh() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ezstandalone) return
    window.ezstandalone.cmd.push(() => {
      window.ezstandalone!.showAds()
    })
  }, [location.pathname, location.search])
}
