import { Link } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema } from '@/components/seo/StructuredData'

export default function About() {
  const meta = {
    title: 'About — SmartDigitalTips',
    description: 'SmartDigitalTips builds free, browser-based tools for images, PDFs, text, and more. No accounts, no uploads, no data collection.',
    canonical: '/about',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://smartdigitaltips.com/' },
        { name: 'About', url: 'https://smartdigitaltips.com/about' },
      ]),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'About', path: '/about' }]}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Hero block — asymmetric */}
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
                  <p className="text-3xl font-extrabold">0</p>
                  <p className="text-xs text-muted-foreground mt-1">Accounts required</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold">0</p>
                  <p className="text-xs text-muted-foreground mt-1">Premium paywalls</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story — editorial long-form */}
        <div className="max-w-2xl space-y-8 mb-20">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">The backstory</h2>
            <p className="text-muted-foreground leading-[1.8]">
              SmartDigitalTips started in 2024 because every "free" online tool had a catch. 
              Sign up with your email. Wait for the server to process. See a watermark 
              on the output. Pay $9.99/month to remove it. We thought that was ridiculous.
            </p>
          </div>
          <p className="text-muted-foreground leading-[1.8]">
            What started as a single image compressor grew into 50+ tools spanning image processing, 
            PDF manipulation, text analysis, calculators, and unit converters. Every single one 
            shares the same principles: open it, use it, close the tab.
          </p>
        </div>

        {/* Principles — not a 4-card grid */}
        <div className="mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8">How we build</h2>
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-4 items-start p-6 rounded-2xl border border-border bg-card">
              <div className="lg:col-span-3">
                <h3 className="font-bold text-base">Privacy by architecture</h3>
              </div>
              <div className="lg:col-span-9">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don't "promise" to delete your files — we never receive them. Most tools 
                  use the Canvas API, Web Workers, and browser-native processing. Your data 
                  physically cannot reach our servers because there's nothing to reach.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-4 items-start p-6 rounded-2xl border border-border bg-card -ml-4 lg:-ml-8">
              <div className="lg:col-span-3">
                <h3 className="font-bold text-base">No growth hacking</h3>
              </div>
              <div className="lg:col-span-9">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No mandatory accounts. No "share to unlock." No artificial usage limits 
                  designed to push you into a paid plan. If the tool works, you shouldn't 
                  need to do anything else.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-4 items-start p-6 rounded-2xl border border-border bg-card ml-4 lg:ml-8">
              <div className="lg:col-span-3">
                <h3 className="font-bold text-base">Quality over quantity</h3>
              </div>
              <div className="lg:col-span-9">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  50 tools that work well beat 500 that barely function. Every tool is tested 
                  across browsers, handles edge cases gracefully, and gets refined based on 
                  real usage patterns.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team — brief, not a photo grid of people */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">The team</h2>
          <p className="text-muted-foreground leading-[1.8]">
            A small, distributed team of developers and designers who care more about 
            making tools that work than about quarterly growth metrics. We're across 
            three time zones, united by the belief that software can be useful without 
            being predatory.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="p-8 rounded-2xl border border-border bg-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-lg mb-1">Got feedback?</h2>
              <p className="text-sm text-muted-foreground">
                Suggest a tool, report a bug, or just say hello. We read everything.
              </p>
            </div>
            <Link to="/contact">
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-warm">
                Get in touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
