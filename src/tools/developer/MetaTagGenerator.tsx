import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [keywords, setKeywords] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [twitterSite, setTwitterSite] = useState('')
  const [copied, setCopied] = useState(false)

  const output = `<!-- Primary Meta Tags -->
<title>${title || 'Page Title'}</title>
<meta name="description" content="${desc || 'Page description'}" />
${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title || 'Page Title'}" />
<meta property="og:description" content="${desc || 'Page description'}" />
${ogImage ? `<meta property="og:image" content="${ogImage}" />` : ''}

<!-- Twitter / X Card -->
<meta name="twitter:card" content="summary_large_image" />
${twitterSite ? `<meta name="twitter:site" content="${twitterSite}" />` : ''}
<meta name="twitter:title" content="${title || 'Page Title'}" />
<meta name="twitter:description" content="${desc || 'Page description'}" />
${ogImage ? `<meta name="twitter:image" content="${ogImage}" />` : ''}`

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    toast.success('Meta tags copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const titleLen = title.length
  const descLen = desc.length

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Fill in the fields below to generate complete HTML meta tags for SEO, Open Graph, and Twitter cards.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>Page Title</span>
              <span className={`font-mono text-xs ${titleLen > 60 ? 'text-red-400' : titleLen > 50 ? 'text-amber-400' : 'text-primary'}`}>
                {titleLen}/60
              </span>
            </label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="My Awesome Page" maxLength={70} />
            {titleLen > 60 && <p className="text-xs text-red-400">⚠ Title is too long — Google truncates at ~60 chars.</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>Meta Description</span>
              <span className={`font-mono text-xs ${descLen > 160 ? 'text-red-400' : descLen > 140 ? 'text-amber-400' : 'text-primary'}`}>
                {descLen}/160
              </span>
            </label>
            <Textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="A clear description of your page content..." rows={3} maxLength={175} />
            {descLen > 160 && <p className="text-xs text-red-400">⚠ Description is too long — Google truncates at ~160 chars.</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Keywords (comma-separated, optional)</label>
            <Input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="react, tools, free online" />
            <p className="text-xs text-muted-foreground/70">Note: Google ignores the keywords tag, but some other engines may use it.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">OG Image URL (1200×630px recommended)</label>
            <Input value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://example.com/og-image.png" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Twitter Site Handle (optional)</label>
            <Input value={twitterSite} onChange={e => setTwitterSite(e.target.value)} placeholder="@yourhandle" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Generated Meta Tags</span>
            <Button size="sm" onClick={copy}>
              {copied ? <><Check className="h-3.5 w-3.5 mr-1" /> Copied!</> : <><Copy className="h-3.5 w-3.5 mr-1" /> Copy All</>}
            </Button>
          </div>
          <pre className="p-4 rounded-xl border border-border bg-card font-mono text-xs leading-relaxed overflow-x-auto text-green-400 min-h-[360px] whitespace-pre-wrap">
            <code>{output}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
