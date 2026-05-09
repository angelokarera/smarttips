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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories, getPopularTools, getTrendingTools, getNewTools } from '@/data/tools'
import { Layout } from '@/components/layout/Layout'
import { generateWebsiteSchema, generateOrganizationSchema, generateCollectionSchema } from '@/components/seo/StructuredData'
import { platformKeywords, uniqueKeywords } from '@/lib/seoKeywords'

export default function Home() {
  const popularTools = getPopularTools().slice(0, 8)
  const trendingTools = getTrendingTools().slice(0, 5)
  const newTools = getNewTools().slice(0, 4)

  const meta = {
    title: 'Free Online Tools — PDF Converter, Image Compressor & SEO Utility | SmartDigitalTips',
    description: 'Access 50+ free online tools instantly. Compress images, convert PDF to Word, generate QR codes, and boost SEO. 100% free, fast, and secure. No signup required.',
    keywords: uniqueKeywords(['free online tools', 'pdf converter', 'image compressor', 'reduce image size', 'convert files online', 'keyword checker', 'meta tag generator', 'password generator', 'qr code generator', 'calculator tools', 'productivity tools', ...platformKeywords]),
    ogTitle: 'SmartDigitalTips - Free Online AI, SEO, Developer, PDF and Image Tools',
    ogDescription: 'Use free browser-based tools for AI workflows, SEO, developers, PDFs, images, text, students, startups, and business productivity.',
    schema: [
      generateWebsiteSchema(),
      generateOrganizationSchema(),
      generateCollectionSchema(
        'SmartDigitalTips Free Online Tools',
        'A searchable collection of free browser-based AI, SEO, developer, image, PDF, text, student, and startup tools.',
        'https://smartdigitaltips.com',
        popularTools.map((tool) => ({
          name: tool.name,
          url: `https://smartdigitaltips.com${tool.path}`,
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
  }

  return (
    <Layout meta={meta} showBreadcrumbs={false}>

      {/* ─── HERO ─── */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-36 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left — copy */}
            <div className="lg:col-span-7 fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide mb-8">
                <Cpu className="h-3.5 w-3.5" />
                100% browser-based — your files never leave your device
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] mb-6">
                Stop uploading your{' '}
                <br className="hidden sm:block" />
                files to strangers.
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
                50+ tools for images, PDFs, text, and more. Everything runs locally 
                in your browser. No accounts. No watermarks. No data collection.
              </p>
              
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/category/image">
                  <Button size="lg" className="h-12 px-7 text-sm font-semibold rounded-xl shadow-warm hover:shadow-warm-lg transition-shadow">
                    Browse all tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/tools/word-counter">
                  <Button variant="outline" size="lg" className="h-12 px-7 text-sm font-semibold rounded-xl">
                    Try Word Counter
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — asymmetric feature cards (break the grid) */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="space-y-3">
                {/* Card 1 */}
                <div className="p-5 rounded-2xl border border-border bg-card shadow-xs" style={{ animationDelay: '100ms' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Lock className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-semibold">Private by default</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                    Files are processed in your browser tab. We physically cannot see, store, or sell your data.
                  </p>
                </div>
                {/* Card 2 — offset left for asymmetry */}
                <div className="p-5 rounded-2xl border border-border bg-card shadow-xs -ml-6" style={{ animationDelay: '200ms' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-semibold">Instant results</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                    No loading spinners, no server roundtrips. Open a tool, drop in a file, get a result.
                  </p>
                </div>
                {/* Card 3 — offset right */}
                <div className="p-5 rounded-2xl border border-border bg-card shadow-xs ml-6" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-semibold">No strings attached</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                    No accounts, no usage limits, no premium tier. Every tool is free. Period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── POPULAR TOOLS — horizontal scroll, not grid ─── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Most-used tools
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                What people actually come back for.
              </p>
            </div>
            <Link 
              to="/category/image" 
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              All tools <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          {/* 2-col on mobile, 4-col on desktop — intentionally NOT 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {popularTools.map((tool, index) => (
              <Link
                key={tool.id}
                to={tool.path}
                className="group relative p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-warm transition-all duration-300"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <h3 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
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
              Pick a category. Get to work.
            </h2>
            <p className="text-muted-foreground text-sm">
              Six categories. 50+ tools. Zero friction between you and done.
            </p>
          </div>
          
          {/* Intentionally 2-col with a featured first item spanning full width on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-warm transition-all duration-300 ${
                  index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {iconMap[cat.icon]}
                  </div>
                  <h3 className="font-bold text-base">
                    {cat.label}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {cat.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                  Explore
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
                <h2 className="text-xl font-bold tracking-tight">Trending right now</h2>
              </div>
              <div className="space-y-2">
                {trendingTools.map((tool, index) => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-warm transition-all group"
                  >
                    <span className="font-mono text-2xl font-bold text-primary/30 w-8 text-center tabular-nums">
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
                <h2 className="text-xl font-bold tracking-tight">Just shipped</h2>
              </div>
              <div className="space-y-2">
                {newTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="block p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-warm transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        New
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
            
            <div className="relative px-8 py-14 sm:px-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  Your files stay yours.
                </h2>
                <p className="text-background/60 text-base max-w-md">
                  Pick any tool and start using it. No setup, no account creation, no learning curve.
                </p>
              </div>
              <Link to="/category/image" className="shrink-0">
                <Button 
                  size="lg" 
                  className="h-12 px-8 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-warm-lg"
                >
                  Get started
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
