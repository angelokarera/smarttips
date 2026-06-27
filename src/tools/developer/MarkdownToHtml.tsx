import { useState, useMemo } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

// Simple markdown to HTML parser
function markdownToHtml(md: string): string {
  let html = md
  // Code blocks
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
  // Headings
  html = html.replace(/^######\s(.+)$/gm, '<h6>$1</h6>')
  html = html.replace(/^#####\s(.+)$/gm, '<h5>$1</h5>')
  html = html.replace(/^####\s(.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^###\s(.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s(.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s(.+)$/gm, '<h1>$1</h1>')
  // Blockquote
  html = html.replace(/^>\s(.+)$/gm, '<blockquote>$1</blockquote>')
  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.+?)_/g, '<em>$1</em>')
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  // Links and images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr />')
  // Unordered list
  html = html.replace(/^[-*]\s(.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
  // Ordered list
  html = html.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>')
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>')
  html = `<p>${html}</p>`
  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')
  html = html.replace(/<p>(<h[1-6]>)/g, '$1')
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1')
  html = html.replace(/<p>(<ul>)/g, '$1')
  html = html.replace(/(<\/ul>)<\/p>/g, '$1')
  html = html.replace(/<p>(<blockquote>)/g, '$1')
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1')
  html = html.replace(/<p>(<pre>)/g, '$1')
  html = html.replace(/(<\/pre>)<\/p>/g, '$1')
  html = html.replace(/<p>(<hr \/>)<\/p>/g, '$1')
  return html
}

const SAMPLE_MD = `# Hello Markdown

This is a **bold** and *italic* text example.

## Features

- Converts headings (H1–H6)
- **Bold**, *italic*, and \`inline code\`
- [Links](https://example.com)
- Unordered and ordered lists

> Blockquote example here.

\`\`\`js
// Code block
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`
`

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD)
  const [view, setView] = useState<'split' | 'preview' | 'html'>('split')

  const html = useMemo(() => markdownToHtml(markdown), [markdown])

  const copyHtml = () => { navigator.clipboard.writeText(html); toast.success('HTML copied!') }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Type Markdown on the left and see the rendered HTML preview instantly. Copy the generated HTML to use in your projects.
      </p>

      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">
          {([
            { val: 'split', label: '⬜ Split' },
            { val: 'preview', label: '👁 Preview' },
            { val: 'html', label: '&lt;/&gt; HTML' },
          ] as const).map(({ val, label }) => (
            <button key={val} onClick={() => setView(val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === val ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
              dangerouslySetInnerHTML={{ __html: label }} />
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={copyHtml}><Copy className="h-3.5 w-3.5 mr-1" />Copy HTML</Button>
      </div>

      <div className={`grid gap-4 ${view === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {(view === 'split' || view === 'html') && (
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Markdown</label>
            <Textarea value={markdown} onChange={e => setMarkdown(e.target.value)}
              className="font-mono text-sm min-h-[420px] resize-y" placeholder="Type or paste Markdown here..." />
          </div>
        )}
        {(view === 'split' || view === 'preview') && (
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Preview</label>
            <div
              className="min-h-[420px] p-4 rounded-xl border border-border bg-card prose prose-invert max-w-none text-sm overflow-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}
        {view === 'html' && (
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Raw HTML</label>
            <Textarea readOnly value={html} className="font-mono text-xs min-h-[420px] bg-card text-green-400" />
          </div>
        )}
      </div>
    </div>
  )
}
