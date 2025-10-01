# SafeTrust Component Documentation

## 📦 Component Library Overview

This document provides comprehensive documentation for all reusable components in the SafeTrust application.

## Table of Contents

- [Design System](#design-system)
- [UI Components](#ui-components)
- [Feature Components](#feature-components)
- [Layout Components](#layout-components)
- [Design Tokens](#design-tokens)
- [Accessibility Guidelines](#accessibility-guidelines)

---

## 🎨 Design System

### Color Palette

```typescript
// Primary Colors
const colors = {
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',  // Main purple
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  secondary: {
    500: '#3b82f6',  // Main blue
    600: '#2563eb',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  },
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};
```

### Typography

```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
```

### Spacing

```typescript
const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
};
```

---

## 🧩 UI Components

### Button

A versatile button component with multiple variants and sizes.

#### Props Interface

```typescript
interface ButtonProps {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Button content */
  children: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Full width button */
  fullWidth?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}
```

#### Usage Examples

```tsx
import { Button } from '@/components/ui/Button';

// Primary button
<Button variant="primary" onClick={handleConnect}>
  Connect Wallet
</Button>

// Loading state
<Button variant="primary" loading>
  Processing...
</Button>

// Disabled button
<Button variant="secondary" disabled>
  Not Available
</Button>

// Full width button
<Button variant="primary" fullWidth>
  Continue
</Button>

// With icon
<Button variant="outline">
  <WalletIcon className="mr-2" />
  Connect Wallet
</Button>
```

#### Design Tokens

- Primary: Purple gradient background (#8b5cf6 to #3b82f6)
- Secondary: Gray solid background (#374151)
- Outline: Transparent with purple border
- Ghost: Transparent with purple text
- Padding: sm (8px 16px), md (12px 24px), lg (16px 32px)
- Border radius: 8px
- Transition: all 200ms ease

#### Accessibility Notes

- Uses semantic `<button>` element
- Supports keyboard navigation
- Disabled state removes from tab order
- Loading state provides visual feedback
- ARIA attributes for screen readers

#### Testing Guidelines

```typescript
describe('Button', () => {
  it('renders with correct variant', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gradient-to-r');
  });

  it('handles click events', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables interaction when loading', () => {
    const onClick = jest.fn();
    render(<Button loading onClick={onClick}>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

### Card

A flexible container component for displaying grouped content.

#### Props Interface

```typescript
interface CardProps {
  /** Card title */
  title?: string;
  /** Card description */
  description?: string;
  /** Card content */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'gradient' | 'bordered' | 'glass';
  /** Enable hover effect */
  hover?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Icon element */
  icon?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}
```

#### Usage Examples

```tsx
import { Card } from '@/components/ui/Card';

// Basic card
<Card
  title="Secure Deposits"
  description="Your rental deposits are protected by blockchain technology"
/>

// Gradient card with icon
<Card
  variant="gradient"
  hover
  icon={<LockIcon className="w-8 h-8" />}
  title="Smart Contracts"
  description="Automated and transparent agreements"
/>

// Interactive card
<Card
  hover
  onClick={() => handleCardClick()}
  title="View Details"
  footer={
    <Button variant="outline" size="sm">
      Learn More
    </Button>
  }
>
  <p>Card content goes here</p>
</Card>

// Glass morphism card
<Card variant="glass" className="backdrop-blur-lg">
  <h3>Transparent Background</h3>
</Card>
```

#### Design Tokens

- Background: White (#ffffff) / Gradient
- Border radius: 12px
- Padding: 24px
- Shadow: md (0 4px 6px rgba(0,0,0,0.1))
- Hover shadow: xl (0 20px 25px rgba(0,0,0,0.15))
- Transition: all 300ms ease

#### Accessibility Notes

- Uses semantic HTML structure
- Title uses appropriate heading level
- Interactive cards include proper ARIA attributes
- Keyboard navigable when clickable
- Focus visible styles

#### Testing Guidelines

```typescript
describe('Card', () => {
  it('renders title and description', () => {
    render(
      <Card title="Test Title" description="Test Description" />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('applies hover effects', () => {
    render(<Card hover title="Hover Card" />);
    expect(screen.getByText('Hover Card').parentElement)
      .toHaveClass('hover:shadow-xl');
  });
});
```

---

### Input

Form input component with validation and error handling.

#### Props Interface

```typescript
interface InputProps {
  /** Input label */
  label?: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Input icon */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}
```

#### Usage Examples

```tsx
import { Input } from '@/components/ui/Input';

// Basic input
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
/>

// With error
<Input
  label="Wallet Address"
  value={address}
  onChange={setAddress}
  error="Invalid wallet address"
  required
/>

// With icon and helper text
<Input
  label="Amount"
  type="number"
  icon={<DollarIcon />}
  value={amount}
  onChange={setAmount}
  helperText="Minimum deposit: 0.01 ETH"
/>
```

#### Design Tokens

- Height: 48px
- Border: 1px solid #e5e7eb
- Border radius: 8px
- Focus border: 2px solid #8b5cf6
- Error border: 2px solid #ef4444
- Padding: 12px 16px
- Font size: 16px

#### Accessibility Notes

- Label associated with input via htmlFor
- Error messages use aria-describedby
- Required inputs marked with aria-required
- Disabled inputs not focusable
- Clear error announcements for screen readers

---

### Modal

Accessible modal dialog component.

#### Props Interface

```typescript
interface ModalProps {
  /** Modal open state */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
}
```

#### Usage Examples

```tsx
import { Modal } from '@/components/ui/Modal';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Connect Wallet"
  size="md"
>
  <div className="space-y-4">
    <Button onClick={connectMetaMask}>
      <MetaMaskIcon /> MetaMask
    </Button>
    <Button onClick={connectWalletConnect}>
      <WalletConnectIcon /> WalletConnect
    </Button>
  </div>
</Modal>

// With footer
<Modal
  isOpen={isConfirmOpen}
  onClose={() => setIsConfirmOpen(false)}
  title="Confirm Transaction"
  footer={
    <div className="flex gap-3">
      <Button variant="ghost" onClick={() => setIsConfirmOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  }
>
  <p>Are you sure you want to proceed with this transaction?</p>
</Modal>
```

#### Design Tokens

- Overlay: rgba(0, 0, 0, 0.5)
- Background: White
- Border radius: 16px
- Max width: sm (400px), md (600px), lg (800px), xl (1000px)
- Padding: 24px
- Z-index: 1000

#### Accessibility Notes

- Uses dialog role
- Traps focus within modal
- ESC key closes modal
- Focus returns to trigger element on close
- aria-labelledby for title
- aria-describedby for content

---

## 🎯 Feature Components

### WalletConnect

Wallet connection and management component.

#### Props Interface

```typescript
interface WalletConnectProps {
  /** Custom button text */
  buttonText?: string;
  /** Show balance */
  showBalance?: boolean;
  /** Supported chains */
  supportedChains?: number[];
  /** Connection callback */
  onConnect?: (address: string) => void;
  /** Disconnection callback */
  onDisconnect?: () => void;
}
```

#### Usage Examples

```tsx
import { WalletConnect } from '@/components/features/WalletConnect';

<WalletConnect
  buttonText="Connect Your Wallet"
  showBalance={true}
  supportedChains={[1, 5, 137]} // Mainnet, Goerli, Polygon
  onConnect={(address) => console.log('Connected:', address)}
  onDisconnect={() => console.log('Disconnected')}
/>
```

#### States

- **Disconnected**: Show connect button
- **Connecting**: Show loading spinner
- **Connected**: Show address and balance
- **Error**: Show error message with retry option

#### Testing Guidelines

```typescript
describe('WalletConnect', () => {
  it('connects wallet successfully', async () => {
    render(<WalletConnect />);
    const button = screen.getByText('Connect Wallet');
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/0x/)).toBeInTheDocument();
    });
  });

  it('handles connection errors', async () => {
    // Mock wallet rejection
    global.ethereum = { request: jest.fn().mockRejectedValue('User rejected') };
    render(<WalletConnect />);
    await userEvent.click(screen.getByText('Connect Wallet'));
    expect(await screen.findByText(/connection failed/i)).toBeInTheDocument();
  });
});
```

---

### TransactionStatus

Component for displaying transaction status and progress.

#### Props Interface

```typescript
interface TransactionStatusProps {
  /** Transaction hash */
  txHash: string;
  /** Transaction status */
  status: 'pending' | 'confirmed' | 'failed';
  /** Number of confirmations */
  confirmations?: number;
  /** Required confirmations */
  requiredConfirmations?: number;
  /** Show explorer link */
  showExplorerLink?: boolean;
  /** Chain ID */
  chainId?: number;
}
```

#### Usage Examples

```tsx
import { TransactionStatus } from '@/components/features/TransactionStatus';

<TransactionStatus
  txHash="0x1234..."
  status="pending"
  confirmations={2}
  requiredConfirmations={12}
  showExplorerLink
  chainId={1}
/>
```

---

## 📐 Layout Components

### Header

Main navigation header component.

#### Features

- Responsive navigation menu
- Wallet connection integration
- Mobile menu toggle
- Scroll-aware sticky positioning

#### Usage Examples

```tsx
import { Header } from '@/components/layout/Header';

<Header />
```

---

### Footer

Site footer with links and information.

#### Usage Examples

```tsx
import { Footer } from '@/components/layout/Footer';

<Footer />
```

---

## 🎨 Design Tokens

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### Transitions

```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

---

## ♿ Accessibility Guidelines

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order should be logical and intuitive
- Focus indicators must be visible
- ESC key should close modals and dropdowns

### Screen Readers

- Use semantic HTML elements
- Provide descriptive ARIA labels
- Announce dynamic content changes
- Use proper heading hierarchy

### Color Contrast

Ensure WCAG 2.1 AA compliance:
- Normal text: minimum 4.5:1 contrast ratio
- Large text: minimum 3:1 contrast ratio
- Interactive elements: minimum 3:1 contrast ratio

### Testing Tools

- axe DevTools
- Lighthouse Accessibility Audit
- WAVE Browser Extension
- Keyboard-only navigation testing

---

## 📝 Component Checklist

When creating a new component:

- [ ] TypeScript interface defined
- [ ] Props documented with JSDoc comments
- [ ] Usage examples provided
- [ ] Storybook story created
- [ ] Unit tests written
- [ ] Accessibility tested
- [ ] Responsive design verified
- [ ] Design tokens used
- [ ] Error states handled
- [ ] Loading states included

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-15 | Initial component library |
| 1.1.0 | 2025-02-01 | Added WalletConnect component |
| 1.2.0 | 2025-02-15 | Enhanced accessibility features |

---

## 📞 Support

For component-related questions:
- Check Storybook documentation
- Review component stories
- Open an issue on GitHub
- Contact the development team

---

