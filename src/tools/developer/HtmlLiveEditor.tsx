import { useState, useMemo } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { sanitizeHtmlPreview, truncateInput } from '@/lib/security-utils'

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; }
    h1 { color: #e85d04; }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Edit HTML on the left to see a live preview.</p>
</body>
</html>`

export default function HtmlLiveEditor() {
  const [html, setHtml] = useState(DEFAULT_HTML)

  const safeSrcDoc = useMemo(() => sanitizeHtmlPreview(truncateInput(html)), [html])

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Preview runs in a sandboxed iframe. Scripts and event handlers are stripped for your
        security — only HTML and CSS render.
      </p>

      <div className="grid lg:grid-cols-2 gap-4 min-h-[400px]">
        <div className="space-y-2 flex flex-col">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            HTML Source
          </label>
          <Textarea
            value={html}
            onChange={(e) => setHtml(truncateInput(e.target.value))}
            className="flex-1 min-h-[360px] font-mono text-sm resize-y"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Live Preview (sandboxed)
          </label>
          <iframe
            title="HTML preview"
            sandbox=""
            srcDoc={safeSrcDoc}
            className="flex-1 min-h-[360px] w-full rounded-xl border border-border bg-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(html)}>
          <Copy className="h-4 w-4 mr-2" /> Copy HTML
        </Button>
        <Button variant="outline" size="sm" onClick={() => setHtml(DEFAULT_HTML)}>
          <RotateCcw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>
    </div>
  )
}
