import { useParams, Link, Navigate } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { blogPosts } from '@/data/blog'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/components/seo/StructuredData'
import { getBlogKeywords, uniqueKeywords } from '@/lib/seoKeywords'
import { useLocale, useLocalizedPath } from '@/hooks/useLocale'
import { getBlogSeo } from '@/lib/seo-messages'
import { SITE_URL } from '@/lib/locale-config'

export default function BlogPost() {
  const locale = useLocale()
  const lp = useLocalizedPath()
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return <Navigate to={lp('/blog')} replace />
  }

  const blogSeo = getBlogSeo(post.slug, locale, {
    title: post.seoTitle,
    description: post.seoDescription,
  })

  const meta = {
    title: blogSeo.title,
    description: blogSeo.description,
    canonical: `/blog/${post.slug}`,
    locale,
    keywords: uniqueKeywords(getBlogKeywords(post)),
    ogTitle: blogSeo.title,
    ogDescription: blogSeo.description,
    ogType: 'article',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}${lp('/')}` },
        { name: 'Blog', url: `${SITE_URL}${lp('/blog')}` },
        { name: post.title, url: `${SITE_URL}${lp(`/blog/${post.slug}`)}` },
      ]),
      generateArticleSchema(post),
    ],
  }

  return (
    <Layout 
      meta={meta} 
      breadcrumbs={[
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` }
      ]}
    >
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium border-y border-border py-4">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </header>

        <div 
          className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight 
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 
          prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-ul:list-disc prose-ul:pl-6 prose-ul:text-muted-foreground prose-ul:mb-6
          prose-li:mb-2 prose-strong:text-foreground
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:bg-secondary prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-8 border-t border-border">
          <div className="bg-secondary/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Looking for free digital tools?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              SmartDigitalTips offers 50+ completely free tools for images, PDFs, text, and developers that run 100% locally in your browser.
            </p>
            <Link to="/">
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-warm">
                Explore all tools
              </button>
            </Link>
          </div>
        </div>

      </article>
    </Layout>
  )
}
