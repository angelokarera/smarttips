import Script from 'next/script';

export default function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Smart Digital Tips',
    'url': 'https://smartdigitaltips.com/',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://smartdigitaltips.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Script id="website-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  );
}
