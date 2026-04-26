import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ToolPage from './pages/ToolPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Disclaimer from './pages/Disclaimer'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/tools/:toolId" element={<ToolPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}
