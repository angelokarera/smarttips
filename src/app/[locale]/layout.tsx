import type { ReactNode } from 'react';
import Script from 'next/script';
import { generateSEOMetadata } from '@/lib/seo';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import '@/index.css';

const locales = ['en', 'fr', 'sw', 'ar', 'es', 'pt', 'zh', 'de', 'hi', 'ja', 'ko', 'ru'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateSEOMetadata({
    title: 'SmartDigitalTips — 50+ Free Online Tools, No Sign-Up Required',
    description: 'Free online tools for images, PDFs, text, developers, students & business. Compress images, convert PDFs, generate QR codes — instant, private, no sign-up.',
    locale,
    path: `/${locale}`,
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
        {/* Hreflang for all supported locales */}
        {locales.map((alternateLocale) => (
          <link
            key={alternateLocale}
            rel="alternate"
            href={`https://smartdigitaltips.com/${alternateLocale}`}
            hrefLang={alternateLocale}
          />
        ))}
        <link rel="alternate" href="https://smartdigitaltips.com/en" hrefLang="x-default" />

        {/* Google AdSense — publisher verification */}
        <meta name="google-adsense-account" content="ca-pub-3519891152775398" />

        {/* Google Analytics 4 — Consent Mode v2 (GDPR compliant) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
              gtag('js', new Date());
              gtag('config', 'G-4P8GW43EWX', { 'anonymize_ip': true });
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        {/* GA4 script — loads after page is interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4P8GW43EWX"
          strategy="afterInteractive"
        />

        {/* AdSense auto-ads — loads after page is interactive */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3519891152775398"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        <SchemaMarkup />

        <header className="w-full bg-card shadow-sm py-4 border-b border-border">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="font-bold text-2xl text-primary">SmartDigitalTips</h1>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </header>

        <main className="flex-grow">{children}</main>

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
