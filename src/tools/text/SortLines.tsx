import { useState } from 'react'
import { ArrowDownAZ, ArrowUpZA, Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function SortLines() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)

  const sort = (dir: 'asc' | 'desc') => {
    if (!input.trim()) return
    const lines = input.split('\n')
    const sorted = [...lines].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: caseSensitive ? 'variant' : 'base', numeric: true })
    )
    if (dir === 'desc') sorted.reverse()
    setOutput(sorted.join('\n'))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center bg-secondary/10 p-3 rounded-lg border border-border">
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary h-4 w-4"
          />
          Case-sensitive
        </label>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Input (one item per line)</label>
          <Textarea
            placeholder="Paste your list here — one item per line..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[280px] font-mono text-sm leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Sorted result</label>
          <Textarea
            readOnly
            value={output}
            placeholder="Sorted lines will appear here..."
            className="min-h-[280px] font-mono text-sm leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => sort('asc')} disabled={!input.trim()}>
          <ArrowDownAZ className="h-4 w-4 mr-2" /> Sort A–Z
        </Button>
        <Button variant="outline" onClick={() => sort('desc')} disabled={!input.trim()}>
          <ArrowUpZA className="h-4 w-4 mr-2" /> Sort Z–A
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy Result
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setInput(''); setOutput('') }} disabled={!input && !output}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>
    </div>
  )
}
