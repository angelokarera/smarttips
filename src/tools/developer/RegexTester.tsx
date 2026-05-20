import { useState, useMemo } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { safeRegexTest, truncateInput } from '@/lib/security-utils'
import { escapeHtml } from '@/lib/sanitize'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')

  const result = useMemo(
    () => safeRegexTest(pattern, flags, truncateInput(testString)),
    [pattern, flags, testString]
  )

  const highlighted = useMemo(() => {
    if (!result.valid || !pattern || result.matchCount === 0) {
      return escapeHtml(testString)
    }
    try {
      const re = new RegExp(pattern, flags.replace(/[^gimsuy]/g, ''))
      const safe = truncateInput(testString).slice(0, 10_000)
      return safe.replace(re, (m) => `<mark class="bg-primary/30 rounded px-0.5">${escapeHtml(m)}</mark>`)
    } catch {
      return escapeHtml(testString)
    }
  }, [pattern, flags, testString, result])

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Test regular expressions safely in your browser. Pattern length and match count are limited
        to prevent performance issues.
      </p>

      <div className="grid sm:grid-cols-[1fr_auto] gap-3">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1 block">
            Pattern
          </label>
          <Input
            value={pattern}
            onChange={(e) => setPattern(e.target.value.slice(0, 500))}
            placeholder="e.g. \\w+"
            className="font-mono"
          />
        </div>
        <div className="w-24">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1 block">
            Flags
          </label>
          <Input
            value={flags}
            onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, '').slice(0, 6))}
            className="font-mono"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1 block">
          Test string
        </label>
        <Textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="min-h-[120px] font-mono text-sm"
          placeholder="Text to test against..."
        />
      </div>

      {result.error && (
        <p className="text-sm text-destructive rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2">
          {result.error}
        </p>
      )}

      {result.valid && pattern && (
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
          <p className="text-sm font-medium">
            {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
          </p>
          {result.matches.length > 0 && (
            <ul className="text-sm font-mono space-y-1">
              {result.matches.map((m, i) => (
                <li key={i} className="text-primary">
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1 block">
          Highlighted preview
        </label>
        <div
          className="min-h-[80px] rounded-xl border border-border p-4 font-mono text-sm whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: highlighted || '<span class="text-muted-foreground">—</span>' }}
        />
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigator.clipboard.writeText(result.matches.join('\n'))}
        disabled={!result.matches.length}
      >
        <Copy className="h-4 w-4 mr-2" /> Copy matches
      </Button>
    </div>
  )
}
