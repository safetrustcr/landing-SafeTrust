# Typography System

Our typography system provides consistent text styles across the platform using a modular scale and clear usage guidelines.

---


## Font Sizes

These classes define **how large your text appears** and also set a matching line-height (spacing between lines).  

| Class | Font Size | Line Height | Example Usage |
|-------|-----------|-------------|---------------|
| `.text-sm` | 0.875rem (14px) | 1.25rem (20px) | Small text, captions, metadata |
| `.text-base` | 1rem (16px) | 1.5rem (24px) | Default paragraph/body text |
| `.text-lg` | 1.125rem (18px) | 1.75rem (28px) | Slightly larger body or intro text |
| `.sm:text-lg` | 1.125rem (18px) | 1.75rem (28px) | Larger body text on small+ screens |
| `.text-xl` | 1.25rem (20px) | 1.75rem (28px) | Subheadings, emphasized text |
| `.text-2xl` | 1.5rem (24px) | 2rem (32px) | Card titles, modal headings |
| `.text-3xl` | 1.875rem (30px) | 2.25rem (36px) | Section titles |
| `.text-4xl` | 2.25rem (36px) | 2.5rem (40px) | Page headings, hero text |
| `.sm:text-4xl` | 2.25rem (36px) | 2.5rem (40px) | Large headings on small+ screens |
| `.md:text-5xl` | 3rem (48px) | 1 | Large headings on desktop screens |

📌 **Note:** Prefixes like `sm:`, `md:`, `lg:` mean the text changes **at different screen sizes**.

---

## Font Weights

| Class Name | Font Weight | Usage |
|------------|-------------|-------|
| `.font-normal` | 400 | Default text weight |
| `.font-medium` | 500 | Emphasized text, buttons |
| `.font-semibold` | 600 | Subheadings, important labels |
| `.font-bold` | 700 | Headings, strong emphasis |

---

## Text Colors

| Class Name | Color | Usage |
|------------|-------|-------|
| `.text-white` | `#ffffff` | For text on dark backgrounds|
| `.text-gray-400` | `#9ca3af` | Muted/secondary text |
| `.text-gray-500` | `#6b7280` |Slightly darker muted text |
| `.text-destructive` | `hsl(var(--destructive))` | Error text, destructive actions |
| `.text-muted-foreground` | `hsl(var(--muted-foreground))` | Placeholder or subtle text |
| `.text-foreground` | `hsl(var(--foreground))` | Primary foreground text |

---

## Text Alignment

These classes control the horizontal alignment of text inside an element.  

| Class Name    | Alignment | Example Usage |
|---------------|-----------|---------------|
| `.text-left`  | Aligns text to the start (left in LTR, right in RTL) | Paragraphs, body text |
| `.text-center`| Centers text horizontally | Headings, titles, hero sections |
| `.text-right` | Aligns text to the end (right in LTR, left in RTL) | Captions, metadata, table cells |

---

## Breakpoint Reference

| Breakpoint              | Prefix | Example       |
|--------------------------|--------|---------------|
| Mobile (default)         | -      | `.text-base`  |
| Tablet (≥768px)          | `md:`  | `.md:text-lg` |
| Desktop (≥1024px)        | `lg:`  | `.lg:text-xl` |
| Large Desktop (≥1280px)  | `xl:`  | `.xl:text-2xl` |

---

## Best Practices

- **Maintain Hierarchy**: Use heading levels appropriately (`h1`–`h6`).
- **Limit Font Weights**: Stick to 2–3 weights per page for balance.
- **Consistent Spacing**: Maintain consistent margin/padding around text.
- **Accessibility**: Ensure sufficient color contrast (minimum 4.5:1).
- **Readability**: Keep line length between 50–75 characters.

---

## Accessibility Notes

- Use **semantic HTML headings** (`h1`–`h6`).
- Ensure text **resizes properly when zoomed**.
- Maintain **color contrast ratios** for readability.
- Provide **sufficient line and letter spacing**.
- Use **relative units** (`rem`/`em`) for better scalability.

---

## Usage Guidelines

Check src/components/examples/TypographyShowcast.tsx