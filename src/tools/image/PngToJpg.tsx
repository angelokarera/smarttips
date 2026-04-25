import { useState, useRef, useCallback } from 'react'
import { Upload, Download, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export default function PngToJpg() {
  const [image, setImage] = useState<string | null>(null)
  const [converted, setConverted] = useState<string | null>(null)
  const [quality, setQuality] = useState([90])
  const [fileName, setFileName] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const convert = useCallback((dataUrl: string, q: number) => {
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      canvas.width = img.width
      canvas.height = img.height
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      setConverted(canvas.toDataURL('image/jpeg', q / 100))
    }
    img.src = dataUrl
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name.replace(/\.[^.]+$/, ''))
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setImage(dataUrl)
      convert(dataUrl, quality[0])
    }
    reader.readAsDataURL(file)
  }, [convert, quality])

  const handleQualityChange = (val: number[]) => {
    setQuality(val)
    if (image) convert(image, val[0])
  }

  const handleDownload = () => {
    if (!converted) return
    const link = document.createElement('a')
    link.download = `${fileName || 'converted'}.jpg`
    link.href = converted
    link.click()
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept=".png" onChange={handleFileSelect} className="hidden" />
      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/30 hover:bg-muted/30 transition-colors">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Upload a PNG image</p>
          <p className="text-sm text-muted-foreground">We'll convert it to JPG with adjustable quality</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" /> Choose Another
            </Button>
            <Button onClick={handleDownload} disabled={!converted}>
              <Download className="h-4 w-4 mr-2" /> Download JPG
            </Button>
          </div>
          <div>
            <Label className="text-sm mb-2 block">Quality: {quality[0]}%</Label>
            <Slider value={quality} onValueChange={handleQualityChange} min={1} max={100} step={1} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Original (PNG)</p>
              <img src={image} alt="Original" className="w-full rounded-lg border border-border" />
            </div>
            {converted && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Converted (JPG)</p>
                <img src={converted} alt="Converted" className="w-full rounded-lg border border-border" />
              </div>
            )}
          </div>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
