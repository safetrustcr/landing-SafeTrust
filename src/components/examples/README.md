# Icon Documentation Components

This directory contains components for documenting and showcasing the Lucide React icons used in the SafeTrust project.

## Components

### IconShowcase.tsx
A comprehensive visual catalog component that displays all available icons with search and filtering capabilities.

**Features:**
- ✅ Interactive icon grid/list view
- ✅ Real-time search functionality  
- ✅ Category filtering
- ✅ Copy import statements
- ✅ Copy usage examples
- ✅ Responsive design
- ✅ Accessible interface

**Props:**
```tsx
interface IconShowcaseProps {
  className?: string;
  defaultCategory?: FilterCategory;
  searchable?: boolean;
  viewModeToggle?: boolean;
}
```

**Usage:**
```tsx
import IconShowcase from "@/components/examples/IconShowcase";

// Basic usage
<IconShowcase />

// With custom defaults
<IconShowcase 
  defaultCategory="navigation"
  searchable={true}
  viewModeToggle={true}
/>
```

### IconUsageExamples
Component demonstrating different ways to use icons with various sizes and colors.

**Features:**
- ✅ Size variations (16px, 24px, 32px, 48px)
- ✅ Color variations (default, primary, muted, destructive)
- ✅ Live examples with code snippets

## Related Files

### utils/icon-registry.ts
Central registry for all icons with metadata including:
- Icon components
- Categories  
- Descriptions
- Usage examples
- Common props

### docs/ICONS.md
Comprehensive documentation with:
- Complete icon inventory
- Usage guidelines
- Best practices
- Implementation examples
- Search functionality guide

## Pages

### app/icons/page.tsx
Demo page showcasing the IconShowcase component with:
- Full icon catalog
- Usage examples
- Implementation guide
- Best practices

## Quick Start

1. **Browse Icons**: Visit `/icons` page to explore all available icons
2. **Search Icons**: Use the search bar to find specific icons by name or usage
3. **Copy Code**: Click "Import" or "Usage" buttons to copy code to clipboard
4. **Filter by Category**: Use category dropdown to filter icons by type

## Development

### Adding New Icons
1. Add the icon import to `utils/icon-registry.ts`
2. Define the icon metadata in the registry
3. The icon will automatically appear in the showcase

### Customizing Categories
Categories are defined in the `IconInfo` type:
```tsx
type IconCategory = 
  | 'navigation' 
  | 'action' 
  | 'status' 
  | 'security' 
  | 'business' 
  | 'communication' 
  | 'analytics' 
  | 'ui' 
  | 'technology' 
  | 'file';
```

### Search Algorithm
The search function matches against:
- Icon names (case-insensitive)
- Descriptions
- Usage examples

## Accessibility

All components follow accessibility best practices:
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA labels
- Focus management
- Color contrast compliance

## Performance

- Icons are imported individually to minimize bundle size
- Search results are memoized for optimal performance
- Lazy loading considerations for large icon sets
- Optimized re-renders with React.memo patterns