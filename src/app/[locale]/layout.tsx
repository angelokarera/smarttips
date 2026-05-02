import type { ReactNode } from 'react';
import { generateSEOMetadata } from '@/lib/seo';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import '@/index.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEOMetadata({
    title: 'Smart Digital Tips – Free SEO & Utility Tools',
    description: 'Boost your productivity with free online tools. Image compressor, PDF converter, SEO analyzers, and more. Fast, secure, and fully free.',
    locale,
    path: `/${locale}`
  });
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  
  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <head>
        <link rel="alternate" href={`https://smartdigitaltips.com/en`} hrefLang="en" />
        <link rel="alternate" href={`https://smartdigitaltips.com/fr`} hrefLang="fr" />
        <link rel="alternate" href={`https://smartdigitaltips.com/de`} hrefLang="de" />
        <link rel="alternate" href={`https://smartdigitaltips.com/es`} hrefLang="es" />
        <link rel="alternate" href={`https://smartdigitaltips.com/pt`} hrefLang="pt" />
        <link rel="alternate" href={`https://smartdigitaltips.com/it`} hrefLang="it" />
        <link rel="alternate" href={`https://smartdigitaltips.com/nl`} hrefLang="nl" />
        <link rel="alternate" href={`https://smartdigitaltips.com/ar`} hrefLang="ar" />
        <link rel="alternate" href={`https://smartdigitaltips.com/en`} hrefLang="x-default" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <SchemaMarkup />
        
        <header className="w-full bg-card shadow-sm py-4 border-b border-border">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="font-bold text-2xl text-primary">SmartDigitalTips</h1>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="w-full bg-secondary text-secondary-foreground py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <p>&copy; {new Date().getFullYear()} SmartDigitalTips. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
