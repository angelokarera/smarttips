import { useState } from 'react'
import { Globe, RefreshCw, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface IpInfo {
  ip: string
}

export default function IpChecker() {
  const [info, setInfo] = useState<IpInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchIp = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      if (!res.ok) throw new Error('Request failed')
      const data = (await res.json()) as { ip: string }
      if (!data.ip) throw new Error('Invalid response')
      setInfo({ ip: data.ip })
    } catch {
      setError('Could not fetch IP. Check your connection or try again later.')
      setInfo(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4 text-sm">
        <Info className="h-5 w-5 shrink-0 text-primary" />
        <p>
          Fetches your public IP from ipify.org (free API) only when you click the button. We do not
          store your IP. No personal accounts or tracking.
        </p>
      </div>

      <Button onClick={fetchIp} disabled={loading}>
        <Globe className="h-4 w-4 mr-2" />
        {loading ? 'Checking...' : 'Check my public IP'}
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {info && (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Your public IP</p>
          <p className="text-3xl font-mono font-bold text-primary">{info.ip}</p>
        </div>
      )}

      {info && (
        <Button variant="outline" size="sm" onClick={fetchIp} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      )}
    </div>
  )
}
