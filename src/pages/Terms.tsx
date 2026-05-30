import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/components/seo/StructuredData'
import { usePageSeo } from '@/hooks/usePageSeo'
import { useLocalizedPath } from '@/hooks/useLocale'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/locale-config'

export default function Terms() {
  const lp = useLocalizedPath()
  const seo = usePageSeo('terms', {
    title: 'Terms & Conditions - SmartDigitalTips',
    description:
      'Read the Terms and Conditions for using SmartDigitalTips. By using our website, you agree to these terms.',
  })

  const meta = {
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
    canonical: '/terms',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}${lp('/')}` },
        { name: 'Terms & Conditions', url: `${SITE_URL}${lp('/terms')}` },
      ]),
      generateWebPageSchema({
        name: 'Terms & Conditions',
        description: seo.description,
        url: `${SITE_URL}${lp('/terms')}`,
      }),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'Terms & Conditions', path: '/terms' }]}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using SmartDigitalTips, you agree to these Terms and Conditions.
              If you do not agree with any part of these terms, you should stop using the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              SmartDigitalTips provides free online tools for image processing, PDF manipulation, text analysis,
              calculations, and conversions. The tools are provided for general use and may change over time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed">
              When using our tools, you agree not to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Use the tools for any illegal purpose or to violate any laws</li>
              <li>Upload or process content that infringes on intellectual property rights</li>
              <li>Attempt to disrupt or compromise the security of the Website</li>
              <li>Use automated systems to access the tools without permission</li>
              <li>Redistribute or resell our tools without written consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The SmartDigitalTips brand, website content, graphics, logos, and software are owned by SmartDigitalTips or its licensors and may be protected by copyright, trademark, and other laws.
              You may not reproduce, redistribute, or resell our website or tools without permission.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Your content remains yours. We do not claim ownership of any files or data you process 
              using our tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              SmartDigitalTips provides all tools and services "as is" without any warranty of any kind, 
              express or implied. We do not guarantee that:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>The tools will meet your specific requirements</li>
              <li>The tools will be uninterrupted, timely, or error-free</li>
              <li>The results from using the tools will be accurate or reliable</li>
              <li>Any errors in the service will be corrected</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, SmartDigitalTips, its owners, and affiliates will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the website or tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms and Conditions from time to time. Updated versions will be posted on this page.
              Your continued use of the website after changes are posted means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are intended to be interpreted under applicable laws. If a dispute arises, the applicable venue and governing law will depend on the location and legal requirements of the parties involved.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us at{' '}
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
