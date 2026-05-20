import { useState, useMemo } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

export default function BoxShadowGenerator() {
  const [x, setX] = useState([0])
  const [y, setY] = useState([8])
  const [blur, setBlur] = useState([24])
  const [spread, setSpread] = useState([0])
  const [opacity, setOpacity] = useState([15])

  const css = useMemo(() => {
    const alpha = opacity[0] / 100
    return `box-shadow: ${x[0]}px ${y[0]}px ${blur[0]}px ${spread[0]}px rgba(0, 0, 0, ${alpha});`
  }, [x, y, blur, spread, opacity])

  const previewStyle = useMemo(
    () => ({
      boxShadow: `${x[0]}px ${y[0]}px ${blur[0]}px ${spread[0]}px rgba(0, 0, 0, ${opacity[0] / 100})`,
    }),
    [x, y, blur, spread, opacity]
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center h-56 rounded-2xl bg-secondary/50">
        <div
          className="h-32 w-48 rounded-xl bg-card border border-border"
          style={previewStyle}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <SliderRow label="Offset X" value={x} onChange={setX} min={-50} max={50} />
        <SliderRow label="Offset Y" value={y} onChange={setY} min={-50} max={50} />
        <SliderRow label="Blur" value={blur} onChange={setBlur} min={0} max={80} />
        <SliderRow label="Spread" value={spread} onChange={setSpread} min={-30} max={30} />
        <SliderRow label="Opacity %" value={opacity} onChange={setOpacity} min={0} max={100} />
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm">{css}</div>

      <Button variant="outline" onClick={() => navigator.clipboard.writeText(css)}>
        <Copy className="h-4 w-4 mr-2" /> Copy CSS
      </Button>
    </div>
  )
}

function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string
  value: number[]
  onChange: (v: number[]) => void
  min: number
  max: number
}) {
  return (
    <div>
      <Label className="mb-2 block">
        {label}: {value[0]}
      </Label>
      <Slider value={value} onValueChange={onChange} min={min} max={max} step={1} />
    </div>
  )
}
