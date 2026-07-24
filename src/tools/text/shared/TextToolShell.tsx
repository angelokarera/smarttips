import { useState } from 'react'
import { Copy, RotateCcw, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface TextToolShellProps {
  /** Pure function that turns the input text into the output text. */
  transform: (input: string) => string
  /** Label for the action button. */
  actionLabel?: string
  /** When true, output recomputes as you type. When false, only on button click. */
  live?: boolean
  inputLabel?: string
  outputLabel?: string
  placeholder?: string
  outputPlaceholder?: string
  /** Optional footer summary, e.g. "12 lines → 9 lines". */
  stats?: (input: string, output: string) => string | null
}

export function TextToolShell({
  transform,
  actionLabel = 'Convert',
  live = true,
  inputLabel = 'Input',
  outputLabel = 'Result',
  placeholder = 'Type or paste your text here...',
  outputPlaceholder = 'Result will appear here...',
  stats,
}: TextToolShellProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleInput = (value: string) => {
    setInput(value)
    if (live) setOutput(value ? transform(value) : '')
  }

  const run = () => {
    if (!input) return
    setOutput(transform(input))
  }

  const clear = () => {
    setInput('')
    setOutput('')
  }

  const summary = stats ? stats(input, output) : null

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            {inputLabel}
          </label>
          <Textarea
            placeholder={placeholder}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            className="min-h-[280px] font-mono text-sm leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            {outputLabel}
          </label>
          <Textarea
            readOnly
            value={output}
            placeholder={outputPlaceholder}
            className="min-h-[280px] font-mono text-sm leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {!live && (
          <Button onClick={run} disabled={!input}>
            <Wand2 className="h-4 w-4 mr-2" /> {actionLabel}
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(output)}
          disabled={!output}
        >
          <Copy className="h-4 w-4 mr-2" /> Copy Result
        </Button>
        <Button variant="outline" size="sm" onClick={clear} disabled={!input && !output}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
        {summary && <span className="text-sm text-muted-foreground ml-auto">{summary}</span>}
      </div>
    </div>
  )
}
