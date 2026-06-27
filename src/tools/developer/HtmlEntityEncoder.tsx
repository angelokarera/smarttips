import { useState } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const COMMON_ENTITIES: { char: string; entity: string; name: string }[] = [
  { char: '<', entity: '&lt;', name: 'Less-than' },
  { char: '>', entity: '&gt;', name: 'Greater-than' },
  { char: '&', entity: '&amp;', name: 'Ampersand' },
  { char: '"', entity: '&quot;', name: 'Quotation mark' },
  { char: "'", entity: '&#39;', name: 'Apostrophe' },
  { char: '©', entity: '&copy;', name: 'Copyright' },
  { char: '®', entity: '&reg;', name: 'Registered' },
  { char: '™', entity: '&trade;', name: 'Trademark' },
  { char: '€', entity: '&euro;', name: 'Euro' },
  { char: '£', entity: '&pound;', name: 'Pound' },
  { char: '¥', entity: '&yen;', name: 'Yen' },
  { char: '°', entity: '&deg;', name: 'Degree' },
  { char: '±', entity: '&plusmn;', name: 'Plus-minus' },
  { char: '×', entity: '&times;', name: 'Multiplication' },
  { char: '÷', entity: '&divide;', name: 'Division' },
  { char: '→', entity: '&rarr;', name: 'Right arrow' },
  { char: '←', entity: '&larr;', name: 'Left arrow' },
  { char: ' ', entity: '&nbsp;', name: 'Non-breaking space' },
]

function encodeHtmlEntities(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function decodeHtmlEntities(text: string): string {
  const el = document.createElement('textarea')
  el.innerHTML = text
  return el.value
}

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const output = input ? (mode === 'encode' ? encodeHtmlEntities(input) : decodeHtmlEntities(input)) : ''

  const copy = () => { navigator.clipboard.writeText(output); toast.success('Copied!') }
  const clear = () => { setInput('') }
  const insertEntity = (entity: string) => { setInput(prev => prev + entity) }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Encode special characters to HTML entities (e.g. &lt;) or decode entities back to characters. Runs entirely in your browser.
      </p>

      <div className="flex gap-2">
        {(['encode', 'decode'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
            {m}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            {mode === 'encode' ? 'Plain Text Input' : 'HTML Entities Input'}
          </label>
          <Textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text with < > & " characters...' : 'Paste HTML entities like &lt; &amp; &copy;'}
            rows={10} className="font-mono text-sm" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              {mode === 'encode' ? 'Encoded HTML Entities' : 'Decoded Plain Text'}
            </label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copy} disabled={!output}><Copy className="h-3.5 w-3.5 mr-1" />Copy</Button>
              <Button variant="outline" size="sm" onClick={clear} disabled={!input}><RotateCcw className="h-3.5 w-3.5 mr-1" />Clear</Button>
            </div>
          </div>
          <Textarea readOnly value={output} placeholder="Output appears here..."
            rows={10} className="font-mono text-sm bg-card" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Common HTML Entities — click to insert</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {COMMON_ENTITIES.map(({ char, entity, name }) => (
            <button key={entity} onClick={() => insertEntity(mode === 'encode' ? char : entity)}
              title={name}
              className="text-xs p-2 rounded-lg border border-border bg-secondary hover:bg-secondary/60 hover:border-primary/40 text-center transition-colors">
              <div className="font-bold text-foreground">{char === ' ' ? '⎵' : char}</div>
              <div className="text-muted-foreground font-mono text-[10px] mt-0.5">{entity}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
