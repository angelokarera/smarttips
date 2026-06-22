import { Link } from 'react-router'
import { 
  ArrowRight, 
  Shield, 
  Zap,
  TrendingUp,
  Sparkles,
  Image,
  FileText,
  Type,
  GraduationCap,
  Briefcase,
  ArrowLeftRight,
  ChevronRight,
  Lock,
  Cpu,
  ArrowUpRight,
  Terminal,
  Timer,
  Globe,
  Palette,
  Star,
  Clock,
  ThumbsUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories, getTrendingTools, getNewTools } from '@/data/tools'
import { getMostUsedTools, getFavoriteTools } from '@/lib/favorites'
import { getRecentlyUsedTools, getRecommendedTools } from '@/lib/analyticsStore'
import { ToolSearchBar } from '@/components/tools/ToolSearchBar'
import { Layout } from '@/components/layout/Layout'
import { generateWebsiteSchema, generateOrganizationSchema, generateCollectionSchema } from '@/components/seo/StructuredData'
import { platformKeywords, uniqueKeywords } from '@/lib/seoKeywords'
import { useLocale, useLocalizedPath } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'
import { getPageSeo } from '@/lib/seo-messages'
import { SITE_URL } from '@/lib/locale-config'

export default function Home() {
  const locale = useLocale()
  const lp = useLocalizedPath()
  const { t, categoryLabel, localizeTool } = useTranslations()
  const popularTools = getMostUsedTools(8).map(localizeTool)
  const favoriteTools = getFavoriteTools().slice(0, 6).map(localizeTool)
  const trendingTools = getTrendingTools().slice(0, 5).map(localizeTool)
  const newTools = getNewTools().slice(0, 6).map(localizeTool)
  const recentTools = getRecentlyUsedTools(4).map(localizeTool)
  const recommendedTools = getRecommendedTools(4).map(localizeTool)

  const homeSeo = getPageSeo('home', locale, {
    title: 'Free Online Tools — 50+ Utilities, No Sign-Up | SmartDigitalTips',
    description:
      'Compress images, convert PDFs, generate QR codes & more — 100% free, private, instant. No sign-up ever. Try 50+ browser tools now.',
  })

  const meta = {
    title: homeSeo.title,
    description: homeSeo.description,
    locale,
    canonical: '/',
    keywords: uniqueKeywords(['free online tools', 'pdf converter', 'image compressor', 'reduce image size', 'convert files online', 'password generator', 'qr code generator', 'calculator tools', 'productivity tools', ...platformKeywords]),
    ogTitle: homeSeo.title,
    ogDescription: homeSeo.description,
    schema: [
      generateWebsiteSchema(),
      generateOrganizationSchema(),
      generateCollectionSchema(
        'SmartDigitalTips Free Online Tools',
        'A searchable collection of free browser-based developer, image, PDF, text, student, and startup tools.',
        `${SITE_URL}${lp('/')}`,
        popularTools.map((tool) => ({
          name: tool.name,
          url: `${SITE_URL}${lp(tool.path)}`,
        }))
      ),
    ],
  }

  const iconMap: Record<string, React.ReactNode> = {
    Image: <Image className="h-5 w-5" />,
    FileText: <FileText className="h-5 w-5" />,
    Type: <Type className="h-5 w-5" />,
    GraduationCap: <GraduationCap className="h-5 w-5" />,
    Briefcase: <Briefcase className="h-5 w-5" />,
    ArrowLeftRight: <ArrowLeftRight className="h-5 w-5" />,
    Terminal: <Terminal className="h-5 w-5" />,
    Shield: <Shield className="h-5 w-5" />,
    Timer: <Timer className="h-5 w-5" />,
    Palette: <Palette className="h-5 w-5" />,
    Globe: <Globe className="h-5 w-5" />,
  }

  return (
    <Layout meta={meta} showBreadcrumbs={false} showPublisherAds>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left — copy */}
            <div className="lg:col-span-7 fade-in-up">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-primary mb-8">
                <Cpu className="h-3.5 w-3.5" />
                <span className="min-w-0">{t('home.badge')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] mb-6">
                {t('home.heroTitle')}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
                {t('home.heroSubtitle')}
              </p>
              
              <div className="mb-8 max-w-xl">
                <ToolSearchBar />
              </div>

              <div className="flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
                <Link to={lp('/tools/image-compressor')} className="w-full min-[420px]:w-auto">
                  <Button size="lg" className="h-12 w-full rounded-xl px-6 text-sm font-semibold shadow-warm transition-shadow hover:shadow-warm-lg min-[420px]:w-auto sm:px-7">
                    Compress My Image — Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to={lp('/tools/pdf-to-word')} className="w-full min-[420px]:w-auto">
                  <Button variant="outline" size="lg" className="h-12 w-full rounded-xl px-6 text-sm font-semibold min-[420px]:w-auto sm:px-7">
                    Convert PDF to Word
                  </Button>
                </Link>
                <Link to={lp('/tools/qr-code-generator')} className="w-full min-[420px]:w-auto">
                  <Button variant="outline" size="lg" className="h-12 w-full rounded-xl px-6 text-sm font-semibold min-[420px]:w-auto sm:px-7">
                    Create a QR Code
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — Premium Dashboard Mockup Card */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="p-6 rounded-2xl border border-border bg-card/65 glass-card shadow-lg relative overflow-hidden">
                {/* Decorative glow inside card */}
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/15 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="flex h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="flex h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase bg-secondary/50 px-2 py-0.5 rounded">
                    Status: Online
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary shrink-0" />
                  Private Browser Engine
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-0.5">
                      <Lock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t('home.cardPrivateTitle')}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {t('home.cardPrivateText')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-0.5">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t('home.cardInstantTitle')}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {t('home.cardInstantText')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0 mt-0.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t('home.cardFreeTitle')}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {t('home.cardFreeText')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 border-t border-border/40 pt-4 text-center">
                  <div className="bg-secondary/40 p-2.5 rounded-xl border border-border/30">
                    <p className="text-sm font-bold text-primary">50+</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Utilities</p>
                  </div>
                  <div className="bg-secondary/40 p-2.5 rounded-xl border border-border/30">
                    <p className="text-sm font-bold">100%</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Local-First</p>
                  </div>
                  <div className="bg-secondary/40 p-2.5 rounded-xl border border-border/30">
                    <p className="text-sm font-bold">0.0s</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Queue Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {favoriteTools.length > 0 && (
        <section className="py-12 lg:py-16 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-2.5">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your favorites</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {favoriteTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={lp(tool.path)}
                  className="group p-5 rounded-xl border border-border/80 bg-card/75 glass-card hover-lift transition-all"
                >
                  <h3 className="font-semibold text-sm group-hover:text-primary">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── RECENTLY USED ─── */}
      {recentTools.length > 0 && (
        <section className="py-12 lg:py-14 border-t border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Continue where you left off</h2>
              </div>
              <span className="hidden sm:inline text-xs text-muted-foreground bg-secondary/80 border border-border/40 px-3 py-1 rounded-full">
                Based on your history
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {recentTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={lp(tool.path)}
                  className="group relative p-5 rounded-xl border border-primary/20 bg-card/75 glass-card hover-lift transition-all duration-300 hover:border-primary/50"
                >
                  <div className="absolute top-2 right-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary/60 bg-primary/10 px-1.5 py-0.5 rounded">Recent</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors pr-10">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Open again <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── RECOMMENDED FOR YOU ─── */}
      {recommendedTools.length > 0 && (
        <section className="py-12 lg:py-14 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <ThumbsUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Recommended for you</h2>
              </div>
              <span className="hidden sm:inline text-xs text-muted-foreground bg-secondary/80 border border-border/40 px-3 py-1 rounded-full">
                Tailored to your usage
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {recommendedTools.map((tool, index) => (
                <Link
                  key={tool.id}
                  to={lp(tool.path)}
                  className="group relative p-5 rounded-xl border border-border/85 bg-card/75 glass-card hover-lift transition-all duration-300"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <h3 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                      {tool.categoryLabel}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PLATFORM GUIDE (substantive content for discoverability) ─── */}
      <section className="py-14 lg:py-16 border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Free online tools that respect your privacy
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                SmartDigitalTips is a collection of browser-based utilities for images, PDFs, writing,
                developers, security, and everyday productivity. Each tool page explains what the feature does,
                who it helps, and how to get accurate results—so you are never staring at a blank box without
                context.
              </p>
              <p>
                Where possible, processing happens on your device instead of a remote server. That matters when
                you compress client photos, merge contracts, test regular expressions against API samples, or
                check password strength before saving credentials in a manager. We do not require accounts, and
                we aim to label simulations clearly when a tool cannot measure real-world network speed.
              </p>
              <p>
                Browse by category—Text, Developer, Security, Productivity, Image, PDF, and more—or search above
                to jump straight to a tool. New utilities ship with step-by-step instructions, FAQs, and related
                links so you can finish one task and move to the next without leaving the site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY SMARTDIGITALTIPS — Trust + Social Proof ─── */}
      <section className="py-14 lg:py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Trust bullets */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
                Why SmartDigitalTips?
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">100% browser-based</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Your files never leave your device, ever. No server uploads, no data retention.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">No account required</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Open a tool, use it, done in seconds. No email, no password, no friction.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">Completely free</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">No paywalls, no freemium traps, no hidden fees. Every tool, always free.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">50+ tools in one place</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Image, PDF, text, security, developer, and more — all under one roof.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right — Social proof stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">120,000+</p>
                <p className="text-sm font-semibold">users every month</p>
                <p className="text-xs text-muted-foreground mt-1">From students and freelancers to developers and agencies worldwide</p>
              </div>
              <div className="p-5 rounded-2xl border border-border/80 bg-card/75 glass-card text-center">
                <p className="text-2xl font-extrabold mb-0.5">50+</p>
                <p className="text-xs text-muted-foreground">free utilities</p>
              </div>
              <div className="p-5 rounded-2xl border border-border/80 bg-card/75 glass-card text-center">
                <p className="text-2xl font-extrabold mb-0.5">150+</p>
                <p className="text-xs text-muted-foreground">countries served</p>
              </div>
              <div className="p-5 rounded-2xl border border-border/80 bg-card/75 glass-card text-center">
                <p className="text-2xl font-extrabold mb-0.5">0.0s</p>
                <p className="text-xs text-muted-foreground">queue time</p>
              </div>
              <div className="p-5 rounded-2xl border border-border/80 bg-card/75 glass-card text-center">
                <p className="text-2xl font-extrabold mb-0.5">100%</p>
                <p className="text-xs text-muted-foreground">browser-based</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MOST USED TOOLS ─── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {t('home.mostUsed')}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {t('home.mostUsedSubtitle')}
              </p>
            </div>
            <Link 
              to={lp('/category/image')} 
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {t('common.allTools')} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          {/* 2-col on mobile, 4-col on desktop — intentionally NOT 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {popularTools.map((tool, index) => (
              <Link
                key={tool.id}
                to={lp(tool.path)}
                className="group relative p-5 rounded-xl border border-border/85 bg-card/75 glass-card hover-lift transition-all duration-300"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <h3 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider break-words">
                    {tool.categoryLabel}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ─── CATEGORIES — large editorial cards with asymmetry ─── */}
      <section className="py-16 lg:py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {t('home.pickCategoryTitle')}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t('home.pickCategorySubtitle')}
            </p>
          </div>
          
          {/* Intentionally 2-col with a featured first item spanning full width on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                to={lp(`/category/${cat.id}`)}
                className={`group relative p-6 rounded-2xl border border-border/85 bg-card/75 glass-card hover-lift transition-all duration-300 ${
                  index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex min-w-0 items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_15px_rgba(232,93,52,0.25)] transition-all duration-300">
                    {iconMap[cat.icon]}
                  </div>
                  <h3 className="min-w-0 font-bold text-base">
                    {categoryLabel(cat.id, { label: cat.label, description: cat.description }).label}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {categoryLabel(cat.id, { label: cat.label, description: cat.description }).description}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                  {t('home.explore')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ─── TRENDING + NEW — side-by-side editorial lists ─── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Trending — takes 3 cols */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2.5 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tight">{t('home.trendingRightNow')}</h2>
              </div>
              <div className="space-y-2">
                {trendingTools.map((tool, index) => (
                  <Link
                    key={tool.id}
                    to={lp(tool.path)}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-border/85 bg-card/75 glass-card p-4 hover-lift sm:gap-4"
                  >
                    <span className="w-7 shrink-0 text-center font-mono text-xl font-bold tabular-nums text-primary/30 sm:w-8 sm:text-2xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{tool.description}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
            
            {/* New — takes 2 cols, different visual treatment */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tight">{t('home.justShipped')}</h2>
              </div>
              <div className="space-y-2">
                {newTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={lp(tool.path)}
                    className="block p-4 rounded-xl border border-border/85 bg-card/75 glass-card hover-lift group"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {t('common.new')}
                      </span>
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── CTA — bold, simple, no blob gradients ─── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-foreground text-background overflow-hidden">
            {/* Subtle geometric accent — not a blob gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/3" />
            
            <div className="relative flex flex-col items-start justify-between gap-8 px-5 py-12 min-[420px]:px-8 sm:flex-row sm:items-center sm:px-16 sm:py-20">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {t('home.ctaHeroTitle')}
                </h2>
                <p className="text-background/60 text-base max-w-md">
                  {t('home.ctaHeroText')}
                </p>
              </div>
              <Link to={lp('/category/image')} className="w-full shrink-0 sm:w-auto">
                <Button 
                  size="lg" 
                  className="h-12 w-full rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-warm-lg hover:bg-primary/90 sm:w-auto"
                >
                  {t('home.getStarted')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}
