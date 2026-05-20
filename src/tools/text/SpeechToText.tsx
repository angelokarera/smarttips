import { useState, useEffect, useRef, useCallback } from 'react'
import { Mic, MicOff, Copy, RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { truncateInput } from '@/lib/security-utils'

export default function SpeechToText() {
  const [text, setText] = useState('')
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    const win = window as Window & {
      SpeechRecognition?: typeof SpeechRecognition
      webkitSpeechRecognition?: typeof SpeechRecognition
    }
    const SR = win.SpeechRecognition || win.webkitSpeechRecognition
    if (!SR) {
      setSupported(false)
      return
    }
    const recognition = new SR()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = navigator.language || 'en-US'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setText((prev) => truncateInput(prev + transcript))
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'not-allowed') {
        setError('Microphone permission denied. Enable mic access in browser settings.')
      } else if (event.error !== 'aborted') {
        setError(`Speech recognition error: ${event.error}`)
      }
      setListening(false)
    }

    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [])

  const toggleListen = useCallback(() => {
    const recognition = recognitionRef.current
    if (!recognition) return
    setError(null)
    if (listening) {
      recognition.stop()
      setListening(false)
    } else {
      try {
        recognition.start()
        setListening(true)
      } catch {
        setError('Could not start microphone. Try again.')
      }
    }
  }, [listening])

  if (!supported) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
        <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
        <p>
          Speech-to-text requires a browser with the Web Speech API (Chrome, Edge, Safari). Audio is
          processed by your browser — nothing is sent to our servers.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Uses your device microphone with browser permission. Transcription runs locally via the Web
        Speech API. We do not store or upload your voice.
      </p>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button onClick={toggleListen} variant={listening ? 'destructive' : 'default'}>
          {listening ? (
            <>
              <MicOff className="h-4 w-4 mr-2" /> Stop listening
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" /> Start listening
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(text)}
          disabled={!text}
        >
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => setText('')} disabled={!text}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear
        </Button>
      </div>

      <Textarea
        placeholder="Transcribed text appears here..."
        value={text}
        onChange={(e) => setText(truncateInput(e.target.value))}
        className="min-h-[280px] text-base leading-relaxed"
        readOnly={listening}
      />
    </div>
  )
}
