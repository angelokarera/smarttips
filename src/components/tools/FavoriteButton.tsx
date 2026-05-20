import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/useFavorites'
import { cn } from '@/lib/utils'

export function FavoriteButton({ toolId, className }: { toolId: string; className?: string }) {
  const { isFav, toggle } = useFavorites(toolId)

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn('h-8 gap-1.5 text-xs', className)}
      onClick={() => toggle(toolId)}
      aria-pressed={isFav}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star className={cn('h-4 w-4', isFav && 'fill-primary text-primary')} />
      {isFav ? 'Saved' : 'Save'}
    </Button>
  )
}
