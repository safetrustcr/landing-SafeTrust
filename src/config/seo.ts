/**
 * SEO Configuration
 *
 * Centralized SEO settings including meta tags, Open Graph, Twitter Cards,
 * and structured data (schema.org).
 */

import { Metadata } from 'next';

// Site configuration
export const siteConfig = {
  name: 'SafeTrust',
  description: 'SafeTrust is a decentralized and secure P2P platform for safe cryptocurrency transactions',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://safetrust.com',
  ogImage: '/og-image.png',
  twitterHandle: '@safetrust',
  locale: 'en_US',
  keywords: [
    'SafeTrust',
    'P2P',
    'cryptocurrency',
    'blockchain',
    'secure transactions',
    'decentralized',
    'crypto escrow',
    'peer to peer',
    'digital assets',
    'crypto trading',
  ],
};

// Default metadata for all pages
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'SafeTrust Team' }],
  creator: 'SafeTrust',
  publisher: 'SafeTrust',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.description}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

// Generate metadata for specific pages
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;
  const pageDescription = description || siteConfig.description;

  return {
    title,
    description: pageDescription,
    openGraph: {
      type: 'website',
      url,
      title,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: pageDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

// Structured Data (Schema.org) generators
export const structuredData = {
  // Organization schema
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      // Add social media links here
      'https://twitter.com/safetrust',
      'https://github.com/safetrustcr',
    ],
  },

  // Website schema
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },

  // Breadcrumb schema generator
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }),

  // FAQ schema generator
  faq: (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),

  // Article schema generator
  article: (data: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  }),

  // Service schema generator
  service: (data: {
    name: string;
    description: string;
    serviceType: string;
    provider?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    serviceType: data.serviceType,
    provider: {
      '@type': 'Organization',
      name: data.provider || siteConfig.name,
    },
  }),
};

// JSON-LD script component helper
export function generateJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}
