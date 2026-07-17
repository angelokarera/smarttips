import { Link, useLocation } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { useLocalizedPath } from '@/hooks/useLocale'
import { tools, categories } from '@/data/tools'
import { SITE_URL } from '@/lib/locale-config'
import { Home, Search, Compass, FileText } from 'lucide-react'

/**
 * 404 page for any unmatched route or invalid locale prefix.
 *
 * Returns useful navigation (popular tools, categories, blog) instead of a
 * blank screen, and sets `robots: noindex, follow` so search engines drop the
 * URL rather than flagging a soft-404 / thin page. The prerender step also
 * emits a static `dist/404.html`, and Netlify serves it with a real HTTP 404
 * status (see netlify.toml / _redirects).
 */
export default function NotFound() {
  const lp = useLocalizedPath()
  const location = useLocation()

  const popularTools = tools.filter((tool) => tool.popular).slice(0, 8)

  const meta = {
    title: 'Page Not Found (404) — SmartDigitalTips',
    description:
      'The page you were looking for could not be found. Browse our free online tools, categories, and guides to find what you need.',
    canonical: SITE_URL + lp('/'),
    robots: 'noindex, follow',
  }

  return (
    <Layout meta={meta} showBreadcrumbs={false}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-7xl sm:text-8xl font-extrabold tracking-tight text-primary/20 mb-4">
            404
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            This page took a wrong turn
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-2">
            We couldn&apos;t find <span className="font-mono text-sm break-all">{location.pathname}</span>.
            It may have been moved, renamed, or never existed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            The good news: everything on SmartDigitalTips is free, browser-based, and just a
            click away. Try one of the popular tools below or head back home.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to={lp('/')}>
              <Button className="rounded-xl gap-2">
                <Home className="h-4 w-4" aria-hidden="true" />
                Back to Home
              </Button>
            </Link>
            <Link to={lp('/blog')}>
              <Button variant="outline" className="rounded-xl gap-2">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Read the Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Popular tools */}
        <section aria-labelledby="popular-tools-heading" className="mb-16">
          <h2
            id="popular-tools-heading"
            className="flex items-center gap-2 text-xl font-bold mb-6"
          >
            <Search className="h-5 w-5 text-primary" aria-hidden="true" />
            Popular free tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularTools.map((tool) => (
              <Link
                key={tool.id}
                to={lp(tool.path)}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:shadow-sm transition-colors"
              >
                <p className="font-semibold text-sm mb-1">{tool.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="flex items-center gap-2 text-xl font-bold mb-6"
          >
            <Compass className="h-5 w-5 text-primary" aria-hidden="true" />
            Browse by category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={lp(`/category/${category.id}`)}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
