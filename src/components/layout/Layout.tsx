import { type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SEOHelmet } from '@/components/seo/SEOHelmet'
import { StructuredData } from '@/components/seo/StructuredData'
import type { SEOMeta } from '@/types'

interface LayoutProps {
  children: ReactNode
  meta: SEOMeta
  breadcrumbs?: { name: string; path: string }[]
  showBreadcrumbs?: boolean
}

export function Layout({ children, meta, breadcrumbs, showBreadcrumbs = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHelmet meta={meta} />
      {meta.schema && <StructuredData data={meta.schema} />}
      <Header />
      <main className="flex-1">
        {showBreadcrumbs && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  )
}
