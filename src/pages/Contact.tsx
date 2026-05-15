import { useState } from 'react'
import { Link } from 'react-router'
import { Clock, CheckCircle2, Send } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema } from '@/components/seo/StructuredData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { usePageSeo } from '@/hooks/usePageSeo'
import { useLocalizedPath } from '@/hooks/useLocale'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/locale-config'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const lp = useLocalizedPath()
  const seo = usePageSeo('contact', {
    title: 'Contact — SmartDigitalTips',
    description:
      'Reach the SmartDigitalTips team. Suggest a tool, report a bug, or ask a question. We respond within 24 hours.',
  })

  const meta = {
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
    canonical: '/contact',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}${lp('/')}` },
        { name: 'Contact', url: `${SITE_URL}${lp('/contact')}` },
      ]),
    ],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot.trim()) return
    setSubmitted(true)
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'Contact', path: '/contact' }]}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
          
          {/* Left — context, not a bulleted list of contact methods */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Talk to us.
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether it is a bug, a feature request, a partnership idea, or feedback about our content — we want to hear it.
              Real people read these messages, not an automated support bot.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10 text-sm">
              SmartDigitalTips publishes free browser-based utilities for images, PDFs, text, students, and developers.
              For AdSense or Search Console questions, include your site URL so we can help verify pages from your region.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5">Response time</p>
                  <p className="text-sm text-muted-foreground">Usually within 24 hours on business days.</p>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-1">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Sent.</h2>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    We got your message and will get back to you as soon as possible. Thanks for reaching out.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                  <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</Label>
                      <Input id="contact-name" placeholder="Your name" required className="h-11 rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                      <Input id="contact-email" type="email" placeholder="you@example.com" required className="h-11 rounded-lg" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-subject" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</Label>
                    <Input id="contact-subject" placeholder="What's this about?" required className="h-11 rounded-lg" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</Label>
                    <Textarea 
                      id="contact-message" 
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      required
                      className="rounded-lg resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full h-11 rounded-xl shadow-warm hover:shadow-warm-lg transition-shadow font-semibold">
                    <Send className="h-4 w-4 mr-2" />
                    Send message
                  </Button>

                  <p className="text-[11px] text-muted-foreground/60 text-center">
                    By sending, you agree to our{' '}
                    <Link to={lp('/privacy')} className="underline hover:text-foreground transition-colors">privacy policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
