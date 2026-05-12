// Internal Linking Engine - Smart Link Generation
import type { Tool } from '@/data/tools';

export interface InternalLink {
  text: string;
  url: string;
  title: string;
  rel?: string;
}

export class InternalLinkingEngine {
  private baseUrl: string;

  constructor(baseUrl = 'https://smartdigitaltips.com') {
    this.baseUrl = baseUrl;
  }

  // Get related tools based on category and keywords
  getRelatedTools(currentTool: Tool, allTools: Tool[], limit = 6): Tool[] {
    const related = allTools.filter(tool => {
      if (tool.id === currentTool.id) return false;
      
      // Same category gets priority
      if (tool.category === currentTool.category) return true;
      
      // Check for keyword overlap
      const currentKeywords = currentTool.name.toLowerCase().split(' ');
      const toolKeywords = tool.name.toLowerCase().split(' ');
      const overlap = currentKeywords.filter(k => toolKeywords.includes(k));
      
      return overlap.length > 0;
    });

    // Sort by relevance
    return related
      .sort((a, b) => {
        // Prioritize same category
        if (a.category === currentTool.category && b.category !== currentTool.category) return -1;
        if (b.category === currentTool.category && a.category !== currentTool.category) return 1;
        
        // Then by popularity
        if (a.popular && !b.popular) return -1;
        if (b.popular && !a.popular) return 1;
        
        return 0;
      })
      .slice(0, limit);
  }

  // Get contextual links for content
  getContextualLinks(content: string, allTools: Tool[], locale = 'en'): InternalLink[] {
    const links: InternalLink[] = [];
    const contentLower = content.toLowerCase();

    allTools.forEach(tool => {
      const toolNameLower = tool.name.toLowerCase();
      if (contentLower.includes(toolNameLower) && links.length < 10) {
        links.push({
          text: tool.name,
          url: `/${locale}${tool.path}`,
          title: `Use our ${tool.name} - ${tool.description}`,
          rel: 'nofollow'
        });
      }
    });

    return links;
  }

  // Get category navigation links
  getCategoryLinks(categories: any[], locale = 'en'): InternalLink[] {
    return categories.map(cat => ({
      text: cat.label,
      url: `/${locale}/category/${cat.id}`,
      title: cat.description
    }));
  }

  // Get breadcrumb links
  getBreadcrumbs(tool: Tool, locale = 'en'): InternalLink[] {
    return [
      {
        text: 'Home',
        url: `/${locale}`,
        title: 'SmartDigitalTips - Free Online Tools'
      },
      {
        text: tool.categoryLabel,
        url: `/${locale}/category/${tool.category}`,
        title: `${tool.categoryLabel} - Free Online Tools`
      },
      {
        text: tool.name,
        url: `/${locale}${tool.path}`,
        title: tool.seoTitle
      }
    ];
  }

  // Get footer links (important pages)
  getFooterLinks(locale = 'en'): InternalLink[] {
    return [
      { text: 'About Us', url: `/${locale}/about`, title: 'About SmartDigitalTips' },
      { text: 'Contact', url: `/${locale}/contact`, title: 'Contact Us' },
      { text: 'Privacy Policy', url: `/${locale}/privacy`, title: 'Privacy Policy' },
      { text: 'Terms of Service', url: `/${locale}/terms`, title: 'Terms of Service' },
      { text: 'Cookie Policy', url: `/${locale}/cookies`, title: 'Cookie Policy' },
      { text: 'Disclaimer', url: `/${locale}/disclaimer`, title: 'Disclaimer' },
      { text: 'Blog', url: `/${locale}/blog`, title: 'Blog - Tips & Tutorials' }
    ];
  }

  // Get popular tools for sidebar
  getPopularToolLinks(allTools: Tool[], locale = 'en', limit = 10): InternalLink[] {
    return allTools
      .filter(t => t.popular)
      .slice(0, limit)
      .map(tool => ({
        text: tool.name,
        url: `/${locale}${tool.path}`,
        title: tool.seoTitle
      }));
  }

  // Get trending tools
  getTrendingToolLinks(allTools: Tool[], locale = 'en', limit = 10): InternalLink[] {
    return allTools
      .filter(t => t.trending)
      .slice(0, limit)
      .map(tool => ({
        text: tool.name,
        url: `/${locale}${tool.path}`,
        title: tool.seoTitle
      }));
  }

  // Get new tools
  getNewToolLinks(allTools: Tool[], locale = 'en', limit = 10): InternalLink[] {
    return allTools
      .filter(t => t.new)
      .slice(0, limit)
      .map(tool => ({
        text: tool.name,
        url: `/${locale}${tool.path}`,
        title: tool.seoTitle
      }));
  }

  // Generate sitemap structure for crawlers
  generateSitemapStructure(allTools: Tool[], categories: any[]): any {
    const structure: any = {
      home: '/',
      categories: {},
      tools: {},
      pages: {}
    };

    categories.forEach(cat => {
      structure.categories[cat.id] = {
        url: `/category/${cat.id}`,
        tools: allTools.filter(t => t.category === cat.id).map(t => t.path)
      };
    });

    allTools.forEach(tool => {
      structure.tools[tool.id] = {
        url: tool.path,
        category: tool.category,
        related: this.getRelatedTools(tool, allTools, 3).map(t => t.path)
      };
    });

    return structure;
  }

  // Prevent orphan pages - ensure every page has incoming links
  validateLinkStructure(allTools: Tool[], categories: any[]): { orphans: string[]; warnings: string[] } {
    const allPages = new Set<string>();
    const linkedPages = new Set<string>();
    const warnings: string[] = [];

    // Collect all pages
    allTools.forEach(tool => allPages.add(tool.path));
    categories.forEach(cat => allPages.add(`/category/${cat.id}`));

    // Check which pages are linked
    allTools.forEach(tool => {
      const related = this.getRelatedTools(tool, allTools);
      related.forEach(r => linkedPages.add(r.path));
      linkedPages.add(`/category/${tool.category}`);
    });

    // Find orphans
    const orphans = Array.from(allPages).filter(page => !linkedPages.has(page));

    // Check for tools with no related tools
    allTools.forEach(tool => {
      const related = this.getRelatedTools(tool, allTools);
      if (related.length === 0) {
        warnings.push(`Tool "${tool.name}" has no related tools`);
      }
    });

    return { orphans, warnings };
  }
}

export const linkingEngine = new InternalLinkingEngine();
