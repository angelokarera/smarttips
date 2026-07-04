import { EzoicAd } from './EzoicAd'

export default function AdInArticle() {
  return (
    <div className="ad-in-article-wrapper" aria-label="Advertisement" style={{ margin: '32px auto', maxWidth: '680px', textAlign: 'center' }}>
      <EzoicAd sizes={['300x250', '336x280']} />
    </div>
  )
}
