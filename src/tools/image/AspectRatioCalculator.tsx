import { useState } from 'react'

const PRESETS = [
  { label: '16:9', w: 16, h: 9 },
  { label: '4:3', w: 4, h: 3 },
  { label: '1:1', w: 1, h: 1 },
  { label: '9:16', w: 9, h: 16 },
  { label: '21:9', w: 21, h: 9 },
  { label: '3:2', w: 3, h: 2 },
  { label: '2:3', w: 2, h: 3 },
  { label: '4:5', w: 4, h: 5 },
]

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState<string>('1920')
  const [height, setHeight] = useState<string>('1080')
  const [scaleWidth, setScaleWidth] = useState<string>('1280')

  const w = parseInt(width) || 0
  const h = parseInt(height) || 0
  const sw = parseInt(scaleWidth) || 0

  const divisor = w > 0 && h > 0 ? gcd(w, h) : 1
  const ratioW = w / divisor
  const ratioH = h / divisor
  const scaledH = sw > 0 && ratioW > 0 ? Math.round((sw / ratioW) * ratioH) : 0

  const applyPreset = (pw: number, ph: number) => {
    const scale = 100
    setWidth(String(pw * scale))
    setHeight(String(ph * scale))
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Enter a width and height to calculate the exact aspect ratio. Also find the scaled height for any new width.
      </p>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Common Presets</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(({ label, w: pw, h: ph }) => (
            <button key={label} onClick={() => applyPreset(pw, ph)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-secondary hover:bg-secondary/60 hover:border-primary/40 transition-colors">
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Width (px)</label>
          <input type="number" value={width} onChange={e => setWidth(e.target.value)} min="1"
            className="w-full bg-secondary text-foreground text-sm rounded-xl px-4 py-2.5 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary font-mono" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Height (px)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} min="1"
            className="w-full bg-secondary text-foreground text-sm rounded-xl px-4 py-2.5 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary font-mono" />
        </div>
      </div>

      {w > 0 && h > 0 && (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-primary/30 bg-primary/10 text-center">
            <p className="text-3xl font-bold text-primary">{ratioW}:{ratioH}</p>
            <p className="text-xs text-muted-foreground mt-1">Aspect Ratio</p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card/50 text-center">
            <p className="text-3xl font-bold text-foreground">{(w / h).toFixed(4)}</p>
            <p className="text-xs text-muted-foreground mt-1">Decimal Ratio (W÷H)</p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card/50 text-center">
            <p className="text-3xl font-bold text-foreground">{(h / w).toFixed(4)}</p>
            <p className="text-xs text-muted-foreground mt-1">Inverse Ratio (H÷W)</p>
          </div>
        </div>
      )}

      <div className="p-5 rounded-xl border border-border bg-card/45 space-y-3">
        <h3 className="text-sm font-semibold">Scale to New Width</h3>
        <p className="text-xs text-muted-foreground">Enter a new width to calculate the proportional height that maintains the same ratio.</p>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-1.5 flex-1 min-w-[140px]">
            <label className="text-xs font-medium text-muted-foreground">New Width (px)</label>
            <input type="number" value={scaleWidth} onChange={e => setScaleWidth(e.target.value)} min="1"
              className="w-full bg-secondary text-foreground text-sm rounded-xl px-4 py-2.5 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary font-mono" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-[140px]">
            <label className="text-xs font-medium text-muted-foreground">Calculated Height</label>
            <div className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-2.5 font-bold text-primary font-mono">
              {scaledH > 0 ? `${scaledH}px` : '—'}
            </div>
          </div>
        </div>
        {sw > 0 && scaledH > 0 && (
          <p className="text-sm text-muted-foreground">
            → <strong className="text-foreground">{sw}×{scaledH}px</strong> maintains the <strong className="text-foreground">{ratioW}:{ratioH}</strong> aspect ratio.
          </p>
        )}
      </div>
    </div>
  )
}
