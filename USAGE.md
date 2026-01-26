# Touch Gestures - Implementation Guide

This guide shows you how to use the touch gesture system in your SafeTrust Next.js application.

## 📦 Installation

1. **Import the CSS** in your root layout or `_app.tsx`:

```typescript
// app/layout.tsx or pages/_app.tsx
import "@/styles/touch.css";
```

2. **Add the viewport meta tag** in your root layout:

```typescript
// app/layout.tsx
export const metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};
```

## 🎯 Usage Examples

### 1. Basic Touch Feedback on Buttons

Wrap any clickable element with `TouchFeedback` to add ripple effects:

```tsx
import TouchFeedback from "@/components/ui/TouchFeedback";

export default function MyComponent() {
  return (
    <TouchFeedback>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
        Click Me
      </button>
    </TouchFeedback>
  );
}
```

**With custom colors:**

```tsx
<TouchFeedback color="rgba(255, 59, 48, 0.3)" duration={800} haptic={true}>
  <button>Delete</button>
</TouchFeedback>
```

### 2. Swipe Navigation for Sections

Use the `useSwipe` hook to detect swipe gestures:

```tsx
"use client";

import { useState } from "react";
import { useSwipe } from "@/hooks/use-touch-gestures";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["Slide 1", "Slide 2", "Slide 3"];

  const { handlers } = useSwipe({
    onSwipeLeft: () => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    },
    minDistance: 50,
  });

  return (
    <div {...handlers} className="relative overflow-hidden h-screen">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-screen flex items-center justify-center"
          >
            <h1 className="text-4xl font-bold">{slide}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Pull to Refresh

Use the `PullToRefresh` component or hook:

**Component approach:**

```tsx
import PullToRefresh from "@/components/ui/PullToRefresh";

export default function HomePage() {
  const handleRefresh = async () => {
    // Fetch new data
    await fetch("/api/refresh");
    // Update your state
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="p-4">{/* Your content */}</div>
    </PullToRefresh>
  );
}
```

**Hook approach (more control):**

```tsx
"use client";

import { usePullToRefresh } from "@/hooks/use-touch-gestures";

export default function DataList() {
  const { handlers, isRefreshing, pullProgress } = usePullToRefresh({
    onRefresh: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    threshold: 80,
  });

  return (
    <div {...handlers} className="relative">
      {/* Custom refresh indicator */}
      {pullProgress > 0 && (
        <div
          className="absolute top-0 left-0 right-0 flex justify-center p-4"
          style={{ opacity: pullProgress }}
        >
          {isRefreshing ? "Refreshing..." : "Pull to refresh"}
        </div>
      )}

      <div className="p-4">{/* Your list content */}</div>
    </div>
  );
}
```

### 4. Long Press Gesture

```tsx
import { useLongPress } from "@/hooks/use-touch-gestures";

export default function ContextMenu() {
  const longPressHandlers = useLongPress({
    onLongPress: () => {
      console.log("Long press detected!");
      // Show context menu
    },
    onClick: () => {
      console.log("Quick click");
    },
    duration: 500, // 500ms to trigger
  });

  return (
    <div {...longPressHandlers} className="p-4 bg-gray-100 rounded">
      Press and hold me
    </div>
  );
}
```

### 5. Complete Swipe Navigation Component

Use the provided `SwipeNavigation` component:

```tsx
import SwipeNavigation from "@/components/SwipeNavigation";

export default function LandingPage() {
  const sections = [
    {
      id: "hero",
      title: "Welcome to SafeTrust",
      content: <div>Hero content here</div>,
    },
    {
      id: "features",
      title: "Features",
      content: <div>Features content here</div>,
    },
    {
      id: "pricing",
      title: "Pricing",
      content: <div>Pricing content here</div>,
    },
  ];

  return (
    <SwipeNavigation
      sections={sections}
      onChange={(index) => console.log("Section changed to:", index)}
    />
  );
}
```

## 🎨 CSS Classes Reference

### Touch Feedback Classes

```css
.touch-feedback          /* Basic touch feedback with tap highlight */
.touch-target           /* Ensures minimum 44x44px touch area */
.touch-active           /* Active state with scale effect */
.no-select             /* Prevents text selection during gestures */
```

### Scroll Classes

```css
.touch-scroll          /* Smooth scrolling */
.touch-scroll-momentum /* iOS momentum scrolling */
.scroll-isolated       /* Prevents scroll chaining */
```

### Safe Area Classes (for iPhone notch)

```css
.safe-area-top
.safe-area-bottom
.safe-area-left
.safe-area-right
```

### Example Usage

```tsx
<div className="touch-scroll safe-area-top safe-area-bottom">
  <button className="touch-feedback touch-target">Click Me</button>
</div>
```

## ⚙️ Configuration Options

### TouchFeedback Props

| Prop       | Type    | Default                   | Description             |
| ---------- | ------- | ------------------------- | ----------------------- |
| `color`    | string  | `rgba(51, 106, 217, 0.3)` | Ripple color            |
| `duration` | number  | `600`                     | Animation duration (ms) |
| `opacity`  | number  | `0.3`                     | Ripple opacity          |
| `disabled` | boolean | `false`                   | Disable feedback        |
| `haptic`   | boolean | `false`                   | Enable haptic feedback  |

### useSwipe Options

| Option         | Type     | Default | Description                 |
| -------------- | -------- | ------- | --------------------------- |
| `onSwipeLeft`  | function | -       | Left swipe callback         |
| `onSwipeRight` | function | -       | Right swipe callback        |
| `onSwipeUp`    | function | -       | Up swipe callback           |
| `onSwipeDown`  | function | -       | Down swipe callback         |
| `minDistance`  | number   | `50`    | Minimum swipe distance (px) |
| `minVelocity`  | number   | `0.3`   | Minimum velocity (px/ms)    |

### usePullToRefresh Options

| Option       | Type     | Default      | Description                   |
| ------------ | -------- | ------------ | ----------------------------- |
| `onRefresh`  | function | **required** | Refresh callback              |
| `threshold`  | number   | `80`         | Pull distance to trigger (px) |
| `resistance` | number   | `2.5`        | Pull resistance factor        |
| `enabled`    | boolean  | `true`       | Enable/disable feature        |

## 📱 Platform-Specific Tips

### iOS Optimizations

1. **Prevent bounce scrolling:**

```css
body {
  overscroll-behavior-y: contain;
}
```

2. **Prevent zoom on input focus:**

```css
input {
  font-size: 16px !important;
}
```

3. **Safe area support:**

```tsx
<div className="safe-area-top safe-area-bottom">{/* Content */}</div>
```

### Android Optimizations

1. **Fast tap feedback:**

```css
.touch-feedback {
  -webkit-tap-highlight-color: rgba(51, 106, 217, 0.3);
}
```

2. **Smooth scrolling:**

```css
.touch-scroll {
  -webkit-overflow-scrolling: touch;
}
```

## 🧪 Testing Checklist

- [ ] Swipe left/right navigates between sections
- [ ] Touch feedback appears on button press
- [ ] Pull-to-refresh works from top of page
- [ ] No conflicts with native scrolling
- [ ] Smooth animations (60fps)
- [ ] Works on iOS Safari
- [ ] Works on Chrome Android
- [ ] Desktop mouse events still work
- [ ] Keyboard navigation works
- [ ] No scroll bounce on iOS

## 🐛 Troubleshooting

### Issue: Swipes not detected

**Solution:** Ensure you're attaching handlers to the correct element:

```tsx
const { handlers } = useSwipe({ onSwipeLeft: handleSwipe });

return <div {...handlers}>Content</div>; // ✅ Correct
```

### Issue: Pull-to-refresh conflicts with scroll

**Solution:** Only enable when at scroll top:

```tsx
usePullToRefresh({
  onRefresh: handleRefresh,
  enabled: scrollTop === 0, // Only enable at top
});
```

### Issue: Touch feedback not showing

**Solution:** Ensure parent has `position: relative`:

```tsx
<TouchFeedback className="relative">
  <button>Click</button>
</TouchFeedback>
```

### Issue: iOS bounce still happening

**Solution:** Apply to correct element:

```css
/* In your global CSS */
body > #__next {
  overscroll-behavior-y: contain;
}
```

## 🚀 Performance Tips

1. **Use passive event listeners** (handled automatically)
2. **Avoid re-renders during gestures** (use refs)
3. **Use CSS transforms** instead of position changes
4. **Enable GPU acceleration** with `transform: translateZ(0)`
5. **Debounce expensive operations** during swipes

## 📚 Additional Resources

- [MDN Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [iOS Touch Guidelines](https://developer.apple.com/design/human-interface-guidelines/touch)
- [Android Touch Guidelines](https://material.io/design/interaction/gestures.html)

## 💡 Best Practices

1. **Always provide alternative navigation** (buttons, links)
2. **Use visual indicators** for available gestures
3. **Keep touch targets at least 44x44px**
4. **Test on real devices**, not just browser DevTools
5. **Consider accessibility** - gestures shouldn't be the only way
6. **Provide haptic feedback** on supported devices
7. **Show loading states** during async operations
8. **Use smooth animations** (CSS transitions/transforms)

---

Need help? Check the examples in the components or open an issue on GitHub!
