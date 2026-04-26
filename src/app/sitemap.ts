import { MetadataRoute } from 'next';

const locales = ['en', 'fr', 'de', 'es', 'pt', 'it', 'nl', 'ar'];
const baseUrl = 'https://smartdigitaltips.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/keywords/image-compressor',
    '/keywords/free-pdf-converter',
    '/keywords/meta-tag-generator',
    '/keywords/password-generator',
    '/keywords/qr-code-generator',
    '/keywords/keyword-checker'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
