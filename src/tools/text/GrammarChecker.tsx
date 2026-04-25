import { useState } from 'react'
import { Copy, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const commonErrors: [RegExp, string, string][] = [
  [/\btheir\s+(is|was|are|were)\b/gi, "there $1", "'their' should be 'there' before verbs"],
  [/\bthere\s+(car|house|book|idea|name|dog|cat|work)\b/gi, "their $1", "'there' should be 'their' for possession"],
  [/\byour\s+(welcome|right|wrong|correct)\b/gi, "you're $1", "'your' should be 'you're'"],
  [/\byou're\s+(car|house|book|idea|name|dog|cat|work)\b/gi, "your $1", "'you're' should be 'your' for possession"],
  [/\bits\s+(a|an|the|is|was)\b/gi, "it's $1", "'its' should be 'it's'"],
  [/\bcould of\b/gi, "could have", "'could of' should be 'could have'"],
  [/\bwould of\b/gi, "would have", "'would of' should be 'would have'"],
  [/\bshould of\b/gi, "should have", "'should of' should be 'should have'"],
  [/\balot\b/gi, "a lot", "'alot' should be 'a lot'"],
  [/\bdefinately\b/gi, "definitely", "Spelling: 'definitely'"],
  [/\boccured\b/gi, "occurred", "Spelling: 'occurred'"],
  [/\brecieve\b/gi, "receive", "Spelling: 'receive'"],
  [/\bseperate\b/gi, "separate", "Spelling: 'separate'"],
  [/\baccommodate\b/gi, "accommodate", "Spelling check"],
  [/\boccasion\b/gi, "occasion", "Spelling check"],
  [/\bneccessary\b/gi, "necessary", "Spelling: 'necessary'"],
  [/\bteh\b/gi, "the", "Typo: 'teh' → 'the'"],
  [/\badn\b/gi, "and", "Typo: 'adn' → 'and'"],
  [/\bwhic\b/gi, "which", "Typo: 'whic' → 'which'"],
  [/\s{2,}/g, " ", "Multiple spaces"],
  [/\.\s*\./g, ".", "Double periods"],
]

interface Issue {
  original: string
  suggestion: string
  reason: string
  index: number
}

export default function GrammarChecker() {
  const [text, setText] = useState('')
  const [issues, setIssues] = useState<Issue[]>([])
  const [corrected, setCorrected] = useState('')
  const [checked, setChecked] = useState(false)

  const checkGrammar = () => {
    const found: Issue[] = []
    let fixed = text
    for (const [pattern, replacement, reason] of commonErrors) {
      const matches = text.matchAll(new RegExp(pattern))
      for (const match of matches) {
        found.push({
          original: match[0],
          suggestion: match[0].replace(pattern, replacement),
          reason,
          index: match.index || 0,
        })
      }
      fixed = fixed.replace(pattern, replacement)
    }
    // Capitalize first letter of sentences
    fixed = fixed.replace(/(^|[.!?]\s+)([a-z])/g, (_, pre, letter) => pre + letter.toUpperCase())
    setIssues(found)
    setCorrected(fixed)
    setChecked(true)
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Your Text</label>
          <Textarea
            placeholder="Paste your text here to check for grammar and spelling issues..."
            value={text}
            onChange={(e) => { setText(e.target.value); setChecked(false) }}
            className="min-h-[280px] text-base leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Corrected Text</label>
          <Textarea
            readOnly
            value={corrected}
            placeholder="Corrected text appears here..."
            className="min-h-[280px] text-base leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={checkGrammar} disabled={!text.trim()}>
          <CheckCircle2 className="h-4 w-4 mr-2" /> Check Grammar
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(corrected)} disabled={!corrected}>
          <Copy className="h-4 w-4 mr-2" /> Copy Corrected
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setText(''); setCorrected(''); setIssues([]); setChecked(false) }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>

      {checked && (
        <div className="p-4 rounded-xl border border-border bg-card">
          {issues.length === 0 ? (
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">No issues found. Your text looks good!</span>
            </div>
          ) : (
            <>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                {issues.length} issue{issues.length > 1 ? 's' : ''} found
              </h3>
              <div className="space-y-2">
                {issues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm p-2 rounded-lg bg-secondary/50">
                    <span className="text-red-500 line-through shrink-0">{issue.original}</span>
                    <span className="text-primary font-medium shrink-0">→ {issue.suggestion}</span>
                    <span className="text-muted-foreground text-xs mt-0.5">{issue.reason}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
