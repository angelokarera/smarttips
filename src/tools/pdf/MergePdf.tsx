import { useState, useRef } from 'react'
import { Download, Files } from 'lucide-react'
import { Button } from '@/components/ui/button'
import jsPDF from 'jspdf'

interface PdfFile {
  id: string
  file: File
  name: string
}

export default function MergePdf() {
  const [files, setFiles] = useState<PdfFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).map((file) => ({
      id: Math.random().toString(36),
      file,
      name: file.name,
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => setFiles(files.filter((f) => f.id !== id))
  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files]
    if (direction === 'up' && index > 0) {
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]]
    } else if (direction === 'down' && index < files.length - 1) {
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
    }
    setFiles(newFiles)
  }

  const mergePdfs = () => {
    if (files.length === 0) return
    alert('Note: True PDF merging requires server-side processing. This is a client-side demo that creates a placeholder PDF.')
    const pdf = new jsPDF()
    pdf.text('Merged PDF Placeholder\n\nThis feature requires server-side processing for true PDF merging.', 10, 10)
    pdf.save('merged.pdf')
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept=".pdf" multiple onChange={handleFileSelect} className="hidden" />

      <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-foreground/30 hover:bg-muted/30 transition-colors">
        <Files className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
        <p className="font-medium mb-1">Click to upload PDFs</p>
        <p className="text-sm text-muted-foreground">Select multiple PDFs to merge</p>
      </div>

      {files.length > 0 && (
        <>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={file.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Files className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.file.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveFile(index, 'up')} disabled={index === 0}>↑</Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1}>↓</Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => removeFile(file.id)}>✕</Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={mergePdfs} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Merge {files.length} PDFs
          </Button>
        </>
      )}
    </div>
  )
}
