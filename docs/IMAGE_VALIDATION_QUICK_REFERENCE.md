# Image Validation Quick Reference

## TL;DR

**Problem**: App logs "The requested resource isn't a valid image ... received null"

**Solution**: Validate image URLs BEFORE rendering

## Quick Start

### Option 1: Use SafeAvatar (Easiest)
```typescript
import { SafeAvatar } from '@/components/ui/SafeAvatar';

<SafeAvatar src={user.avatar} name={user.name} size="md" />
// ✅ No errors, shows initials if avatar missing
```

### Option 2: Manual Validation
```typescript
import { isValidImageUrl } from '@/utils/image-validation';

{isValidImageUrl(url) && <img src={url} alt="pic" />}
// ✅ Only renders img if URL is valid
```

### Option 3: With Fallback
```typescript
import { isValidImageUrl, generateInitials } from '@/utils/image-validation';

{isValidImageUrl(url) ? (
  <img src={url} alt="pic" />
) : (
  <span>{generateInitials(name)}</span>
)}
// ✅ Shows initials when URL is invalid
```

## Key Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| `isValidImageUrl(url)` | Check if URL is valid | `boolean` |
| `getValidImageUrl(url)` | Get URL or undefined | `string \| undefined` |
| `generateInitials(name)` | Create user initials | `string` |
| `sanitizeImageUrl(url)` | Strict validation | `string \| undefined` |

## Common Patterns

### Pattern: No Image → Show Initials
```typescript
const { isValid, imageUrl } = useImageValidation(url);
return isValid ? <Image src={imageUrl} /> : <Initials />;
```

### Pattern: Multiple Image Sources
```typescript
import { extractValidImageUrl } from '@/utils/image-validation';

const imageUrl = extractValidImageUrl({
  avatar: user.avatar,
  profilePicture: user.profilePicture,
  image: user.image,
});
```

### Pattern: Error Handling
```typescript
const { imageUrl, hasError, retry } = useImageValidation(url);

return (
  <>
    {hasError && <button onClick={retry}>Retry</button>}
    {imageUrl && <Image src={imageUrl} />}
  </>
);
```

## What Gets Fixed

| Issue | Before | After |
|-------|--------|-------|
| Null avatar | 404 error logged | No error, shows initials |
| Empty string URL | Request made | No request made |
| Invalid URL | 404 network error | Silently shows fallback |
| Console spam | Multiple errors | Zero errors |

## Files to Import From

```typescript
// Core utilities
import { 
  isValidImageUrl,
  generateInitials,
  sanit izeImageUrl,
} from '@/utils/image-validation';

// Components
import { SafeAvatar } from '@/components/ui/SafeAvatar';
import { SafeImage } from '@/components/ui/SafeImage';

// Hooks
import { useImageValidation } from '@/hooks/use-image-validation';
```

## Do's and Don'ts

### ✅ DO
```typescript
// Valid: Check before rendering
if (isValidImageUrl(url)) {
  return <img src={url} />;
}

// Valid: Use SafeAvatar
return <SafeAvatar src={url} name={name} />;

// Valid: Use utilities
const initials = generateInitials(name);
```

### ❌ DON'T
```typescript
// Invalid: Direct render without check
return <img src={url} />;  // Can be null!

// Invalid: Weak validation
if (url) { ... }  // Doesn't catch empty strings!

// Invalid: Duplicate logic
// Use utilities instead!
```

## Verification

### Check if fix is working
```javascript
// Open DevTools → Network tab
// Look for image requests
// If avatar is null/empty: NO requests found ✅
// If avatar is valid: successful requests found ✅
```

### No console errors
```javascript
// Open DevTools → Console
// Should NOT see: "isn't a valid image"
// Should NOT see: 404 errors for avatars
```

## Examples

### React Component
```typescript
import { SafeAvatar } from '@/components/ui/SafeAvatar';

function UserProfile({ user }) {
  return (
    <div className="profile">
      <SafeAvatar 
        src={user.profilePicture} 
        name={user.name}
        size="lg"
      />
      <h1>{user.name}</h1>
    </div>
  );
}
// ✅ If profilePicture is null → shows "UN" initials
```

### List Component
```typescript
import { isValidImageUrl, generateInitials } from '@/utils/image-validation';

function UserList({ users }) {
  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>
          <div className="avatar">
            {isValidImageUrl(u.avatar) ? (
              <img src={u.avatar} alt={u.name} />
            ) : (
              <span>{generateInitials(u.name)}</span>
            )}
          </div>
          {u.name}
        </li>
      ))}
    </ul>
  );
}
```

## Need More Info?

- 📖 Full guide: [`docs/IMAGE_VALIDATION.md`](./IMAGE_VALIDATION.md)
- 🔍 Complete fix: [`docs/IMAGE_VALIDATION_FIX.md`](./IMAGE_VALIDATION_FIX.md)
- 💻 Source code: [`src/utils/image-validation.ts`](../src/utils/image-validation.ts)
- 🧪 Tests: [`tests/image-validation.test.ts`](../tests/image-validation.test.ts)

## Summary

```
Before: ❌ Avatar null → 404 error logged → User confused
After:  ✅ Avatar null → No error → Shows initials → User happy
```

**Key Insight**: Validate URLs BEFORE the browser tries to load them!
