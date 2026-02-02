# Analytics, SEO & Performance Guide

This guide explains how to use the analytics, SEO, and performance features implemented in the SafeTrust landing page.

## Table of Contents

- [Google Analytics 4 Setup](#google-analytics-4-setup)
- [Event Tracking](#event-tracking)
- [SEO Configuration](#seo-configuration)
- [Performance Monitoring](#performance-monitoring)
- [Testing](#testing)

## Google Analytics 4 Setup

### 1. Get Your GA4 Tracking ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

Add your GA4 tracking ID to `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

### 3. Verify Installation

Google Analytics will automatically initialize when:
- The app is running in production mode (`NODE_ENV=production`)
- The `NEXT_PUBLIC_GA_ID` environment variable is set
- The app is loaded in a browser

Page views are tracked automatically on route changes.

## Event Tracking

The app includes predefined event tracking functions for common interactions.

### Available Tracking Functions

Import event tracking functions from `@/lib/analytics/events`:

```typescript
import {
  trackButtonClick,
  trackCTAClick,
  trackFormSubmit,
  trackLinkClick,
  trackSearch,
  trackDownload,
  trackError,
  track404,
  trackSocialShare,
  trackScrollDepth,
  trackTimeOnPage,
  trackSignup,
  trackLogin,
  trackCustomEvent,
} from '@/lib/analytics/events';
```

### Usage Examples

#### Button Clicks

```typescript
import { trackButtonClick } from '@/lib/analytics/events';

<button onClick={() => trackButtonClick('signup-button', 'header')}>
  Sign Up
</button>
```

#### CTA Conversions

```typescript
import { trackCTAClick } from '@/lib/analytics/events';

<button onClick={() => trackCTAClick('get-started', 'primary', 'hero-section')}>
  Get Started
</button>
```

#### Form Submissions

```typescript
import { trackFormSubmit } from '@/lib/analytics/events';

const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    trackFormSubmit('contact-form', 'contact', true);
  } catch (error) {
    trackFormSubmit('contact-form', 'contact', false, error.message);
  }
};
```

#### Search Tracking

```typescript
import { trackSearch } from '@/lib/analytics/events';

const handleSearch = (query, results) => {
  trackSearch(query, results.length);
};
```

#### Download Tracking

```typescript
import { trackDownload } from '@/lib/analytics/events';

<a
  href="/whitepaper.pdf"
  onClick={() => trackDownload('whitepaper.pdf', 'pdf')}
>
  Download Whitepaper
</a>
```

#### Custom Events

```typescript
import { trackCustomEvent } from '@/lib/analytics/events';

trackCustomEvent('wallet_connected', 'engagement', {
  wallet_type: 'metamask',
  chain_id: 1,
});
```

## SEO Configuration

### Default SEO Settings

The app uses centralized SEO configuration from `@/config/seo.ts`. Default metadata is applied to all pages.

### Page-Specific Metadata

Use the `generatePageMetadata` helper for custom page metadata:

```typescript
// app/about/page.tsx
import { generatePageMetadata } from '@/config/seo';

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about SafeTrust and our mission',
  path: '/about',
  image: '/about-og-image.png',
});

export default function AboutPage() {
  // ...
}
```

### Structured Data (Schema.org)

Add structured data to your pages using the built-in generators:

#### Organization Schema (already in layout.tsx)

```typescript
import { structuredData, generateJsonLd } from '@/config/seo';

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: generateJsonLd(structuredData.organization),
  }}
/>
```

#### Breadcrumb Schema

```typescript
import { structuredData, generateJsonLd } from '@/config/seo';

const breadcrumbData = structuredData.breadcrumb([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Article Title', url: '/blog/article' },
]);

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: generateJsonLd(breadcrumbData),
  }}
/>
```

#### FAQ Schema

```typescript
const faqData = structuredData.faq([
  {
    question: 'What is SafeTrust?',
    answer: 'SafeTrust is a decentralized P2P platform...',
  },
  {
    question: 'How does it work?',
    answer: 'It uses blockchain technology to...',
  },
]);

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: generateJsonLd(faqData),
  }}
/>
```

### Sitemap

The app automatically generates a sitemap at `/sitemap.xml`. To add new pages:

1. Edit `src/app/sitemap.ts`
2. Add your routes to the `staticRoutes` array

```typescript
{
  url: '/new-page',
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.8,
}
```

### Robots.txt

The robots.txt file is automatically generated at `/robots.txt`. To modify:

1. Edit `src/app/robots.ts`
2. Update the `rules` array

## Performance Monitoring

### Core Web Vitals

The app automatically tracks Core Web Vitals:

- **LCP** (Largest Contentful Paint) - Target: < 2.5s
- **FID** (First Input Delay) - Target: < 100ms
- **CLS** (Cumulative Layout Shift) - Target: < 0.1
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)
- **INP** (Interaction to Next Paint)

### Viewing Performance Metrics

#### In Development

Performance metrics are logged to the console with warnings for poor metrics.

#### Getting Performance Report

```typescript
import { getPerformanceReport } from '@/lib/performance-monitor';

const report = getPerformanceReport();
console.log('Performance Score:', report.score);
console.log('Recommendations:', report.recommendations);
```

#### Custom Performance Marks

```typescript
import { markPerformance, measurePerformance } from '@/lib/performance-monitor';

// Mark the start of an operation
markPerformance('data-fetch-start');

// ... perform operation ...

// Mark the end and measure
markPerformance('data-fetch-end');
const duration = measurePerformance('data-fetch', 'data-fetch-start', 'data-fetch-end');
```

### Performance Optimizations

The following optimizations are already configured:

1. **Image Optimization**
   - WebP and AVIF formats
   - Responsive image sizes
   - 30-day cache

2. **Code Splitting**
   - Automatic route-based splitting
   - Vendor chunk separation
   - Library-specific chunks (framer-motion, recharts)

3. **Bundle Analysis**
   - Run `npm run analyze` to see bundle composition
   - Run `npm run analyze:server` for server bundle
   - Run `npm run analyze:browser` for client bundle

4. **CSS Optimization**
   - Experimental CSS optimization enabled
   - Package imports optimized for tree-shaking

5. **Caching**
   - Static assets cached for 1 year
   - Image cache TTL: 30 days

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests for staged files only
npm run test:staged
```

### Test Coverage

```bash
# Run tests with coverage report
npm test -- --coverage
```

### Writing New Tests

Add tests to the `tests/` directory. Example:

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('My Feature', () => {
  it('should work correctly', () => {
    // Your test here
    expect(true).toBe(true);
  });
});
```

## Verification Checklist

- [ ] Google Analytics 4 tracking ID configured
- [ ] Site URL set in environment variables
- [ ] Google Search Console verification code added
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Event tracking implemented on key actions
- [ ] Structured data added to important pages
- [ ] Core Web Vitals score > 90 (run Lighthouse)
- [ ] All tests passing

## Lighthouse Performance Test

To verify everything is working correctly:

1. Build the production version:
   ```bash
   npm run build
   npm start
   ```

2. Open Chrome DevTools (F12)
3. Go to "Lighthouse" tab
4. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9304153)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Schema.org Documentation](https://schema.org/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
