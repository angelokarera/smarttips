import { MetadataRoute } from 'next';
import { tools } from '@/data/tools';

const locales = ['en', 'fr', 'de', 'es', 'pt', 'it', 'nl', 'ar'];
const baseUrl = 'https://smartdigitaltips.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base routes
  const baseRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer'
  ];

  // Dynamically pull all tools from your database
  const toolRoutes = tools.map((tool) => `/keywords/${tool.id}`);

  const allRoutes = [...baseRoutes, ...toolRoutes];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  allRoutes.forEach((route) => {
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
