import { useState } from 'react'
import { Copy, RotateCcw, Lock, Unlock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch {
      setOutput('Error: Invalid input for ' + mode + ' operation')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('encode')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'encode' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          <Lock className="h-3.5 w-3.5 inline mr-1.5" /> Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'decode' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          <Unlock className="h-3.5 w-3.5 inline mr-1.5" /> Decode
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            {mode === 'encode' ? 'Plain Text' : 'Base64 String'}
          </label>
          <Textarea
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string to decode...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[240px] font-mono text-sm leading-relaxed resize-y"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
          </label>
          <Textarea
            readOnly
            value={output}
            placeholder="Result appears here..."
            className="min-h-[240px] font-mono text-sm leading-relaxed resize-y bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={process} disabled={!input.trim()}>
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setInput(''); setOutput('') }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>
    </div>
  )
}
