import { useState, useRef, useCallback } from 'react'
import { Upload, Download, ImageIcon, Crop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CropImage() {
  const [image, setImage] = useState<string | null>(null)
  const [cropped, setCropped] = useState<string | null>(null)
  const [cropX, setCropX] = useState(0)
  const [cropY, setCropY] = useState(0)
  const [cropW, setCropW] = useState(300)
  const [cropH, setCropH] = useState(300)
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setImage(dataUrl)
      setCropped(null)
      const img = new Image()
      img.onload = () => {
        setImgDims({ w: img.width, h: img.height })
        setCropW(Math.min(300, img.width))
        setCropH(Math.min(300, img.height))
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }, [])

  const handleCrop = useCallback(() => {
    if (!image) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      canvas.width = cropW
      canvas.height = cropH
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)
      setCropped(canvas.toDataURL('image/png'))
    }
    img.src = image
  }, [image, cropX, cropY, cropW, cropH])

  const handleDownload = () => {
    if (!cropped) return
    const link = document.createElement('a')
    link.download = 'cropped-image.png'
    link.href = cropped
    link.click()
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {!image ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/30 hover:bg-muted/30 transition-colors"
        >
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Upload an image to crop</p>
          <p className="text-sm text-muted-foreground">JPG, PNG, WebP supported</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" /> Choose Another
            </Button>
            <Button onClick={handleCrop}>
              <Crop className="h-4 w-4 mr-2" /> Crop Image
            </Button>
            {cropped && (
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            )}
          </div>

          <div className="grid sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">X Offset</Label>
              <Input type="number" value={cropX} onChange={(e) => setCropX(Number(e.target.value))} min={0} max={imgDims.w} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Y Offset</Label>
              <Input type="number" value={cropY} onChange={(e) => setCropY(Number(e.target.value))} min={0} max={imgDims.h} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Width</Label>
              <Input type="number" value={cropW} onChange={(e) => setCropW(Number(e.target.value))} min={1} max={imgDims.w} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Height</Label>
              <Input type="number" value={cropH} onChange={(e) => setCropH(Number(e.target.value))} min={1} max={imgDims.h} />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">Image dimensions: {imgDims.w} × {imgDims.h}px</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Original</p>
              <img src={image} alt="Original" className="w-full rounded-lg border border-border" />
            </div>
            {cropped && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Cropped</p>
                <img src={cropped} alt="Cropped" className="w-full rounded-lg border border-border" />
              </div>
            )}
          </div>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
