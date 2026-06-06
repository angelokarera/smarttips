import { useState } from 'react'
import { Copy, RotateCcw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function RemoveDuplicates() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [sortAZ, setSortAZ] = useState(false)
  const [stats, setStats] = useState({ total: 0, unique: 0, removed: 0 })

  const removeDuplicates = () => {
    if (!input.trim()) return
    const lines = input.split('\n')
    const seen = new Set<string>()
    const unique: string[] = []
    
    for (const line of lines) {
      const trimmed = line.trim()
      const matchKey = caseSensitive ? trimmed : trimmed.toLowerCase()
      if (!seen.has(matchKey)) {
        seen.add(matchKey)
        unique.push(line)
      }
    }

    if (sortAZ) {
      unique.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    }

    setOutput(unique.join('\n'))
    setStats({
      total: lines.length,
      unique: unique.length,
      removed: lines.length - unique.length,
    })
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
          Case-Sensitive
        </label>
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={sortAZ}
            onChange={(e) => setSortAZ(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary h-4 w-4"
          />
          Sort A-Z
        </label>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Input (one item per line)</label>
          <Textarea
            placeholder="Paste your text here — one item per line..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[280px] font-mono text-sm leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Result (duplicates removed)</label>
          <Textarea
            readOnly
            value={output}
            placeholder="Unique lines will appear here..."
            className="min-h-[280px] font-mono text-sm leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={removeDuplicates} disabled={!input.trim()}>
          <Trash2 className="h-4 w-4 mr-2" /> Remove Duplicates
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy Result
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setInput(''); setOutput(''); setStats({ total: 0, unique: 0, removed: 0 }) }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
        {stats.total > 0 && (
          <span className="text-sm text-muted-foreground ml-auto">
            {stats.total} lines → {stats.unique} unique ({stats.removed} removed)
          </span>
        )}
      </div>
    </div>
  )
}
