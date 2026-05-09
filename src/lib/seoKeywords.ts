import type { BlogPost } from '@/data/blog'
import type { Tool, ToolCategory } from '@/data/tools'

export const platformKeywords = [
  'AI tools',
  'free online tools',
  'frontend tools',
  'web development tools',
  'SEO tools',
  'color palette generator',
  'CSS generators',
  'startup tools',
  'student tools',
  'developer tools',
  'PDF tools',
  'image tools',
  'text tools',
  'browser based tools',
  'no signup tools',
]

export function getToolKeywords(tool: Tool): string[] {
  return [
    tool.name,
    tool.categoryLabel,
    `${tool.name} online`,
    `${tool.name} free`,
    `${tool.name} tool`,
    ...tool.benefits.flatMap((benefit) => benefit.split(/[,.]/).slice(0, 1)),
    ...tool.relatedTools,
    ...platformKeywords,
  ].filter(Boolean)
}

export function getCategoryKeywords(category: ToolCategory): string[] {
  return [
    category.label,
    `${category.label} online`,
    `free ${category.label.toLowerCase()}`,
    `${category.id} tools`,
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
    'productivity tools',
    ...post.excerpt.split(/[,.]/).slice(0, 2),
    ...platformKeywords,
  ]
}

export function uniqueKeywords(keywords: string[]): string[] {
  return Array.from(
    new Set(
      keywords
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    )
  ).slice(0, 24)
}
