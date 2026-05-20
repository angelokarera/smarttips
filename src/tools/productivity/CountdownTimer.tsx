import { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CountdownTimer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [remaining, setRemaining] = useState(0)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSeconds = hours * 3600 + minutes * 60 + seconds

  const start = useCallback(() => {
    const secs = remaining > 0 ? remaining : totalSeconds
    if (secs <= 0) return
    setRemaining(secs)
    setFinished(false)
    setRunning(true)
  }, [totalSeconds, remaining])

  const reset = () => {
    setRunning(false)
    setFinished(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRemaining(0)
  }

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false)
          setFinished(true)
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const display = running || remaining > 0 ? remaining : totalSeconds
  const h = Math.floor(display / 3600)
  const m = Math.floor((display % 3600) / 60)
  const s = display % 60
  const done = finished && remaining === 0 && !running

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p
          className={`text-5xl sm:text-6xl font-mono font-bold tabular-nums tracking-tight ${
            done ? 'text-primary animate-pulse' : ''
          }`}
        >
          {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
        </p>
        {done && <p className="text-primary font-semibold mt-2">Time&apos;s up!</p>}
      </div>

      {!running && remaining === 0 && (
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          <div>
            <Label className="text-xs">Hours</Label>
            <Input
              type="number"
              min={0}
              max={99}
              value={hours}
              onChange={(e) => setHours(Math.max(0, Math.min(99, Number(e.target.value) || 0)))}
            />
          </div>
          <div>
            <Label className="text-xs">Minutes</Label>
            <Input
              type="number"
              min={0}
              max={59}
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value) || 0)))}
            />
          </div>
          <div>
            <Label className="text-xs">Seconds</Label>
            <Input
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value) || 0)))}
            />
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3">
        {!running ? (
          <Button onClick={start} disabled={totalSeconds <= 0 && remaining <= 0}>
            <Play className="h-4 w-4 mr-2" /> Start
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => setRunning(false)}>
            <Pause className="h-4 w-4 mr-2" /> Pause
          </Button>
        )}
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>
    </div>
  )
}
