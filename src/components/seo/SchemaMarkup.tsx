import Script from 'next/script';

export default function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'SmartDigitalTips',
    'url': 'https://smartdigitaltips.com/',
    'description': 'Free browser-based tools for images, PDFs, text, developers, students, and business.',
    'inLanguage': ['en', 'fr', 'rw', 'sw', 'ar', 'es', 'pt', 'zh'],
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://smartdigitaltips.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Script id="website-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  );
}
