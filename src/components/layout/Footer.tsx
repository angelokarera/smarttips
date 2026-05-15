import { Link } from 'react-router'
import { categories } from '@/data/tools'
import { useLocalizedPath } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'

export function Footer() {
  const lp = useLocalizedPath()
  const { t, categoryLabel } = useTranslations()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12 lg:py-16">
          {/* Brand column — spans 2 on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to={lp('/')} className="inline-flex items-center gap-2.5 group">
              <img src="/logo.png" alt="SmartDigitalTips Logo" width="105" height="28" loading="lazy" className="h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-105" />
              <span className="text-base font-bold tracking-tight">
                SmartDigital<span className="text-primary">Tips</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">{t('footer.tools', 'Tools')}</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={lp(`/category/${cat.id}`)}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {categoryLabel(cat.id, { label: cat.label, description: cat.description }).label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">{t('footer.company', 'Company')}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to={lp('/blog')} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  {t('nav.blog', 'Blog')}
                </Link>
              </li>
              <li>
                <Link to={lp('/about')} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  {t('nav.about', 'About')}
                </Link>
              </li>
              <li>
                <Link to={lp('/contact')} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  {t('nav.contact', 'Contact')}
                </Link>
              </li>
              <li>
                <Link to={lp('/privacy')} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  {t('footer.privacy', 'Privacy')}
                </Link>
              </li>
              <li>
                <Link to={lp('/cookies')} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  {t('footer.cookies', 'Cookies')}
                </Link>
              </li>
              <li>
                <Link to={lp('/terms')} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  {t('footer.terms', 'Terms')}
                </Link>
              </li>
              <li>
                <Link to={lp('/disclaimer')} className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  {t('footer.disclaimer', 'Disclaimer')}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SmartDigitalTips. {t('footer.rights')}
          </p>
          <p className="text-xs text-muted-foreground/50">
            {t('footer.privacyNote')}
          </p>
        </div>
      </div>
    </footer>
  )
}
