import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

function formatDuration(minutes: number): string {
  if (minutes <= 0) return '0 sec'
  const totalSeconds = Math.round(minutes * 60)
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  if (m === 0) return `${s} sec`
  if (s === 0) return `${m} min`
  return `${m} min ${s} sec`
}

const SPEEDS = [
  { label: 'Slow (150 wpm)', wpm: 150 },
  { label: 'Average (225 wpm)', wpm: 225 },
  { label: 'Fast (300 wpm)', wpm: 300 },
]

export default function ReadingTimeCalculator() {
  const [text, setText] = useState('')
  const [wpm, setWpm] = useState(225)

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const minutes = words / wpm

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Paste your article or blog post to estimate reading time..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[220px] text-sm leading-relaxed resize-y"
      />

      <div className="flex flex-wrap gap-2">
        {SPEEDS.map((s) => (
          <button
            key={s.wpm}
            onClick={() => setWpm(s.wpm)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              wpm === s.wpm
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border hover:bg-secondary/40'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card/75 p-4 text-center">
          <div className="text-2xl font-extrabold tracking-tight">{words}</div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Words</div>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <div className="text-2xl font-extrabold tracking-tight text-primary">{formatDuration(minutes)}</div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Reading time</div>
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={() => setText('')} disabled={!text}>
        <RotateCcw className="h-4 w-4 mr-2" /> Clear
      </Button>
    </div>
  )
}
