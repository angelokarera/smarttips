import { useState } from 'react'
import { Copy, RotateCcw, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function CssMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const minify = () => {
    let css = input
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove newlines and extra spaces
    css = css.replace(/\s+/g, ' ')
    // Remove spaces around selectors/braces
    css = css.replace(/\s*{\s*/g, '{')
    css = css.replace(/\s*}\s*/g, '}')
    css = css.replace(/\s*;\s*/g, ';')
    css = css.replace(/\s*:\s*/g, ':')
    css = css.replace(/\s*,\s*/g, ',')
    // Remove last semicolon before }
    css = css.replace(/;}/g, '}')
    css = css.trim()
    setOutput(css)
  }

  const beautify = () => {
    let css = input
    css = css.replace(/\s*{\s*/g, ' {\n  ')
    css = css.replace(/\s*}\s*/g, '\n}\n\n')
    css = css.replace(/;\s*/g, ';\n  ')
    css = css.replace(/\n  \n}/g, '\n}')
    css = css.trim()
    setOutput(css)
  }

  const inputSize = new Blob([input]).size
  const outputSize = new Blob([output]).size
  const saving = inputSize > 0 ? ((1 - outputSize / inputSize) * 100).toFixed(1) : '0'

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Input CSS</label>
          <Textarea
            placeholder=".container { padding: 20px; margin: 0 auto; }"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Output</label>
          <Textarea
            readOnly
            value={output}
            placeholder="Processed CSS appears here..."
            className="min-h-[300px] font-mono text-sm leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={minify} disabled={!input.trim()}>
          <Minimize2 className="h-4 w-4 mr-2" /> Minify
        </Button>
        <Button variant="outline" onClick={beautify} disabled={!input.trim()}>
          Beautify
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setInput(''); setOutput('') }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
        {output && (
          <span className="text-sm text-muted-foreground ml-auto">
            {inputSize}B → {outputSize}B ({saving}% smaller)
          </span>
        )}
      </div>
    </div>
  )
}
