import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

function countParagraphs(text: string): number {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length
}

export default function ParagraphCounter() {
  const [text, setText] = useState('')

  const paragraphs = countParagraphs(text)
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text.trim() ? text.split('\n').filter((l) => l.trim()).length : 0
  const avgWords = paragraphs ? Math.round((words / paragraphs) * 10) / 10 : 0

  const stats = [
    { label: 'Paragraphs', value: paragraphs },
    { label: 'Non-empty lines', value: lines },
    { label: 'Words', value: words },
    { label: 'Avg words / paragraph', value: avgWords },
  ]

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Paste your text — paragraphs are separated by blank lines..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[240px] text-sm leading-relaxed resize-y"
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card/75 p-4 text-center">
            <div className="text-2xl font-extrabold tracking-tight">{s.value}</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={() => setText('')} disabled={!text}>
        <RotateCcw className="h-4 w-4 mr-2" /> Clear
      </Button>
    </div>
  )
}
