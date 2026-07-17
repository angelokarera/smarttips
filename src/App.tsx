import { Routes, Route, Outlet, useParams } from 'react-router'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ToolPage from './pages/ToolPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Disclaimer from './pages/Disclaimer'
import Cookies from './pages/Cookies'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import { isAppLocale } from './lib/locale-config'
import { usePageTracking } from './hooks/usePageTracking'
import { useEzoicPageRefresh } from './hooks/useEzoicPageRefresh'

/**
 * Layout route for `/:locale/*`. Renders the child route only when the URL's
 * first segment is a real supported locale; otherwise renders the 404 page.
 * This stops arbitrary single-segment URLs (e.g. `/random-word`) from silently
 * rendering the localized Home page — a soft-404 / duplicate-content issue.
 */
function LocaleGuard() {
  const { locale } = useParams<{ locale: string }>()
  if (locale && !isAppLocale(locale)) return <NotFound />
  return <Outlet />
}

export default function App() {
  // Fire pageview event on every route change
  usePageTracking()
  useEzoicPageRefresh()

  return (
    <>
      <Routes>
        {/* Default (unprefixed) routes — Netlify 301-redirects these to /en/* in prod */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/tools/:toolId" element={<ToolPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Locale-prefixed routes — guarded so invalid locales render 404 */}
        <Route path="/:locale" element={<LocaleGuard />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="tools/:toolId" element={<ToolPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          {/* Unknown path under a valid locale → 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Catch-all for any other unmatched URL → 404 (no more blank screen) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
