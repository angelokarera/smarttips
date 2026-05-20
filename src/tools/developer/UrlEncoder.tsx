import { useState } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { truncateInput } from '@/lib/security-utils'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState<string | null>(null)

  const process = () => {
    setError(null)
    const safe = truncateInput(input)
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(safe))
      } else {
        setOutput(decodeURIComponent(safe.replace(/\+/g, ' ')))
      }
    } catch {
      setError('Invalid URL-encoded string.')
      setOutput('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['encode', 'decode'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {m === 'encode' ? 'Encode' : 'Decode'}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Textarea
          placeholder={mode === 'encode' ? 'Text or URL to encode...' : 'Encoded string...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono text-sm"
        />
        <Textarea
          readOnly
          value={error || output}
          placeholder="Result..."
          className={`min-h-[200px] font-mono text-sm ${error ? 'text-destructive' : ''}`}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={process} disabled={!input.trim()}>
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(output)}
          disabled={!output}
        >
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setInput(''); setOutput(''); setError(null) }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>
    </div>
  )
}
