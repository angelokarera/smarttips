import { type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SEOHelmet } from '@/components/seo/SEOHelmet'
import { StructuredData } from '@/components/seo/StructuredData'
import { AdBanner } from '@/components/ads/AdBanner'
import type { SEOMeta } from '@/types'
import { useLocation } from 'react-router'
import { CookieConsent } from '@/components/privacy/CookieConsent'
import { LanguageSuggestion } from '@/components/layout/LanguageSuggestion'

interface LayoutProps {
  children: ReactNode
  meta: SEOMeta
  breadcrumbs?: { name: string; path: string }[]
  showBreadcrumbs?: boolean
}

export function Layout({ children, meta, breadcrumbs, showBreadcrumbs = true }: LayoutProps) {
  const location = useLocation()
  const adExcludedPaths = ['/privacy', '/terms', '/disclaimer', '/contact', '/cookies']
  const showAds = !adExcludedPaths.some((path) => location.pathname.endsWith(path))

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHelmet meta={meta} />
      {meta.schema && <StructuredData data={meta.schema} />}
      <Header />
      <LanguageSuggestion />
      <main className="flex-1">
        {showBreadcrumbs && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {children}
        {showAds && <AdBanner />}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
