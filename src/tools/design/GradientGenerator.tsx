import { useState, useMemo } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

export default function GradientGenerator() {
  const [color1, setColor1] = useState('#e85d04')
  const [color2, setColor2] = useState('#0077b6')
  const [angle, setAngle] = useState([135])
  const [type, setType] = useState<'linear' | 'radial'>('linear')

  const css = useMemo(() => {
    if (type === 'linear') {
      return `background: linear-gradient(${angle[0]}deg, ${color1}, ${color2});`
    }
    return `background: radial-gradient(circle, ${color1}, ${color2});`
  }, [color1, color2, angle, type])

  return (
    <div className="space-y-6">
      <div
        className="h-48 rounded-2xl border border-border shadow-inner"
        style={{ background: type === 'linear' ? `linear-gradient(${angle[0]}deg, ${color1}, ${color2})` : `radial-gradient(circle, ${color1}, ${color2})` }}
      />

      <div className="flex gap-2">
        {(['linear', 'radial'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
              type === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block">Color 1</Label>
          <div className="flex gap-2">
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="h-10 w-14 rounded cursor-pointer" />
            <Input value={color1} onChange={(e) => setColor1(e.target.value)} className="font-mono" />
          </div>
        </div>
        <div>
          <Label className="mb-2 block">Color 2</Label>
          <div className="flex gap-2">
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="h-10 w-14 rounded cursor-pointer" />
            <Input value={color2} onChange={(e) => setColor2(e.target.value)} className="font-mono" />
          </div>
        </div>
      </div>

      {type === 'linear' && (
        <div>
          <Label className="mb-2 block">Angle: {angle[0]}°</Label>
          <Slider value={angle} onValueChange={setAngle} min={0} max={360} step={1} />
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm break-all">
        {css}
      </div>

      <Button variant="outline" onClick={() => navigator.clipboard.writeText(css)}>
        <Copy className="h-4 w-4 mr-2" /> Copy CSS
      </Button>
    </div>
  )
}
