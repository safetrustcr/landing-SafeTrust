# Gradient Utilities for SafeTrust

This document describes the available gradient utility classes for the SafeTrust brand, including usage examples and responsive support.

## Primary Gradient

**Background:**
```html
<div class="bg-gradient-primary">Primary Gradient Background</div>
```

**Text:**
```html
<span class="text-gradient-primary">Primary Gradient Text</span>
```

## Secondary Gradient

**Background:**
```html
<div class="bg-gradient-secondary">Secondary Gradient Background</div>
```

**Text:**
```html
<span class="text-gradient-secondary">Secondary Gradient Text</span>
```

## Responsive Usage

You can use responsive prefixes:
```html
<div class="bg-gradient-primary md:bg-gradient-secondary">Responsive Gradient</div>
```

## Notes
- Gradients are available for both backgrounds and text.
- Text gradients use background-clip and text-fill-color for effect.
- See `public/styles/globals.css` and `tailwind.config.ts` for implementation details.
