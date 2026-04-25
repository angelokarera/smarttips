import { useState } from 'react'
import { Copy, RotateCcw, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const format = (indent: number) => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Input JSON</label>
          <Textarea
            placeholder='{"key": "value", "nested": {"example": true}}'
            value={input}
            onChange={(e) => { setInput(e.target.value); setError('') }}
            className="min-h-[320px] font-mono text-sm leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Formatted Output</label>
          <Textarea
            readOnly
            value={output}
            placeholder="Formatted JSON appears here..."
            className="min-h-[320px] font-mono text-sm leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => format(2)}>
          <Maximize2 className="h-4 w-4 mr-2" /> Beautify (2 spaces)
        </Button>
        <Button variant="outline" onClick={() => format(4)}>
          <Maximize2 className="h-4 w-4 mr-2" /> 4 Spaces
        </Button>
        <Button variant="outline" onClick={() => format(0)}>
          <Minimize2 className="h-4 w-4 mr-2" /> Minify
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setInput(''); setOutput(''); setError('') }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>
    </div>
  )
}
