import { Link } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/components/seo/StructuredData'
import { usePageSeo } from '@/hooks/usePageSeo'
import { useLocalizedPath } from '@/hooks/useLocale'
import { SITE_URL } from '@/lib/locale-config'
import { Mail, Globe, Shield, Users, Zap, Award } from 'lucide-react'

export default function About() {
  const lp = useLocalizedPath()
  const seo = usePageSeo('about', {
    title: 'About SmartDigitalTips — Who We Are & Why We Built This',
    description:
      'SmartDigitalTips was founded in 2024 to provide 50+ free, browser-based tools for images, PDFs, text, and developers. No accounts, no uploads, no data collection. Learn our story.',
  })

  const meta = {
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
    canonical: '/about',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}${lp('/')}` },
        { name: 'About', url: `${SITE_URL}${lp('/about')}` },
      ]),
      generateWebPageSchema({
        name: 'About SmartDigitalTips',
        description: seo.description,
        url: `${SITE_URL}${lp('/about')}`,
        type: 'AboutPage',
      }),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'About', path: '/about' }]}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

        {/* Hero block */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 mb-20">
          <div className="lg:col-span-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
              We got tired of "free" tools<br className="hidden sm:block" /> that aren't free.
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-lg">
              So we built the platform we wished existed. Every tool runs in your browser.
              Your files never leave your device. No catch.
            </p>
          </div>
          <div className="lg:col-span-2 flex items-end">
            <div className="p-6 rounded-2xl border border-border bg-card w-full">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-extrabold text-primary">50+</p>
                  <p className="text-xs text-muted-foreground mt-1">Free tools</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold">0</p>
                  <p className="text-xs text-muted-foreground mt-1">Files uploaded to servers</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold">7</p>
                  <p className="text-xs text-muted-foreground mt-1">Languages supported</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold">0</p>
                  <p className="text-xs text-muted-foreground mt-1">Accounts required</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-2xl space-y-8 mb-20">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Our story</h2>
            <p className="text-muted-foreground leading-[1.8]">
              SmartDigitalTips was founded in 2024 after years of frustration with "free" online tools that
              turned out to be anything but free. Every image compressor wanted you to sign up. Every PDF
              converter had a watermark. Every converter tool uploaded your sensitive files to someone else's
              server and processed them in the cloud — raising real privacy concerns.
            </p>
          </div>
          <p className="text-muted-foreground leading-[1.8]">
            We set out to build something different: a platform where every tool works entirely in your browser
            using modern Web APIs (Canvas API, Web Workers, File API). No server-side processing. No accounts.
            No paywalls. What started as a single image compressor has grown into 50+ tools spanning image
            processing, PDF manipulation, text analysis, developer utilities, calculators, and converters —
            all completely free, available in 7 languages.
          </p>
          <p className="text-muted-foreground leading-[1.8]">
            The site is ad-supported through Google AdSense, which keeps
            all tools free indefinitely. We believe software can be genuinely useful without being predatory
            — and SmartDigitalTips is our proof.
          </p>
        </div>

        {/* Expertise & Credentials */}
        <div className="mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8">What we bring to the table</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm">Browser-first engineering</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every tool is built using browser-native APIs: Canvas for image processing, PDF.js for PDF rendering,
                Web Workers for heavy computation. This is what makes privacy-by-architecture possible.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Shield className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm">Privacy by architecture</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We don't "promise" to delete your files — we never receive them. Your data physically cannot
                reach our servers because there's nothing to reach. It's structurally impossible.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm">Global reach, 7 languages</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                SmartDigitalTips is available in English, French, Spanish, Arabic, Portuguese, Swahili, and
                Chinese — reaching users across 6 continents.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm">Quality over quantity</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                50 tools that work well beat 500 that barely function. Every tool is tested across browsers,
                handles edge cases gracefully, and gets refined based on real usage patterns.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm">No growth hacking</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No mandatory accounts. No "share to unlock." No artificial usage limits designed to push you
                into a paid plan. If the tool works, you shouldn't need to do anything else.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm">Responsive to feedback</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every tool request and bug report gets read. Several tools on the site were built directly
                in response to user suggestions. We're reachable and we listen.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Standards — E-E-A-T */}
        <div className="grid lg:grid-cols-12 gap-6 mb-20">
          <div className="lg:col-span-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Editorial standards</h2>
            <p className="text-muted-foreground leading-[1.8]">
              Tool guides and blog articles on SmartDigitalTips are written and reviewed by people who build
              and test the utilities on this site. We update pages when browser APIs, file formats, privacy
              requirements, or accessibility practices change. Every recommendation is meant to help users
              complete a task — not to chase keyword volume or fill space.
            </p>
            <p className="text-muted-foreground leading-[1.8] mt-4">
              We cite specific numbers from our own tests, link to authoritative sources (NIST, WCAG, Google
              documentation), and correct factual errors promptly when readers point them out.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <article className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-bold text-base mb-2">SmartDigitalTips Editorial Team</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Authors practical explainers for image, PDF, text, developer, student, and business tools.
                Reviews instructions for clarity, accuracy, and mobile usability before publication. Tests
                all recommended workflows personally before writing about them.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-bold text-base mb-2">Technical Review</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Verifies that tool pages describe real browser behavior, clearly label simulations, and avoid
                unsupported claims about privacy, security, performance, or search results. All structured
                data (JSON-LD schema) is validated against Schema.org specifications.
              </p>
            </article>
          </div>
        </div>

        {/* Transparency — Monetization Disclosure */}
        <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 mb-12">
          <h2 className="font-bold text-lg mb-3">Transparency: How This Site Is Funded</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            SmartDigitalTips is free to use and always will be. The site is monetized through
            Google AdSense, which displays contextual advertisements.
            Ad revenue covers hosting, development time, and ongoing maintenance — allowing all 50+ tools
            to remain free with no paywalls, no accounts, and no data collection. Google AdSense and its
            partners may use cookies for personalized ads in accordance with Google's Privacy &amp; Terms
            (policies.google.com/technologies/partner-sites). You can manage ad personalization preferences
            through our cookie settings.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="p-8 rounded-2xl border border-border bg-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-bold text-lg mb-1">Got feedback or a question?</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Suggest a tool, report a bug, ask about partnerships, or just say hello.
                We read and respond to every message.
              </p>
              <a
                href="mailto:nkusikarera@hotmail.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mt-3"
              >
                <Mail className="h-4 w-4" />
                nkusikarera@hotmail.com
              </a>
            </div>
            <Link to={lp('/contact')}>
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-warm shrink-0">
                Contact us
              </button>
            </Link>
          </div>
        </div>

      </div>
    </Layout>
  )
}
