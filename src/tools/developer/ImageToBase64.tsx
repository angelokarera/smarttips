import { useState, useRef } from 'react'
import { Upload, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function ImageToBase64() {
  const [base64, setBase64] = useState('')
  const [preview, setPreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState(0)
  const [mimeType, setMimeType] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Please upload an image file.'); return }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB.'); return }

    setFileName(file.name)
    setFileSize(file.size)
    setMimeType(file.type)

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPreview(result)
      setBase64(result)
    }
    reader.readAsDataURL(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const copy = (content: string, label: string) => {
    navigator.clipboard.writeText(content)
    toast.success(`${label} copied!`)
  }

  const rawBase64 = base64.split(',')[1] || ''

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Upload an image to convert it to a Base64-encoded string. Useful for embedding images directly in CSS, HTML, or JSON.
      </p>

      <div
        className="border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm font-medium text-foreground">Drop an image or click to upload</p>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG, WebP, GIF — max 5MB</p>
      </div>

      {base64 && (
        <div className="space-y-5">
          <div className="flex gap-4 flex-wrap">
            {preview && <img src={preview} alt="Preview" className="rounded-xl border border-border max-h-40 object-contain" />}
            <div className="text-sm space-y-1 text-muted-foreground">
              <p><strong className="text-foreground">File:</strong> {fileName}</p>
              <p><strong className="text-foreground">MIME:</strong> {mimeType}</p>
              <p><strong className="text-foreground">Original:</strong> {(fileSize / 1024).toFixed(1)} KB</p>
              <p><strong className="text-foreground">Encoded:</strong> {(rawBase64.length / 1024).toFixed(1)} KB (Base64 strings are ~33% larger)</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Data URI (for HTML/CSS src attribute)
              </label>
              <Button variant="outline" size="sm" onClick={() => copy(base64, 'Data URI')}>
                <Copy className="h-3.5 w-3.5 mr-1" />Copy Data URI
              </Button>
            </div>
            <textarea readOnly value={base64}
              rows={4} className="w-full font-mono text-xs p-3 rounded-xl border border-border bg-card text-green-400 resize-none" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Raw Base64 (without data: prefix)
              </label>
              <Button variant="outline" size="sm" onClick={() => copy(rawBase64, 'Raw Base64')}>
                <Copy className="h-3.5 w-3.5 mr-1" />Copy Raw
              </Button>
            </div>
            <textarea readOnly value={rawBase64}
              rows={4} className="w-full font-mono text-xs p-3 rounded-xl border border-border bg-card text-blue-400 resize-none" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              CSS Background-Image Usage
            </label>
            <pre className="p-3 rounded-xl border border-border bg-card font-mono text-xs text-primary overflow-x-auto">
              <code>{`.element {\n  background-image: url('${base64.substring(0, 60)}...');\n}`}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
