import { Link } from 'react-router'
import { TrendingUp, Sparkles, Search } from 'lucide-react'
import type { Tool } from '@/data/tools'
import { getPopularTools, getTrendingTools, getToolsByCategory } from '@/data/tools'
import { getToolKeywords } from '@/lib/seoKeywords'
import { useLocalizedPath } from '@/hooks/useLocale'

const POPULAR_SEARCHES = [
  'image compressor',
  'pdf to word',
  'merge pdf',
  'qr code generator',
  'word counter',
  'password generator',
  'json formatter',
  'unit converter',
]

interface ToolEngagementProps {
  tool: Tool
}

export function ToolEngagement({ tool }: ToolEngagementProps) {
  const lp = useLocalizedPath()
  const categoryTools = getToolsByCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 4)
  const trending = getTrendingTools()
    .filter((t) => t.id !== tool.id)
    .slice(0, 4)
  const popular = getPopularTools()
    .filter((t) => t.id !== tool.id)
    .slice(0, 4)

  const keywordChips = getToolKeywords(tool)
    .filter((k) => k.length > 3 && k.length < 40)
    .slice(0, 8)

  return (
    <aside className="mt-16 space-y-12 border-t border-border pt-12" aria-label="Discover more tools">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold tracking-tight">Popular searches</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((term) => (
            <Link
              key={term}
              to={lp('/')}
              className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </section>

      {keywordChips.length > 0 && (
        <section>
          <h2 className="text-lg font-bold tracking-tight mb-4">Related keywords</h2>
          <div className="flex flex-wrap gap-2">
            {keywordChips.map((term) => (
              <span
                key={term}
                className="rounded-full bg-primary/5 px-3 py-1 text-xs text-muted-foreground"
              >
                {term}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-10 md:grid-cols-2">
        <EngagementList
          title="You may also like"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          tools={trending}
          lp={lp}
        />
        <EngagementList
          title="Most used tools"
          icon={<Sparkles className="h-5 w-5 text-primary" />}
          tools={popular}
          lp={lp}
        />
      </div>

      {categoryTools.length > 0 && (
        <EngagementList title={`More ${tool.categoryLabel}`} tools={categoryTools} lp={lp} />
      )}
    </aside>
  )
}

function EngagementList({
  title,
  icon,
  tools,
  lp,
}: {
  title: string
  icon?: React.ReactNode
  tools: Tool[]
  lp: (path: string) => string
}) {
  if (tools.length === 0) return null

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      </div>
      <ul className="space-y-2">
        {tools.map((t) => (
          <li key={t.id}>
            <Link
              to={lp(t.path)}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm hover:border-primary/30 hover:bg-secondary/30 transition-colors group"
            >
              <span className="font-medium group-hover:text-primary">{t.name}</span>
              <span className="text-xs text-muted-foreground">{t.categoryLabel}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

