import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema } from '@/components/seo/StructuredData'

export default function Privacy() {
  const meta = {
    title: 'Privacy Policy - SmartDigitalTips',
    description: 'Learn how SmartDigitalTips handles your data. We prioritize privacy and process most data locally in your browser.',
    canonical: '/privacy',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://smartdigitaltips.com/' },
        { name: 'Privacy Policy', url: 'https://smartdigitaltips.com/privacy' },
      ]),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'Privacy Policy', path: '/privacy' }]}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: April 25, 2026
          </p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At SmartDigitalTips, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, and protect your information when you use our website and tools. By using SmartDigitalTips, 
              you agree to the terms outlined in this policy.
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
              We collect minimal information to improve our service:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li><strong>Usage Analytics:</strong> Anonymous data about which tools are used most frequently, 
              helping us prioritize improvements</li>
              <li><strong>Technical Information:</strong> Browser type, device type, and operating system 
              (for optimizing compatibility)</li>
              <li><strong>Error Reports:</strong> Anonymous error data to help us fix bugs</li>
              <li><strong>Contact Form Data:</strong> When you contact us, we store your name, email, and 
              message to respond to your inquiry</li>
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
            <h2 className="text-xl font-bold mb-3">5. Third-Party Advertising & Cookies (Google AdSense)</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-foreground underline">Google Ads Settings</a>.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              For more information about how Google handles your data, please review <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-foreground underline">How Google uses information from sites or apps that use our services</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Since most processing happens in your browser, the risk of data breaches is minimized. 
              Any server-side data we do collect is stored securely and never shared with third parties 
              except as required by law.
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
              We may update this Privacy Policy from time to time. We will notify users of significant 
              changes by posting a notice on our website. Please review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:support@smartdigitaltips.com" className="text-foreground underline">
                support@smartdigitaltips.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
