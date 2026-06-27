import { useState } from 'react'
import { Upload, Download, ExternalLink, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const YOUTUBE_SIZES = [
  { key: 'maxresdefault', label: 'Max Resolution', size: '1280×720', quality: 'Best' },
  { key: 'sddefault', label: 'SD Default', size: '640×480', quality: 'Good' },
  { key: 'hqdefault', label: 'HQ Default', size: '480×360', quality: 'OK' },
  { key: 'mqdefault', label: 'MQ Default', size: '320×180', quality: 'Low' },
  { key: 'default', label: 'Default', size: '120×90', quality: 'Minimum' },
]

function extractVideoId(url: string): string | null {
  const trimmed = url.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed

  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/shorts/')) return parsed.pathname.split('/')[2] || null
      if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/')[2] || null
      return parsed.searchParams.get('v')
    }
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1).split('/')[0] || null
    }
  } catch {
    const match = trimmed.match(/(?:v=|\/shorts\/|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (match) return match[1]
  }
  return null
}

export default function YouTubeThumbnailDownloader() {
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [failedSizes, setFailedSizes] = useState<Set<string>>(new Set())

  const extract = () => {
    const id = extractVideoId(url)
    if (!id) { toast.error('Could not extract video ID. Please check the YouTube link.'); return }
    setVideoId(id)
    setFailedSizes(new Set())
    toast.success('Thumbnails extracted successfully!')
  }

  const download = async (size: string, label: string) => {
    if (!videoId) return
    const imgUrl = `https://img.youtube.com/vi/${videoId}/${size}.jpg`
    try {
      const res = await fetch(imgUrl)
      const blob = await res.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `youtube-thumbnail-${videoId}-${size}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
      toast.success(`${label} thumbnail downloaded!`)
    } catch {
      // Fallback: Open in new tab for direct save
      window.open(imgUrl, '_blank')
      toast.info('Opened thumbnail in new tab. Right click to save!')
    }
  }

  const handleImageError = (size: string) => {
    setFailedSizes(prev => new Set([...prev, size]))
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Paste any YouTube video URL or ID to extract and download its thumbnail in full HD and standard resolutions.
      </p>

      <div className="flex gap-3">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && extract()}
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          className="flex-1 bg-secondary text-foreground text-sm rounded-xl px-4 py-2.5 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {videoId && (
          <button onClick={() => { setVideoId(null); setUrl('') }} className="p-2 rounded-lg text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
        <Button onClick={extract} disabled={!url.trim()}>
          <Upload className="h-4 w-4 mr-2" /> Extract
        </Button>
      </div>

      {videoId && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Extracted Video ID:</span>
            <code className="text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">{videoId}</code>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {YOUTUBE_SIZES.map(({ key, label, size, quality }) => {
              const imgUrl = `https://img.youtube.com/vi/${videoId}/${key}.jpg`
              const failed = failedSizes.has(key)
              return (
                <div key={key} className="rounded-xl border border-border bg-card/50 overflow-hidden group">
                  <div className="relative aspect-video bg-black flex items-center justify-center">
                    {failed ? (
                      <div className="text-xs text-muted-foreground">Resolution not available for this video</div>
                    ) : (
                      <img
                        src={imgUrl}
                        alt={label}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(key)}
                      />
                    )}
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold">{label}</p>
                      <p className="text-[10px] text-muted-foreground">{size} · {quality}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => window.open(imgUrl, '_blank')} disabled={failed} title="View original image">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" onClick={() => download(key, label)} disabled={failed}>
                        <Download className="h-3.5 w-3.5 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
