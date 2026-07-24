import { useMemo, useState } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default function FindReplace() {
  const [text, setText] = useState('')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [useRegex, setUseRegex] = useState(false)

  const { output, count, error } = useMemo(() => {
    if (!text || !find) return { output: text, count: 0, error: '' }
    try {
      const flags = caseSensitive ? 'g' : 'gi'
      const pattern = useRegex ? find : escapeRegExp(find)
      const re = new RegExp(pattern, flags)
      const matches = text.match(re)
      return { output: text.replace(re, replace), count: matches ? matches.length : 0, error: '' }
    } catch (e) {
      return { output: text, count: 0, error: (e as Error).message }
    }
  }, [text, find, replace, caseSensitive, useRegex])

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Find</label>
          <Input value={find} onChange={(e) => setFind(e.target.value)} placeholder="Text to find..." className="font-mono text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Replace with</label>
          <Input value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replacement text..." className="font-mono text-sm" />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-secondary/10 p-3 rounded-lg border border-border">
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded border-border text-primary focus:ring-primary h-4 w-4" />
          Case-sensitive
        </label>
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="rounded border-border text-primary focus:ring-primary h-4 w-4" />
          Use regex
        </label>
        {find && !error && <span className="text-sm text-muted-foreground ml-auto">{count} match{count === 1 ? '' : 'es'}</span>}
        {error && <span className="text-sm text-destructive ml-auto">Invalid regex</span>}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Input</label>
          <Textarea
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[240px] font-mono text-sm leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Result</label>
          <Textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="min-h-[240px] font-mono text-sm leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy Result
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setText(''); setFind(''); setReplace('') }} disabled={!text && !find}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>
    </div>
  )
}
