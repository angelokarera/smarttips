import { useState, useRef, useCallback } from 'react'
import { Upload, Download, ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ImageConverter() {
  const [image, setImage] = useState<string | null>(null)
  const [format, setFormat] = useState('image/png')
  const [quality, setQuality] = useState(90)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => setImage(event.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleConvert = () => {
    if (!image) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      
      const mimeType = format
      const extension = format.split('/')[1]
      
      const dataUrl = canvas.toDataURL(mimeType, quality / 100)
      const link = document.createElement('a')
      link.download = `converted.${extension}`
      link.href = dataUrl
      link.click()
    }
    img.src = image
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-foreground/30 hover:bg-muted/30 transition-colors">
          <ImagePlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Click to upload an image</p>
          <p className="text-sm text-muted-foreground">Convert between JPG, PNG, WebP, and BMP</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Another
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block">Output Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="image/png">PNG</SelectItem>
                  <SelectItem value="image/jpeg">JPEG</SelectItem>
                  <SelectItem value="image/webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Quality: {quality}%</Label>
              <input type="range" min="1" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
            </div>
          </div>

          <Button onClick={handleConvert}>
            <Download className="h-4 w-4 mr-2" />
            Convert & Download
          </Button>

          <img src={image} alt="Preview" className="max-w-md rounded-lg border border-border" />
        </>
      )}
    </div>
  )
}
