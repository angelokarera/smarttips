import { useCallback, useMemo } from 'react'
import type { Tool } from '@/data/tools'
import { useLocale } from '@/hooks/useLocale'
import {
  getCategoryLabel,
  getToolLabel,
  translate,
} from '@/lib/ui-messages'

export function useTranslations() {
  const locale = useLocale()

  const t = useCallback(
    (key: string, fallback = '') => translate(locale, key, fallback),
    [locale]
  )

  const categoryLabel = useCallback(
    (categoryId: string, fallback: { label: string; description: string }) =>
      getCategoryLabel(categoryId, locale, fallback),
    [locale]
  )

  const toolLabel = useCallback(
    (toolId: string, fallback: { name: string; description: string }) =>
      getToolLabel(toolId, locale, fallback),
    [locale]
  )

  const localizeTool = useCallback(
    (tool: Tool) => {
      const labels = toolLabel(tool.id, { name: tool.name, description: tool.description })
      const cat = categoryLabel(tool.category, {
        label: tool.categoryLabel,
        description: '',
      })
      return { ...tool, name: labels.name, description: labels.description, categoryLabel: cat.label }
    },
    [toolLabel, categoryLabel]
  )

  return useMemo(
    () => ({ locale, t, categoryLabel, toolLabel, localizeTool }),
    [locale, t, categoryLabel, toolLabel, localizeTool]
  )
}
