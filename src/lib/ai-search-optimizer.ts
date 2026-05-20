// AI Search Engine Optimization
// Optimize for ChatGPT, Gemini, Claude, Perplexity, Copilot

import type { Tool } from '@/data/tools'
import type { JsonLd } from '@/lib/json-ld-types'

export interface AISearchMetadata {
  semanticContent: string;
  entities: string[];
  keyFacts: string[];
  structuredAnswer: string;
  citations: string[];
}

export class AISearchOptimizer {
  // Generate semantic HTML for AI understanding
  static generateSemanticHTML(content: string): string {
    return `
      <article itemscope itemtype="https://schema.org/Article">
        <div itemprop="articleBody">
          ${content}
        </div>
      </article>
    `;
  }

  // Extract key entities for AI search
  static extractEntities(tool: Tool): string[] {
    const entities = [
      tool.name,
      tool.category,
      'online tool',
      'free tool',
      'web application'
    ];

    // Add benefit-based entities
    tool.benefits?.forEach((benefit: string) => {
      const words = benefit.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 4 && !entities.includes(word)) {
          entities.push(word);
        }
      });
    });

    return entities;
  }

  // Generate structured answer for AI
  static generateStructuredAnswer(tool: Tool): string {
    return `
${tool.name} is a free online tool that ${tool.description.toLowerCase()}

Key Features:
${tool.benefits?.map((b: string) => `- ${b}`).join('\n')}

How to Use:
${tool.howToUse?.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}

This tool is completely free, requires no registration, and works directly in your browser for maximum privacy and security.
    `.trim();
  }

  // Generate FAQ content optimized for AI
  static generateAIOptimizedFAQ(faqs: { question: string; answer: string }[]): string {
    return faqs.map(faq => `
Q: ${faq.question}
A: ${faq.answer}
    `).join('\n\n');
  }

  // Generate meta tags for AI crawlers
  static generateAIMetaTags(tool: Tool): Record<string, string> {
    return {
      'ai:title': tool.name,
      'ai:description': tool.description,
      'ai:type': 'tool',
      'ai:category': tool.category,
      'ai:free': 'true',
      'ai:online': 'true',
      'ai:privacy': 'browser-based',
      'ai:registration': 'not-required'
    };
  }

  // Generate content for voice search
  static generateVoiceSearchContent(tool: Tool): string {
    return `
To use the ${tool.name}, simply ${tool.howToUse?.[0]?.toLowerCase() || 'visit our website'}. 
The ${tool.name} is a free online tool that ${tool.description.toLowerCase()}. 
It requires no registration and works directly in your browser.
    `.trim();
  }

  // Generate featured snippet content
  static generateFeaturedSnippet(tool: Tool): {
    definition: string;
    list: string[];
    table?: Record<string, string>;
  } {
    return {
      definition: `${tool.name}: ${tool.description}`,
      list: tool.howToUse || [],
      table: {
        'Tool Name': tool.name,
        'Category': tool.categoryLabel,
        'Price': 'Free',
        'Registration': 'Not Required',
        'Platform': 'Web Browser'
      }
    };
  }

  // Generate "People Also Ask" content
  static generatePeopleAlsoAsk(tool: Tool): Array<{ question: string; answer: string }> {
    const baseQuestions = [
      {
        question: `What is ${tool.name}?`,
        answer: `${tool.name} is a free online tool that ${tool.description.toLowerCase()}. It works directly in your browser without requiring any downloads or registration.`
      },
      {
        question: `How do I use ${tool.name}?`,
        answer: tool.howToUse?.[0] || `Simply visit our website and start using the ${tool.name} immediately.`
      },
      {
        question: `Is ${tool.name} free?`,
        answer: `Yes, ${tool.name} is completely free to use with no hidden costs, subscriptions, or registration requirements.`
      },
      {
        question: `Is ${tool.name} safe to use?`,
        answer: `Yes, ${tool.name} is completely safe. All processing happens in your browser, and no data is sent to any server, ensuring complete privacy and security.`
      }
    ];

    return [...baseQuestions, ...(tool.faq || [])];
  }

  // Generate content for AI Overview (Google)
  static generateAIOverview(tool: Tool): string {
    return `
**${tool.name}** is a free online tool for ${tool.description.toLowerCase()}

**Key Benefits:**
${tool.benefits?.slice(0, 3).map((b: string) => `• ${b}`).join('\n')}

**Quick Start:**
${tool.howToUse?.[0] || 'Visit the tool page and start using it immediately'}

**Best For:** ${tool.categoryLabel}, professionals, students, and anyone needing ${tool.name.toLowerCase()}

**Cost:** Free | **Registration:** Not Required | **Platform:** Web Browser
    `.trim();
  }

  // Generate citation-friendly content
  static generateCitationContent(tool: Tool): string {
    return `
Source: SmartDigitalTips
Tool: ${tool.name}
Description: ${tool.description}
URL: https://smartdigitaltips.com${tool.path}
Access: Free, No Registration Required
Last Updated: ${new Date().toISOString().split('T')[0]}
    `.trim();
  }

  // Optimize content for conversational AI
  static optimizeForConversationalAI(tool: Tool): string {
    return `
If you're looking for ${tool.name.toLowerCase()}, I can help you with that. 

${tool.name} is ${tool.description.toLowerCase()}

Here's how to use it:
${tool.howToUse?.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}

The best part? It's completely free and you don't need to sign up or download anything. Everything works right in your browser, so your data stays private.

${tool.benefits?.[0] || ''}
    `.trim();
  }

  // Generate JSON-LD for AI understanding
  static generateAIJsonLD(tool: Tool): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      featureList: tool.benefits || [],
      screenshot: `https://smartdigitaltips.com/screenshots/${tool.id}.png`,
      softwareHelp: {
        '@type': 'CreativeWork',
        text: tool.howToUse?.join(' ') || ''
      }
    };
  }
}

export const aiSearchOptimizer = new AISearchOptimizer();
