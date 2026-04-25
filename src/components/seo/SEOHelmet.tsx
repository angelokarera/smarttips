import { Helmet } from 'react-helmet-async'
import type { SEOMeta } from '@/types'

interface SEOHelmetProps {
  meta: SEOMeta
}

const SITE_URL = 'https://smartdigitaltips.com'
const DEFAULT_OG_IMAGE = '/logo.png'

export function SEOHelmet({ meta }: SEOHelmetProps) {
  const {
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    robots = 'index, follow',
    keywords,
  } = meta

  const fullTitle = title.includes('SmartDigitalTips') ? title : `${title} | SmartDigitalTips`
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : undefined
  const fullOgImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : `${SITE_URL}${DEFAULT_OG_IMAGE}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="robots" content={robots} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical || SITE_URL} />
      <meta property="og:site_name" content="SmartDigitalTips" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={fullOgImage} />
    </Helmet>
  )
}
