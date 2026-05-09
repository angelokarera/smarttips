import type { MetadataRoute } from 'next';
import { tools, categories } from '@/data/tools';
import { blogPosts } from '@/data/blog';

const locales = ['en', 'fr', 'rw', 'sw', 'ar', 'es', 'pt', 'zh'];
const baseUrl = 'https://smartdigitaltips.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Base routes with priorities
  const baseRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Add base routes for all locales
  baseRoutes.forEach(({ path, priority, changeFrequency }) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
      });
    });
  });

  // Add category pages
  categories.forEach((category) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/category/${category.id}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // Add tool pages
  tools.forEach((tool) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${tool.path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: tool.popular ? 0.9 : tool.trending ? 0.85 : 0.8,
      });
    });
  });

  // Add blog list page
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Add individual blog posts
  blogPosts.forEach((post) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return sitemapEntries;
}
