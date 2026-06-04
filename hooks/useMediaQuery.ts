import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribe to a CSS media query via useSyncExternalStore — the idiomatic way
 * to read from an external store like `matchMedia`. Used to scale 3D quality
 * down (or off) on smaller / less powerful devices.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )

  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Convenience: true on phones / small tablets. */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
