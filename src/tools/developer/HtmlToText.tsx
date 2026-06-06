import { useState, useEffect } from 'react'
import { Copy, RotateCcw, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { truncateInput } from '@/lib/security-utils'
import { toast } from 'sonner'
import { ViralResultCard } from '@/components/tools/ViralResultCard'
import { recordToolRun } from '@/lib/analyticsStore'

export default function HtmlToText() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [hasRun, setHasRun] = useState(false)

  useEffect(() => {
    if (!input) {
      setOutput('')
      setHasRun(false)
      return
    }

    const safe = truncateInput(input)
    try {
      const doc = new DOMParser().parseFromString(safe, 'text/html')
      const text = doc.body.textContent || doc.body.innerText || ''
      setOutput(text.trim())
    } catch {
      // Fallback regex if DOMParser fails
      const text = safe.replace(/<[^>]*>/g, '')
      setOutput(text.trim())
    }
    setHasRun(true)
    recordToolRun('html-to-text')
  }, [input])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      toast.success('Text copied to clipboard!')
    } catch {
      toast.error('Failed to copy text.')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setHasRun(false)
  }

  // Calculate stats
  const wordCount = output.split(/\s+/).filter(Boolean).length
  const charCount = output.length
  const tagsRemoved = (input.match(/<[^>]*>/g) || []).length

  // Build result summary for viral card
  const resultSummary = output
    ? `HTML tags removed: ${tagsRemoved} | Plain text words: ${wordCount} | Characters: ${charCount}\n\nExtracted text preview:\n"${output.slice(0, 160)}${output.length > 160 ? '...' : ''}"`
    : ''

  const emotionalLabel =
    tagsRemoved > 0
      ? `${tagsRemoved} HTML tags stripped — clean text extracted!`
      : 'HTML converted to plain text!'

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      {output && (
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Tags Removed', value: tagsRemoved },
            { label: 'Words', value: wordCount.toLocaleString() },
            { label: 'Characters', value: charCount.toLocaleString() },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 rounded-lg bg-secondary/50 border border-border/60 px-3 py-1.5"
            >
              <span className="text-xs font-semibold text-muted-foreground">{stat.label}:</span>
              <span className="text-sm font-bold text-primary">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Input / Output */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <Code2 className="h-4 w-4" /> HTML Input
          </label>
          <Textarea
            placeholder="Paste HTML code here...\n\nExample:\n<h1>Hello <strong>World</strong></h1>\n<p>This is a <a href='#'>link</a>.</p>"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[280px] font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            {(input.match(/<[^>]*>/g) || []).length} HTML tags detected
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground">
            Plain Text Output
          </label>
          <Textarea
            readOnly
            value={output}
            placeholder="Plain text result will appear here as you type..."
            className="min-h-[280px] font-mono text-sm bg-muted/30"
          />
          {output && (
            <p className="text-xs text-muted-foreground">
              {wordCount} words · {charCount} characters
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={copyToClipboard} disabled={!output} className="gap-2">
          <Copy className="h-4 w-4" /> Copy Output
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Clear
        </Button>
      </div>

      {/* Viral Result Card */}
      {hasRun && output && (
        <ViralResultCard
          toolId="html-to-text"
          toolName="HTML to Text Converter"
          toolPath="/tools/html-to-text"
          resultSummary={resultSummary}
          emotionalLabel={emotionalLabel}
          emoji="🧹"
        />
      )}
    </div>
  )
}
