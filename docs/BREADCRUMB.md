# Breadcrumb Navigation Component

A fully accessible, responsive breadcrumb navigation component for React applications built with TypeScript and Tailwind CSS.

## Features

✅ **Responsive Design** - Adapts to mobile, tablet, laptop, and desktop screens  
✅ **Separator Customization** - Use any separator (/, >, →, etc.)  
✅ **Active/Inactive States** - Clear visual distinction for current page  
✅ **Path Truncation** - Automatically collapse long paths with expandable ellipsis  
✅ **Screen Reader Friendly** - Full ARIA support and semantic HTML  
✅ **Click Navigation** - Seamless Next.js Link integration  
✅ **Dynamic Route Generation** - Hook-based breadcrumb from current route  

## Components

### Breadcrumb

Main breadcrumb container component.

```tsx
import { Breadcrumb } from '@/components/ui/Breadcrumb'

<Breadcrumb separator="/">
  {/* BreadcrumbItem children */}
</Breadcrumb>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `separator` | `React.ReactNode` | `"/"` | Custom separator between items |
| `maxItems` | `number` | `undefined` | Maximum items to display before collapsing |
| `collapseAfter` | `number` | `2` | Number of items to show before collapse indicator |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `React.ReactNode` | - | BreadcrumbItem components |

### BreadcrumbItem

Individual breadcrumb item component.

```tsx
import { BreadcrumbItem } from '@/components/ui/BreadcrumbItem'

<BreadcrumbItem href="/" active={false}>
  Home
</BreadcrumbItem>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `undefined` | Link destination (omit for non-clickable items) |
| `active` | `boolean` | `false` | Whether this is the current page |
| `truncate` | `boolean` | `true` | Whether to truncate long labels |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `React.ReactNode` | - | Item label content |

## Hooks

### useBreadcrumb

Generate breadcrumb items from the current route automatically.

```tsx
import { useBreadcrumb } from '@/hooks/use-breadcrumb'

const breadcrumbs = useBreadcrumb({
  excludeSegments: ['admin'],
  customLabels: {
    'dashboard': '📊 Dashboard',
    'settings': '⚙️ Settings',
  },
})
```

#### Options

```typescript
interface UseBreadcrumbOptions {
  maxItems?: number           // Max items to display
  truncateLength?: number     // Character limit for labels (default: 30)
  excludeSegments?: string[]  // Segments to skip
  customLabels?: Record<string, string> // Custom labels for segments
}
```

#### Return Value

```typescript
interface BreadcrumbItemData {
  href: string        // Link URL
  label: string       // Display label
  active?: boolean    // Is current page
}
```

## Usage Examples

### Basic Usage

```tsx
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/features">Features</BreadcrumbItem>
  <BreadcrumbItem active>Security</BreadcrumbItem>
</Breadcrumb>
```

### Custom Separator

```tsx
<Breadcrumb separator="›">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
  <BreadcrumbItem active>Settings</BreadcrumbItem>
</Breadcrumb>
```

### With Truncation

```tsx
<Breadcrumb maxItems={3} collapseAfter={2}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
  <BreadcrumbItem href="/admin/users">Users</BreadcrumbItem>
  <BreadcrumbItem href="/admin/users/123">User Details</BreadcrumbItem>
  <BreadcrumbItem active>Edit</BreadcrumbItem>
</Breadcrumb>
```

### Dynamic from Route

```tsx
'use client'

import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { BreadcrumbItem } from '@/components/ui/BreadcrumbItem'
import { useBreadcrumb } from '@/hooks/use-breadcrumb'

export default function Page() {
  const breadcrumbs = useBreadcrumb({
    customLabels: {
      'dashboard': '📊 Dashboard',
      'analytics': '📈 Analytics',
    },
  })

  return (
    <Breadcrumb>
      {breadcrumbs.map((item) => (
        <BreadcrumbItem
          key={item.href}
          href={item.href}
          active={item.active}
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
```

## Accessibility Features

- **ARIA Labels**: Proper `aria-label` and `aria-current="page"` attributes
- **Semantic HTML**: Uses `<nav>` and `<ol>` for proper structure
- **Keyboard Navigation**: Full keyboard support with focus management
- **Screen Readers**: Hidden separators with `aria-hidden="true"`
- **Focus Indicators**: Visible focus rings on interactive elements
- **ARIA Disabled**: Non-clickable items marked as disabled

## Responsive Behavior

The component includes responsive utilities for different screen sizes:

| Screen | Breakpoint | Example Behavior |
|--------|-----------|------------------|
| Mobile | 320px-767px | Reduced text size, compact spacing |
| Tablet | 768px-1365px | Normal size with optimized padding |
| Laptop | 1366px-1919px | Full size with standard spacing |
| Desktop | 1920px+ | Maximum display capabilities |

## Styling

The component uses Tailwind CSS with custom theme colors:

- **Active State**: Foreground color with accent background
- **Inactive State**: Muted foreground with hover effects
- **Separator**: Muted foreground color

Customize by overriding Tailwind theme colors in `tailwind.config.ts`:

```typescript
extend: {
  colors: {
    muted: {
      foreground: 'hsl(var(--muted-foreground))',
    },
    accent: 'hsl(var(--accent))',
  }
}
```

## Utility Functions

### formatBreadcrumbSegment

Convert text to URL-friendly format:

```typescript
import { formatBreadcrumbSegment } from '@/hooks/use-breadcrumb'

formatBreadcrumbSegment('My Custom Label')
// Returns: 'my-custom-label'
```

### truncateBreadcrumbLabel

Truncate text with ellipsis:

```typescript
import { truncateBreadcrumbLabel } from '@/hooks/use-breadcrumb'

truncateBreadcrumbLabel('Very Long Label', 20)
// Returns: 'Very Long Label...'
```

## Example Page Integration

See [BreadcrumbExample.tsx](./examples/BreadcrumbExample.tsx) for complete working examples including:

- Basic breadcrumbs
- Custom separators
- Path truncation
- Dynamic route-based generation
- Responsive behavior demonstrations
