import { Link, useLocation } from 'react-router'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  path: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const location = useLocation()
  
  if (!items) {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    items = pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/')
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return { name, path }
    })
  }

  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            {index === items.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.path}
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
