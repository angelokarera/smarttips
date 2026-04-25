import { useState, useRef, useCallback } from 'react'
import { Upload, Download, Maximize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [maintainAspect, setMaintainAspect] = useState(true)
  const [originalDims, setOriginalDims] = useState({ width: 0, height: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      const img = new Image()
      img.onload = () => {
        setOriginalDims({ width: img.width, height: img.height })
        setWidth(img.width)
        setHeight(img.height)
        setImage(dataUrl)
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }, [])

  const handleResize = () => {
    if (!image || !canvasRef.current) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      const ctx = canvas.getContext('2d')!
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
    }
    img.src = image
  }

  const handleDownload = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'resized-image.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-foreground/30 hover:bg-muted/30 transition-colors">
          <Maximize className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Click to upload an image</p>
          <p className="text-sm text-muted-foreground">Resize to exact dimensions</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Another
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label className="mb-2 block">Width (px)</Label>
              <Input type="number" value={width} onChange={(e) => {
                const w = Number(e.target.value)
                setWidth(w)
                if (maintainAspect && originalDims.width > 0) {
                  setHeight(Math.round(w * (originalDims.height / originalDims.width)))
                }
              }} />
            </div>
            <div>
              <Label className="mb-2 block">Height (px)</Label>
              <Input type="number" value={height} onChange={(e) => {
                const h = Number(e.target.value)
                setHeight(h)
                if (maintainAspect && originalDims.height > 0) {
                  setWidth(Math.round(h * (originalDims.width / originalDims.height)))
                }
              }} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} />
                <span className="text-sm">Maintain aspect ratio</span>
              </label>
            </div>
          </div>

          <Button onClick={handleResize}>Apply Resize</Button>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Original ({originalDims.width} x {originalDims.height})</p>
              <img src={image} alt="Original" className="w-full rounded-lg border border-border" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Resized ({width} x {height})</p>
              <canvas ref={canvasRef} className="w-full rounded-lg border border-border" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
