import { useState } from 'react'
import { Copy, RotateCcw, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const WORDS = [
  'time', 'people', 'way', 'water', 'ocean', 'signal', 'garden', 'system', 'moment',
  'idea', 'value', 'market', 'design', 'engine', 'planet', 'reason', 'season', 'circle',
  'bright', 'silent', 'random', 'modern', 'simple', 'gentle', 'rapid', 'clever', 'vivid',
  'north', 'river', 'forest', 'meadow', 'summit', 'harbor', 'canvas', 'signal', 'pixel',
  'quantum', 'orbit', 'nebula', 'echo', 'ember', 'cascade', 'lantern', 'compass', 'anchor',
]

type Mode = 'words' | 'sentences' | 'paragraphs' | 'characters'

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick(): string {
  return WORDS[randomInt(0, WORDS.length - 1)]
}

function makeSentence(): string {
  const len = randomInt(6, 14)
  const words = Array.from({ length: len }, pick)
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function generate(mode: Mode, amount: number): string {
  switch (mode) {
    case 'words':
      return Array.from({ length: amount }, pick).join(' ')
    case 'sentences':
      return Array.from({ length: amount }, makeSentence).join(' ')
    case 'paragraphs':
      return Array.from({ length: amount }, () =>
        Array.from({ length: randomInt(3, 6) }, makeSentence).join(' ')
      ).join('\n\n')
    case 'characters': {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      return Array.from({ length: amount }, () => chars[randomInt(0, chars.length - 1)]).join('')
    }
  }
}

const MODES: { value: Mode; label: string }[] = [
  { value: 'words', label: 'Words' },
  { value: 'sentences', label: 'Sentences' },
  { value: 'paragraphs', label: 'Paragraphs' },
  { value: 'characters', label: 'Characters' },
]

export default function RandomTextGenerator() {
  const [mode, setMode] = useState<Mode>('sentences')
  const [amount, setAmount] = useState(5)
  const [output, setOutput] = useState('')

  const run = () => setOutput(generate(mode, Math.min(Math.max(amount, 1), 5000)))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4 bg-secondary/10 p-4 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block">Type</label>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  mode === m.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:bg-secondary/40'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block">Amount</label>
          <Input
            type="number"
            min={1}
            max={5000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-28 text-sm"
          />
        </div>
        <Button onClick={run}>
          <Shuffle className="h-4 w-4 mr-2" /> Generate
        </Button>
      </div>

      <Textarea
        readOnly
        value={output}
        placeholder="Generated random text will appear here..."
        className="min-h-[260px] text-sm leading-relaxed resize-y bg-card"
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOutput('')} disabled={!output}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>
    </div>
  )
}
