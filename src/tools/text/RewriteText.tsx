import { useState } from 'react'
import { Copy, RotateCcw, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const rewriteModes = [
  { id: 'formal', label: 'Formal', transform: makeFormal },
  { id: 'casual', label: 'Casual', transform: makeCasual },
  { id: 'shorter', label: 'Shorter', transform: makeShorter },
  { id: 'longer', label: 'Longer', transform: makeLonger },
]

function makeFormal(text: string): string {
  const replacements: [RegExp, string][] = [
    [/\bcan't\b/gi, 'cannot'], [/\bwon't\b/gi, 'will not'], [/\bdon't\b/gi, 'do not'],
    [/\bdoesn't\b/gi, 'does not'], [/\bisn't\b/gi, 'is not'], [/\baren't\b/gi, 'are not'],
    [/\bwasn't\b/gi, 'was not'], [/\bweren't\b/gi, 'were not'], [/\bhadn't\b/gi, 'had not'],
    [/\bhasn't\b/gi, 'has not'], [/\bhaven't\b/gi, 'have not'], [/\bwouldn't\b/gi, 'would not'],
    [/\bcouldn't\b/gi, 'could not'], [/\bshouldn't\b/gi, 'should not'],
    [/\bI'm\b/gi, 'I am'], [/\byou're\b/gi, 'you are'], [/\bthey're\b/gi, 'they are'],
    [/\bwe're\b/gi, 'we are'], [/\bit's\b/gi, 'it is'], [/\bthat's\b/gi, 'that is'],
    [/\blet's\b/gi, 'let us'], [/\bwho's\b/gi, 'who is'],
    [/\bgonna\b/gi, 'going to'], [/\bwanna\b/gi, 'want to'], [/\bgotta\b/gi, 'have to'],
    [/\bkinda\b/gi, 'kind of'], [/\blots of\b/gi, 'a significant amount of'],
    [/\ba lot\b/gi, 'considerably'], [/\bget\b/gi, 'obtain'], [/\bbig\b/gi, 'substantial'],
  ]
  let result = text
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement)
  }
  return result
}

function makeCasual(text: string): string {
  const replacements: [RegExp, string][] = [
    [/\bcannot\b/gi, "can't"], [/\bwill not\b/gi, "won't"], [/\bdo not\b/gi, "don't"],
    [/\bdoes not\b/gi, "doesn't"], [/\bis not\b/gi, "isn't"], [/\bare not\b/gi, "aren't"],
    [/\bI am\b/gi, "I'm"], [/\byou are\b/gi, "you're"], [/\bthey are\b/gi, "they're"],
    [/\bwe are\b/gi, "we're"], [/\bit is\b/gi, "it's"], [/\bthat is\b/gi, "that's"],
    [/\bgoing to\b/gi, "gonna"], [/\bwant to\b/gi, "wanna"],
    [/\bsubstantial\b/gi, 'big'], [/\bobtain\b/gi, 'get'],
    [/\bconsiderably\b/gi, 'a lot'], [/\ba significant amount of\b/gi, 'lots of'],
  ]
  let result = text
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement)
  }
  return result
}

function makeShorter(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/)
  if (sentences.length <= 2) return text
  return sentences.filter((_, i) => i % 2 === 0 || i === sentences.length - 1).join(' ')
}

function makeLonger(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/)
  return sentences.map(s => {
    const trimmed = s.trim()
    if (!trimmed) return s
    if (trimmed.endsWith('.')) return trimmed.slice(0, -1) + ', which is important to note.'
    return s
  }).join(' ')
}

export default function RewriteText() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [activeMode, setActiveMode] = useState('formal')

  const handleRewrite = () => {
    const mode = rewriteModes.find(m => m.id === activeMode)
    if (mode && input.trim()) {
      setOutput(mode.transform(input))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-2">
        {rewriteModes.map(mode => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeMode === mode.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Original Text</Label>
          <Textarea
            placeholder="Paste or type the text you want to rewrite..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[240px] text-base leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Rewritten Text</Label>
          <Textarea
            readOnly
            value={output}
            placeholder="Rewritten text will appear here..."
            className="min-h-[240px] text-base leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleRewrite} disabled={!input.trim()}>
          <RefreshCw className="h-4 w-4 mr-2" /> Rewrite
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy Result
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setInput(''); setOutput('') }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>
    </div>
  )
}
