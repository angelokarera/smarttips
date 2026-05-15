import { Link, useLocation } from 'react-router'
import { ChevronRight, Home } from 'lucide-react'
import { getLocaleFromPath, localizePath, stripLocaleFromPath } from '@/lib/i18n'

interface BreadcrumbItem {
  name: string
  path: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const homePath = localizePath('/', locale)

  const breadcrumbItems = items ?? location.pathname.split('/').filter(Boolean).map((segment, index, pathSegments) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/')
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    return { name, path }
  })

  if (breadcrumbItems.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        <li>
          <Link 
            to={homePath} 
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                to={localizePath(stripLocaleFromPath(item.path), locale)}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
