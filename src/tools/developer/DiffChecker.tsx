import { useState } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

type DiffLine =
  | { type: 'same'; text: string }
  | { type: 'added'; text: string }
  | { type: 'removed'; text: string }

function computeDiff(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n')
  const linesB = b.split('\n')

  // LCS-based diff (simple Myers-like approach)
  const m = linesA.length
  const n = linesB.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      if (linesA[i - 1] === linesB[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])

  let i = m, j = n
  const trace: DiffLine[] = []

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      trace.unshift({ type: 'same', text: linesA[i - 1] })
      i--; j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      trace.unshift({ type: 'added', text: linesB[j - 1] })
      j--
    } else {
      trace.unshift({ type: 'removed', text: linesA[i - 1] })
      i--
    }
  }

  return trace
}

export default function DiffChecker() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [diff, setDiff] = useState<DiffLine[] | null>(null)

  const compare = () => {
    setDiff(computeDiff(left, right))
    toast.success('Diff computed!')
  }

  const clear = () => { setLeft(''); setRight(''); setDiff(null) }

  const added = diff?.filter(l => l.type === 'added').length ?? 0
  const removed = diff?.filter(l => l.type === 'removed').length ?? 0

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Paste two pieces of text and find the differences. Additions are highlighted green, deletions red. All processing is in your browser.
      </p>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Original Text (A)</label>
          <Textarea value={left} onChange={e => setLeft(e.target.value)}
            placeholder="Paste the original version here..." rows={10} className="font-mono text-sm" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Modified Text (B)</label>
          <Textarea value={right} onChange={e => setRight(e.target.value)}
            placeholder="Paste the modified version here..." rows={10} className="font-mono text-sm" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={compare} disabled={!left && !right}>Compare</Button>
        <Button variant="outline" onClick={clear}><RotateCcw className="h-4 w-4 mr-2" />Clear</Button>
      </div>

      {diff && (
        <div className="space-y-3">
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
              <span className="text-emerald-400 font-medium">+{added} added</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500/50" />
              <span className="text-red-400 font-medium">−{removed} removed</span>
            </span>
          </div>

          <div className="border border-border rounded-xl overflow-hidden">
            <div className="bg-card/50 px-4 py-2 border-b border-border flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Diff Output</span>
              <Button variant="outline" size="sm" onClick={() => {
                const text = diff.map(l => `${l.type === 'added' ? '+' : l.type === 'removed' ? '-' : ' '} ${l.text}`).join('\n')
                navigator.clipboard.writeText(text)
                toast.success('Diff copied!')
              }}>
                <Copy className="h-3.5 w-3.5 mr-1" />Copy Diff
              </Button>
            </div>
            <div className="font-mono text-xs max-h-[500px] overflow-y-auto">
              {diff.map((line, i) => (
                <div key={i} className={`px-4 py-0.5 flex gap-3 ${
                  line.type === 'added' ? 'bg-emerald-500/10 text-emerald-300' :
                  line.type === 'removed' ? 'bg-red-500/10 text-red-300' :
                  'text-muted-foreground'
                }`}>
                  <span className="select-none w-4 shrink-0">
                    {line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' '}
                  </span>
                  <span className="whitespace-pre-wrap break-all">{line.text || ' '}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
