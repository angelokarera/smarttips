import { useState } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function BorderRadiusGenerator() {
  const [tl, setTl] = useState(12)
  const [tr, setTr] = useState(12)
  const [br, setBr] = useState(12)
  const [bl, setBl] = useState(12)
  const [linked, setLinked] = useState(true)

  const setAll = (v: number) => { setTl(v); setTr(v); setBr(v); setBl(v) }

  const handleChange = (corner: 'tl' | 'tr' | 'br' | 'bl', val: number) => {
    if (linked) { setAll(val); return }
    if (corner === 'tl') setTl(val)
    if (corner === 'tr') setTr(val)
    if (corner === 'br') setBr(val)
    if (corner === 'bl') setBl(val)
  }

  const borderRadius = `${tl}px ${tr}px ${br}px ${bl}px`
  const css = `border-radius: ${borderRadius};`

  const copy = () => { navigator.clipboard.writeText(css); toast.success('Copied!') }
  const reset = () => { setAll(12); toast.success('Reset') }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Adjust the border-radius for each corner individually or together. Copy the generated CSS.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-card/45 p-5 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Corners</h3>
            <button
              onClick={() => setLinked(!linked)}
              className={`text-xs font-medium px-3 py-1 rounded-lg border transition-colors ${linked ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-muted-foreground border-border'}`}
            >
              {linked ? '🔗 Linked' : '⛓ Unlinked'}
            </button>
          </div>

          {([
            { label: 'Top Left', val: tl, corner: 'tl' as const },
            { label: 'Top Right', val: tr, corner: 'tr' as const },
            { label: 'Bottom Right', val: br, corner: 'br' as const },
            { label: 'Bottom Left', val: bl, corner: 'bl' as const },
          ]).map(({ label, val, corner }) => (
            <div key={corner} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex justify-between">
                <span>{label}</span><span className="font-mono text-primary">{val}px</span>
              </label>
              <input
                type="range" min="0" max="200" value={val}
                onChange={(e) => handleChange(corner, Number(e.target.value))}
                className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="space-y-5 flex flex-col">
          <div className="flex-1 flex items-center justify-center bg-slate-900/60 rounded-xl border border-border p-8 min-h-[220px]">
            <div
              className="w-48 h-48 bg-gradient-to-br from-primary/70 to-primary transition-all duration-300 flex items-center justify-center text-white font-semibold text-sm"
              style={{ borderRadius }}
            >
              Preview
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Generated CSS</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1" />Copy</Button>
                <Button variant="outline" size="sm" onClick={reset}><RotateCcw className="h-3.5 w-3.5 mr-1" />Reset</Button>
              </div>
            </div>
            <pre className="p-4 rounded-xl border border-border bg-card font-mono text-sm text-primary overflow-x-auto">
              <code>{css}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
