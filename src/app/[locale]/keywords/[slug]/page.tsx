import { generateSEOMetadata } from '@/lib/seo';

// High CTR Meta Data for specific tools
export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return generateSEOMetadata({
    title: `${formattedTitle} Free Online Tool - Fast & Secure | Smart Digital Tips`,
    description: `Use our free online ${formattedTitle.toLowerCase()}. Fast, secure, and optimized for best results. No limits, completely free tool online.`,
    locale: locale,
    path: `/${locale}/keywords/${slug}`
  });
}

export default async function KeywordPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { slug } = await params;
  const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <article className="max-w-5xl mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">{formattedTitle}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to the ultimate {formattedTitle.toLowerCase()} tool. Fast, efficient, and 100% free forever.
        </p>
      </div>
      
      {/* Interactive Tool Area */}
      <div className="w-full bg-card rounded-2xl shadow-xl border border-border p-10 mb-10 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center text-muted-foreground">
          <svg className="mx-auto h-12 w-12 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-foreground">[ Mount your React Tool Component Here ]</h3>
        </div>
      </div>

      {/* AdSense Native/In-Article Ad */}
      <div className="w-full bg-muted h-24 my-8 flex items-center justify-center text-muted-foreground text-sm border border-border rounded-lg">
        [ In-Article Ad Slot ]
      </div>

      {/* Programmatic SEO Content Engine */}
      <div className="prose prose-blue max-w-4xl mx-auto dark:prose-invert">
        <h2 className="text-2xl font-bold">How to use the {formattedTitle}</h2>
        <p>Our tool is built for speed and efficiency, helping you save time and achieve professional results directly from your browser. There is no need to download heavy software.</p>
        
        <h3 className="text-xl font-bold mt-8">Frequently Asked Questions</h3>
        <div className="space-y-4 mt-4">
          <details className="p-5 bg-card border border-border rounded-xl shadow-sm">
            <summary className="font-semibold cursor-pointer text-card-foreground">Is this {formattedTitle.toLowerCase()} really free?</summary>
            <p className="mt-3 text-muted-foreground">Yes, it is 100% free with no hidden fees, subscriptions, or watermarks.</p>
          </details>
          <details className="p-5 bg-card border border-border rounded-xl shadow-sm">
            <summary className="font-semibold cursor-pointer text-card-foreground">Is my data secure?</summary>
            <p className="mt-3 text-muted-foreground">Absolutely. All file processing happens locally in your browser, meaning your files are never uploaded to our servers. Your privacy is 100% guaranteed.</p>
          </details>
        </div>
      </div>
    </article>
  );
}
