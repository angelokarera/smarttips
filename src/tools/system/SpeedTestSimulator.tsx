import { useState, useCallback } from 'react'
import { Play, RotateCcw, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

/** Educational simulation only — not a real network speed test. */
export default function SpeedTestSimulator() {
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [download, setDownload] = useState<number | null>(null)
  const [upload, setUpload] = useState<number | null>(null)
  const [ping, setPing] = useState<number | null>(null)

  const runTest = useCallback(() => {
    setRunning(true)
    setProgress(0)
    setDownload(null)
    setUpload(null)
    setPing(null)

    const steps = 20
    let step = 0
    const interval = setInterval(() => {
      step++
      setProgress(Math.round((step / steps) * 100))
      if (step >= steps) {
        clearInterval(interval)
        setPing(Math.floor(8 + Math.random() * 40))
        setDownload(Math.round((25 + Math.random() * 75) * 10) / 10)
        setUpload(Math.round((5 + Math.random() * 35) * 10) / 10)
        setRunning(false)
      }
    }, 120)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4 text-sm">
        <Info className="h-5 w-5 shrink-0 text-primary" />
        <p>
          <strong>Simulation only.</strong> This tool does not measure your real internet speed and
          makes no network requests. Results are randomly generated for demonstration. For accurate
          testing, use your ISP or a dedicated speed-test service.
        </p>
      </div>

      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Metric label="Ping (ms)" value={ping} />
        <Metric label="Download (Mbps)" value={download} />
        <Metric label="Upload (Mbps)" value={upload} />
      </div>

      <div className="flex gap-3">
        <Button onClick={runTest} disabled={running}>
          <Play className="h-4 w-4 mr-2" />
          {running ? 'Running...' : 'Run simulation'}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setProgress(0)
            setDownload(null)
            setUpload(null)
            setPing(null)
          }}
        >
          <RotateCcw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="p-5 rounded-xl border border-border bg-card text-center">
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold tabular-nums">{value ?? '—'}</p>
    </div>
  )
}
