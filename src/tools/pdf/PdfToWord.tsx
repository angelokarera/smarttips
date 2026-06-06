import { useState, useRef, useEffect } from 'react'
import { Download, FileType, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [downloadFormat, setDownloadFormat] = useState<'txt' | 'doc'>('txt')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load PDF.js from CDN dynamically
  useEffect(() => {
    if ((window as any).pdfjsLib) return

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'
    script.async = true
    script.onload = () => {
      const pdfjs = (window as any).pdfjsLib
      if (pdfjs) {
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
      }
    }
    document.body.appendChild(script)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setExtractedText('')
    }
  }

  const handleConvert = async () => {
    if (!file) return

    const pdfjs = (window as any).pdfjsLib
    if (!pdfjs) {
      toast.error('PDF library is loading, please try again in a second.')
      return
    }

    setLoading(true)
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const arrayBuffer = reader.result as ArrayBuffer
          const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
          const pdf = await loadingTask.promise
          
          let fullText = ''
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent()
            const pageText = textContent.items.map((item: any) => item.str).join(' ')
            fullText += `[Page ${i}]\n${pageText}\n\n`
          }

          if (!fullText.trim()) {
            setExtractedText('No selectable text found in PDF (it might be scanned images).')
          } else {
            setExtractedText(fullText.trim())
          }
          toast.success('PDF text extracted successfully!')
        } catch (err) {
          toast.error('Error parsing PDF content.')
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
      reader.readAsArrayBuffer(file)
    } catch {
      toast.error('Failed to read PDF file.')
      setLoading(false)
    }
  }

  const triggerDownload = () => {
    if (!extractedText) return

    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${file?.name.replace(/\.[^/.]+$/, '')}.${downloadFormat}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded as .${downloadFormat}!`)
  }

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-foreground/30 hover:bg-muted/30 transition-colors"
        >
          <FileType className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-1">Click to upload a PDF</p>
          <p className="text-sm text-muted-foreground text-xs">Convert to editable Word/Text format instantly</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
            <FileType className="h-5 w-5 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setFile(null); setExtractedText('') }}>
              Change
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleConvert} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Extracting Text...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Extract PDF Text
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {extractedText && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Extracted Output</h3>
            <div className="flex items-center gap-2">
              <select
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value as 'txt' | 'doc')}
                className="bg-card text-xs border border-border rounded-md px-2 py-1 outline-hidden"
              >
                <option value="txt">.txt (Text)</option>
                <option value="doc">.doc (Word)</option>
              </select>
              <Button size="sm" onClick={triggerDownload}>
                <Download className="h-3.5 w-3.5 mr-1" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            readOnly
            value={extractedText}
            className="min-h-[250px] font-mono text-xs leading-relaxed"
          />
        </div>
      )}
    </div>
  )
}
