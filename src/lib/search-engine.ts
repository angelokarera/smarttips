// Advanced Search Engine for Global SEO
import type { Tool } from '@/data/tools'
import type { BlogPost } from '@/data/blog'

export interface SearchResult {
  id: string
  type: 'tool' | 'blog' | 'category'
  title: string
  description: string
  url: string
  keywords: string[]
  relevanceScore: number
}

export class SearchEngine {
  private tools: Tool[] = []
  private blogs: BlogPost[] = []
  private searchIndex: Map<string, SearchResult[]> = new Map()

  constructor(tools: Tool[], blogs: BlogPost[]) {
    this.tools = tools
    this.blogs = blogs
    this.buildSearchIndex()
  }

  // Build inverted index for fast searching
  private buildSearchIndex(): void {
    // Index tools
    this.tools.forEach(tool => {
      const keywords = this.extractKeywords(tool.name, tool.description, tool.benefits.join(' '))
      const result: SearchResult = {
        id: tool.id,
        type: 'tool',
        title: tool.name,
        description: tool.description,
        url: tool.path,
        keywords,
        relevanceScore: 0
      }

      keywords.forEach(keyword => {
        const existing = this.searchIndex.get(keyword) || []
        existing.push(result)
        this.searchIndex.set(keyword, existing)
      })
    })

    // Index blogs
    this.blogs.forEach(blog => {
      const keywords = this.extractKeywords(blog.title, blog.excerpt, blog.content || '')
      const result: SearchResult = {
        id: blog.id,
        type: 'blog',
        title: blog.title,
        description: blog.excerpt,
        url: `/blog/${blog.id}`,
        keywords,
        relevanceScore: 0
      }

      keywords.forEach(keyword => {
        const existing = this.searchIndex.get(keyword) || []
        existing.push(result)
        this.searchIndex.set(keyword, existing)
      })
    })
  }

  // Extract and normalize keywords
  private extractKeywords(...texts: string[]): string[] {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can'])
    
    const allText = texts.join(' ').toLowerCase()
    const words = allText.match(/\b[a-z]{3,}\b/g) || []
    
    return Array.from(new Set(
      words.filter(word => !stopWords.has(word))
    ))
  }

  // Calculate relevance score using TF-IDF-like algorithm
  private calculateRelevance(query: string, result: SearchResult): number {
    const queryTerms = query.toLowerCase().split(/\s+/)
    let score = 0

    queryTerms.forEach(term => {
      // Title match (highest weight)
      if (result.title.toLowerCase().includes(term)) {
        score += 10
      }

      // Exact title match (bonus)
      if (result.title.toLowerCase() === term) {
        score += 20
      }

      // Description match
      if (result.description.toLowerCase().includes(term)) {
        score += 5
      }

      // Keyword match
      if (result.keywords.includes(term)) {
        score += 3
      }

      // Partial match in keywords
      result.keywords.forEach(keyword => {
        if (keyword.includes(term) || term.includes(keyword)) {
          score += 1
        }
      })
    })

    return score
  }

  // Main search function
  search(query: string, limit = 10): SearchResult[] {
    if (!query || query.trim().length < 2) {
      return []
    }

    const normalizedQuery = query.toLowerCase().trim()
    const queryTerms = normalizedQuery.split(/\s+/)
    const resultsMap = new Map<string, SearchResult>()

    // Find all matching results
    queryTerms.forEach(term => {
      // Exact matches
      const exactMatches = this.searchIndex.get(term) || []
      exactMatches.forEach(result => {
        const key = `${result.type}-${result.id}`
        if (!resultsMap.has(key)) {
          resultsMap.set(key, { ...result })
        }
      })

      // Partial matches
      this.searchIndex.forEach((results, keyword) => {
        if (keyword.includes(term) || term.includes(keyword)) {
          results.forEach(result => {
            const key = `${result.type}-${result.id}`
            if (!resultsMap.has(key)) {
              resultsMap.set(key, { ...result })
            }
          })
        }
      })
    })

    // Calculate relevance scores
    const scoredResults = Array.from(resultsMap.values()).map(result => ({
      ...result,
      relevanceScore: this.calculateRelevance(normalizedQuery, result)
    }))

    // Sort by relevance and return top results
    return scoredResults
      .filter(result => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
  }

  // Get suggestions for autocomplete
  getSuggestions(query: string, limit = 5): string[] {
    if (!query || query.trim().length < 2) {
      return []
    }

    const normalizedQuery = query.toLowerCase().trim()
    const suggestions = new Set<string>()

    this.searchIndex.forEach((_, keyword) => {
      if (keyword.startsWith(normalizedQuery)) {
        suggestions.add(keyword)
      }
    })

    // Add tool names that match
    this.tools.forEach(tool => {
      if (tool.name.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(tool.name.toLowerCase())
      }
    })

    return Array.from(suggestions).slice(0, limit)
  }

  // Get popular searches (for SEO)
  getPopularSearches(): string[] {
    return [
      'pdf converter',
      'image compressor',
      'qr code generator',
      'word counter',
      'json formatter',
      'password generator',
      'unit converter',
      'gpa calculator',
      'merge pdf',
      'image resizer'
    ]
  }
}
