# Error Components

This directory contains comprehensive error handling components for the SafeTrust application, implementing user-friendly error pages with consistent branding.

## Components

### 1. ErrorPage (`ErrorPage.tsx`)
A reusable base component for all error pages with SafeTrust branding.

**Features:**
- Consistent SafeTrust visual identity
- Responsive design for all screen sizes
- Customizable title, description, and actions
- Status code display
- Optional illustration support
- Search functionality
- Helpful navigation links

**Props:**
```typescript
interface ErrorPageProps {
  title: string;
  description: string;
  statusCode: number;
  action?: React.ReactNode;
  illustration?: React.ReactNode;
  showSearch?: boolean;
  className?: string;
}
```

### 2. NetworkError (`NetworkError.tsx`)
Handles network connectivity issues with real-time status monitoring.

**Features:**
- Network connectivity detection
- Retry mechanism for failed requests
- Offline state indication
- Connection status updates
- Troubleshooting tips
- Auto-dismiss on connection restore

**Props:**
```typescript
interface NetworkErrorProps {
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}
```

### 3. ErrorBoundary (`ErrorBoundary.tsx`)
React error boundary wrapper for catching and handling unexpected errors.

**Features:**
- React error boundary implementation
- Error logging/reporting
- Fallback UI rendering
- Error recovery options
- Development error details
- Production error reporting

**Props:**
```typescript
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}
```

## Next.js Integration

### 404 Not Found Page (`/app/not-found.tsx`)
- Uses Next.js 13+ app directory convention
- Custom illustration with FileX icon
- Search functionality enabled
- "Go Back" and "Go Home" actions

### 500 Server Error Page (`/app/error.tsx`)
- Uses Next.js 13+ app directory convention
- Custom illustration with ServerCrash icon
- Retry functionality
- Contact support options
- Error reporting integration

## Usage Examples

### Basic ErrorPage Usage
```tsx
import { ErrorPage } from '@/components/error'

<ErrorPage
  title="Page Not Found"
  description="The page you're looking for doesn't exist."
  statusCode={404}
  showSearch={true}
/>
```

### ErrorBoundary Usage
```tsx
import { ErrorBoundary } from '@/components/error'

<ErrorBoundary
  onError={(error, errorInfo) => {
    console.log('Error caught:', error, errorInfo)
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### NetworkError Usage
```tsx
import { NetworkError } from '@/components/error'

<NetworkError
  onRetry={() => console.log('Retrying...')}
  onDismiss={() => console.log('Dismissed')}
/>
```

## Testing

Visit `/test-errors` to test all error components:
- ErrorBoundary functionality
- NetworkError display
- 404 page navigation
- 500 page simulation

## Design System Integration

All components follow the SafeTrust design system:
- **Colors**: Blue gradient branding with proper contrast
- **Typography**: Consistent with existing design system
- **Icons**: Lucide React icons for consistency
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG 2.1 AA compliance

## Error Reporting

In production, errors are automatically logged to external services:
- Development: Console logging with detailed stack traces
- Production: Error reporting service integration (configurable)

## File Structure

```
src/
├── app/
│   ├── not-found.tsx          # 404 page
│   ├── error.tsx               # 500 page
│   ├── test-errors/            # Test page
│   └── test-500/               # 500 test page
└── components/
    └── error/
        ├── ErrorPage.tsx       # Base error component
        ├── NetworkError.tsx     # Network error component
        ├── ErrorBoundary.tsx   # React error boundary
        ├── index.ts            # Export barrel
        └── README.md           # This file
```

## Implementation Status

- ✅ ErrorPage component
- ✅ NetworkError component  
- ✅ ErrorBoundary component
- ✅ 404 Not Found page
- ✅ 500 Server Error page
- ✅ Export barrel
- ✅ Test pages
- ✅ Documentation

All components are production-ready and follow Next.js 13+ app directory conventions.
