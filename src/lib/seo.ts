import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  locale: string;
  path: string;
  image?: string;
}

const siteUrl = 'https://smartdigitaltips.com';

export function generateSEOMetadata({
  title,
  description,
  locale,
  path,
  image = '/logo.png',
}: SEOProps): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        en: `${siteUrl}/en${path.replace(/^\/[a-z]{2}/, '')}`,
        fr: `${siteUrl}/fr${path.replace(/^\/[a-z]{2}/, '')}`,
        rw: `${siteUrl}/rw${path.replace(/^\/[a-z]{2}/, '')}`,
        sw: `${siteUrl}/sw${path.replace(/^\/[a-z]{2}/, '')}`,
        ar: `${siteUrl}/ar${path.replace(/^\/[a-z]{2}/, '')}`,
        es: `${siteUrl}/es${path.replace(/^\/[a-z]{2}/, '')}`,
        pt: `${siteUrl}/pt${path.replace(/^\/[a-z]{2}/, '')}`,
        zh: `${siteUrl}/zh${path.replace(/^\/[a-z]{2}/, '')}`,
        'x-default': `${siteUrl}/en${path.replace(/^\/[a-z]{2}/, '')}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: 'SmartDigitalTips',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
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
  };
}
