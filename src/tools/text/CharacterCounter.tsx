import { useState, useMemo } from 'react'
import { Copy, RotateCcw, Hash, Type, AlignLeft, Space } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function CharacterCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split('\n').length : 0
    const spaces = text.split(' ').length - 1
    const letters = (text.match(/[a-zA-Z]/g) || []).length
    const digits = (text.match(/[0-9]/g) || []).length
    const special = chars - letters - digits - spaces - (text.split('\n').length - 1)
    return { chars, charsNoSpaces, words, lines, spaces, letters, digits, special: Math.max(0, special) }
  }, [text])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={Hash} label="Characters" value={stats.chars} />
        <StatCard icon={Type} label="No Spaces" value={stats.charsNoSpaces} />
        <StatCard icon={AlignLeft} label="Words" value={stats.words} />
        <StatCard icon={Space} label="Lines" value={stats.lines} />
      </div>

      <Textarea
        placeholder="Type or paste your text here to count characters..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[280px] text-base leading-relaxed resize-y"
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(text)} disabled={!text}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => setText('')} disabled={!text}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>

      {text && (
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold mb-3">Breakdown</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div><span className="text-muted-foreground">Letters:</span> <span className="font-medium">{stats.letters}</span></div>
            <div><span className="text-muted-foreground">Digits:</span> <span className="font-medium">{stats.digits}</span></div>
            <div><span className="text-muted-foreground">Spaces:</span> <span className="font-medium">{stats.spaces}</span></div>
            <div><span className="text-muted-foreground">Special:</span> <span className="font-medium">{stats.special}</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
