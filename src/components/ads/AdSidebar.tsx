import { EzoicAd } from './EzoicAd'

export default function AdSidebar() {
  return (
    <div
      className="ad-sidebar-wrapper hidden lg:flex flex-col items-center gap-2"
      aria-label="Advertisement"
      style={{ position: 'sticky', top: '80px' }}
    >
      <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', userSelect: 'none' }}>
        Advertisement
      </span>
      <EzoicAd sizes="300x250" devices={['desktop']} />
    </div>
  )
}
