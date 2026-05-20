import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema } from '@/components/seo/StructuredData'
import { usePageSeo } from '@/hooks/usePageSeo'
import { useLocalizedPath } from '@/hooks/useLocale'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/locale-config'

export default function Cookies() {
  const lp = useLocalizedPath()
  const seo = usePageSeo('cookies', {
    title: 'Cookie Policy - SmartDigitalTips',
    description:
      'Learn how SmartDigitalTips uses essential cookies, Google Analytics, Google AdSense, advertising cookies, and consent choices.',
  })

  const meta = {
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
    canonical: '/cookies',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}${lp('/')}` },
        { name: 'Cookie Policy', url: `${SITE_URL}${lp('/cookies')}` },
      ]),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'Cookie Policy', path: '/cookies' }]}>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: January 15, 2024</p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-bold">1. What Cookies Are</h2>
            <p className="leading-relaxed text-muted-foreground">
              Cookies and similar technologies are small pieces of data stored by your browser. They help websites remember preferences, measure usage, prevent abuse, and serve relevant advertising.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">2. Essential Storage</h2>
            <p className="leading-relaxed text-muted-foreground">
              We use essential local storage to remember basic preferences, including theme settings and your cookie consent choice. These preferences are needed for a consistent user experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">3. Analytics Cookies</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you accept optional cookies, Google Analytics may help us understand aggregated usage patterns, such as popular pages, device types, and general performance. We use this information to improve the website and tools.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">4. Advertising Cookies</h2>
            <p className="leading-relaxed text-muted-foreground">
              SmartDigitalTips uses Google AdSense. Google and its partners may use cookies, web beacons, IP addresses, device identifiers, and similar technologies to deliver ads, measure ad performance, prevent fraud, and personalize ads where allowed.
            </p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-muted-foreground">
              <li>Google may use advertising cookies based on your visits to this and other websites.</li>
              <li>You can control personalized ads in <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-foreground underline">Google Ads Settings</a>.</li>
              <li>You may also opt out of some third-party personalized advertising at <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-foreground underline">aboutads.info</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">5. Regional Consent</h2>
            <p className="leading-relaxed text-muted-foreground">
              Where legally required, including in the European Economic Area, the United Kingdom, and Switzerland, optional analytics and advertising storage should only be used with appropriate consent. We provide consent controls in the website interface and may use Google AdSense Privacy & messaging or another Google-certified consent management platform where required.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">6. Changing Your Choice</h2>
            <p className="leading-relaxed text-muted-foreground">
              You can reset your cookie choice by clearing this website's local storage or browser site data, then refreshing the page. Your browser may also provide controls to block or delete cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">7. Contact</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you have questions about cookies or advertising technologies on SmartDigitalTips, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
