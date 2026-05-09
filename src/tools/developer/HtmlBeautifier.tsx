import { useState } from 'react'
import { Copy, RotateCcw, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function HtmlBeautifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const beautify = () => {
    const html = input.trim()
    // Simple HTML beautifier
    let formatted = ''
    let indent = 0
    const tab = '  '

    // Split by tags
    const tokens = html.replace(/>\s*</g, '>\n<').split('\n')

    for (const token of tokens) {
      const trimmed = token.trim()
      if (!trimmed) continue

      // Self-closing or closing tag
      if (trimmed.match(/^<\/([\w-]+)/)) {
        indent = Math.max(0, indent - 1)
        formatted += tab.repeat(indent) + trimmed + '\n'
      } else if (trimmed.match(/^<([\w-]+)([^>]*)\/>$/)) {
        // Self-closing
        formatted += tab.repeat(indent) + trimmed + '\n'
      } else if (trimmed.match(/^<([\w-]+)/)) {
        formatted += tab.repeat(indent) + trimmed + '\n'
        // Don't indent for void elements
        const voidElements = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']
        const tagName = trimmed.match(/^<([\w-]+)/)?.[1]?.toLowerCase()
        if (tagName && !voidElements.includes(tagName) && !trimmed.endsWith('/>')) {
          indent++
        }
      } else {
        formatted += tab.repeat(indent) + trimmed + '\n'
      }
    }

    setOutput(formatted.trimEnd())
  }

  const minify = () => {
    let html = input
    html = html.replace(/<!--[\s\S]*?-->/g, '')
    html = html.replace(/\s+/g, ' ')
    html = html.replace(/>\s+</g, '><')
    html = html.trim()
    setOutput(html)
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Input HTML</label>
          <Textarea
            placeholder="<div><p>Hello World</p></div>"
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
            placeholder="Processed HTML appears here..."
            className="min-h-[300px] font-mono text-sm leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={beautify} disabled={!input.trim()}>
          <Maximize2 className="h-4 w-4 mr-2" /> Beautify
        </Button>
        <Button variant="outline" onClick={minify} disabled={!input.trim()}>
          <Minimize2 className="h-4 w-4 mr-2" /> Minify
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setInput(''); setOutput('') }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>
    </div>
  )
}
