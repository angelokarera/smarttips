import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const startRef = useRef(0)
  const accumulatedRef = useRef(0)

  useEffect(() => {
    if (!running) return
    startRef.current = Date.now()
    const id = setInterval(() => {
      setElapsed(accumulatedRef.current + (Date.now() - startRef.current))
    }, 10)
    return () => clearInterval(id)
  }, [running])

  const format = (ms: number) => {
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    const cs = Math.floor((ms % 1000) / 10)
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`
  }

  const toggle = () => {
    if (running) {
      accumulatedRef.current += Date.now() - startRef.current
      setRunning(false)
    } else {
      setRunning(true)
    }
  }

  const reset = () => {
    setRunning(false)
    setElapsed(0)
    setLaps([])
    accumulatedRef.current = 0
  }

  const lap = () => {
    setLaps((prev) => [elapsed, ...prev].slice(0, 20))
  }

  return (
    <div className="space-y-8">
      <p className="text-5xl sm:text-6xl font-mono font-bold text-center tabular-nums tracking-tight">
        {format(elapsed)}
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={toggle}>
          {running ? (
            <>
              <Pause className="h-4 w-4 mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" /> Start
            </>
          )}
        </Button>
        <Button variant="outline" onClick={lap} disabled={!running && elapsed === 0}>
          <Flag className="h-4 w-4 mr-2" /> Lap
        </Button>
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>

      {laps.length > 0 && (
        <ul className="max-w-md mx-auto space-y-2 rounded-xl border border-border p-4">
          {laps.map((lapMs, i) => (
            <li key={i} className="flex justify-between text-sm font-mono">
              <span className="text-muted-foreground">Lap {laps.length - i}</span>
              <span>{format(lapMs)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
