/**
 * Dynamic Sitemap Generator
 *
 * Generates a sitemap.xml file dynamically for all pages in the application.
 * This helps search engines discover and index all pages.
 */

import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://safetrust.com';

// Define all static routes
const staticRoutes = [
  {
    url: '',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  },
  {
    url: '/contact-us',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: '/dashboard',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    url: '/dashboard/analytics',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
  {
    url: '/demo',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
