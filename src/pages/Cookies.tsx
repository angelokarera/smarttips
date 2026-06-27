import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/components/seo/StructuredData'
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
      generateWebPageSchema({
        name: 'Cookie Policy',
        description: seo.description,
        url: `${SITE_URL}${lp('/cookies')}`,
      }),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'Cookie Policy', path: '/cookies' }]}>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: June 27, 2025</p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-bold">1. What Cookies Are</h2>
            <p className="leading-relaxed text-muted-foreground">
              Cookies and similar technologies are small text files stored on your browser or device. They help websites remember preferences, analyze traffic, and display personalized advertising.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">2. Types of Cookies We Use</h2>
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-border border border-border rounded-lg text-left text-sm text-muted-foreground">
                <thead className="bg-secondary/40 text-foreground font-semibold">
                  <tr>
                    <th className="px-4 py-2 border-b border-border">Cookie / Storage Name</th>
                    <th className="px-4 py-2 border-b border-border">Type</th>
                    <th className="px-4 py-2 border-b border-border">Duration</th>
                    <th className="px-4 py-2 border-b border-border">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-2 font-mono">sdt_cookie_consent</td>
                    <td className="px-4 py-2">Essential (Local Storage)</td>
                    <td className="px-4 py-2">Persistent</td>
                    <td className="px-4 py-2">Remembers your cookie accept/decline choices.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">sdt_theme</td>
                    <td className="px-4 py-2">Essential (Local Storage)</td>
                    <td className="px-4 py-2">Persistent</td>
                    <td className="px-4 py-2">Remembers your preference (dark or light mode).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">_ga</td>
                    <td className="px-4 py-2">Analytics (Google)</td>
                    <td className="px-4 py-2">2 years</td>
                    <td className="px-4 py-2">Distinguishes unique users for traffic data.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">_gid</td>
                    <td className="px-4 py-2">Analytics (Google)</td>
                    <td className="px-4 py-2">24 hours</td>
                    <td className="px-4 py-2">Distinguishes users for tracking daily trends.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">__gads, __gpi</td>
                    <td className="px-4 py-2">Advertising (AdSense)</td>
                    <td className="px-4 py-2">13 months</td>
                    <td className="px-4 py-2">Measures ad views, clicks, and prevents click fraud.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">3. Essential Storage</h2>
            <p className="leading-relaxed text-muted-foreground">
              Essential storage is strictly necessary for the technical operation of our site (e.g., remembering your theme or whether you accepted cookies). These run locally and do not track personal identifying information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">4. Analytics Cookies</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you consent to cookies, we load Google Analytics (Property ID: 521386075 | Measurement ID: G-4P8GW43EWX) to gather anonymous, aggregate metrics (such as page views, user location country, and average time on site). This helps us improve our browser-based tools.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">5. Advertising Cookies (Google AdSense)</h2>
            <p className="leading-relaxed text-muted-foreground">
              We display ads served by Google AdSense (Publisher: ca-pub-3519891152775398). Google uses advertising cookies like DoubleClick to personalize the ads shown to you based on your browsing history across the web.
            </p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-muted-foreground">
              <li>Google may use cookies to serve relevant ads.</li>
              <li>You can view and edit your personalization settings at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-foreground underline">Google Ads Settings</a>.</li>
              <li>You can also opt out of third-party vendors' cookies for personalized advertising at <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-foreground underline">aboutads.info</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">6. How to Disable or Remove Cookies</h2>
            <p className="leading-relaxed text-muted-foreground">
              You can configure your browser to decline cookies, notify you before receiving a cookie, or delete existing cookies. To do this, check your browser's documentation or settings:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-foreground underline">Google Chrome Settings</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-foreground underline">Mozilla Firefox Settings</a></li>
              <li><a href="https://support.apple.com/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-foreground underline">Apple Safari Settings</a></li>
              <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9a73-dcf3-6b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" className="text-foreground underline">Microsoft Edge Settings</a></li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">7. Changing Your Consent</h2>
            <p className="leading-relaxed text-muted-foreground">
              You can withdraw or change your consent at any time by clearing your browser cookies and site data for smartdigitaltips.com. This will re-trigger the cookie consent banner when you next refresh or visit.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">8. Contact</h2>
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
