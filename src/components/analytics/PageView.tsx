'use client';

/**
 * PageView Tracker Component
 *
 * Automatically tracks page views when the route changes.
 * Works with Next.js App Router.
 */

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/analytics/gtag';

export function PageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = searchParams?.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export default PageView;
