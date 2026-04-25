import { useState, useMemo } from 'react'
import { Copy, RotateCcw, Type, AlignLeft, Clock, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? trimmed.split(/\s+/).length : 0
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = text ? text.split(/[.!?]+/).filter(Boolean).length : 0
    const paragraphs = text ? text.split(/\n+/).filter(Boolean).length : 0
    const readingTime = Math.ceil(words / 200)
    const speakingTime = Math.ceil(words / 130)

    const wordFreq: Record<string, number> = {}
    if (trimmed) {
      trimmed.toLowerCase().split(/\s+/).forEach((word) => {
        const clean = word.replace(/[^a-z0-9]/g, '')
        if (clean.length > 2) {
          wordFreq[clean] = (wordFreq[clean] || 0) + 1
        }
      })
    }

    const topWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      topWords,
    }
  }, [text])

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Type} label="Words" value={stats.words} />
        <StatCard icon={AlignLeft} label="Characters" value={stats.characters} />
        <StatCard icon={BookOpen} label="Sentences" value={stats.sentences} />
        <StatCard icon={Clock} label="Reading Time" value={`${stats.readingTime} min`} />
      </div>

      <Textarea
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[300px] text-base leading-relaxed resize-y"
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(text)}
          disabled={!text}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Text
        </Button>
        <Button variant="outline" size="sm" onClick={() => setText('')} disabled={!text}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <span className="text-sm text-muted-foreground ml-auto">
          Characters (no spaces): {stats.charactersNoSpaces} | Paragraphs: {stats.paragraphs}
        </span>
      </div>

      {stats.topWords.length > 0 && (
        <div className="p-4 rounded-xl border border-border bg-muted/30">
          <h3 className="text-sm font-semibold mb-3">Top Words</h3>
          <div className="flex flex-wrap gap-2">
            {stats.topWords.map(([word, count]) => (
              <span
                key={word}
                className="px-3 py-1 rounded-full text-xs bg-accent border border-border"
              >
                {word} ({count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
}) {
  return (
    <div className="p-4 rounded-xl border border-border bg-muted/30">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
