import { useState, useRef } from 'react'
import { Download, FileType } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import jsPDF from 'jspdf'

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null)
  const [preserveImages, setPreserveImages] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) setFile(selected)
  }

  const convert = () => {
    if (!file) return
    alert('Note: True PDF to Word conversion requires server-side processing. This is a client-side demo that creates a placeholder document.')
    const pdf = new jsPDF()
    pdf.text(`PDF to Word Conversion Placeholder\n\nFile: ${file.name}\nImages preserved: ${preserveImages ? 'Yes' : 'No'}`, 10, 10)
    pdf.save('converted.doc.pdf')
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />

      {!file ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-foreground/30 hover:bg-muted/30 transition-colors">
          <FileType className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Click to upload a PDF</p>
          <p className="text-sm text-muted-foreground">Convert to editable Word format</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <FileType className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Change</Button>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="preserve-images" checked={preserveImages} onCheckedChange={(c) => setPreserveImages(c as boolean)} />
            <Label htmlFor="preserve-images">Preserve images in output</Label>
          </div>

          <Button onClick={convert}>
            <Download className="h-4 w-4 mr-2" />
            Convert to Word
          </Button>
        </>
      )}
    </div>
  )
}
