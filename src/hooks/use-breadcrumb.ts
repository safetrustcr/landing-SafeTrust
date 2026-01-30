'use client'

import { usePathname } from 'next/navigation'

export interface BreadcrumbItemData {
  href: string
  label: string
  active?: boolean
}

interface UseBreadcrumbOptions {
  excludeSegments?: string[]
  customLabels?: Record<string, string>
}

export function useBreadcrumb(options: UseBreadcrumbOptions = {}): BreadcrumbItemData[] {
  const pathname = usePathname()
  const { excludeSegments = [], customLabels = {} } = options

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter(segment => !excludeSegments.includes(segment))

  if (segments.length === 0) {
    return [
      {
        href: '/',
        label: 'Home',
        active: pathname === '/',
      },
    ]
  }

  return segments.map((segment: string, index: number) => {
    const label =
      customLabels[segment] ||
      segment
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    const href = '/' + segments.slice(0, index + 1).join('/')
    const active = index === segments.length - 1

    return {
      href,
      label,
      active,
    }
  })
}

