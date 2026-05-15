import { Link, useParams } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { categories, getToolsByCategory } from '@/data/tools'
import { Layout } from '@/components/layout/Layout'
import { generateBreadcrumbSchema, generateCollectionSchema } from '@/components/seo/StructuredData'
import { Button } from '@/components/ui/button'
import { getCategoryKeywords, uniqueKeywords } from '@/lib/seoKeywords'
import { useLocale, useLocalizedPath } from '@/hooks/useLocale'
import { getCategorySeo } from '@/lib/seo-messages'
import { SITE_URL } from '@/lib/locale-config'
import { getCategoryEditorial } from '@/lib/category-editorial'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function CategoryPage() {
  const locale = useLocale()
  const lp = useLocalizedPath()
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = categories.find((c) => c.id === categoryId)
  const tools = getToolsByCategory(categoryId || '')

  if (!category) {
    return (
      <Layout 
        meta={{ 
          title: 'Category Not Found', 
          description: 'The requested category could not be found.' 
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold mb-3">Category not found</h1>
          <p className="text-muted-foreground mb-8">This category doesn't exist. It might have been moved or removed.</p>
          <Link to="/">
            <Button className="rounded-xl">Back to home</Button>
          </Link>
        </div>
      </Layout>
    )
  }

  const categoryEditorial = getCategoryEditorial(category.id)

  const categorySeo = getCategorySeo(category.id, locale, {
    title: `${category.label} — Free Online Tools | SmartDigitalTips`,
    description: category.description,
  })

  const meta = {
    title: categorySeo.title,
    description: categorySeo.description,
    canonical: `/category/${category.id}`,
    locale,
    keywords: uniqueKeywords(getCategoryKeywords(category)),
    ogTitle: categorySeo.title,
    ogDescription: categorySeo.description,
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}${lp('/')}` },
        { name: category.label, url: `${SITE_URL}${lp(`/category/${category.id}`)}` },
      ]),
      generateCollectionSchema(
        `${category.label} - Free Online Tools`,
        category.description,
        `${SITE_URL}${lp(`/category/${category.id}`)}`,
        tools.map((tool) => ({
          name: tool.name,
          url: `${SITE_URL}${lp(tool.path)}`,
        }))
      ),
    ],
  }

  return (
    <Layout 
      meta={meta}
      breadcrumbs={[
        { name: category.label, path: `/category/${category.id}` },
      ]}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Category Header — left-aligned, no centered fluff */}
        <div className="mb-10 max-w-2xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
              {tools.length} tools
            </span>
            <span className="text-[11px] text-muted-foreground/50">•</span>
            <span className="text-[11px] text-muted-foreground/50 uppercase tracking-wider font-medium">All free</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">{category.label}</h1>
          <p className="text-muted-foreground leading-relaxed">{category.description}</p>
        </div>

        {categoryEditorial && (
          <div className="mb-12 max-w-3xl space-y-8">
            <div className="space-y-4">
              {categoryEditorial.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                What you can do here
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {categoryEditorial.highlights.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted-foreground leading-relaxed rounded-lg border border-border bg-card/50 px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {categoryEditorial.faqs.length > 0 && (
              <div>
                <h2 className="text-lg font-bold tracking-tight mb-4">Category FAQ</h2>
                <Accordion type="single" collapsible className="w-full max-w-2xl">
                  {categoryEditorial.faqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`cat-faq-${index}`} className="border-border">
                      <AccordionTrigger className="text-left text-sm font-semibold hover:text-primary py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        )}

        {/* Tools Grid — 2-col on desktop for readability, not 3 */}
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tools.map((tool, index) => (
              <Link
                key={tool.id}
                to={lp(tool.path)}
                className="group flex min-w-0 items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-warm sm:gap-4 sm:p-5"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <span className="font-mono text-xs font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    {tool.new && (
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        New
                      </span>
                    )}
                    {tool.trending && (
                      <span className="px-1.5 py-0.5 rounded bg-foreground/10 text-foreground text-[10px] font-bold uppercase tracking-wider">
                        Trending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No tools in this category yet. Check back soon.</p>
          </div>
        )}

        {/* Other Categories — pill links */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Other categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => c.id !== categoryId)
              .map((cat) => (
                <Link
                  key={cat.id}
                  to={lp(`/category/${cat.id}`)}
                  className="px-4 py-2 rounded-full border border-border hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all text-sm font-medium"
                >
                  {cat.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
