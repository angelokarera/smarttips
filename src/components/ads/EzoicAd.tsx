/**
 * Ezoic ad components using the official showAds API.
 *
 * EzoicAd        — simple inline ad (no dashboard placement ID needed)
 * EzoicPlacement — placement-ID based ad (requires ID from Ezoic dashboard)
 */
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>
      showAds: (...args: unknown[]) => void
      destroyPlaceholders: (...ids: number[]) => void
      destroyAll: () => void
      setOutstreamAllowed: (allowed: boolean, opts?: { reason?: string; requestAdOnAllow?: boolean }) => void
      setInterstitialAllowed: (allowed: boolean, opts?: { reason?: string; requestAdOnAllow?: boolean }) => void
      isOutstreamAllowed: () => boolean
      isInterstitialAllowed: () => boolean
    }
  }
}

interface EzoicAdProps {
  /** Optional fixed size e.g. "300x250". Omit to let Ezoic pick best size. */
  sizes?: string | string[]
  /** Only show on specific devices */
  devices?: ('mobile' | 'tablet' | 'desktop')[]
  className?: string
}

/** Simple inline ad — place wherever you want an ad, no dashboard setup needed. */
export function EzoicAd({ sizes, devices, className }: EzoicAdProps) {
  const called = useRef(false)

  useEffect(() => {
    if (called.current || typeof window === 'undefined' || !window.ezstandalone) return
    called.current = true
    window.ezstandalone.cmd.push(() => {
      const opts: Record<string, unknown> = {}
      if (sizes) opts.sizes = sizes
      if (devices) opts.devices = devices
      window.ezstandalone!.showAds(opts)
    })
  }, [sizes, devices])

  return <div className={className} />
}

interface EzoicPlacementProps {
  /** Placement ID from your Ezoic dashboard */
  id: number
  className?: string
}

/** Placement-ID based ad — requires creating the placement in Ezoic dashboard first. */
export function EzoicPlacement({ id, className }: EzoicPlacementProps) {
  const called = useRef(false)

  useEffect(() => {
    if (called.current || typeof window === 'undefined' || !window.ezstandalone) return
    called.current = true
    window.ezstandalone.cmd.push(() => {
      window.ezstandalone!.showAds(id)
    })
  }, [id])

  return <div id={`ezoic-pub-ad-placeholder-${id}`} className={className} />
}
