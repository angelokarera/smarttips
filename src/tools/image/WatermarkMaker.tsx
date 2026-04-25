import { useState, useRef, useCallback } from 'react'
import { Upload, Download, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export default function WatermarkMaker() {
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [text, setText] = useState('© Your Name')
  const [opacity, setOpacity] = useState([40])
  const [fontSize, setFontSize] = useState([32])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const applyWatermark = useCallback((dataUrl: string, wmText: string, op: number, fs: number) => {
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      ctx.save()
      ctx.globalAlpha = op / 100
      ctx.font = `bold ${fs}px Inter, sans-serif`
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      // Diagonal repeating watermark
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(-Math.PI / 6)
      const gap = fs * 4
      for (let y = -canvas.height; y < canvas.height * 2; y += gap) {
        for (let x = -canvas.width; x < canvas.width * 2; x += gap) {
          ctx.fillText(wmText, x - canvas.width / 2, y - canvas.height / 2)
        }
      }
      ctx.restore()
      setResult(canvas.toDataURL('image/png'))
    }
    img.src = dataUrl
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setImage(dataUrl)
      applyWatermark(dataUrl, text, opacity[0], fontSize[0])
    }
    reader.readAsDataURL(file)
  }, [applyWatermark, text, opacity, fontSize])

  const updateWatermark = () => {
    if (image) applyWatermark(image, text, opacity[0], fontSize[0])
  }

  const handleDownload = () => {
    if (!result) return
    const link = document.createElement('a')
    link.download = 'watermarked-image.png'
    link.href = result
    link.click()
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/30 hover:bg-muted/30 transition-colors">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Upload an image</p>
          <p className="text-sm text-muted-foreground">Add a diagonal text watermark to protect your work</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" /> Choose Another
            </Button>
            <Button onClick={handleDownload} disabled={!result}>
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Watermark Text</Label>
              <Input value={text} onChange={(e) => setText(e.target.value)} onBlur={updateWatermark} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Opacity: {opacity[0]}%</Label>
              <Slider value={opacity} onValueChange={(v) => { setOpacity(v); if (image) applyWatermark(image, text, v[0], fontSize[0]) }} min={5} max={80} step={1} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Font Size: {fontSize[0]}px</Label>
              <Slider value={fontSize} onValueChange={(v) => { setFontSize(v); if (image) applyWatermark(image, text, opacity[0], v[0]) }} min={12} max={80} step={1} />
            </div>
          </div>
          {result && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Preview</p>
              <img src={result} alt="Watermarked" className="w-full rounded-lg border border-border" />
            </div>
          )}
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
