import { Link } from 'react-router'
import { categories } from '@/data/tools'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12 lg:py-16">
          {/* Brand column — spans 2 on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <img src="/logo.png" alt="SmartDigitalTips Logo" width="105" height="28" loading="lazy" className="h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-105" />
              <span className="text-base font-bold tracking-tight">
                SmartDigital<span className="text-primary">Tips</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              50+ browser-based tools. No uploads, no accounts, no nonsense.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">Tools</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={`/category/${cat.id}`}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SmartDigitalTips. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Everything runs in your browser. We never see your files.
          </p>
        </div>
      </div>
    </footer>
  )
}
