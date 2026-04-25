import { useState, useRef } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export default function ColorPicker() {
  const [color, setColor] = useState('#E8613C')
  const pickerRef = useRef<HTMLInputElement>(null)

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 }

  const formats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '' },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'CSS Variable', value: `${hsl.h} ${hsl.s}% ${hsl.l}%` },
  ]

  // Generate palette variations
  const shades = [95, 85, 70, 55, 40, 30, 20, 10].map(l => hslToHex(hsl.h, hsl.s, l))
  const complements = [
    hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 330) % 360, hsl.s, hsl.l),
  ]

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Picker */}
        <div className="space-y-4">
          <div
            className="w-full aspect-video rounded-2xl border border-border cursor-pointer relative overflow-hidden"
            style={{ backgroundColor: color }}
            onClick={() => pickerRef.current?.click()}
          >
            <input
              ref={pickerRef}
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur text-white text-sm font-mono font-medium">
              {color.toUpperCase()}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Enter HEX color</Label>
            <Input
              value={color}
              onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setColor(e.target.value) }}
              className="font-mono"
              maxLength={7}
            />
          </div>
        </div>

        {/* Values */}
        <div className="space-y-3">
          {formats.map((fmt) => (
            <div key={fmt.label} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold w-20 shrink-0">{fmt.label}</span>
              <code className="flex-1 text-sm font-mono truncate">{fmt.value}</code>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(fmt.value)} className="shrink-0 h-8 w-8 p-0">
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Shades */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Shades</h3>
        <div className="flex rounded-xl overflow-hidden border border-border">
          {shades.map((shade, i) => (
            <button
              key={i}
              className="flex-1 h-14 transition-transform hover:scale-y-110 origin-bottom"
              style={{ backgroundColor: shade }}
              onClick={() => { setColor(shade); copyToClipboard(shade) }}
              title={shade}
            />
          ))}
        </div>
      </div>

      {/* Complements */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Complementary Colors</h3>
        <div className="flex gap-2">
          {complements.map((c, i) => (
            <button
              key={i}
              className="flex-1 h-14 rounded-xl border border-border transition-transform hover:scale-105"
              style={{ backgroundColor: c }}
              onClick={() => { setColor(c); copyToClipboard(c) }}
              title={c}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
