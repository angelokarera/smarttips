import { useState } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const EASINGS = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)']
const ANIMATIONS = ['fade', 'slide-up', 'slide-down', 'scale', 'rotate', 'bounce', 'pulse']

const KEYFRAMES: Record<string, string> = {
  fade: `@keyframes fade {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}`,
  'slide-up': `@keyframes slide-up {\n  from { opacity: 0; transform: translateY(30px); }\n  to { opacity: 1; transform: translateY(0); }\n}`,
  'slide-down': `@keyframes slide-down {\n  from { opacity: 0; transform: translateY(-30px); }\n  to { opacity: 1; transform: translateY(0); }\n}`,
  scale: `@keyframes scale {\n  from { transform: scale(0.5); opacity: 0; }\n  to { transform: scale(1); opacity: 1; }\n}`,
  rotate: `@keyframes rotate {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`,
  bounce: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-30px); }\n}`,
  pulse: `@keyframes pulse {\n  0%, 100% { transform: scale(1); opacity: 1; }\n  50% { transform: scale(1.15); opacity: 0.7; }\n}`,
}

export default function CssAnimationGenerator() {
  const [animName, setAnimName] = useState('fade')
  const [duration, setDuration] = useState(1.0)
  const [easing, setEasing] = useState('ease')
  const [delay, setDelay] = useState(0)
  const [iterCount, setIterCount] = useState('1')
  const [direction, setDirection] = useState('normal')
  const [fillMode, setFillMode] = useState('both')
  const [key, setKey] = useState(0)

  const animValue = `${animName} ${duration}s ${easing} ${delay}s ${iterCount} ${direction} ${fillMode}`
  const fullCss = `${KEYFRAMES[animName]}\n\n.element {\n  animation: ${animValue};\n}`

  const replay = () => setKey(k => k + 1)
  const copy = () => { navigator.clipboard.writeText(fullCss); toast.success('CSS copied!') }
  const reset = () => { setAnimName('fade'); setDuration(1); setEasing('ease'); setDelay(0); setIterCount('1'); setDirection('normal'); setFillMode('both'); setKey(k => k + 1) }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Build CSS animations visually. Pick a preset, adjust timing and iteration, then copy the complete @keyframes code.
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-4 bg-card/45 p-5 rounded-xl border border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider">Animation Properties</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">animation-name (preset)</label>
            <select value={animName} onChange={e => setAnimName(e.target.value)}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary">
              {ANIMATIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>duration</span><span className="text-primary font-mono">{duration}s</span>
            </label>
            <input type="range" min="0.1" max="5" step="0.1" value={duration} onChange={e => setDuration(Number(e.target.value))}
              className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">timing-function</label>
            <select value={easing} onChange={e => setEasing(e.target.value)}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary">
              {EASINGS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>delay</span><span className="text-primary font-mono">{delay}s</span>
            </label>
            <input type="range" min="0" max="3" step="0.1" value={delay} onChange={e => setDelay(Number(e.target.value))}
              className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">iteration-count</label>
            <select value={iterCount} onChange={e => setIterCount(e.target.value)}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary">
              {['1', '2', '3', '5', 'infinite'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">direction</label>
            <select value={direction} onChange={e => setDirection(e.target.value)}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary">
              {['normal', 'reverse', 'alternate', 'alternate-reverse'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">fill-mode</label>
            <select value={fillMode} onChange={e => setFillMode(e.target.value)}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary">
              {['none', 'forwards', 'backwards', 'both'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Live Preview</h3>
              <Button variant="outline" size="sm" onClick={replay}>▶ Replay</Button>
            </div>
            <div className="bg-slate-900/60 border border-border rounded-xl min-h-[220px] flex items-center justify-center">
              <div
                key={key}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold text-sm"
                style={{ animation: animValue }}
              >
                {animName}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Generated CSS</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1" />Copy All</Button>
                <Button variant="outline" size="sm" onClick={reset}><RotateCcw className="h-3.5 w-3.5 mr-1" />Reset</Button>
              </div>
            </div>
            <pre className="p-4 rounded-xl border border-border bg-card font-mono text-xs leading-relaxed overflow-x-auto text-primary">
              <code>{fullCss}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
