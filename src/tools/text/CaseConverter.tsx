import { useState } from 'react'
import { Copy, RotateCcw, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ViralResultCard } from '@/components/tools/ViralResultCard'
import { recordToolRun } from '@/lib/analyticsStore'

const cases = [
  {
    label: 'UPPERCASE',
    emoji: '🔠',
    transform: (s: string) => s.toUpperCase(),
  },
  {
    label: 'lowercase',
    emoji: '🔡',
    transform: (s: string) => s.toLowerCase(),
  },
  {
    label: 'Title Case',
    emoji: '📖',
    transform: (s: string) =>
      s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    label: 'Sentence Case',
    emoji: '✍️',
    transform: (s: string) =>
      s.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase()),
  },
  {
    label: 'Toggle Case',
    emoji: '🔄',
    transform: (s: string) =>
      s
        .split('')
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join(''),
  },
  {
    label: 'camelCase',
    emoji: '🐪',
    transform: (s: string) =>
      s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()),
  },
  {
    label: 'PascalCase',
    emoji: '🏛️',
    transform: (s: string) =>
      s.toLowerCase().replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (_, chr) => chr.toUpperCase()),
  },
  {
    label: 'snake_case',
    emoji: '🐍',
    transform: (s: string) =>
      s
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, ''),
  },
  {
    label: 'kebab-case',
    emoji: '🍢',
    transform: (s: string) =>
      s
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
  },
]

export default function CaseConverter() {
  const [text, setText] = useState('')
  const [converted, setConverted] = useState('')
  const [activeCase, setActiveCase] = useState('')
  const [activeEmoji, setActiveEmoji] = useState('🔠')
  const [showResult, setShowResult] = useState(false)

  const convert = (label: string, emoji: string, transform: (s: string) => string) => {
    const result = transform(text)
    setConverted(result)
    setActiveCase(label)
    setActiveEmoji(emoji)
    setShowResult(true)
    recordToolRun('case-converter')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(converted)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy text.')
    }
  }

  const handleClear = () => {
    setText('')
    setConverted('')
    setActiveCase('')
    setShowResult(false)
  }

  const wordCount = converted.split(/\s+/).filter(Boolean).length
  const charCount = converted.length

  const resultSummary = converted
    ? `Format: ${activeCase} | Words: ${wordCount} | Characters: ${charCount}\n\nPreview: "${converted.slice(0, 120)}${converted.length > 120 ? '...' : ''}"`
    : ''

  const emotionalLabel = activeCase
    ? `Text converted to ${activeCase}!`
    : 'Choose a case format below'

  return (
    <div className="space-y-6">
      {/* Case Format Buttons */}
      <div className="flex flex-wrap gap-2">
        {cases.map((c) => (
          <Button
            key={c.label}
            variant={activeCase === c.label ? 'default' : 'outline'}
            size="sm"
            onClick={() => convert(c.label, c.emoji, c.transform)}
            disabled={!text}
            className="gap-1.5 transition-all"
          >
            <span>{c.emoji}</span>
            {c.label}
          </Button>
        ))}
      </div>

      {/* Input / Output */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <Type className="h-4 w-4" /> Input Text
          </label>
          <Textarea
            placeholder="Enter or paste your text here..."
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              if (activeCase) {
                const caseObj = cases.find((c) => c.label === activeCase)
                if (caseObj) {
                  const result = caseObj.transform(e.target.value)
                  setConverted(result)
                }
              }
            }}
            className="min-h-[250px] font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            {text.split(/\s+/).filter(Boolean).length} words · {text.length} characters
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground">
            Output {activeCase && <span className="text-primary font-bold">({activeCase})</span>}
          </label>
          <Textarea
            value={converted}
            readOnly
            placeholder="Converted text will appear here..."
            className="min-h-[250px] font-mono text-sm bg-muted/30"
          />
          {converted && (
            <p className="text-xs text-muted-foreground">
              {wordCount} words · {charCount} characters
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          onClick={copyToClipboard}
          disabled={!converted}
          className="gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy Result
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Clear
        </Button>
      </div>

      {/* Viral Result Card */}
      {showResult && converted && (
        <ViralResultCard
          toolId="case-converter"
          toolName="Case Converter"
          toolPath="/tools/case-converter"
          resultSummary={resultSummary}
          emotionalLabel={emotionalLabel}
          emoji={activeEmoji}
        />
      )}
    </div>
  )
}
