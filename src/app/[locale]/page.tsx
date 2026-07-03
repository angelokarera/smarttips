import Link from 'next/link';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const tools = [
    { title: 'Image Compressor', desc: 'Reduce JPG, PNG, and WebP file size without losing quality. Free, instant, browser-based.', link: '/tools/image-compressor', icon: '🖼️' },
    { title: 'PDF to Word Converter', desc: 'Convert PDF to editable Word documents free. No upload to servers — runs in your browser.', link: '/tools/pdf-to-word', icon: '📄' },
    { title: 'Password Generator', desc: 'Generate cryptographically secure random passwords. Customizable length and character sets.', link: '/tools/password-generator', icon: '🔑' },
    { title: 'QR Code Generator', desc: 'Create QR codes for URLs, text, Wi-Fi, and more. Download as high-resolution PNG.', link: '/tools/qr-code-generator', icon: '📱' },
    { title: 'Word Counter', desc: 'Count words, characters, sentences, and reading time in real time. Free, no sign-up.', link: '/tools/word-counter', icon: '📝' },
    { title: 'JSON Formatter', desc: 'Format, validate, and beautify JSON data instantly. Syntax highlighting included.', link: '/tools/json-formatter', icon: '⚙️' },
  ];

  const categories = [
    { name: 'Image Tools', link: '/category/image', desc: 'Compress, resize, convert, and edit images' },
    { name: 'PDF Tools', link: '/category/pdf', desc: 'Merge, split, convert, and compress PDFs' },
    { name: 'Developer Tools', link: '/category/developer', desc: 'JSON, CSS, HTML, Base64, Regex, and more' },
    { name: 'Text Tools', link: '/category/text', desc: 'Word counter, case converter, summarizer' },
    { name: 'Student Tools', link: '/category/student', desc: 'GPA calculator, grade calculator, timers' },
    { name: 'Business Tools', link: '/category/business', desc: 'Invoice generator, QR codes, age calculator' },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10">

      {/* Hero Section — Primary SEO H1 */}
      <section className="text-center max-w-4xl mx-auto px-4 mt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
          Free Online Tools — 50+ Utilities
          <br />
          <span className="text-primary">No Sign-Up. No Uploads. Instant.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-4 font-medium">
          Compress images, convert PDFs to Word, generate QR codes, format JSON, check passwords,
          and 45+ more free browser tools. Everything runs locally — your files never leave your device.
        </p>
        <p className="text-base text-muted-foreground mb-8">
          Trusted by developers, students, designers, and businesses worldwide. 100% free, no account required.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/tools/image-compressor`}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-full shadow-xl transition transform hover:-translate-y-1"
          >
            Compress Image Free
          </Link>
          <Link
            href={`/${locale}/tools/pdf-to-word`}
            className="bg-card hover:bg-muted text-primary border border-border font-bold py-4 px-8 rounded-full shadow-md transition transform hover:-translate-y-1"
          >
            Convert PDF to Word
          </Link>
        </div>
      </section>

      {/* Google AdSense — Horizontal Leaderboard (consent-gated via AdBanner) */}
      <div className="w-full max-w-5xl px-4">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3519891152775398"
          data-ad-slot="6092595232"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* Popular Tools Grid */}
      <section className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Most Popular Free Online Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              href={`/${locale}${tool.link}`}
              key={tool.title}
              className="block p-8 bg-card rounded-2xl shadow-sm hover:shadow-xl transition border border-border group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{tool.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">{tool.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tool Categories */}
      <section className="w-full max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
          Browse All Tool Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              href={`/${locale}${cat.link}`}
              key={cat.name}
              className="p-5 bg-secondary/40 rounded-xl border border-border hover:bg-secondary/70 transition"
            >
              <p className="font-semibold text-foreground">{cat.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Second AdSense slot */}
      <div className="w-full max-w-5xl px-4">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3519891152775398"
          data-ad-slot="6092595232"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* Why SmartDigitalTips — E-E-A-T content for AdSense quality */}
      <section className="w-full max-w-4xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Why Use SmartDigitalTips Free Online Tools?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
          <div>
            <h3 className="font-semibold text-foreground mb-2">🔒 100% Private — Files Stay on Your Device</h3>
            <p>Every tool runs entirely in your browser using JavaScript. Your images, PDFs, and documents are never uploaded to any server. Complete privacy, zero data collection.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">⚡ Instant Results — No Waiting</h3>
            <p>No queues, no processing delays. Results appear in seconds because everything runs locally on your computer or phone using modern browser APIs.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">🌍 Available in 12 Languages</h3>
            <p>SmartDigitalTips is fully translated into English, French, Spanish, Arabic, Portuguese, Swahili, Chinese, German, Hindi, Japanese, Korean, and Russian.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">✅ Always Free — No Sign-Up Ever</h3>
            <p>All 50+ tools are completely free with no account required, no email, no credit card. Use as many times as you want with no limits.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
