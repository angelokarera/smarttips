import { useState } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function OgPreview() {
  const [title, setTitle] = useState('SmartDigitalTips — Free Online Tools')
  const [desc, setDesc] = useState('50+ free browser-based utility tools. No sign-up, no uploads, instant results.')
  const [image, setImage] = useState('https://smartdigitaltips.com/og-image.png')
  const [siteUrl, setSiteUrl] = useState('https://smartdigitaltips.com')
  const [platform, setPlatform] = useState<'facebook' | 'twitter' | 'linkedin'>('facebook')

  const domain = (() => { try { return new URL(siteUrl).hostname } catch { return siteUrl } })()

  const metaTags = `<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${image}" />
<meta property="og:url" content="${siteUrl}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${image}" />`

  const copy = () => { navigator.clipboard.writeText(metaTags); toast.success('Meta tags copied!') }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Preview how your page will look when shared on Facebook, Twitter/X, and LinkedIn. Fill in the metadata fields below.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">OG Title</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Page Title" />
            <p className="text-xs text-muted-foreground/70">{title.length}/95 chars</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">OG Description</label>
            <Textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Page description..." rows={3} />
            <p className="text-xs text-muted-foreground/70">{desc.length}/200 chars</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">OG Image URL (1200×630px)</label>
            <Input value={image} onChange={e => setImage(e.target.value)} placeholder="https://example.com/og.png" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Page URL</label>
            <Input value={siteUrl} onChange={e => setSiteUrl(e.target.value)} placeholder="https://example.com" />
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="flex gap-2">
            {([
              { val: 'facebook', label: 'Facebook' },
              { val: 'twitter', label: 'Twitter / X' },
              { val: 'linkedin', label: 'LinkedIn' },
            ] as const).map(({ val, label }) => (
              <button key={val} onClick={() => setPlatform(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${platform === val ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                {label}
              </button>
            ))}
          </div>

          {/* Card preview */}
          <div className={`rounded-xl overflow-hidden border shadow-lg ${platform === 'twitter' ? 'border-zinc-700 bg-zinc-900' : platform === 'linkedin' ? 'border-blue-900 bg-white' : 'border-gray-600 bg-white'}`}>
            {image && (
              <div className={`${platform === 'twitter' ? 'rounded-t-xl overflow-hidden' : ''}`}>
                <img src={image} alt="OG Preview" className="w-full object-cover"
                  style={{ maxHeight: '200px' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
            )}
            <div className={`p-3 ${platform === 'linkedin' ? 'bg-white text-zinc-900' : platform === 'twitter' ? 'bg-zinc-900 text-white' : 'bg-[#f2f3f4] text-zinc-900'}`}>
              <p className="text-xs uppercase tracking-wide text-zinc-400 mb-0.5">{domain}</p>
              <p className={`font-bold text-sm leading-tight line-clamp-2 ${platform === 'twitter' ? 'text-white' : 'text-zinc-900'}`}>{title}</p>
              <p className={`text-xs mt-0.5 line-clamp-2 ${platform === 'twitter' ? 'text-zinc-400' : 'text-zinc-500'}`}>{desc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Generated Meta Tags</span>
          <Button size="sm" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1" />Copy Tags</Button>
        </div>
        <pre className="p-4 rounded-xl border border-border bg-card font-mono text-xs text-green-400 overflow-x-auto whitespace-pre-wrap">
          <code>{metaTags}</code>
        </pre>
      </div>
    </div>
  )
}
