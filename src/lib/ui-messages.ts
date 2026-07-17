import type { SupportedLocale } from '@/lib/i18n'
import { defaultLocale } from '@/lib/i18n'

import en from '../../messages/en.json'
import fr from '../../messages/fr.json'
import sw from '../../messages/sw.json'
import ar from '../../messages/ar.json'
import es from '../../messages/es.json'
import pt from '../../messages/pt.json'
import zh from '../../messages/zh.json'

export interface LabelCopy {
  label?: string
  name?: string
  description: string
}

export interface LocaleMessages {
  ui?: Record<string, Record<string, string>>
  labels?: {
    categories: Record<string, { label: string; description: string }>
    tools: Record<string, { name: string; description: string }>
  }
}

const messagesByLocale: Partial<Record<SupportedLocale, LocaleMessages>> = {
  en: en as LocaleMessages,
  fr: fr as LocaleMessages,
  sw: sw as LocaleMessages,
  ar: ar as LocaleMessages,
  es: es as LocaleMessages,
  pt: pt as LocaleMessages,
  zh: zh as LocaleMessages,
}

function bundle(locale: SupportedLocale) {
  return messagesByLocale[locale] ?? messagesByLocale[defaultLocale]
}

function enBundle() {
  return messagesByLocale[defaultLocale]
}

/** Dot path, e.g. "nav.home" */
export function translate(locale: SupportedLocale, key: string, fallback = ''): string {
  const [section, field] = key.split('.')
  const currentBundle = bundle(locale)
  const fallbackBundle = enBundle()
  const value =
    currentBundle?.ui?.[section]?.[field] ??
    fallbackBundle?.ui?.[section]?.[field]
  return value ?? fallback
}

export function getCategoryLabel(
  categoryId: string,
  locale: SupportedLocale,
  fallback: { label: string; description: string }
) {
  const currentBundle = bundle(locale)
  const fallbackBundle = enBundle()
  const labels = currentBundle?.labels?.categories?.[categoryId]
  const fb = fallbackBundle?.labels?.categories?.[categoryId]
  return {
    label: labels?.label ?? fb?.label ?? fallback.label,
    description: labels?.description ?? fb?.description ?? fallback.description,
  }
}

export function getToolLabel(
  toolId: string,
  locale: SupportedLocale,
  fallback: { name: string; description: string }
) {
  const currentBundle = bundle(locale)
  const fallbackBundle = enBundle()
  const labels = currentBundle?.labels?.tools?.[toolId]
  const fb = fallbackBundle?.labels?.tools?.[toolId]
  return {
    name: labels?.name ?? fb?.name ?? fallback.name,
    description: labels?.description ?? fb?.description ?? fallback.description,
  }
}
