import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema } from '@/components/seo/StructuredData'

export default function Terms() {
  const meta = {
    title: 'Terms & Conditions - SmartyTips',
    description: 'Read the Terms and Conditions for using SmartyTools. By using our website, you agree to these terms.',
    canonical: '/terms',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://smartytips.com/' },
        { name: 'Terms & Conditions', url: 'https://smartytips.com/terms' },
      ]),
    ],
  }

  return (
    <Layout meta={meta} breadcrumbs={[{ name: 'Terms & Conditions', path: '/terms' }]}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">
            Last updated: April 25, 2026
          </p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using SmartyTips ("the Website"), you accept and agree to be bound by these 
              Terms and Conditions. If you do not agree with any part of these terms, you must not use 
              the Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              SmartyTips provides free online tools for image processing, PDF manipulation, text analysis, 
              calculations, and conversions. All tools are provided "as is" without any warranties.
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
              All content on SmartyTips, including but not limited to text, graphics, logos, and software, 
              is the property of SmartyTips and protected by copyright laws. You may not reproduce, 
              distribute, or create derivative works without our permission.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Your content remains yours. We do not claim ownership of any files or data you process 
              using our tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              SmartyTips provides all tools and services "as is" without any warranty of any kind, 
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
              In no event shall SmartyTips, its owners, or affiliates be liable for any direct, indirect, 
              incidental, special, or consequential damages arising out of or in connection with your use 
              of the Website or tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be 
              effective immediately upon posting to the Website. Your continued use of the Website 
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions shall be governed by and construed in accordance with the laws 
              of the State of California, United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us at{' '}
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
