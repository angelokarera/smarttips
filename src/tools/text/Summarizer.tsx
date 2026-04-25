import { useState } from 'react'
import { Copy, RotateCcw, Scissors } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export default function Summarizer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [ratio, setRatio] = useState([40])

  const summarize = () => {
    if (!input.trim()) return
    const sentences = input.match(/[^.!?]+[.!?]+/g) || [input]
    if (sentences.length <= 1) { setOutput(input); return }

    // Score sentences by position and word count
    const scored = sentences.map((s, i) => {
      const words = s.trim().split(/\s+/).length
      const positionScore = i === 0 ? 3 : i === sentences.length - 1 ? 2 : 1
      const lengthScore = words > 5 ? 2 : 1
      return { sentence: s.trim(), score: positionScore + lengthScore, index: i }
    })

    const keepCount = Math.max(1, Math.round(sentences.length * ratio[0] / 100))
    const sorted = [...scored].sort((a, b) => b.score - a.score).slice(0, keepCount)
    const ordered = sorted.sort((a, b) => a.index - b.index)
    setOutput(ordered.map(s => s.sentence).join(' '))
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Original Text</label>
          <Textarea
            placeholder="Paste the text you want to summarize..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[280px] text-base leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Summary</label>
          <Textarea
            readOnly
            value={output}
            placeholder="Summary will appear here..."
            className="min-h-[280px] text-base leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="max-w-sm">
        <Label className="text-sm mb-2 block">Summary length: {ratio[0]}% of original</Label>
        <Slider value={ratio} onValueChange={setRatio} min={10} max={80} step={5} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={summarize} disabled={!input.trim()}>
          <Scissors className="h-4 w-4 mr-2" /> Summarize
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setInput(''); setOutput('') }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
        {output && (
          <span className="text-sm text-muted-foreground ml-auto">
            {input.split(/\s+/).length} words → {output.split(/\s+/).length} words
          </span>
        )}
      </div>
    </div>
  )
}
