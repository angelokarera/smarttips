import { useState } from 'react'
import { Play, Square, Volume2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function TextToSpeech() {
  const [text, setText] = useState('Welcome to SmartDigitalTips. This is a text to speech demo. Type your own text here and click play to listen.')
  const [speaking, setSpeaking] = useState(false)
  const [rate, setRate] = useState([1])
  const [pitch, setPitch] = useState([1])
  const [voice, setVoice] = useState('')

  const voices = window.speechSynthesis?.getVoices() || []

  const handlePlay = () => {
    if (!text) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate[0]
    utterance.pitch = pitch[0]
    if (voice) {
      const selectedVoice = voices.find((v) => v.name === voice)
      if (selectedVoice) utterance.voice = selectedVoice
    }
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label className="mb-2 block">Voice</Label>
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger>
              <SelectValue placeholder="Default voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((v) => (
                <SelectItem key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 block">Speed: {rate[0]}x</Label>
          <Slider value={rate} onValueChange={setRate} min={0.5} max={2} step={0.1} />
        </div>
        <div>
          <Label className="mb-2 block">Pitch: {pitch[0]}</Label>
          <Slider value={pitch} onValueChange={setPitch} min={0.5} max={2} step={0.1} />
        </div>
      </div>

      <Textarea
        placeholder="Enter text to convert to speech..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px]"
      />

      <div className="flex items-center gap-3">
        {!speaking ? (
          <Button onClick={handlePlay} disabled={!text}>
            <Play className="h-4 w-4 mr-2" />
            Play
          </Button>
        ) : (
          <Button variant="destructive" onClick={handleStop}>
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        )}
        <Button variant="outline" disabled>
          <Download className="h-4 w-4 mr-2" />
          Download Audio
        </Button>
        <span className="text-sm text-muted-foreground ml-auto">
          <Volume2 className="h-4 w-4 inline mr-1" />
          Uses browser's built-in speech synthesis
        </span>
      </div>
    </div>
  )
}
