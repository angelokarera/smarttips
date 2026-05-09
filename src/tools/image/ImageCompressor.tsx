import { useState, useRef, useCallback } from 'react'
import { Upload, Download, ImageIcon, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null)
  const [compressed, setCompressed] = useState<string | null>(null)
  const [quality, setQuality] = useState([80])
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const compressImage = useCallback((dataUrl: string, q: number) => {
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const compressedDataUrl = canvas.toDataURL('image/jpeg', q / 100)
      setCompressed(compressedDataUrl)

      // Estimate size
      const base64Length = compressedDataUrl.split(',')[1].length
      const sizeInBytes = (base64Length * 3) / 4
      setCompressedSize(sizeInBytes)
    }
    img.src = dataUrl
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setOriginalSize(file.size)
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setImage(dataUrl)
      compressImage(dataUrl, quality[0])
    }
    reader.readAsDataURL(file)
  }, [compressImage, quality])

  const handleQualityChange = (val: number[]) => {
    setQuality(val)
    if (image) {
      compressImage(image, val[0])
    }
  }

  const handleDownload = () => {
    if (!compressed) return
    const link = document.createElement('a')
    link.download = 'compressed-image.jpg'
    link.href = compressed
    link.click()
  }

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!image ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-foreground/30 hover:bg-muted/30 transition-colors"
        >
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Click to upload an image</p>
          <p className="text-sm text-muted-foreground">JPG, PNG, WebP supported</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Another
            </Button>
            <Button variant="outline" onClick={handleDownload} disabled={!compressed}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="flex items-center gap-2">
                <Minus className="h-4 w-4" />
                Quality: {quality[0]}%
                <Plus className="h-4 w-4" />
              </Label>
              <span className="text-sm text-muted-foreground">
                {formatBytes(originalSize)} → {formatBytes(compressedSize)}
                {' '}
                ({originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(0) : 0}% smaller)
              </span>
            </div>
            <Slider value={quality} onValueChange={handleQualityChange} min={1} max={100} step={1} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Original</p>
              <img src={image} alt="Original" className="w-full rounded-lg border border-border" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Compressed</p>
              {compressed && (
                <img src={compressed} alt="Compressed" className="w-full rounded-lg border border-border" />
              )}
            </div>
          </div>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
