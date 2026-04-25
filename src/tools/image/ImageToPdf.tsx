import { useState, useRef } from 'react'
import { Download, ImageIcon, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import jsPDF from 'jspdf'

interface ImageFile {
  id: string
  dataUrl: string
  name: string
}

export default function ImageToPdf() {
  const [images, setImages] = useState<ImageFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string
        setImages((prev) => [...prev, { id: Math.random().toString(36), dataUrl, name: file.name }])
      }
      reader.readAsDataURL(file)
    })
  }

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images]
    if (direction === 'up' && index > 0) {
      [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]]
    } else if (direction === 'down' && index < images.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
    }
    setImages(newImages)
  }

  const removeImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id))
  }

  const generatePdf = () => {
    if (images.length === 0) return
    const pdf = new jsPDF()
    
    images.forEach((img, index) => {
      if (index > 0) pdf.addPage()
      const image = new Image()
      image.onload = () => {
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const imgRatio = image.width / image.height
        let imgWidth = pageWidth - 20
        let imgHeight = imgWidth / imgRatio
        
        if (imgHeight > pageHeight - 20) {
          imgHeight = pageHeight - 20
          imgWidth = imgHeight * imgRatio
        }
        
        const x = (pageWidth - imgWidth) / 2
        const y = (pageHeight - imgHeight) / 2
        
        pdf.addImage(img.dataUrl, 'JPEG', x, y, imgWidth, imgHeight)
        
        if (index === images.length - 1) {
          pdf.save('converted-images.pdf')
        }
      }
      image.src = img.dataUrl
    })
  }

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-foreground/30 hover:bg-muted/30 transition-colors"
      >
        <ImageIcon className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
        <p className="font-medium mb-1">Click to upload images</p>
        <p className="text-sm text-muted-foreground">Select multiple images to merge into a PDF</p>
      </div>

      {images.length > 0 && (
        <>
          <div className="space-y-3">
            {images.map((img, index) => (
              <div key={img.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <img src={img.dataUrl} alt={img.name} className="h-16 w-16 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{img.name}</p>
                  <p className="text-xs text-muted-foreground">Page {index + 1}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveImage(index, 'up')} disabled={index === 0}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeImage(img.id)}>
                    <span className="text-xs">✕</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={generatePdf} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Generate PDF ({images.length} pages)
          </Button>
        </>
      )}
    </div>
  )
}
