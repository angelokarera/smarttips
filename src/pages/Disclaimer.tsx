import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema } from '@/components/seo/StructuredData'
import { usePageSeo } from '@/hooks/usePageSeo'
import { useLocalizedPath } from '@/hooks/useLocale'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/locale-config'

export default function Disclaimer() {
  const lp = useLocalizedPath()
  const seo = usePageSeo('disclaimer', {
    title: 'Disclaimer - SmartDigitalTips',
    description:
      'Read the disclaimer for SmartDigitalTips. Important information about tool accuracy, data handling, and usage limitations.',
  })

  const meta = {
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
    canonical: '/disclaimer',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}${lp('/')}` },
        { name: 'Disclaimer', url: `${SITE_URL}${lp('/disclaimer')}` },
      ]),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'Disclaimer', path: '/disclaimer' }]}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Disclaimer</h1>
          <p className="text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. General Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information and tools provided on SmartDigitalTips are for general informational and
              educational purposes only. While we aim to provide helpful tools, we do not guarantee that every result will be complete, accurate, reliable, or suitable for every use case.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Tool Accuracy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our tools are designed to be helpful and accurate, but we cannot guarantee perfect results 
              in every scenario. Specifically:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Unit conversions and calculations may have minor rounding differences</li>

              <li>PDF conversions may not perfectly preserve complex formatting</li>
              <li>Image compression quality varies based on the source image</li>
              <li>GPA and grade calculations depend on your institution's specific policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. No Professional Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The tools and content on SmartDigitalTips do not constitute professional, legal, financial, 
              medical, or academic advice. Always consult with qualified professionals for advice 
              specific to your situation.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              For example, our GPA calculator provides estimates based on standard scales. Your 
              institution may use a different calculation method. Always verify academic standing 
              with your school's registrar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              While most of our tools process data locally in your browser, we recommend:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Not uploading sensitive or confidential files</li>
              <li>Verifying outputs before using them for important purposes</li>
              <li>Keeping backups of original files before conversion or compression</li>
              <li>Using additional security measures for highly sensitive data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. External Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              SmartDigitalTips may contain links to external websites. We do not control or endorse the 
              content, products, or services offered by these third-party sites. Visiting external 
              links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Affiliate Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              SmartDigitalTips may be supported by advertising revenue, including ads served through Google AdSense or other advertising partners. If we use affiliate links in the future, we may earn a commission when users click those links and make a purchase, at no additional cost to them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, SmartDigitalTips will not be liable for indirect, incidental, consequential, or punitive damages arising from your use of our tools or reliance on information provided on the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Changes to This Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Disclaimer from time to time. Updated versions will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Disclaimer, please contact us at{' '}
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
