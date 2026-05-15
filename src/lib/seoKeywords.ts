import type { BlogPost } from '@/data/blog'
import type { Tool, ToolCategory } from '@/data/tools'

export const platformKeywords = [
  // Core platform keywords
  'free online tools',
  'online tools 2026',
  'web tools',
  'browser tools',
  'free web utilities',
  'no signup tools',
  'instant online tools',
  
  // Category keywords
  'frontend tools',
  'web development tools',
  'developer tools',
  'student tools',
  'business tools',
  'productivity tools',
  'startup tools',
  
  // Tool type keywords
  'PDF tools',
  'image tools',
  'text tools',
  'converter tools',
  'calculator tools',
  'generator tools',
  
  // Feature keywords
  'browser based tools',
  'no download required',
  'secure online tools',
  'fast online tools',
  'free tools no registration',
  
  // Design keywords
  'color palette generator',
  'CSS generators',
  'design tools',
  
  // Global reach keywords
  'multilingual tools',
  'international tools',
  'global online tools',
  'worldwide free tools',
]

export function getToolKeywords(tool: Tool): string[] {
  const currentYear = new Date().getFullYear()
  
  return [
    // Primary keywords
    tool.name,
    tool.categoryLabel,
    `${tool.name} online`,
    `${tool.name} free`,
    `${tool.name} tool`,
    `${tool.name} ${currentYear}`,
    `best ${tool.name}`,
    `free ${tool.name} online`,
    
    // Long-tail keywords
    `how to use ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} no signup`,
    `${tool.name.toLowerCase()} without registration`,
    `online ${tool.name.toLowerCase()} free`,
    `${tool.name.toLowerCase()} browser`,
    `secure ${tool.name.toLowerCase()}`,
    
    // Benefits as keywords
    ...tool.benefits.flatMap((benefit) => benefit.split(/[,.]/).slice(0, 2)),
    
    // Related tools
    ...tool.relatedTools,
    
    // Platform keywords
    ...platformKeywords,
  ].filter(Boolean)
}

export function getCategoryKeywords(category: ToolCategory): string[] {
  const currentYear = new Date().getFullYear()
  
  return [
    category.label,
    `${category.label} online`,
    `free ${category.label.toLowerCase()}`,
    `${category.id} tools`,
    `${category.id} tools ${currentYear}`,
    `best ${category.id} tools`,
    `online ${category.id} tools`,
    `free ${category.id} tools online`,
    category.description,
    ...platformKeywords,
  ]
}

export function getBlogKeywords(post: BlogPost): string[] {
  return [
    post.title,
    post.category,
    'digital tips',
    'online tools guide',
    'productivity tips',
    'productivity tools',
    'how to guide',
    'tutorial',
    'best practices',
    ...post.excerpt.split(/[,.]/).slice(0, 3),
    ...platformKeywords,
  ]
}

export function uniqueKeywords(keywords: string[]): string[] {
  return Array.from(
    new Set(
      keywords
        .map((keyword) => keyword.trim().toLowerCase())
        .filter(Boolean)
        .filter((keyword) => keyword.length > 2) // Remove very short keywords
    )
  ).slice(0, 30) // Increased from 24 to 30 for better coverage
}
