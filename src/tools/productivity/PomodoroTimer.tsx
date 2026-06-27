import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Phase = 'work' | 'shortBreak' | 'longBreak'

const PHASES: Record<Phase, { label: string; duration: number; color: string; bg: string }> = {
  work: { label: 'Focus Time', duration: 25 * 60, color: '#e85d34', bg: 'rgba(232,93,52,0.15)' },
  shortBreak: { label: 'Short Break', duration: 5 * 60, color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  longBreak: { label: 'Long Break', duration: 15 * 60, color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function PomodoroTimer() {
  const [phase, setPhase] = useState<Phase>('work')
  const [remaining, setRemaining] = useState(PHASES.work.duration)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { label, color, bg } = PHASES[phase]
  const totalDuration = PHASES[phase].duration
  const progress = ((totalDuration - remaining) / totalDuration) * 100

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
    setRunning(false)
  }, [])

  const nextPhase = useCallback(() => {
    stop()
    if (phase === 'work') {
      const newSessions = sessions + 1
      setSessions(newSessions)
      if (newSessions % 4 === 0) {
        setPhase('longBreak')
        setRemaining(PHASES.longBreak.duration)
      } else {
        setPhase('shortBreak')
        setRemaining(PHASES.shortBreak.duration)
      }
    } else {
      setPhase('work')
      setRemaining(PHASES.work.duration)
    }
  }, [phase, sessions, stop])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          // Play notification sound
          try { new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA...').play().catch(() => {}) } catch { /* silent */ }
          nextPhase()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, nextPhase])

  const toggle = () => setRunning(r => !r)

  const reset = () => {
    stop()
    setRemaining(PHASES[phase].duration)
  }

  const switchPhase = (p: Phase) => {
    stop()
    setPhase(p)
    setRemaining(PHASES[p].duration)
  }

  // SVG circle
  const radius = 88
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Use the Pomodoro Technique to boost focus: 25 minutes of work, 5-minute breaks, and a long break every 4 sessions.
      </p>

      {/* Phase selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(Object.entries(PHASES) as [Phase, typeof PHASES.work][]).map(([key, { label: l }]) => (
          <button key={key} onClick={() => switchPhase(key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              phase === key
                ? 'text-white border-transparent'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-border/80'
            }`}
            style={phase === key ? { background: PHASES[key].color, borderColor: PHASES[key].color } : {}}>
            {l}
          </button>
        ))}
      </div>

      {/* Circular timer */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative" style={{ width: 220, height: 220 }}>
          <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
            <circle
              cx="110" cy="110" r={radius} fill="none" stroke={color} strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.9s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: bg, borderRadius: '50%' }}>
            <span className="text-5xl font-bold font-mono tabular-nums" style={{ color }}>{formatTime(remaining)}</span>
            <span className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wider">{label}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={reset} title="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="lg" className="w-32 rounded-xl font-bold" onClick={toggle}
            style={{ background: color, color: 'white', border: 'none' }}>
            {running ? <><Pause className="h-4 w-4 mr-2" />Pause</> : <><Play className="h-4 w-4 mr-2" />Start</>}
          </Button>
          <Button variant="outline" size="icon" onClick={nextPhase} title="Skip phase">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Session counter */}
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full border-2 transition-colors"
              style={{
                borderColor: color,
                background: i < (sessions % 4) ? color : 'transparent',
              }} />
          ))}
          <span className="text-xs text-muted-foreground ml-2">{sessions} session{sessions !== 1 ? 's' : ''} completed</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
        <div className="p-3 rounded-xl border border-border bg-card/40">
          <div className="font-bold text-foreground text-lg">25 min</div>
          <div>Focus Session</div>
        </div>
        <div className="p-3 rounded-xl border border-border bg-card/40">
          <div className="font-bold text-foreground text-lg">5 min</div>
          <div>Short Break</div>
        </div>
        <div className="p-3 rounded-xl border border-border bg-card/40">
          <div className="font-bold text-foreground text-lg">15 min</div>
          <div>Long Break (every 4)</div>
        </div>
      </div>
    </div>
  )
}
