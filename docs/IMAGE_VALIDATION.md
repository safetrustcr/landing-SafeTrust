# Image Validation System Documentation

## Overview

The image validation system prevents unnecessary network requests for invalid or missing image URLs, eliminating "requested resource isn't a valid image" errors and improving performance.

## Problem Statement

Before this system, the application would attempt to load images even when:
- The URL is `null` or `undefined`
- The URL is an empty string
- The URL is an invalid format
- The user hasn't set a profile picture

This caused:
- Failed network requests
- Console errors like: "The requested resource isn't a valid image ... received null"
- Wasted bandwidth
- Visual broken image indicators

## Solution Components

### 1. Utility Functions (`src/utils/image-validation.ts`)

Core validation functions:

```typescript
// Check if a value is a valid image URL
isValidImageUrl(url: unknown): url is string

// Get a validated URL or undefined
getValidImageUrl(url: unknown): string | undefined

// Check if URL looks like an image
isImageUrl(url: string): boolean

// Sanitize and validate a URL
sanitizeImageUrl(url: unknown, strict?: boolean): string | undefined

// Generate user initials for fallback avatars
generateInitials(name: string, maxChars?: number): string

// Create a colored circle placeholder
generateColorPlaceholder(color?: string, size?: number): string
```

**Usage Example:**

```typescript
import { isValidImageUrl, generateInitials } from '@/utils/image-validation';

const profileUrl = user?.avatar;
if (isValidImageUrl(profileUrl)) {
  // Safe to render image
  return <Image src={profileUrl} alt="Profile" />;
}

// Render fallback with initials
const initials = generateInitials(user?.name || 'User');
return <div>{initials}</div>;
```

### 2. Safe Avatar Component (`src/components/ui/SafeAvatar.tsx`)

Pre-built component for user avatars with automatic fallback:

```typescript
import { SafeAvatar } from '@/components/ui/SafeAvatar';

// In your component
<SafeAvatar 
  src={user.avatar}           // Can be null/undefined/empty
  name={user.name}            // Used for initials fallback
  size="md"                   // Options: xs, sm, md, lg, xl
  isActive={isSelected}       // Optional visual state
  showTooltip={true}          // Show name on hover
/>
```

**Features:**
- Automatically validates the src prop
- Shows user initials if image is invalid
- Responsive sizing options
- No network request for invalid URLs
- Proper accessibility labels

### 3. Safe Image Component (`src/components/ui/SafeImage.tsx`)

Wrapper around Next.js Image for validation:

```typescript
import { SafeImage } from '@/components/ui/SafeImage';

<SafeImage 
  src={imageUrl}                  // Can be null/undefined
  alt="Description"
  width={200}
  height={200}
  fallback={<Skeleton />}        // Optional fallback UI
  onInvalidUrl={(url) => {       // Optional error tracking
    console.warn('Invalid URL:', url);
  }}
/>
```

### 4. Custom Hook (`src/hooks/use-image-validation.ts`)

For advanced image loading scenarios:

```typescript
import { useImageValidation } from '@/hooks/use-image-validation';

function UserProfile({ user }) {
  const { 
    isValid,          // Whether URL is valid
    hasError,         // Image failed to load
    isLoading,        // Currently loading
    imageUrl,         // Validated URL to use
    retry,            // Retry loading
    setError,         // Manual error setting
  } = useImageValidation(user.avatar, {
    onError: (error) => console.log('Failed:', error),
    onLoad: () => console.log('Image loaded'),
    preloadImage: true,  // Preload before rendering
  });

  if (hasError) {
    return <button onClick={retry}>Retry</button>;
  }

  return imageUrl ? (
    <img src={imageUrl} alt={user.name} />
  ) : (
    <UserInitials name={user.name} />
  );
}
```

## Implementation Patterns

### Pattern 1: Simple Conditional Rendering

```typescript
import { isValidImageUrl, generateInitials } from '@/utils/image-validation';

function Avatar({ src, name }) {
  const hasImage = isValidImageUrl(src);
  const initials = generateInitials(name);
  
  return (
    <div className="avatar">
      {hasImage ? (
        <img src={src} alt={name} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
```

### Pattern 2: Using Safe Components

```typescript
import { SafeAvatar } from '@/components/ui/SafeAvatar';

function UserList({ users }) {
  return users.map(user => (
    <div key={user.id}>
      <SafeAvatar src={user.avatar} name={user.name} size="sm" />
      <span>{user.name}</span>
    </div>
  ));
}
```

### Pattern 3: Advanced Hook Pattern

```typescript
import { useImageValidation } from '@/hooks/use-image-validation';

function ProfileCard({ user }) {
  const { isValid, imageUrl } = useImageValidation(user.profilePicture);
  const [error, setError] = useState(null);

  return (
    <Card>
      {isValid && imageUrl ? (
        <img 
          src={imageUrl} 
          alt={user.name}
          onError={(e) => setError(e)}
        />
      ) : (
        <Placeholder name={user.name} />
      )}
    </Card>
  );
}
```

## Best Practices

### ✅ DO

1. **Always validate before rendering:**
   ```typescript
   if (isValidImageUrl(url)) {
     return <img src={url} />;
   }
   ```

2. **Provide meaningful fallbacks:**
   ```typescript
   <SafeAvatar 
     src={user.avatar} 
     name={user.name}
     fallbackColor="4f46e5"
   />
   ```

3. **Use the pre-built components:**
   ```typescript
   // Preferred
   <SafeAvatar src={avatar} name={name} />
   
   // Over custom logic
   ```

4. **Handle errors gracefully:**
   ```typescript
   const { isValid, imageUrl, retry } = useImageValidation(url);
   if (!isValid) {
     return <button onClick={retry}>Try Again</button>;
   }
   ```

### ❌ DON'T

1. **Don't render Image directly with unvalidated URLs:**
   ```typescript
   // BAD - creates network request for invalid URLs
   <img src={url} />
   ```

2. **Don't assume URLs are valid:**
   ```typescript
   // BAD - will error if url is null
   <Image src={url} alt="avatar" />
   
   // GOOD
   {isValidImageUrl(url) && <Image src={url} alt="avatar" />}
   ```

3. **Don't suppress all errors silently:**
   ```typescript
   // BAD - no feedback
   {isValid ? <img src={url} /> : null}
   
   // GOOD - shows reason for fallback
   {isValid ? <img src={url} /> : <UserInitials name={name} />}
   ```

4. **Don't mix validation approaches:**
   ```typescript
   // Inconsistent - use utilities consistently
   if (url && url.length > 0) { ... }
   
   // Consistent
   if (isValidImageUrl(url)) { ... }
   ```

## Type Safety

All utilities are fully typed with TypeScript:

```typescript
// Type-safe validation
const result = validateImageForRendering(url, {
  fallbackOnMissing: true,
  fallbackType: 'initials',
  identifier: userName,
});

if (result.shouldRenderImage) {
  // imageUrl is guaranteed to be string
  console.log(result.imageUrl.length);
}
```

## Error Handling Examples

### Network Errors

```typescript
const { hasError, retry } = useImageValidation(url);

if (hasError) {
  return (
    <div>
      <p>Failed to load image</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
}
```

### Invalid URL Tracking

```typescript
<SafeImage 
  src={url}
  onInvalidUrl={(url) => {
    // Track invalid URLs for debugging
    analytics.track('invalid_image_url', { url });
  }}
/>
```

## Migration Guide

### From Old Code

**Before:**
```typescript
<img src={user.avatar || '/default-avatar.png'} alt="Avatar" />
// Still makes request for null/undefined
```

**After:**
```typescript
<SafeAvatar src={user.avatar} name={user.name} size="md" />
// No network request for invalid URLs
```

### Updating Existing Components

1. Import validation utilities
2. Check `isValidImageUrl()` before rendering
3. Provide fallback UI with initials/placeholder
4. Remove any default image URLs (they prevent validation)

## Performance Benefits

- **Reduced network requests**: No requests for invalid URLs
- **No 404 errors**: Invalid URLs never trigger network calls
- **Smaller bundle**: Consolidated utilities (< 5KB)
- **Better UX**: Instant fallback without loading state

## Testing

All validation utilities are tested:

```typescript
import { isValidImageUrl, generateInitials } from '@/utils/image-validation';

describe('Image Validation', () => {
  it('should return true for valid URLs', () => {
    expect(isValidImageUrl('/avatar.jpg')).toBe(true);
    expect(isValidImageUrl('https://cdn.com/image.png')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidImageUrl(null)).toBe(false);
    expect(isValidImageUrl('')).toBe(false);
    expect(isValidImageUrl(undefined)).toBe(false);
  });

  it('should generate correct initials', () => {
    expect(generateInitials('John Doe')).toBe('JD');
    expect(generateInitials('Jane')).toBe('J');
    expect(generateInitials('Jane Doe Smith')).toBe('JD');
  });
});
```

## Troubleshooting

### Images Still Not Showing

1. Check if URL is valid: `console.log(isValidImageUrl(url))`
2. Verify URL format and permissions
3. Check browser DevTools Network tab - should be no failed requests

### Incorrect Initials

1. Verify name is passed correctly
2. Check `generateInitials()` output
3. Ensure name has at least 1 character

### Type Errors

1. Ensure proper imports: `import { isValidImageUrl } from '@/utils/image-validation'`
2. Check that props match interfaces
3. Verify component prop types

## See Also

- [TestimonialCard.tsx](../components/Testimonials/TestimonialCard.tsx) - Example implementation
- [SafeAvatar.tsx](../components/ui/SafeAvatar.tsx) - Pre-built avatar component
- [useImageValidation.ts](../hooks/use-image-validation.ts) - Hook for image loading
