import { useState, useMemo, useEffect } from 'react'
import { Copy, RotateCcw, Type, AlignLeft, Clock, BookOpen, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { recordToolRun } from '@/lib/analyticsStore'
import { ViralResultCard } from '@/components/tools/ViralResultCard'

export default function WordCounter() {
  const [text, setText] = useState('')

  // Track run count in local history
  useEffect(() => {
    if (text.length > 10) {
      const timer = setTimeout(() => {
        recordToolRun('word-counter')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [text])

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

    // Calculate Readability (approximate Flesch Reading Ease)
    const avgSentLength = sentences ? words / sentences : 0
    const avgWordLength = words ? charactersNoSpaces / words : 0
    const readability = words
      ? Math.max(10, Math.min(100, Math.round(206.835 - (1.015 * avgSentLength) - (84.6 * (avgWordLength || 4.5) / 5.5))))
      : 0

    // Vocabulary Engagement Score
    const uniqueCount = Object.keys(wordFreq).length
    const engagement = words
      ? Math.max(10, Math.min(100, Math.round((uniqueCount / words) * 100 + 20)))
      : 0

    // Viral writing score based on reading complexity & formatting cues
    const exclamations = (text.match(/!/g) || []).length
    const questions = (text.match(/\?/g) || []).length
    const viralScore = words
      ? Math.max(10, Math.min(100, Math.round((readability * 0.4) + (engagement * 0.4) + Math.min(20, (exclamations + questions) * 4))))
      : 0

    // Emotional rating tag
    let emotionalLabel = 'Awaiting Input...'
    let emoji = '✍️'
    if (words > 0) {
      if (viralScore > 80) {
        emotionalLabel = 'Highly Engaging & Viral Writing Style! 🔥'
        emoji = '🔥'
      } else if (viralScore > 60) {
        emotionalLabel = 'Solid, Readable & Professional Content 👍'
        emoji = '👍'
      } else {
        emotionalLabel = 'Simple or Highly Academic Style — Needs Polish 💡'
        emoji = '💡'
      }
    }

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      topWords,
      readability,
      engagement,
      viralScore,
      emotionalLabel,
      emoji,
    }
  }, [text])

  const resultSummary = `Words: ${stats.words} | Characters: ${stats.characters}\nReadability Score: ${stats.readability}/100\nEngagement Score: ${stats.engagement}/100\nViral Writing Score: ${stats.viralScore}/100`

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Type} label="Words" value={stats.words} />
        <StatCard icon={AlignLeft} label="Characters" value={stats.characters} />
        <StatCard icon={BookOpen} label="Sentences" value={stats.sentences} />
        <StatCard icon={Clock} label="Reading Time" value={`${stats.readingTime} min`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor (spans 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Textarea
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[350px] text-base leading-relaxed resize-y"
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
            <span className="text-xs text-muted-foreground ml-auto">
              Characters (no spaces): {stats.charactersNoSpaces} | Paragraphs: {stats.paragraphs}
            </span>
          </div>
        </div>

        {/* Viral Metrics & Sharing Panel */}
        <div className="space-y-4">
          {stats.words > 0 && (
            <div className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" /> Viral Writing Score
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Readability Score</span>
                  <span>{stats.readability}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${stats.readability}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Engagement Level</span>
                  <span>{stats.engagement}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-sky-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${stats.engagement}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Viral Impact</span>
                  <span>{stats.viralScore}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full transition-all duration-500" style={{ width: `${stats.viralScore}%` }} />
                </div>
              </div>
            </div>
          )}

          {stats.words > 0 && (
            <ViralResultCard
              toolId="word-counter"
              toolName="Word Counter"
              toolPath="/tools/word-counter"
              resultSummary={resultSummary}
              emotionalLabel={stats.emotionalLabel}
              emoji={stats.emoji}
            />
          )}

          {stats.topWords.length > 0 && (
            <div className="p-4 rounded-xl border border-border bg-muted/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Top Keyword Densities</h3>
              <div className="flex flex-wrap gap-2">
                {stats.topWords.map(([word, count]) => (
                  <span
                    key={word}
                    className="px-2.5 py-0.5 rounded-full text-[11px] bg-accent border border-border font-medium"
                  >
                    {word} ({count})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
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
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
