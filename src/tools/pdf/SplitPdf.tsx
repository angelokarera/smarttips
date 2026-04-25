import { useState, useRef } from 'react'
import { Download, Scissors } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import jsPDF from 'jspdf'

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null)
  const [pageRange, setPageRange] = useState('1-3')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) setFile(selected)
  }

  const splitPdf = () => {
    if (!file) return
    alert('Note: True PDF splitting requires server-side processing. This is a client-side demo.')
    const pdf = new jsPDF()
    pdf.text(`Split PDF Placeholder\n\nRange: ${pageRange}\nOriginal: ${file.name}`, 10, 10)
    pdf.save('split.pdf')
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />

      {!file ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-foreground/30 hover:bg-muted/30 transition-colors">
          <Scissors className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Click to upload a PDF</p>
          <p className="text-sm text-muted-foreground">Select pages to extract or split</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <Scissors className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Change</Button>
          </div>

          <div>
            <Label className="mb-2 block">Page Range</Label>
            <Input value={pageRange} onChange={(e) => setPageRange(e.target.value)} placeholder="e.g., 1-5 or 2,4,6" />
            <p className="text-xs text-muted-foreground mt-1">Enter page numbers (e.g., "1-5" or "1,3,5")</p>
          </div>

          <Button onClick={splitPdf}>
            <Download className="h-4 w-4 mr-2" />
            Split PDF
          </Button>
        </>
      )}
    </div>
  )
}
