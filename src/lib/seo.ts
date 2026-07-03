interface SEOProps {
  title: string;
  description: string;
  locale: string;
  path: string;
  image?: string;
  keywords?: string;
  author?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  authors?: { name: string }[];
  metadataBase: URL;
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: { url: string; width: number; height: number; alt: string }[];
    locale: string;
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
    site: string;
  };
  robots: {
    index: boolean;
    follow: boolean;
    googleBot: {
      index: boolean;
      follow: boolean;
      'max-video-preview': number;
      'max-image-preview': string;
      'max-snippet': number;
    };
  };
  other: Record<string, string>;
}

const siteUrl = 'https://smartdigitaltips.com';

const DEFAULT_KEYWORDS =
  'free online tools, image compressor, PDF to Word converter, QR code generator, word counter, JSON formatter, password generator, unit converter, CSS minifier, base64 encoder, regex tester, image resizer, merge PDF, split PDF, color picker, gradient generator, markdown to HTML, URL encoder, timestamp converter, lorem ipsum generator, no signup tools, browser tools, free web utilities, developer tools, student tools, business tools, productivity tools';

export function generateSEOMetadata({
  title,
  description,
  locale,
  path,
  image = '/og-image.png',
  keywords = DEFAULT_KEYWORDS,
  author = 'SmartDigitalTips Editorial Team',
}: SEOProps): SEOMetadata {
  const pathWithoutLocale = path.replace(/^\/[a-z]{2}(\/|$)/, '/');

  return {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        en: `${siteUrl}/en${pathWithoutLocale}`,
        fr: `${siteUrl}/fr${pathWithoutLocale}`,
        sw: `${siteUrl}/sw${pathWithoutLocale}`,
        ar: `${siteUrl}/ar${pathWithoutLocale}`,
        es: `${siteUrl}/es${pathWithoutLocale}`,
        pt: `${siteUrl}/pt${pathWithoutLocale}`,
        zh: `${siteUrl}/zh${pathWithoutLocale}`,
        de: `${siteUrl}/de${pathWithoutLocale}`,
        hi: `${siteUrl}/hi${pathWithoutLocale}`,
        ja: `${siteUrl}/ja${pathWithoutLocale}`,
        ko: `${siteUrl}/ko${pathWithoutLocale}`,
        ru: `${siteUrl}/ru${pathWithoutLocale}`,
        'x-default': `${siteUrl}${pathWithoutLocale}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: 'SmartDigitalTips',
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}${image}`],
      site: '@smartdigitaltips',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'google-adsense-account': 'ca-pub-3519891152775398',
      'rating': 'general',
      'revisit-after': '3 days',
      'distribution': 'global',
      'coverage': 'Worldwide',
      'language': locale,
    },
  };
}
