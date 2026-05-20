import { useCallback, useSyncExternalStore } from 'react'
import { getFavorites, isFavorite, toggleFavorite } from '@/lib/favorites'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener('sdt-favorites-changed', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('sdt-favorites-changed', callback)
  }
}

function getSnapshot() {
  return getFavorites().join(',')
}

export function useFavorites(toolId?: string) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => '')

  const favorites = snapshot ? snapshot.split(',').filter(Boolean) : []

  const toggle = useCallback((id: string) => {
    const added = toggleFavorite(id)
    window.dispatchEvent(new Event('sdt-favorites-changed'))
    return added
  }, [])

  return {
    favorites,
    isFav: toolId ? favorites.includes(toolId) || isFavorite(toolId) : false,
    toggle,
  }
}
