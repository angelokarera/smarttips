// Advanced Sitemap Generator System
import type { Tool } from '@/data/tools';

// Note: Import tools and categories dynamically when needed
const LOCALES = ['en', 'fr', 'es', 'ar', 'pt', 'de', 'hi', 'sw', 'zh'];
const BASE_URL = 'https://smartdigitaltips.com';

export class SitemapGenerator {
  // Generate main sitemap index
  static generateSitemapIndex(): string {
    const sitemaps = [
      'sitemap-main.xml',
      'sitemap-tools.xml',
      'sitemap-categories.xml',
      'sitemap-blog.xml',
      'sitemap-images.xml',
      'sitemap-videos.xml'
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    sitemaps.forEach(sitemap => {
      xml += '  <sitemap>\n';
      xml += `    <loc>${BASE_URL}/${sitemap}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xml += '  </sitemap>\n';
    });

    xml += '</sitemapindex>';
    return xml;
  }

  // Generate main pages sitemap
  static generateMainSitemap(): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    const pages = ['', '/about', '/contact', '/privacy', '/terms', '/cookies', '/disclaimer'];

    pages.forEach(page => {
      LOCALES.forEach(locale => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}/${locale}${page}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += `    <changefreq>${page === '' ? 'daily' : 'monthly'}</changefreq>\n`;
        xml += `    <priority>${page === '' ? '1.0' : '0.6'}</priority>\n`;
        
        // Add hreflang
        LOCALES.forEach(altLocale => {
          xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${BASE_URL}/${altLocale}${page}" />\n`;
        });
        
        xml += '  </url>\n';
      });
    });

    xml += '</urlset>';
    return xml;
  }

  // Generate tools sitemap
  static generateToolsSitemap(tools: Tool[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    tools.forEach(tool => {
      LOCALES.forEach(locale => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}/${locale}${tool.path}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += `    <priority>${tool.popular ? '0.9' : tool.trending ? '0.85' : '0.8'}</priority>\n`;
        
        // Add hreflang
        LOCALES.forEach(altLocale => {
          xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${BASE_URL}/${altLocale}${tool.path}" />\n`;
        });

        // Add image
        xml += '    <image:image>\n';
        xml += `      <image:loc>${BASE_URL}/og-images/${tool.id}.png</image:loc>\n`;
        xml += `      <image:title>${tool.name}</image:title>\n`;
        xml += `      <image:caption>${tool.description}</image:caption>\n`;
        xml += '    </image:image>\n';
        
        xml += '  </url>\n';
      });
    });

    xml += '</urlset>';
    return xml;
  }

  // Generate categories sitemap
  static generateCategoriesSitemap(categories: any[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    categories.forEach(category => {
      LOCALES.forEach(locale => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}/${locale}/category/${category.id}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.7</priority>\n';
        
        LOCALES.forEach(altLocale => {
          xml += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${BASE_URL}/${altLocale}/category/${category.id}" />\n`;
        });
        
        xml += '  </url>\n';
      });
    });

    xml += '</urlset>';
    return xml;
  }

  // Generate image sitemap
  static generateImageSitemap(tools: Tool[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    tools.forEach(tool => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/en${tool.path}</loc>\n`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${BASE_URL}/og-images/${tool.id}.png</image:loc>\n`;
      xml += `      <image:title>${tool.name} - Free Online Tool</image:title>\n`;
      xml += `      <image:caption>${tool.description}</image:caption>\n`;
      xml += '    </image:image>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  // Generate video sitemap
  static generateVideoSitemap(tools: Tool[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

    tools.slice(0, 10).forEach(tool => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/en${tool.path}</loc>\n`;
      xml += '    <video:video>\n';
      xml += `      <video:thumbnail_loc>${BASE_URL}/video-thumbnails/${tool.id}.jpg</video:thumbnail_loc>\n`;
      xml += `      <video:title>How to Use ${tool.name}</video:title>\n`;
      xml += `      <video:description>Learn how to use ${tool.name} in this quick tutorial. ${tool.description}</video:description>\n`;
      xml += `      <video:content_loc>${BASE_URL}/videos/${tool.id}.mp4</video:content_loc>\n`;
      xml += `      <video:duration>120</video:duration>\n`;
      xml += `      <video:publication_date>${new Date().toISOString()}</video:publication_date>\n`;
      xml += '      <video:family_friendly>yes</video:family_friendly>\n';
      xml += '    </video:video>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  // Generate news sitemap (for blog posts)
  static generateNewsSitemap(blogPosts: any[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

    blogPosts.slice(0, 100).forEach(post => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/en/blog/${post.slug}</loc>\n`;
      xml += '    <news:news>\n';
      xml += '      <news:publication>\n';
      xml += '        <news:name>SmartDigitalTips</news:name>\n';
      xml += '        <news:language>en</news:language>\n';
      xml += '      </news:publication>\n';
      xml += `      <news:publication_date>${post.date}</news:publication_date>\n`;
      xml += `      <news:title>${post.title}</news:title>\n`;
      xml += '    </news:news>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  // Generate robots.txt
  static generateRobotsTxt(): string {
    return `# SmartDigitalTips Robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Google
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Crawl-delay: 0

# Bing
User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Crawl-delay: 0

# Yandex
User-agent: Yandex
Allow: /
Disallow: /api/
Crawl-delay: 1

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-tools.xml
Sitemap: ${BASE_URL}/sitemap-images.xml
Sitemap: ${BASE_URL}/sitemap-videos.xml

# Host
Host: ${BASE_URL}
`;
  }

  // Save all sitemaps
  static async saveAllSitemaps(tools: Tool[], categories: any[], outputDir = './public'): Promise<void> {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), this.generateSitemapIndex());
      fs.writeFileSync(path.join(outputDir, 'sitemap-main.xml'), this.generateMainSitemap());
      fs.writeFileSync(path.join(outputDir, 'sitemap-tools.xml'), this.generateToolsSitemap(tools));
      fs.writeFileSync(path.join(outputDir, 'sitemap-categories.xml'), this.generateCategoriesSitemap(categories));
      fs.writeFileSync(path.join(outputDir, 'sitemap-images.xml'), this.generateImageSitemap(tools));
      fs.writeFileSync(path.join(outputDir, 'sitemap-videos.xml'), this.generateVideoSitemap(tools));
      fs.writeFileSync(path.join(outputDir, 'robots.txt'), this.generateRobotsTxt());
      
      console.log('✅ All sitemaps generated successfully!');
    } catch (error) {
      console.error('❌ Error generating sitemaps:', error);
    }
  }
}

export default SitemapGenerator;
