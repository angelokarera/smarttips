import { useState } from 'react'
import { Copy, Download, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

function jsonToCsv(json: string): { csv: string; error?: string } {
  try {
    const parsed = JSON.parse(json)
    if (!Array.isArray(parsed)) return { csv: '', error: 'Input must be a JSON array of objects.' }
    if (parsed.length === 0) return { csv: '', error: 'Array is empty.' }

    const allKeys = [...new Set(parsed.flatMap(obj => typeof obj === 'object' && obj ? Object.keys(obj) : []))]
    const header = allKeys.map(k => `"${k.replace(/"/g, '""')}"`).join(',')

    const rows = parsed.map(obj => {
      if (typeof obj !== 'object' || obj === null) return allKeys.map(() => '""').join(',')
      return allKeys.map(key => {
        const val = (obj as Record<string, unknown>)[key]
        if (val === null || val === undefined) return '""'
        const str = typeof val === 'object' ? JSON.stringify(val) : String(val)
        return `"${str.replace(/"/g, '""')}"`
      }).join(',')
    })

    return { csv: [header, ...rows].join('\n') }
  } catch {
    return { csv: '', error: 'Invalid JSON. Please check your input.' }
  }
}

const SAMPLE_JSON = `[
  { "name": "Alice", "age": 28, "city": "London", "role": "Developer" },
  { "name": "Bob", "age": 35, "city": "Paris", "role": "Designer" },
  { "name": "Carol", "age": 24, "city": "Berlin", "role": "Manager" }
]`

export default function JsonToCsv() {
  const [input, setInput] = useState(SAMPLE_JSON)
  const [result, setResult] = useState<{ csv: string; error?: string } | null>(null)

  const convert = () => {
    const r = jsonToCsv(input)
    setResult(r)
    if (r.error) toast.error(r.error)
    else toast.success('Converted successfully!')
  }

  const copy = () => { navigator.clipboard.writeText(result?.csv || ''); toast.success('CSV copied!') }

  const download = () => {
    const blob = new Blob([result?.csv || ''], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'data.csv'; a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV downloaded!')
  }

  const clear = () => { setInput(''); setResult(null) }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Paste a JSON array of objects below and convert it to a CSV file. All processing runs locally in your browser.
      </p>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">JSON Input (array of objects)</label>
          <Textarea value={input} onChange={e => setInput(e.target.value)}
            className="font-mono text-xs min-h-[340px] resize-y" placeholder='[{ "key": "value" }]' />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">CSV Output</label>
            {result?.csv && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1" />Copy</Button>
                <Button variant="outline" size="sm" onClick={download}><Download className="h-3.5 w-3.5 mr-1" />Download</Button>
              </div>
            )}
          </div>
          {result?.error ? (
            <div className="min-h-[340px] flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5">
              <p className="text-sm text-red-400 text-center px-4">{result.error}</p>
            </div>
          ) : (
            <Textarea readOnly value={result?.csv || ''} placeholder="CSV output appears here..."
              className="font-mono text-xs min-h-[340px] bg-card" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={convert} disabled={!input.trim()}>Convert to CSV</Button>
        <Button variant="outline" onClick={clear}><RotateCcw className="h-4 w-4 mr-2" />Clear</Button>
      </div>
    </div>
  )
}
