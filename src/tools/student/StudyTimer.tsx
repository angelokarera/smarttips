import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StudyTimer() {
  const [mode, setMode] = useState<'study' | 'break'>('study')
  const [studyMin, setStudyMin] = useState(25)
  const [breakMin, setBreakMin] = useState(5)
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds(s => s - 1), 1000)
    } else if (seconds === 0) {
      if (mode === 'study') {
        setSessions(s => s + 1)
        setMode('break')
        setSeconds(breakMin * 60)
      } else {
        setMode('study')
        setSeconds(studyMin * 60)
      }
      setRunning(false)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, seconds, mode, studyMin, breakMin])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const total = mode === 'study' ? studyMin * 60 : breakMin * 60
  const progress = ((total - seconds) / total) * 100

  const reset = () => {
    setRunning(false)
    setMode('study')
    setSeconds(studyMin * 60)
  }

  const presets = [
    { study: 25, break: 5, label: 'Pomodoro (25/5)' },
    { study: 50, break: 10, label: 'Deep Work (50/10)' },
    { study: 90, break: 20, label: 'Flow (90/20)' },
  ]

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {presets.map(p => (
          <button
            key={p.label}
            onClick={() => {
              setStudyMin(p.study); setBreakMin(p.break)
              setSeconds(p.study * 60); setMode('study'); setRunning(false)
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              studyMin === p.study ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          {mode === 'study' ? '📚 Study Time' : <><Coffee className="h-3 w-3" /> Break Time</>}
        </div>

        {/* Timer circle */}
        <div className="relative w-56 h-56 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary transition-all duration-1000"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold font-mono tabular-nums">
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button size="lg" onClick={() => setRunning(!running)} className="rounded-xl px-8">
            {running ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
            {running ? 'Pause' : 'Start'}
          </Button>
          <Button variant="outline" size="lg" onClick={reset} className="rounded-xl">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Sessions completed: <span className="font-bold text-foreground">{sessions}</span>
      </div>
    </div>
  )
}
