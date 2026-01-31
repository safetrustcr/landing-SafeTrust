/**
 * Dynamic Robots.txt Generator
 *
 * Generates a robots.txt file that tells search engines which pages
 * they can and cannot crawl.
 */

import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://safetrust.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/*/private',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
