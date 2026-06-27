import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/components/seo/StructuredData'
import { usePageSeo } from '@/hooks/usePageSeo'
import { useLocalizedPath } from '@/hooks/useLocale'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/locale-config'

export default function Privacy() {
  const lp = useLocalizedPath()
  const seo = usePageSeo('privacy', {
    title: 'Privacy Policy - SmartDigitalTips',
    description:
      'Learn how SmartDigitalTips handles your data. We prioritize privacy and process most data locally in your browser.',
  })

  const meta = {
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
    canonical: '/privacy',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}${lp('/')}` },
        { name: 'Privacy Policy', url: `${SITE_URL}${lp('/privacy')}` },
      ]),
      generateWebPageSchema({
        name: 'Privacy Policy',
        description: seo.description,
        url: `${SITE_URL}${lp('/privacy')}`,
      }),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'Privacy Policy', path: '/privacy' }]}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: June 27, 2025
          </p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy explains how SmartDigitalTips handles information when you use our website and tools.
              By using SmartDigitalTips, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Information We Do Not Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most of our tools process data entirely within your web browser using client-side JavaScript. 
              This means:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Images you compress or convert are not uploaded to our servers</li>
              <li>PDFs you merge or split are processed locally</li>
              <li>Text you analyze or convert never leaves your device</li>
              <li>We cannot access, view, or store your files or data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may collect limited information to operate and improve our service:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li><strong>Usage Analytics:</strong> Aggregated usage information about which tools and pages are used most frequently, helping us prioritize improvements</li>
              <li><strong>Technical Information:</strong> Browser type, device type, and operating system 
              (for optimizing compatibility)</li>
              <li><strong>Error Reports:</strong> Technical error information to help us fix bugs</li>
              <li><strong>Contact Information:</strong> If you contact us, we use the information you provide, such as your name, email, and message, to respond to your inquiry</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies to remember your preferences (such as dark mode setting). 
              We also use Google Analytics to understand how users interact with our site. 
              You can disable cookies in your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Third-Party Advertising &amp; Cookies (Google AdSense)</h2>
            <p className="text-muted-foreground leading-relaxed">
              We display advertisements through <strong>Google AdSense</strong> (Publisher ID:{' '}
              <strong>ca-pub-3519891152775398</strong>, Customer ID: <strong>9066894802</strong>).
              Google AdSense uses cookies and web beacons to serve ads based on a user’s prior visits
              to this and other websites. These advertising cookies allow Google and its partners to
              serve ads to you based on your browsing history.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground">
              <li>
                <strong>Google AdSense</strong> may use the DoubleClick cookie and similar technologies to
                serve interest-based ads across websites.
              </li>
              <li>
                Google’s use of advertising cookies enables it and its partners to serve ads based
                on your visit to this and/or other sites on the Internet.
              </li>
              <li>
                You may opt out of personalised advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline"
                >
                  Google Ads Settings
                </a>.
              </li>
              <li>
                You may also opt out of third-party vendor cookies for personalised advertising via{' '}
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline"
                >
                  aboutads.info
                </a>.
              </li>
              <li>
                For full details on how Google handles your data, see:{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline"
                >
                  How Google uses information from sites that use our services
                </a>.
              </li>
              <li>
                Google’s main Privacy Policy:{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline"
                >
                  policies.google.com/privacy
                </a>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Where legally required (EEA, UK, Switzerland), optional analytics and advertising
              cookies are only loaded after you click “Accept All” in our cookie consent banner.
              You can withdraw consent at any time by clearing your browser cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Since most tool processing happens in your browser, many files and text inputs do not need to be sent to our servers.
              We use reasonable safeguards for information we do process, but no website or internet transmission can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Access any personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for children under 13. We do not knowingly collect 
              personal information from children under 13. If you are a parent and believe your child 
              has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Updated versions will be posted on this page.
              Please review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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
