import type { SupportedLocale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'

import en from '../../messages/en.json'
import fr from '../../messages/fr.json'
import sw from '../../messages/sw.json'
import ar from '../../messages/ar.json'
import es from '../../messages/es.json'
import pt from '../../messages/pt.json'
import zh from '../../messages/zh.json'

export interface SeoCopy {
  title: string
  description: string
}

interface LocaleMessages {
  pages?: Record<string, SeoCopy>
  tools?: Record<string, SeoCopy>
  categories?: Record<string, SeoCopy>
  blog?: Record<string, SeoCopy>
  Index?: SeoCopy
}

const messagesByLocale: Partial<Record<SupportedLocale, LocaleMessages>> = {
  en: en as LocaleMessages,
  fr: (fr as Partial<LocaleMessages>),
  sw: (sw as Partial<LocaleMessages>),
  ar: (ar as Partial<LocaleMessages>),
  es: (es as Partial<LocaleMessages>),
  pt: (pt as Partial<LocaleMessages>),
  zh: (zh as Partial<LocaleMessages>),
}

function pick<T extends SeoCopy>(map: Record<string, T> | undefined, key: string, fallback: T): T {
  return map?.[key] ?? fallback
}

export function getPageSeo(pageId: string, locale: SupportedLocale, fallback: SeoCopy): SeoCopy {
  const bundle = messagesByLocale[locale] ?? messagesByLocale[defaultLocale]
  const enBundle = messagesByLocale[defaultLocale]
  if (!bundle || !enBundle) return fallback
  return pick(bundle.pages, pageId, pick(enBundle.pages, pageId, fallback))
}

export function getToolSeo(toolId: string, locale: SupportedLocale, fallback: SeoCopy): SeoCopy {
  const bundle = messagesByLocale[locale] ?? messagesByLocale[defaultLocale]
  const enBundle = messagesByLocale[defaultLocale]
  if (!bundle || !enBundle) return fallback
  return pick(bundle.tools, toolId, pick(enBundle.tools, toolId, fallback))
}

export function getCategorySeo(categoryId: string, locale: SupportedLocale, fallback: SeoCopy): SeoCopy {
  const bundle = messagesByLocale[locale] ?? messagesByLocale[defaultLocale]
  const enBundle = messagesByLocale[defaultLocale]
  if (!bundle || !enBundle) return fallback
  return pick(bundle.categories, categoryId, pick(enBundle.categories, categoryId, fallback))
}

export function getBlogSeo(slug: string, locale: SupportedLocale, fallback: SeoCopy): SeoCopy {
  const bundle = messagesByLocale[locale] ?? messagesByLocale[defaultLocale]
  const enBundle = messagesByLocale[defaultLocale]
  if (!bundle || !enBundle) return fallback
  return pick(bundle.blog, slug, pick(enBundle.blog, slug, fallback))
}
