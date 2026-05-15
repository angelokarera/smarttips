import { useLocale } from '@/hooks/useLocale'
import { getPageSeo, type SeoCopy } from '@/lib/seo-messages'

export function usePageSeo(pageId: string, fallback: SeoCopy) {
  const locale = useLocale()
  const seo = getPageSeo(pageId, locale, fallback)
  return { ...seo, locale }
}
