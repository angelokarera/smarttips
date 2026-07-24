import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

function countSentences(text: string): number {
  const matches = text.trim().match(/[^.!?…]+(?:[.!?…]+|$)/g)
  if (!matches) return 0
  return matches.filter((s) => s.trim().length > 0).length
}

export default function SentenceCounter() {
  const [text, setText] = useState('')

  const sentences = countSentences(text)
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const avgWords = sentences ? Math.round((words / sentences) * 10) / 10 : 0

  const stats = [
    { label: 'Sentences', value: sentences },
    { label: 'Words', value: words },
    { label: 'Avg words / sentence', value: avgWords },
  ]

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Type or paste your text to count sentences..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[240px] text-sm leading-relaxed resize-y"
      />
      <div className="grid grid-cols-3 gap-3">
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
