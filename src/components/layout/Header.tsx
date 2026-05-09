import { useState, useRef, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router'
import { 
  Search, 
  Menu, 
  X, 
  Moon, 
  Sun,
  ChevronDown,
  ArrowRight
} from 'lucide-react'
import { categories, searchTools } from '@/data/tools'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '@/hooks/useTheme'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const searchRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchResults = useMemo(() => {
    if (searchQuery.trim()) {
      return searchTools(searchQuery).slice(0, 6)
    }
    return []
  }, [searchQuery])

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleSearchSelect = (path: string) => {
    navigate(path)
    setSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'border-b border-border/60 bg-background/90 backdrop-blur-xl shadow-xs' 
          : 'bg-background/50 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 min-w-0 items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/" className="group flex min-w-0 items-center gap-2 sm:gap-2.5">
            <img src="/logo.png" alt="SmartDigitalTips Logo" width="120" height="32" loading="eager" className="h-7 w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-105 sm:h-8" />
            <span className="truncate text-base font-bold tracking-tight sm:text-lg">
              SmartDigital<span className="text-primary">Tips</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <Link 
              to="/" 
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
              >
                Tools
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-xl border border-border bg-popover p-1.5 shadow-lg animate-slide-up">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-secondary transition-colors group/item"
                    >
                      <span className="font-medium">{cat.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/blog" 
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              Contact
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all text-sm"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden md:inline text-sm">Search...</span>
                <kbd className="hidden md:inline-flex h-5 items-center rounded border border-border/60 bg-background px-1.5 text-[10px] font-mono font-medium text-muted-foreground">
                  ⌘K
                </kbd>
              </button>
              
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden h-9 w-9"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Search Dropdown */}
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-[min(calc(100vw-2rem),400px)] rounded-xl border border-border bg-popover p-3 shadow-lg animate-slide-up">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      autoFocus
                      placeholder="Search 50+ tools..."
                      className="pl-9 h-10 bg-secondary/50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchResults.length > 0) {
                          handleSearchSelect(searchResults[0].path)
                        }
                      }}
                    />
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="mt-2 space-y-0.5">
                      <p className="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                        Results
                      </p>
                      {searchResults.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => handleSearchSelect(tool.path)}
                          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-secondary transition-colors text-left group/result"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                            <Search className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{tool.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {tool.categoryLabel}
                            </p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover/result:opacity-100 transition-opacity shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {searchQuery && searchResults.length === 0 && (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      Nothing found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-slide-up">
          <div className="max-h-[calc(100dvh-4rem)] space-y-1 overflow-y-auto px-4 py-4">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Home
            </Link>
            <div className="py-2">
              <p className="px-3 mb-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                Tool Categories
              </p>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-muted-foreground rounded-lg hover:bg-secondary hover:text-foreground transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-border pt-2 space-y-1">
              <Link 
                to="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
