import { useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const STOP_WORDS = new Set([
  'the', 'and', 'a', 'an', 'to', 'of', 'in', 'is', 'it', 'you', 'that', 'for', 'on',
  'with', 'as', 'are', 'this', 'be', 'or', 'at', 'by', 'from', 'was', 'we', 'your',
  'can', 'will', 'not', 'but', 'have', 'has', 'they', 'their', 'our', 'i',
])

interface KeywordRow {
  word: string
  count: number
  density: number
}

function analyze(text: string, ignoreStop: boolean): { total: number; rows: KeywordRow[] } {
  const words = (text.toLowerCase().match(/[\p{L}\p{N}']+/gu) || []).filter(Boolean)
  const total = words.length
  const counts = new Map<string, number>()
  for (const w of words) {
    if (ignoreStop && STOP_WORDS.has(w)) continue
    counts.set(w, (counts.get(w) || 0) + 1)
  }
  const rows = [...counts.entries()]
    .map(([word, count]) => ({ word, count, density: total ? (count / total) * 100 : 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
  return { total, rows }
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState('')
  const [ignoreStop, setIgnoreStop] = useState(true)

  const { total, rows } = useMemo(() => analyze(text, ignoreStop), [text, ignoreStop])

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Paste your content to check keyword density..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[220px] text-sm leading-relaxed resize-y"
      />

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreStop}
            onChange={(e) => setIgnoreStop(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary h-4 w-4"
          />
          Ignore common stop words
        </label>
        <span className="text-sm text-muted-foreground">{total} total words</span>
        <Button variant="outline" size="sm" onClick={() => setText('')} disabled={!text} className="ml-auto">
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>

      {rows.length > 0 && (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/20 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-semibold px-4 py-2.5">Keyword</th>
                <th className="text-right font-semibold px-4 py-2.5">Count</th>
                <th className="text-right font-semibold px-4 py-2.5">Density</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.word} className="border-t border-border/60">
                  <td className="px-4 py-2 font-medium">{row.word}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{row.count}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">
                    {row.density.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
