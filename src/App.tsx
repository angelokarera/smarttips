import { Routes, Route } from 'react-router'
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
import { usePageTracking } from './hooks/usePageTracking'

export default function App() {
  // Fire pageview event on every route change
  usePageTracking()

  return (
    <>
      <Routes>
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
        <Route path="/:locale" element={<Home />} />
        <Route path="/:locale/category/:categoryId" element={<CategoryPage />} />
        <Route path="/:locale/tools/:toolId" element={<ToolPage />} />
        <Route path="/:locale/about" element={<About />} />
        <Route path="/:locale/contact" element={<Contact />} />
        <Route path="/:locale/privacy" element={<Privacy />} />
        <Route path="/:locale/terms" element={<Terms />} />
        <Route path="/:locale/disclaimer" element={<Disclaimer />} />
        <Route path="/:locale/cookies" element={<Cookies />} />
        <Route path="/:locale/blog" element={<BlogList />} />
        <Route path="/:locale/blog/:slug" element={<BlogPost />} />
      </Routes>
    </>
  )
}
