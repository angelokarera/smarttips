import { tools, type Tool } from '@/data/tools'

const FAVORITES_KEY = 'sdt-favorites'
const USAGE_KEY = 'sdt-tool-usage'

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function toggleFavorite(toolId: string): boolean {
  const current = getFavorites()
  const next = current.includes(toolId)
    ? current.filter((id) => id !== toolId)
    : [...current, toolId]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
  return next.includes(toolId)
}

export function isFavorite(toolId: string): boolean {
  return getFavorites().includes(toolId)
}

export function getFavoriteTools(): Tool[] {
  const ids = new Set(getFavorites())
  return tools.filter((t) => ids.has(t.id))
}

function getUsageMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(USAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, number>)
      : {}
  } catch {
    return {}
  }
}

/** Record a visit to a tool (preferences only — never sent to a server). */
export function recordToolUsage(toolId: string): void {
  const map = getUsageMap()
  map[toolId] = (map[toolId] || 0) + 1
  localStorage.setItem(USAGE_KEY, JSON.stringify(map))
}

export function getMostUsedTools(limit = 8): Tool[] {
  const map = getUsageMap()
  const sorted = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => tools.find((t) => t.id === id))
    .filter((t): t is Tool => Boolean(t))

  if (sorted.length >= limit) return sorted

  const fallback = tools.filter((t) => t.popular)
  const seen = new Set(sorted.map((t) => t.id))
  for (const t of fallback) {
    if (sorted.length >= limit) break
    if (!seen.has(t.id)) {
      sorted.push(t)
      seen.add(t.id)
    }
  }
  return sorted.slice(0, limit)
}
