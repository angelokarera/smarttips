import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Search } from 'lucide-react'
import { searchTools } from '@/data/tools'
import { Input } from '@/components/ui/input'
import { useLocalizedPath } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'

export function ToolSearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const lp = useLocalizedPath()
  const { localizeTool } = useTranslations()
  const ref = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    return searchTools(query).slice(0, 8).map(localizeTool)
  }, [query, localizeTool])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const select = (path: string) => {
    navigate(lp(path))
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          className="pl-10 h-12 rounded-xl border-border bg-card"
          aria-label="Search tools"
          aria-expanded={open && results.length > 0}
        />
      </div>
      {open && results.length > 0 && (
        <ul
          className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-popover shadow-lg overflow-hidden"
          role="listbox"
        >
          {results.map((tool) => (
            <li key={tool.id}>
              <button
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-secondary/80 transition-colors"
                onClick={() => select(tool.path)}
                role="option"
              >
                <span className="font-medium text-sm block">{tool.name}</span>
                <span className="text-xs text-muted-foreground">{tool.categoryLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
