export interface SEOMeta {
  title: string
  description: string
  canonical?: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  robots?: string
  locale?: string
  schema?: Record<string, unknown>[]
}

export interface BreadcrumbItem {
  name: string
  path: string
}
