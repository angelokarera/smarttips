import { useState } from 'react'
import { Copy, RotateCcw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function RemoveDuplicates() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [stats, setStats] = useState({ total: 0, unique: 0, removed: 0 })

  const removeDuplicates = () => {
    const lines = input.split('\n')
    const seen = new Set<string>()
    const unique: string[] = []
    for (const line of lines) {
      const trimmed = line.trim()
      if (!seen.has(trimmed)) {
        seen.add(trimmed)
        unique.push(line)
      }
    }
    setOutput(unique.join('\n'))
    setStats({ total: lines.length, unique: unique.length, removed: lines.length - unique.length })
  }

  return (
    <div className="space-y-6">
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
