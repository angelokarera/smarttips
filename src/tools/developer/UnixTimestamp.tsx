import { useState, useEffect } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

function toTimestamp(ms: number) { return Math.floor(ms / 1000) }
function toMs(ts: number) { return ts * 1000 }

function formatDate(ts: number): string {
  return new Date(toMs(ts)).toISOString().replace('T', ' ').replace('Z', ' UTC')
}

function tsToLocal(ts: number): string {
  return new Date(toMs(ts)).toLocaleString()
}

export default function UnixTimestamp() {
  const [now, setNow] = useState(toTimestamp(Date.now()))
  const [toConvert, setToConvert] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [tsResult, setTsResult] = useState<string | null>(null)
  const [dateResult, setDateResult] = useState<string | null>(null)

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => setNow(toTimestamp(Date.now())), 1000)
    return () => clearInterval(interval)
  }, [])

  const copy = (val: string) => { navigator.clipboard.writeText(val); toast.success('Copied!') }

  const convertTimestamp = () => {
    const ts = parseInt(toConvert)
    if (isNaN(ts)) { toast.error('Enter a valid Unix timestamp.'); return }
    setTsResult(new Date(toMs(ts)).toISOString())
  }

  const convertDate = () => {
    const d = new Date(dateInput)
    if (isNaN(d.getTime())) { toast.error('Enter a valid date.'); return }
    setDateResult(String(toTimestamp(d.getTime())))
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        View the current Unix timestamp, and convert between Unix timestamps and human-readable dates.
      </p>

      {/* Live clock */}
      <div className="p-6 rounded-2xl border border-primary/30 bg-primary/10 text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current Unix Timestamp (UTC)</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl font-bold font-mono text-primary">{now}</span>
          <Button variant="outline" size="sm" onClick={() => copy(String(now))}>
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{formatDate(now)}</p>
        <p className="text-xs text-muted-foreground">Local: {tsToLocal(now)}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Unix → Date */}
        <div className="p-5 rounded-xl border border-border bg-card/45 space-y-3">
          <h3 className="font-semibold text-sm">Unix Timestamp → Date</h3>
          <Input
            type="number"
            value={toConvert}
            onChange={e => setToConvert(e.target.value)}
            placeholder="e.g. 1735689600"
            className="font-mono"
          />
          <Button onClick={convertTimestamp} disabled={!toConvert.trim()} className="w-full">
            Convert to Date
          </Button>
          {tsResult && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-primary">{tsResult}</p>
              <p className="text-xs text-muted-foreground">{new Date(tsResult).toLocaleString()}</p>
              <Button variant="outline" size="sm" onClick={() => copy(tsResult)}>
                <Copy className="h-3.5 w-3.5 mr-1" />Copy
              </Button>
            </div>
          )}
        </div>

        {/* Date → Unix */}
        <div className="p-5 rounded-xl border border-border bg-card/45 space-y-3">
          <h3 className="font-semibold text-sm">Date / Datetime → Unix</h3>
          <Input
            type="datetime-local"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
            className="font-mono"
          />
          <Button onClick={convertDate} disabled={!dateInput.trim()} className="w-full">
            Convert to Timestamp
          </Button>
          {dateResult && (
            <div className="space-y-1">
              <p className="text-3xl font-bold font-mono text-primary">{dateResult}</p>
              <Button variant="outline" size="sm" onClick={() => copy(dateResult)}>
                <Copy className="h-3.5 w-3.5 mr-1" />Copy
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="text-xs text-muted-foreground p-4 rounded-xl border border-border/50 bg-secondary/20">
        Unix timestamps are measured in <strong className="text-foreground">seconds since January 1, 1970 00:00:00 UTC</strong>. JavaScript's Date.now() returns milliseconds.
      </div>
    </div>
  )
}
