import { useState, useCallback } from 'react'
import { RefreshCw, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

const subjects = [
  'The developer',
  'A curious student',
  'Every creator',
  'The small team',
  'Your next project',
  'A thoughtful writer',
  'The morning routine',
  'Smart tools',
]
const verbs = [
  'improves',
  'transforms',
  'simplifies',
  'accelerates',
  'clarifies',
  'supports',
  'inspires',
  'organizes',
]
const objects = [
  'daily workflows',
  'complex ideas',
  'browser-based tasks',
  'creative experiments',
  'learning goals',
  'productivity habits',
  'digital content',
  'focused work sessions',
]
const extras = [
  'without collecting personal data.',
  'entirely in the browser.',
  'with clear, practical steps.',
  'for writers, students, and teams.',
  'while keeping privacy first.',
  'using simple, rule-based logic.',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function RandomSentenceGenerator() {
  const [sentence, setSentence] = useState('')
  const [count, setCount] = useState(1)

  const generate = useCallback(() => {
    const lines: string[] = []
    for (let i = 0; i < count; i++) {
      lines.push(`${pick(subjects)} ${pick(verbs)} ${pick(objects)} ${pick(extras)}`)
    }
    setSentence(lines.join('\n'))
  }, [count])

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Rule-based sentence generator for writing prompts and placeholders. No AI APIs — purely
        random word combinations.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium">
          Sentences:{' '}
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="ml-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
          >
            {[1, 3, 5, 10].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <Button onClick={generate}>
          <RefreshCw className="h-4 w-4 mr-2" /> Generate
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(sentence)}
          disabled={!sentence}
        >
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
      </div>

      <div className="min-h-[160px] rounded-xl border border-border bg-muted/30 p-6">
        {sentence ? (
          <p className="text-base leading-relaxed whitespace-pre-wrap">{sentence}</p>
        ) : (
          <p className="text-muted-foreground text-sm">Click Generate to create a random sentence.</p>
        )}
      </div>
    </div>
  )
}
