import { Link } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { blogPosts } from '@/data/blog'
import { Calendar, ArrowRight } from 'lucide-react'
import { generateCollectionSchema } from '@/components/seo/StructuredData'
import { platformKeywords, uniqueKeywords } from '@/lib/seoKeywords'
import { usePageSeo } from '@/hooks/usePageSeo'
import { useLocalizedPath } from '@/hooks/useLocale'
import { SITE_URL } from '@/lib/locale-config'

export default function BlogList() {
  const lp = useLocalizedPath()
  const seo = usePageSeo('blog', {
    title: 'Digital Tips & Guides | SmartDigitalTips Blog',
    description:
      'Read comprehensive guides, tutorials, and tips on image optimization, PDF management, SEO, and business productivity.',
  })

  const meta = {
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
    canonical: '/blog',
    keywords: uniqueKeywords(['digital tips', 'SEO guides', 'online tools blog', 'productivity guides', ...platformKeywords]),
    ogTitle: seo.title,
    ogDescription: seo.description,
    schema: [
      generateCollectionSchema(
        'Digital Tips & Guides',
        'Guides and tutorials for using free online tools more effectively.',
        `${SITE_URL}${lp('/blog')}`,
        blogPosts.map((post) => ({
          name: post.title,
          url: `https://smartdigitaltips.com/blog/${post.slug}`,
        }))
      ),
    ],
  }

  return (
    <Layout meta={meta} showPublisherAds breadcrumbs={[{ name: 'Blog', path: '/blog' }]}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Digital Tips & Guides
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            In-depth articles, tutorials, and best practices to help you work smarter and get the most out of your digital tools.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group flex flex-col p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/75 glass-card hover-lift transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-sm font-semibold text-primary mt-auto">
                Read article <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </Layout>
  )
}
