import { useState, useMemo } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RotateCcw, Sparkles, Copy, Check, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

const AI_PHRASES: Record<string, string> = {
  furthermore: 'also',
  additionally: 'plus',
  moreover: 'on top of that',
  however: 'but',
  therefore: 'so',
  consequently: 'as a result',
  'in conclusion': 'to wrap up',
  notably: 'especially',
  'it is important to note that': 'keep in mind that',
  'it should be noted that': 'note that',
  'in essence': 'basically',
  ultimately: 'in the end',
  utilize: 'use',
  utilizes: 'uses',
  utilizing: 'using',
  facilitate: 'help',
  commence: 'start',
  terminate: 'end',
  subsequently: 'then',
  paramount: 'vital',
  delve: 'explore',
  tapestry: 'mix',
  testament: 'proof',
}

interface AnalysisResult {
  score: number
  label: string
  color: string
  reasons: string[]
  flaggedWords: string[]
}

function analyzeAiText(text: string): AnalysisResult {
  if (text.trim().length < 50) {
    return { score: 0, label: 'Too short', color: 'bg-muted', reasons: ['Enter at least 50 characters for analysis.'], flaggedWords: [] }
  }

  const lowerText = text.toLowerCase()
  const flagged = Object.keys(AI_PHRASES).filter(phrase => lowerText.includes(phrase))

  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  let score = 0
  const reasons: string[] = []

  if (sentences.length >= 3) {
    const lengths = sentences.map(s => s.trim().split(/\s+/).length)
    const avgLen = lengths.reduce((a, b) => a + b, 0) / lengths.length
    const variance = lengths.reduce((sum, l) => sum + Math.pow(l - avgLen, 2), 0) / lengths.length
    if (Math.sqrt(variance) < 3.5) {
      score += 25
      reasons.push('Uniform sentence structure (typical AI pattern).')
    }
  }

  if (flagged.length > 0) {
    score += Math.min(45, flagged.length * 15)
    reasons.push(`Found ${flagged.length} AI-typical buzzwords/phrases.`)
  }

  const contractions = (text.match(/\b(don't|can't|won't|isn't|aren't|it's|I'm|I've|you're|we're|they're)\b/gi) || []).length
  if (contractions === 0 && text.split(/\s+/).length > 40) {
    score += 20
    reasons.push('Lack of natural conversational contractions.')
  }

  const clampedScore = Math.min(Math.max(score, flagged.length > 0 ? 30 : 0), 100)

  const label = clampedScore >= 70 ? 'Likely AI-Generated'
    : clampedScore >= 40 ? 'Possibly AI-Assisted'
    : clampedScore >= 15 ? 'Slight AI Signals'
    : 'Human-Written'

  const color = clampedScore >= 70 ? 'bg-red-500'
    : clampedScore >= 40 ? 'bg-amber-500'
    : clampedScore >= 15 ? 'bg-yellow-400'
    : 'bg-emerald-500'

  if (reasons.length === 0) reasons.push('Natural sentence variation and human phrasing detected.')

  return { score: clampedScore, label, color, reasons, flaggedWords: flagged }
}

function humanizeText(text: string): string {
  let humanized = text

  // Replace AI phrases with casual human equivalents
  Object.entries(AI_PHRASES).forEach(([ai, human]) => {
    const regex = new RegExp(`\\b${ai}\\b`, 'gi')
    humanized = humanized.replace(regex, match => {
      // Preserve capitalization
      if (match[0] === match[0].toUpperCase()) {
        return human.charAt(0).toUpperCase() + human.slice(1)
      }
      return human
    })
  })

  // Add natural contractions where applicable
  humanized = humanized
    .replace(/\bdo not\b/gi, "don't")
    .replace(/\bcannot\b/gi, "can't")
    .replace(/\bis not\b/gi, "isn't")
    .replace(/\bit is\b/gi, "it's")
    .replace(/\bwe are\b/gi, "we're")
    .replace(/\bthey are\b/gi, "they're")
    .replace(/\byou are\b/gi, "you're")

  return humanized
}

export default function AiTextDetector() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => text.trim() ? analyzeAiText(text) : null, [text])

  const clear = () => setText('')

  const handleHumanize = () => {
    if (!text.trim()) return
    const corrected = humanizeText(text)
    setText(corrected)
    toast.success('Text humanized and grammar polished!')
  }

  const copyText = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Text copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Analyze text for AI patterns, highlight robotic vocabulary, and automatically convert it into natural, human-written text free of errors.
      </p>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Input Text
          </label>
          <div className="flex gap-2">
            {text && (
              <Button variant="outline" size="sm" onClick={copyText}>
                {copied ? <><Check className="h-3.5 w-3.5 mr-1 text-emerald-400" /> Copied</> : <><Copy className="h-3.5 w-3.5 mr-1" /> Copy</>}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={clear} disabled={!text}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
            </Button>
          </div>
        </div>
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste text here to analyze for AI patterns and humanize..."
          rows={8}
          className="text-sm leading-relaxed font-sans"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span>{text.split(/\s+/).filter(Boolean).length} words · {text.length} characters</span>
          {text.trim() && (
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg" onClick={handleHumanize}>
              <Sparkles className="h-4 w-4 mr-1.5" /> Humanize & Correct Text
            </Button>
          )}
        </div>
      </div>

      {result && result.score > 0 && (
        <div className="space-y-5">
          <div className="p-6 rounded-2xl border border-border bg-card/50 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">AI Detection Score</p>
                <p className="text-3xl font-bold text-foreground">{result.score}%</p>
              </div>
              <div className={`px-4 py-2 rounded-xl text-sm font-bold text-white ${result.color}`}>
                {result.label}
              </div>
            </div>

            <div className="h-3 rounded-full bg-secondary overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${result.color}`}
                style={{ width: `${result.score}%` }}
              />
            </div>

            {result.flaggedWords.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border/60">
                <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="h-3.5 w-3.5" /> Flagged AI Words / Buzzwords
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.flaggedWords.map(word => (
                    <span key={word} className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                      "{word}" → <span className="text-emerald-400 font-semibold">{AI_PHRASES[word]}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-border/60">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Analysis Breakdown</p>
              {result.reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5 shrink-0">•</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-bold text-foreground">Want to make this text 100% human-sounding?</p>
              <p className="text-xs text-muted-foreground">Click Humanize to swap robotic words for natural phrasing and fix grammar instantly.</p>
            </div>
            <Button size="sm" onClick={handleHumanize} className="bg-primary text-primary-foreground font-semibold">
              <Sparkles className="h-4 w-4 mr-1.5" /> Fix & Humanize Now
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
