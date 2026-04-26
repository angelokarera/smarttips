import Link from 'next/link';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10">
      
      {/* High CTR Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 mt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
          Free Image Compressor Online – <br/>
          <span className="text-primary">
            Reduce JPG PNG Size Fast
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 font-medium">
          Transform your workflow with the ultimate suite of free online tools. Compress images, convert PDF to Word, and boost your SEO instantly. No sign-up required.
        </p>
        <div className="flex justify-center gap-4">
          <Link href={`/${locale}/keywords/image-compressor`} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-full shadow-xl transition transform hover:-translate-y-1">
            Try Image Compressor
          </Link>
          <Link href={`/${locale}/keywords/free-pdf-converter`} className="bg-card hover:bg-muted text-primary border border-border font-bold py-4 px-8 rounded-full shadow-md transition transform hover:-translate-y-1">
            Convert PDF Free
          </Link>
        </div>
      </section>

      {/* AdSense Placement Ready (High RPM) */}
      <div className="w-full max-w-5xl bg-muted h-32 flex items-center justify-center text-muted-foreground rounded-lg border border-dashed border-border my-8">
        [ AdSense Ad Slot - Horizontal Leaderboard ]
      </div>

      {/* Programmatic Keyword Tool Clusters */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-12 px-4">
        {[
          { title: 'Image Compressor', desc: 'Reduce image size without losing quality quickly.', link: '/keywords/image-compressor', icon: '🖼️' },
          { title: 'PDF Converter', desc: 'Convert PDF to Word Free Online Tool.', link: '/keywords/free-pdf-converter', icon: '📄' },
          { title: 'SEO Tag Generator', desc: 'Generate Meta Tags for higher CTR.', link: '/keywords/meta-tag-generator', icon: '🔍' },
          { title: 'Password Generator', desc: 'Create strong secure passwords instantly.', link: '/keywords/password-generator', icon: '🔐' },
          { title: 'QR Code Generator', desc: 'Generate QR codes for links & text.', link: '/keywords/qr-code-generator', icon: '📱' },
          { title: 'Keyword Checker', desc: 'Analyze keyword density and SEO value.', link: '/keywords/keyword-checker', icon: '📈' }
        ].map(tool => (
          <Link href={`/${locale}${tool.link}`} key={tool.title} className="block p-8 bg-card rounded-2xl shadow-sm hover:shadow-xl transition border border-border group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">{tool.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">{tool.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
