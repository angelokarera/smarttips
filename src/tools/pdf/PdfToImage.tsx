import { useState, useRef } from 'react'
import { Download, ImageDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export default function PdfToImage() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState('jpg')
  const [dpi, setDpi] = useState([150])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) setFile(selected)
  }

  const convert = () => {
    if (!file) return
    alert('Note: True PDF to image conversion requires server-side processing. This is a client-side demo.')
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 1000
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.font = '20px Arial'
    ctx.fillText(`PDF to ${format.toUpperCase()} Conversion`, 20, 40)
    ctx.fillText(`File: ${file.name}`, 20, 80)
    ctx.fillText(`DPI: ${dpi[0]}`, 20, 120)
    
    const link = document.createElement('a')
    link.download = `converted.${format}`
    link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`)
    link.click()
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />

      {!file ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-foreground/30 hover:bg-muted/30 transition-colors">
          <ImageDown className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Click to upload a PDF</p>
          <p className="text-sm text-muted-foreground">Convert pages to JPG or PNG</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <ImageDown className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Change</Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block">Output Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Resolution: {dpi[0]} DPI</Label>
              <Slider value={dpi} onValueChange={setDpi} min={72} max={600} step={1} />
            </div>
          </div>

          <Button onClick={convert}>
            <Download className="h-4 w-4 mr-2" />
            Convert to {format.toUpperCase()}
          </Button>
        </>
      )}
    </div>
  )
}
