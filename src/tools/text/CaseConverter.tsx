import { useState } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const cases = [
  { label: 'UPPERCASE', transform: (s: string) => s.toUpperCase() },
  { label: 'lowercase', transform: (s: string) => s.toLowerCase() },
  { label: 'Title Case', transform: (s: string) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
  { label: 'Sentence case', transform: (s: string) => s.toLowerCase().replace(/(^")\s*\w/g, (c) => c.toUpperCase()) },
  { label: 'camelCase', transform: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()) },
  { label: 'PascalCase', transform: (s: string) => s.toLowerCase().replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (_, chr) => chr.toUpperCase()) },
  { label: 'snake_case', transform: (s: string) => s.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
  { label: 'kebab-case', transform: (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
]

export default function CaseConverter() {
  const [text, setText] = useState('')
  const [converted, setConverted] = useState('')
  const [activeCase, setActiveCase] = useState('')

  const convert = (label: string, transform: (s: string) => string) => {
    setConverted(transform(text))
    setActiveCase(label)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {cases.map((c) => (
          <Button
            key={c.label}
            variant={activeCase === c.label ? 'default' : 'outline'}
            size="sm"
            onClick={() => convert(c.label, c.transform)}
            disabled={!text}
          >
            {c.label}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input</label>
          <Textarea
            placeholder="Enter text to convert..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[250px]"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Output {activeCase && `(${activeCase})`}</label>
          <Textarea
            value={converted}
            readOnly
            className="min-h-[250px] bg-muted/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(converted)}
          disabled={!converted}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Result
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setText(''); setConverted(''); setActiveCase('') }}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>
    </div>
  )
}
