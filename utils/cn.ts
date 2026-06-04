/**
 * Tiny className combiner. Filters out falsy values so conditional classes
 * can be written inline without pulling in an extra dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
