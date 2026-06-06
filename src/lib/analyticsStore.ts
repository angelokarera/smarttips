import { tools, type Tool } from '@/data/tools'

const HISTORY_KEY = 'sdt-tool-history'

export interface HistoryItem {
  toolId: string
  timestamp: number
}

// Get the user's tool run history
export function getToolHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Record a new tool action/run
export function recordToolRun(toolId: string): void {
  const history = getToolHistory()
  // Add new item to the beginning
  const updated = [
    { toolId, timestamp: Date.now() },
    ...history.filter((item) => item.toolId !== toolId), // deduplicate
  ].slice(0, 10) // Limit to top 10 items
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

// Get recently used tools as full Tool objects
export function getRecentlyUsedTools(limit = 4): Tool[] {
  const history = getToolHistory()
  return history
    .slice(0, limit)
    .map((item) => tools.find((t) => t.id === item.toolId))
    .filter((t): t is Tool => Boolean(t))
}

// Get recommendations based on most visited tool category
export function getRecommendedTools(limit = 4): Tool[] {
  const history = getToolHistory()
  if (history.length === 0) {
    // Fallback: return popular tools
    return tools.filter((t) => t.trending).slice(0, limit)
  }

  // Count categories of visited tools
  const categoryCounts: Record<string, number> = {}
  history.forEach((item) => {
    const tool = tools.find((t) => t.id === item.toolId)
    if (tool) {
      categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1
    }
  })

  // Find most frequent category
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  if (!topCategory) {
    return tools.filter((t) => t.trending).slice(0, limit)
  }

  // Find tools in this category that the user hasn't run recently
  const recentlyUsedIds = new Set(history.map((h) => h.toolId))
  const recommended = tools
    .filter((t) => t.category === topCategory && !recentlyUsedIds.has(t.id))
    .slice(0, limit)

  // If we don't have enough, pad with trending tools
  if (recommended.length < limit) {
    const extra = tools
      .filter((t) => !recentlyUsedIds.has(t.id) && !recommended.some((r) => r.id === t.id))
      .slice(0, limit - recommended.length)
    return [...recommended, ...extra]
  }

  return recommended
}

// Generate social proof run count (seeded statically for virality)
export function getToolRunCount(toolId: string): number {
  // Generate a deterministic run count based on string length & character values + current date seed
  let hash = 0
  for (let i = 0; i < toolId.length; i++) {
    hash = toolId.charCodeAt(i) + ((hash << 5) - hash)
  }
  const baseCount = Math.abs(hash % 9000) + 3000 // Between 3000 and 12000 runs
  
  // Shift slightly by current day to simulate active daily updates
  const dayOffset = new Date().getDate() * 15
  return baseCount + dayOffset
}
