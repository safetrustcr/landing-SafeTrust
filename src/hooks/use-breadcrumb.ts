import { usePathname } from 'next/navigation'

export interface BreadcrumbItemData {
  href: string
  label: string
  active?: boolean
}

export function useBreadcrumb(): BreadcrumbItemData[] {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return segments.map((segment: string, index: number) => ({
    href: '/' + segments.slice(0, index + 1).join('/'),
    label: segment.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    active: index === segments.length - 1
  }))
}
