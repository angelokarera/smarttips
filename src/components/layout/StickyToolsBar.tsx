import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowRight, X, Sparkles } from 'lucide-react'
import { useLocalizedPath } from '@/hooks/useLocale'

/**
 * StickyToolsBar — appears at the bottom after 30s or after 60% scroll.
 * Keeps users on-site by surfacing related tools. Dismissed per-session.
 */
export function StickyToolsBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const location = useLocation()
  const lp = useLocalizedPath()

  // Don't show on legal/about/contact pages
  const excludedPaths = ['/privacy', '/terms', '/disclaimer', '/contact', '/cookies', '/about']
  const isExcluded = excludedPaths.some((p) => location.pathname.endsWith(p))

  useEffect(() => {
    if (isExcluded || dismissed) return

    // Check session storage so it doesn't re-appear after dismissal
    const wasDismissed = sessionStorage.getItem('sdt_bar_dismissed')
    if (wasDismissed) {
      setDismissed(true)
      return
    }

    // Show after 30 seconds
    const timer = setTimeout(() => setVisible(true), 30_000)

    // Or show after user scrolls 60% of the page
    const handleScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrollPct > 0.6) {
        setVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isExcluded, dismissed, location.pathname])

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('sdt_bar_dismissed', '1')
  }

  if (!visible || dismissed || isExcluded) return null

  return (
    <div
      role="complementary"
      aria-label="Discover more free tools"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/80 bg-background/95 backdrop-blur-md shadow-[0_-4px_32px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom-4 duration-500"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 py-3">
          {/* Icon */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight">
              <span className="text-primary">50+ free tools</span>
              <span className="text-muted-foreground font-normal hidden sm:inline">
                {' '}— no sign-up, no uploads, instant results
              </span>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={lp('/tools/image-compressor')}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 text-xs font-semibold hover:bg-secondary transition-colors"
              onClick={handleDismiss}
            >
              Image Compressor
            </Link>
            <Link
              to={lp('/tools/pdf-to-word')}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 text-xs font-semibold hover:bg-secondary transition-colors"
              onClick={handleDismiss}
            >
              PDF to Word
            </Link>
            <Link
              to={lp('/')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={handleDismiss}
            >
              Explore all
              <ArrowRight className="h-3 w-3" />
            </Link>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
