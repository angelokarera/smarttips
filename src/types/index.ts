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
  /** When true, AdSense may load on this page (content-rich routes only). */
  showPublisherAds?: boolean
}

export interface BreadcrumbItem {
  name: string
  path: string
}
