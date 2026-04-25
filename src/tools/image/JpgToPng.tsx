import { useState, useRef, useCallback } from 'react'
import { Upload, Download, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function JpgToPng() {
  const [image, setImage] = useState<string | null>(null)
  const [converted, setConverted] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name.replace(/\.[^.]+$/, ''))
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setImage(dataUrl)
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        setConverted(canvas.toDataURL('image/png'))
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDownload = () => {
    if (!converted) return
    const link = document.createElement('a')
    link.download = `${fileName || 'converted'}.png`
    link.href = converted
    link.click()
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept=".jpg,.jpeg" onChange={handleFileSelect} className="hidden" />
      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/30 hover:bg-muted/30 transition-colors">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Upload a JPG image</p>
          <p className="text-sm text-muted-foreground">We'll convert it to PNG instantly</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" /> Choose Another
            </Button>
            <Button onClick={handleDownload} disabled={!converted}>
              <Download className="h-4 w-4 mr-2" /> Download PNG
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Original (JPG)</p>
              <img src={image} alt="Original" className="w-full rounded-lg border border-border" />
            </div>
            {converted && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Converted (PNG)</p>
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
