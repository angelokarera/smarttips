import { EzoicAd } from './EzoicAd'

/** Full-width responsive leaderboard banner */
export function AdBanner() {
  return (
    <aside className="w-full py-6 my-6 border-y border-border/40 bg-secondary/20" aria-label="Advertisement">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Advertisement
        </p>
        <div className="flex min-h-[90px] justify-center">
          <EzoicAd
            sizes={['728x90', '970x250']}
            devices={['desktop']}
          />
          <EzoicAd
            sizes={['300x250', '336x280']}
            devices={['mobile', 'tablet']}
          />
        </div>
      </div>
    </aside>
  )
}

/** 300×250 sidebar rectangle ad for tool pages */
export function SidebarAd() {
  return (
    <div className="p-4 rounded-xl border border-border/80 bg-card/65 glass-card shadow-xs text-center">
      <p className="text-[10px] font-mono tracking-widest text-muted-foreground/60 uppercase mb-2">
        Advertisement
      </p>
      <div className="min-h-[250px] flex items-center justify-center bg-secondary/35 rounded-lg overflow-hidden border border-dashed border-border/60">
        <EzoicAd sizes="300x250" />
      </div>
    </div>
  )
}
