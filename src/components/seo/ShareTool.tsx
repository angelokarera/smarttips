import { useState } from 'react'
import { Share2, Link, Twitter, Facebook, Linkedin, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import type { Tool } from '@/data/tools'
import { SITE_URL } from '@/lib/locale-config'

interface ShareToolProps {
  tool: Tool
  locale: string
}

export function ShareTool({ tool, locale }: ShareToolProps) {
  const [copied, setCopied] = useState(false)
  
  // Construct localized sharing URL
  const shareUrl = `${SITE_URL}/${locale}${tool.path}`
  
  // Custom viral messages for each tool category or default
  const getShareText = () => {
    switch (tool.category) {
      case 'pdf':
        return `This free PDF tool is a lifesaver! Merge, split, or convert PDFs instantly in your browser — 100% private. 📄👇 ${tool.name}`
      case 'image':
        return `Quickest way to compress or convert images without losing quality — directly in your browser! 🖼️⚡ ${tool.name}`
      case 'developer':
        return `No more sending JSON/HTML to unsecure websites. Format, beautify, or test code completely locally! 💻🔒 ${tool.name}`
      case 'security':
        return `Generate and test secure passwords offline. Safe and fully local! 🛡️🔑 ${tool.name}`
      default:
        return `Check out this awesome free tool: ${tool.name}! Instant, private, and no signup required. 🚀✨`
    }
  }

  const shareText = getShareText()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy link.')
    }
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
  }

  return (
    <div className="p-5 rounded-xl border border-border/85 bg-card/75 glass-card shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="h-4.5 w-4.5 text-primary" />
        <h2 className="text-base font-bold tracking-tight text-foreground">Share & Support</h2>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
        Love using {tool.name}? Share it with your friends, colleagues, or classmates to support us!
      </p>

      {/* Grid of sharing options */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 justify-center rounded-lg border border-border bg-secondary/20 hover:bg-sky-500/10 hover:border-sky-500/30 py-2 text-xs font-medium text-muted-foreground hover:text-sky-400 transition-all cursor-pointer"
        >
          <Twitter className="h-3.5 w-3.5" />
          <span>Twitter / X</span>
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 justify-center rounded-lg border border-border bg-secondary/20 hover:bg-emerald-500/10 hover:border-emerald-500/30 py-2 text-xs font-medium text-muted-foreground hover:text-emerald-400 transition-all cursor-pointer"
        >
          {/* Custom WhatsApp style message circle */}
          <span className="font-semibold text-xs leading-none">💬</span>
          <span>WhatsApp</span>
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 justify-center rounded-lg border border-border bg-secondary/20 hover:bg-blue-600/10 hover:border-blue-600/30 py-2 text-xs font-medium text-muted-foreground hover:text-blue-500 transition-all cursor-pointer"
        >
          <Facebook className="h-3.5 w-3.5" />
          <span>Facebook</span>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 justify-center rounded-lg border border-border bg-secondary/20 hover:bg-indigo-500/10 hover:border-indigo-500/30 py-2 text-xs font-medium text-muted-foreground hover:text-indigo-400 transition-all cursor-pointer"
        >
          <Linkedin className="h-3.5 w-3.5" />
          <span>LinkedIn</span>
        </a>
      </div>

      {/* Copy link input */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="flex-1 text-[11px] rounded-lg border border-border bg-muted/50 px-2.5 py-2 text-muted-foreground outline-hidden truncate"
        />
        <Button
          size="sm"
          variant="outline"
          onClick={copyToClipboard}
          className="rounded-lg shrink-0 h-8 text-xs font-medium flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Link className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
