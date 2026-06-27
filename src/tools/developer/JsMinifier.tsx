import { useState } from 'react'
import { Copy, RotateCcw, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

function minifyJs(code: string): string {
  return code
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,=<>!&|+\-*/^%:?])\s*/g, '$1')
    .trim()
}

export default function JsMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [processed, setProcessed] = useState(false)

  const minify = () => {
    if (!input.trim()) return
    const result = minifyJs(input)
    setOutput(result)
    setProcessed(true)
  }

  const copy = () => { navigator.clipboard.writeText(output); toast.success('Minified JS copied!') }
  const clear = () => { setInput(''); setOutput(''); setProcessed(false) }

  const originalBytes = new Blob([input]).size
  const minifiedBytes = new Blob([output]).size
  const savings = originalBytes > 0 ? Math.round((1 - minifiedBytes / originalBytes) * 100) : 0

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Paste your JavaScript code below to minify it — removes comments and unnecessary whitespace. Runs entirely in your browser.
      </p>

      {processed && output && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Original', val: `${originalBytes.toLocaleString()} bytes` },
            { label: 'Minified', val: `${minifiedBytes.toLocaleString()} bytes` },
            { label: 'Saved', val: `${savings}%`, highlight: true },
          ].map(({ label, val, highlight }) => (
            <div key={label} className={`text-center p-3 rounded-xl border ${highlight ? 'border-primary/40 bg-primary/10' : 'border-border bg-card/40'}`}>
              <div className={`text-lg font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>{val}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">JavaScript Input</label>
          <Textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder="// Paste your JavaScript code here&#10;function example(a, b) {&#10;  // add two numbers&#10;  return a + b;&#10;}"
            rows={14} className="font-mono text-sm" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Minified Output</label>
            <Button variant="outline" size="sm" onClick={copy} disabled={!output}><Copy className="h-3.5 w-3.5 mr-1" />Copy</Button>
          </div>
          <Textarea readOnly value={output} placeholder="Minified code appears here..."
            rows={14} className="font-mono text-sm bg-card" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={minify} disabled={!input.trim()}>
          <Zap className="h-4 w-4 mr-2" /> Minify JS
        </Button>
        <Button variant="outline" onClick={clear}><RotateCcw className="h-4 w-4 mr-2" />Clear</Button>
      </div>

      <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-400">
        ⚠ This is a basic minifier (strips comments and whitespace). For production use, a proper minifier (like esbuild or Terser) is recommended.
      </div>
    </div>
  )
}
