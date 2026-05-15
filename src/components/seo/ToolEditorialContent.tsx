import { Shield } from 'lucide-react'
import type { Tool } from '@/data/tools'
import { getToolEditorial } from '@/lib/tool-editorial'

interface ToolEditorialContentProps {
  tool: Tool
}

function OverviewParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-sm text-muted-foreground leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

function PrivacyHeadingBlock() {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Shield className="h-5 w-5 text-primary shrink-0" aria-hidden />
      <h2 id="tool-privacy-heading" className="text-base font-bold tracking-tight">
        Privacy &amp; security
      </h2>
    </div>
  )
}

export function ToolEditorialContent({ tool }: ToolEditorialContentProps) {
  const editorial = getToolEditorial(tool)

  return (
    <div className="space-y-16">
      <section aria-labelledby="tool-overview-heading">
        <h2 id="tool-overview-heading" className="text-xl font-bold tracking-tight mb-4">
          About {tool.name}
        </h2>
        <OverviewParagraphs paragraphs={editorial.overview} />
      </section>

      <section aria-labelledby="tool-use-cases-heading">
        <h2 id="tool-use-cases-heading" className="text-xl font-bold tracking-tight mb-4">
          Common use cases
        </h2>
        <ul className="space-y-2.5">
          {editorial.useCases.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="rounded-2xl border border-border bg-secondary/30 p-5 sm:p-6"
        aria-labelledby="tool-privacy-heading"
      >
        <PrivacyHeadingBlock />
        <p className="text-sm text-muted-foreground leading-relaxed">
          SmartDigitalTips is designed for privacy-first workflows. Where supported, {tool.name} processes
          your input locally in the browser instead of uploading files to our servers. Do not submit
          passwords, medical records, or classified material through any online tool. For legal, financial,
          or academic decisions, verify results with a qualified professional.
        </p>
      </section>

      <section aria-labelledby="tool-tips-heading">
        <h2 id="tool-tips-heading" className="text-xl font-bold tracking-tight mb-4">
          Tips for best results
        </h2>
        <ul className="space-y-2.5">
          {editorial.tips.map((tip) => (
            <li key={tip} className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
