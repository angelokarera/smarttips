import { useState, useRef, useCallback } from 'react'
import { Upload, Download, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export default function BackgroundRemover() {
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [threshold, setThreshold] = useState([230])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const removeBackground = useCallback((dataUrl: string, thresh: number) => {
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2]
        if (r > thresh && g > thresh && b > thresh) {
          data[i + 3] = 0
        }
      }
      ctx.putImageData(imageData, 0, 0)
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
      removeBackground(dataUrl, threshold[0])
    }
    reader.readAsDataURL(file)
  }, [removeBackground, threshold])

  const handleThresholdChange = (val: number[]) => {
    setThreshold(val)
    if (image) removeBackground(image, val[0])
  }

  const handleDownload = () => {
    if (!result) return
    const link = document.createElement('a')
    link.download = 'background-removed.png'
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
          <p className="text-sm text-muted-foreground">Works best on images with light/white backgrounds</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" /> Choose Another
            </Button>
            <Button onClick={handleDownload} disabled={!result}>
              <Download className="h-4 w-4 mr-2" /> Download PNG
            </Button>
          </div>
          <div>
            <Label className="text-sm mb-2 block">Background sensitivity: {threshold[0]}</Label>
            <Slider value={threshold} onValueChange={handleThresholdChange} min={100} max={255} step={1} />
            <p className="text-xs text-muted-foreground mt-1">Higher = removes more near-white pixels. Lower = only pure white.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Original</p>
              <img src={image} alt="Original" className="w-full rounded-lg border border-border" />
            </div>
            {result && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Background Removed</p>
                <div className="rounded-lg border border-border overflow-hidden" style={{ backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}>
                  <img src={result} alt="Result" className="w-full" />
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
