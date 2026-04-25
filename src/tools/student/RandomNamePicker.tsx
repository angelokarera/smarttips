import { useState } from 'react'
import { Shuffle, Copy, RotateCcw, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function RandomNamePicker() {
  const [namesText, setNamesText] = useState('')
  const [picked, setPicked] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const names = namesText.split('\n').map(n => n.trim()).filter(Boolean)

  const pickRandom = () => {
    if (names.length === 0) return
    setIsAnimating(true)
    setPicked(null)

    let count = 0
    const interval = setInterval(() => {
      setPicked(names[Math.floor(Math.random() * names.length)])
      count++
      if (count > 15) {
        clearInterval(interval)
        const final = names[Math.floor(Math.random() * names.length)]
        setPicked(final)
        setHistory(h => [final, ...h].slice(0, 20))
        setIsAnimating(false)
      }
    }, 80)
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Names (one per line)</label>
          <Textarea
            placeholder={"Alice\nBob\nCharlie\nDiana\nEdward"}
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
            className="min-h-[240px] text-base leading-relaxed resize-y"
          />
          <p className="text-xs text-muted-foreground">{names.length} name{names.length !== 1 ? 's' : ''} entered</p>
        </div>

        <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-border bg-card min-h-[280px]">
          {picked ? (
            <div className={`text-center ${isAnimating ? 'animate-pulse' : ''}`}>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {isAnimating ? 'Picking...' : 'Selected'}
              </p>
              <p className={`text-3xl sm:text-4xl font-extrabold ${isAnimating ? 'text-muted-foreground' : 'text-primary'} transition-colors`}>
                {picked}
              </p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <Shuffle className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Add names and click Pick to get started</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={pickRandom} disabled={names.length === 0 || isAnimating} className="rounded-xl">
          <Shuffle className="h-4 w-4 mr-2" /> Pick Random Name
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setNamesText(''); setPicked(null); setHistory([]) }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      {history.length > 0 && (
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold mb-2">Pick History</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((name, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs bg-secondary font-medium">
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
