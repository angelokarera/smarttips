import { useState } from 'react'
import { Copy, RotateCcw, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const styles = ['apa', 'mla', 'chicago'] as const
type Style = typeof styles[number]

export default function CitationGenerator() {
  const [style, setStyle] = useState<Style>('apa')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [publisher, setPublisher] = useState('')
  const [url, setUrl] = useState('')
  const [citation, setCitation] = useState('')

  const generate = () => {
    const a = author || 'Author'
    const t = title || 'Title'
    const y = year || new Date().getFullYear().toString()
    const p = publisher || 'Publisher'

    let result = ''
    switch (style) {
      case 'apa':
        result = `${a} (${y}). *${t}*. ${p}.`
        if (url) result += ` ${url}`
        break
      case 'mla':
        result = `${a}. *${t}*. ${p}, ${y}.`
        if (url) result += ` ${url}.`
        break
      case 'chicago':
        result = `${a}. *${t}*. ${p}, ${y}.`
        if (url) result += ` ${url}.`
        break
    }
    setCitation(result)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {styles.map(s => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors uppercase tracking-wider ${
              style === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Author(s)</Label>
          <Input placeholder="Last, First M." value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Title</Label>
          <Input placeholder="Title of the work" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Year</Label>
          <Input placeholder="2024" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Publisher / Source</Label>
          <Input placeholder="Publisher or website" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">URL (optional)</Label>
          <Input placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={generate}>
          <BookOpen className="h-4 w-4 mr-2" /> Generate Citation
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(citation)} disabled={!citation}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setAuthor(''); setTitle(''); setYear(''); setPublisher(''); setUrl(''); setCitation('') }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>

      {citation && (
        <div className="p-5 rounded-xl border border-border bg-card">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">{style.toUpperCase()} Format</p>
          <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: citation.replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
        </div>
      )}
    </div>
  )
}
