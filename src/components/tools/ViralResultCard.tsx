import { useState } from 'react'
import { Link, Twitter, Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { SITE_URL } from '@/lib/locale-config'
import { getToolRunCount } from '@/lib/analyticsStore'

interface ViralResultCardProps {
  toolId: string
  toolName: string
  toolPath: string
  resultSummary: string
  emotionalLabel: string
  emoji?: string
}

export function ViralResultCard({
  toolId,
  toolName,
  toolPath,
  resultSummary,
  emotionalLabel,
  emoji = '🔥',
}: ViralResultCardProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${SITE_URL}${toolPath}`
  const runsCount = getToolRunCount(toolId)

  // Message formatted for social sharing
  const shareText = `I just used the ${toolName} on SmartDigitalTips! ${emoji} My result: ${resultSummary}. Try it out for free (100% private):`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Share link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy link.')
    }
  }

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultSummary)
      toast.success('Result copied to clipboard!')
    } catch {
      toast.error('Failed to copy result.')
    }
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`

  return (
    <div className="p-6 rounded-2xl border-2 border-primary/20 bg-card/90 glass-card shadow-md relative overflow-hidden transition-all hover:border-primary/40 duration-300">
      {/* Dynamic top highlight glow */}
      <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-sm font-bold tracking-tight text-foreground">
            Analysis Completed
          </span>
        </div>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase bg-secondary/80 px-2 py-0.5 rounded border border-border/40">
          ⚡ Used by {runsCount.toLocaleString()}+ users today
        </span>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
            Status & Insight
          </span>
          <p className="text-lg font-extrabold text-foreground flex items-center gap-2">
            <span>{emoji}</span>
            <span>{emotionalLabel}</span>
          </p>
        </div>

        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
            Result Details
          </span>
          <div className="p-3 bg-secondary/35 rounded-lg border border-border/60 font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap max-h-[150px] overflow-y-auto">
            {resultSummary}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center gap-2 justify-center rounded-lg border border-border bg-secondary/20 hover:bg-sky-500/10 hover:border-sky-500/30 py-2 text-xs font-semibold text-muted-foreground hover:text-sky-400 transition-all cursor-pointer"
          >
            <Twitter className="h-3.5 w-3.5" />
            <span>Tweet</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center gap-2 justify-center rounded-lg border border-border bg-secondary/20 hover:bg-emerald-500/10 hover:border-emerald-500/30 py-2 text-xs font-semibold text-muted-foreground hover:text-emerald-400 transition-all cursor-pointer"
          >
            <span>💬 WhatsApp</span>
          </a>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 text-xs font-semibold rounded-lg h-9"
            onClick={copyResult}
          >
            Copy Result
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-xs font-semibold rounded-lg h-9 flex items-center gap-1.5"
            onClick={copyLink}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Copied Link</span>
              </>
            ) : (
              <>
                <Link className="h-3.5 w-3.5" />
                <span>Copy Share Link</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
