import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema } from '@/components/seo/StructuredData'

export default function Disclaimer() {
  const meta = {
    title: 'Disclaimer - SmartyTips',
    description: 'Read the disclaimer for SmartyTips. Important information about tool accuracy, data handling, and usage limitations.',
    canonical: '/disclaimer',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://smartytips.com/' },
        { name: 'Disclaimer', url: 'https://smartytips.com/disclaimer' },
      ]),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'Disclaimer', path: '/disclaimer' }]}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Disclaimer</h1>
          <p className="text-muted-foreground">
            Last updated: April 25, 2026
          </p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. General Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information and tools provided on SmartyTips are for general informational and 
              educational purposes only. While we strive to ensure accuracy and reliability, we make 
              no representations or warranties of any kind about the completeness, accuracy, reliability, 
              or suitability of the information and tools provided.
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
              <li>Currency exchange rates are approximate and for reference only</li>
              <li>PDF conversions may not perfectly preserve complex formatting</li>
              <li>Image compression quality varies based on the source image</li>
              <li>GPA and grade calculations depend on your institution's specific policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. No Professional Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The tools and content on SmartyTips do not constitute professional, legal, financial, 
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
              SmartyTips may contain links to external websites. We do not control or endorse the 
              content, products, or services offered by these third-party sites. Visiting external 
              links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Affiliate Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              SmartyTips is supported by advertising revenue. We may display ads through Google 
              AdSense and other advertising networks. Some links may be affiliate links, meaning 
              we may earn a commission if you click through and make a purchase, at no additional 
              cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using SmartyTips, you agree that we shall not be held liable for any direct, 
              indirect, incidental, consequential, or punitive damages arising from your use of 
              our tools or reliance on any information provided on the Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Changes to This Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Disclaimer at any time without prior notice. Your continued use 
              of the Website after changes constitutes acceptance of the updated disclaimer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Disclaimer, please contact us at{' '}
              <a href="mailto:support@smartytips.com" className="text-foreground underline">
                support@smartytips.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
