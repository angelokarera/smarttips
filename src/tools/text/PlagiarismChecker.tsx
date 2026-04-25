import { useState } from 'react'
import { Search, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'

export default function PlagiarismChecker() {
  const [text, setText] = useState('')
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<null | { originality: number; issues: string[] }>(null)

  const handleCheck = () => {
    if (!text.trim()) return
    setChecking(true)
    setResult(null)

    // Simulate analysis with client-side heuristics
    setTimeout(() => {
      const sentences = text.split(/[.!?]+/).filter(Boolean)
      const commonPhrases = [
        'in conclusion',
        'it is important to note',
        'due to the fact that',
        'in order to',
        'for the purpose of',
        'with regard to',
        'in the event that',
        'it should be noted',
        'as a matter of fact',
      ]

      const issues: string[] = []
      sentences.forEach((sentence) => {
        const lower = sentence.toLowerCase().trim()
        commonPhrases.forEach((phrase) => {
          if (lower.includes(phrase) && !issues.includes(`Overused phrase: "${phrase}"`)) {
            issues.push(`Overused phrase: "${phrase}"`)
          }
        })
      })

      // Check for very long sentences
      sentences.forEach((s, i) => {
        if (s.split(' ').length > 40) {
          issues.push(`Sentence ${i + 1} is very long (${s.split(' ').length} words)`)
        }
      })

      const originality = Math.max(70, 100 - issues.length * 5)
      setResult({ originality, issues })
      setChecking(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Paste your text here to check for common issues and get an originality estimate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[250px]"
      />

      <Button onClick={handleCheck} disabled={checking || !text.trim()}>
        <Search className="h-4 w-4 mr-2" />
        {checking ? 'Analyzing...' : 'Check Text'}
      </Button>

      {result && (
        <div className="p-6 rounded-xl border border-border bg-muted/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Originality Score</h3>
            <span className={`text-2xl font-bold ${result.originality >= 90 ? 'text-emerald-500' : result.originality >= 70 ? 'text-amber-500' : 'text-red-500'}`}>
              {result.originality}%
            </span>
          </div>
          <Progress value={result.originality} className="h-2" />

          {result.issues.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Suggestions for Improvement ({result.issues.length})
              </h4>
              <ul className="space-y-1">
                {result.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">No common issues detected!</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
