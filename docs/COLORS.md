# Color System

CSS custom properties defined in `public/styles/globals.css`. All color variables use HSL channel values (no `hsl()` wrapper) so Tailwind can compose them with opacity modifiers like `bg-primary/50`.

## Usage in Tailwind

```html
<!-- Background -->
<div class="bg-background text-foreground" />

<!-- With opacity -->
<div class="bg-primary/20 text-primary" />

<!-- Border -->
<div class="border border-border" />
```

To use a variable directly in CSS:

```css
color: hsl(var(--primary));
background: hsl(var(--primary) / 0.5);
```

---

## CSS Variables Reference

| Variable | Tailwind Class | Light | Dark | Purpose |
|---|---|---|---|---|
| `--background` | `bg-background` | `0 0% 100%` (white) | `222.2 84% 4.9%` (near-black) | Page background |
| `--foreground` | `text-foreground` | `222.2 84% 4.9%` (near-black) | `210 40% 98%` (near-white) | Default text |
| `--card` | `bg-card` | `0 0% 100%` (white) | `222.2 84% 4.9%` (near-black) | Card background |
| `--card-foreground` | `text-card-foreground` | `222.2 84% 4.9%` | `210 40% 98%` | Text on cards |
| `--popover` | `bg-popover` | `0 0% 100%` | `222.2 84% 4.9%` | Popover/dropdown background |
| `--popover-foreground` | `text-popover-foreground` | `222.2 84% 4.9%` | `210 40% 98%` | Text in popovers |
| `--primary` | `bg-primary`, `text-primary` | `221.2 83.2% 53.3%` (blue) | `217.2 91.2% 59.8%` (lighter blue) | Primary actions, buttons, links |
| `--primary-foreground` | `text-primary-foreground` | `210 40% 98%` | `222.2 84% 4.9%` | Text on primary-colored surfaces |
| `--secondary` | `bg-secondary`, `text-secondary` | `210 40% 96%` (light gray) | `217.2 32.6% 17.5%` (dark slate) | Secondary actions and surfaces |
| `--secondary-foreground` | `text-secondary-foreground` | `222.2 84% 4.9%` | `210 40% 98%` | Text on secondary surfaces |
| `--muted` | `bg-muted` | `210 40% 96%` | `217.2 32.6% 17.5%` | Subtle backgrounds, disabled states |
| `--muted-foreground` | `text-muted-foreground` | `215.4 16.3% 46.9%` (gray) | `215 20.2% 65.1%` (light gray) | Placeholder text, captions, hints |
| `--accent` | `bg-accent` | `210 40% 96%` | `217.2 32.6% 17.5%` | Hover highlights, focus rings |
| `--accent-foreground` | `text-accent-foreground` | `222.2 84% 4.9%` | `210 40% 98%` | Text on accent surfaces |
| `--destructive` | `bg-destructive` | `0 84.2% 60.2%` (red) | `0 62.8% 30.6%` (dark red) | Errors, delete actions |
| `--destructive-foreground` | `text-destructive-foreground` | `210 40% 98%` | `210 40% 98%` | Text on destructive surfaces |
| `--border` | `border-border` | `214.3 31.8% 91.4%` (light gray) | `217.2 32.6% 17.5%` (dark slate) | Default border color |
| `--input` | `border-input` | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` | Input field borders |
| `--ring` | `ring-ring` | `221.2 83.2% 53.3%` (blue) | `224.3 76.3% 94.1%` (pale blue) | Focus ring on interactive elements |
| `--radius` | — | `0.5rem` | `0.5rem` | Base border radius (not a color) |

### Chart Colors

Used for data visualizations. Not mapped to semantic Tailwind utilities by default.

| Variable | Light | Dark |
|---|---|---|
| `--chart-1` | `12 76% 61%` (orange-red) | `220 70% 50%` (blue) |
| `--chart-2` | `173 58% 39%` (teal) | `160 60% 45%` (green) |
| `--chart-3` | `197 37% 24%` (dark teal) | `30 80% 55%` (amber) |
| `--chart-4` | `43 74% 66%` (yellow) | `280 65% 60%` (purple) |
| `--chart-5` | `27 87% 67%` (amber) | `340 75% 55%` (pink) |

---

## Gradient Utilities

Pre-built gradient classes available globally:

| Class | Direction | From → To |
|---|---|---|
| `bg-gradient-primary` | 135° | `#336ad9` → `#8b5cf6` |
| `bg-gradient-secondary` | 135° | `#8b5cf6` → `#336ad9` |
| `text-gradient-primary` | 135° | `#336ad9` → `#8b5cf6` (text clip) |
| `text-gradient-secondary` | 135° | `#8b5cf6` → `#336ad9` (text clip) |

```html
<h1 class="text-gradient-primary">SafeTrust</h1>
<button class="bg-gradient-primary text-white">Get Started</button>
```
