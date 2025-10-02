# SafeTrust Icons Documentation 🎨

This document provides a comprehensive overview of all Lucide React icons used in the SafeTrust project, including usage examples, naming conventions, and implementation guidelines.

## 📋 Table of Contents

- [Quick Reference](#quick-reference)
- [Icon Categories](#icon-categories)
- [Usage Guidelines](#usage-guidelines)
- [Size and Color Guidelines](#size-and-color-guidelines)
- [Import Statements](#import-statements)
- [Icon Naming Conventions](#icon-naming-conventions)
- [Search Functionality](#search-functionality)
- [Implementation Examples](#implementation-examples)
- [Complete Icon Inventory](#complete-icon-inventory)

## 🚀 Quick Reference

**Total Icons**: 49  
**Categories**: 10  
**Library**: Lucide React  
**Version**: Latest

### Quick Stats by Category
- **Navigation**: 9 icons
- **Action**: 10 icons  
- **Status**: 10 icons
- **Security**: 4 icons
- **Business**: 2 icons
- **Communication**: 2 icons
- **Analytics**: 3 icons
- **UI**: 4 icons
- **Technology**: 3 icons
- **File**: 2 icons

## 🎯 Icon Categories

### 1. Navigation Icons
Icons for navigation, routing, and directional purposes.
- **ChevronDown, ChevronUp, ChevronRight** - Directional chevrons
- **ArrowLeft, ArrowRight** - Navigation arrows
- **Menu, X** - Menu toggles
- **Home, ExternalLink** - Page navigation

### 2. Action Icons
Icons for user actions and interactive elements.
- **Search, Filter** - Content discovery
- **Download, Copy** - Data operations
- **RefreshCw** - Content refresh
- **Check, CheckCircle, XCircle** - Status confirmation
- **Eye, EyeOff** - Visibility toggles

### 3. Status Icons
Icons for indicating states, conditions, and feedback.
- **AlertTriangle, Bug, ServerCrash** - Error states
- **Wifi, WifiOff** - Connectivity status
- **Clock** - Time-related content
- **TrendingUp, ArrowUp, ArrowDown, Minus** - Data trends

### 4. Security Icons
Icons for security, protection, and trust features.
- **Shield, ShieldCheck** - Protection indicators
- **Lock, KeyRound** - Access control

### 5. Business Icons
Icons for financial and business-related features.
- **Wallet** - Payment and wallet features
- **DollarSign** - Pricing and financial content

### 6. Communication Icons
Icons for communication and contact features.
- **Mail, Phone** - Contact methods

### 7. Analytics Icons
Icons for data visualization and analytics.
- **BarChart3, LineChart** - Chart types
- **Calendar** - Date-related features

### 8. UI Icons
Icons for user interface elements and themes.
- **Sun, Moon, Monitor** - Theme switching
- **Circle** - UI decorations

### 9. Technology Icons
Icons for technology and digital features.
- **Globe** - Web and global features
- **Brain** - AI and smart features
- **Link2** - Connections and links

### 10. File Icons
Icons for file operations and states.
- **FileX** - Missing or error files

## 📐 Size and Color Guidelines

### Standard Sizes
```tsx
// Small icons (16px)
<Icon size={16} />

// Default icons (24px) 
<Icon size={24} />

// Medium icons (32px)
<Icon size={32} />

// Large icons (48px)
<Icon size={48} />
```

### Color Usage
```tsx
// Using CSS classes
<Icon className="text-primary" />
<Icon className="text-muted-foreground" />
<Icon className="text-destructive" />

// Using inline styles
<Icon style={{ color: 'var(--primary)' }} />

// Status-specific colors
<CheckCircle className="text-green-500" />
<XCircle className="text-red-500" />
<AlertTriangle className="text-yellow-500" />
```

### Stroke Width
```tsx
// Light stroke (default: 2)
<Icon strokeWidth={1} />

// Medium stroke 
<Icon strokeWidth={2} />

// Bold stroke
<Icon strokeWidth={3} />
```

## 📦 Import Statements

### Individual Icon Imports (Recommended)
```tsx
import { Search, Filter, Download } from "lucide-react";
```

### Category-based Imports
```tsx
// Navigation icons
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight,
  Menu,
  X,
  Home 
} from "lucide-react";

// Action icons
import { 
  Search, 
  Filter, 
  Download, 
  Copy, 
  RefreshCw,
  Check,
  Eye,
  EyeOff 
} from "lucide-react";

// Security icons
import { 
  Shield, 
  ShieldCheck, 
  Lock, 
  KeyRound 
} from "lucide-react";
```

### Registry Import
```tsx
import { iconRegistry, getIconsByCategory } from "@/utils/icon-registry";
```

## 🏷️ Icon Naming Conventions

### Lucide React Naming Rules
1. **PascalCase**: All icon names use PascalCase (e.g., `ChevronDown`, `AlertTriangle`)
2. **Descriptive Names**: Names describe the visual appearance or function
3. **No Prefixes**: No "Icon" prefix or suffix needed
4. **Compound Names**: Multiple words combined (e.g., `CheckCircle`, `ExternalLink`)

### Common Name Patterns
- **Directional**: `ChevronDown`, `ArrowLeft`, `TrendingUp`
- **Actions**: `Search`, `Download`, `RefreshCw`
- **States**: `Check`, `X`, `AlertTriangle`
- **Objects**: `Shield`, `Wallet`, `Calendar`
- **Modifiers**: `EyeOff`, `WifiOff`, `ShieldCheck`

## 🔍 Search Functionality

### Using the Icon Registry
```tsx
import { searchIcons, getIconsByCategory } from "@/utils/icon-registry";

// Search by name or description
const searchResults = searchIcons("search");
const navigationIcons = getIconsByCategory("navigation");
```

### Search Implementation
```tsx
const IconSearch = () => {
  const [query, setQuery] = useState("");
  const results = searchIcons(query);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search icons..."
      />
      {results.map(icon => (
        <div key={icon.name}>
          <icon.component size={24} />
          <span>{icon.name}</span>
        </div>
      ))}
    </div>
  );
};
```

## 💡 Implementation Examples

### Basic Usage
```tsx
import { Search, Filter, Download } from "lucide-react";

const SearchBar = () => (
  <div className="flex items-center gap-2">
    <Search size={20} className="text-muted-foreground" />
    <input placeholder="Search..." />
    <Filter size={20} className="cursor-pointer hover:text-primary" />
  </div>
);
```

### Button Icons
```tsx
import { Download, RefreshCw } from "lucide-react";

const ActionButtons = () => (
  <div className="flex gap-2">
    <button className="flex items-center gap-2">
      <Download size={16} />
      Download
    </button>
    <button className="p-2">
      <RefreshCw size={16} />
    </button>
  </div>
);
```

### Status Indicators
```tsx
import { CheckCircle, XCircle, Clock } from "lucide-react";

const StatusIcon = ({ status }: { status: 'success' | 'error' | 'pending' }) => {
  const icons = {
    success: <CheckCircle className="text-green-500" />,
    error: <XCircle className="text-red-500" />,
    pending: <Clock className="text-yellow-500" />
  };
  
  return icons[status];
};
```

### Theme Toggle
```tsx
import { Sun, Moon, Monitor } from "lucide-react";

const ThemeToggle = ({ theme, setTheme }) => (
  <div className="flex items-center gap-1">
    <button onClick={() => setTheme('light')}>
      <Sun size={20} className={theme === 'light' ? 'text-primary' : ''} />
    </button>
    <button onClick={() => setTheme('dark')}>
      <Moon size={20} className={theme === 'dark' ? 'text-primary' : ''} />
    </button>
    <button onClick={() => setTheme('system')}>
      <Monitor size={20} className={theme === 'system' ? 'text-primary' : ''} />
    </button>
  </div>
);
```

### Navigation Menu
```tsx
import { Menu, X, Home, Search } from "lucide-react";

const Navigation = ({ isOpen, setIsOpen }) => (
  <nav>
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
    {isOpen && (
      <div className="menu">
        <a href="/"><Home size={20} /> Home</a>
        <a href="/search"><Search size={20} /> Search</a>
      </div>
    )}
  </nav>
);
```

## 📊 Complete Icon Inventory

### Navigation Icons (9)
| Icon | Component | Usage |
|------|-----------|-------|
| ⌄ | `ChevronDown` | Dropdowns, accordions, expandable content |
| ⌃ | `ChevronUp` | Collapse sections, back to top |
| ❯ | `ChevronRight` | Breadcrumbs, menu items, next buttons |
| ← | `ArrowLeft` | Back buttons, previous navigation |
| → | `ArrowRight` | Next buttons, call-to-action, process steps |
| ☰ | `Menu` | Mobile menu toggle, navigation drawer |
| ✕ | `X` | Close buttons, clear inputs, dismiss modals |
| 🏠 | `Home` | Homepage links, breadcrumb home |
| ↗ | `ExternalLink` | External URLs, new tab links |

### Action Icons (10)
| Icon | Component | Usage |
|------|-----------|-------|
| 🔍 | `Search` | Search bars, search buttons, find features |
| 🎛 | `Filter` | Filter controls, search filters, data filtering |
| ⬇ | `Download` | Download buttons, export data, save files |
| 📋 | `Copy` | Copy buttons, copy to clipboard, share links |
| ↻ | `RefreshCw` | Refresh buttons, reload data, retry actions |
| ✓ | `Check` | Success indicators, completed tasks, selected items |
| ✓○ | `CheckCircle` | Success messages, completed status, verified items |
| ✕○ | `XCircle` | Error messages, failed status, rejected items |
| 👁 | `Eye` | Show password, view details, preview content |
| 👁⃠ | `EyeOff` | Hide password, hide details, privacy mode |

### Status Icons (10)
| Icon | Component | Usage |
|------|-----------|-------|
| ⚠ | `AlertTriangle` | Warning messages, error alerts, caution indicators |
| 🐛 | `Bug` | Error reporting, bug reports, issue tracking |
| 💥 | `ServerCrash` | Server errors, system failures, critical errors |
| 📶 | `Wifi` | Network status, connection indicators, online status |
| 📵 | `WifiOff` | No connection, offline status, network errors |
| 🕐 | `Clock` | Timestamps, duration, schedule, pending status |
| 📈 | `TrendingUp` | Analytics, growth indicators, positive trends |
| ↑ | `ArrowUp` | Increase values, positive change, sort ascending |
| ↓ | `ArrowDown` | Decrease values, negative change, sort descending |
| − | `Minus` | No change, neutral status, remove items |

### Security Icons (4)
| Icon | Component | Usage |
|------|-----------|-------|
| 🛡 | `Shield` | Security features, protection indicators, trust badges |
| 🛡✓ | `ShieldCheck` | Security verification, trust indicators, protection confirmed |
| 🔒 | `Lock` | Secure features, private content, authentication |
| 🗝 | `KeyRound` | Authentication, API keys, access control |

### Business Icons (2)
| Icon | Component | Usage |
|------|-----------|-------|
| 👛 | `Wallet` | Payment methods, wallet connections, financial features |
| 💲 | `DollarSign` | Pricing, cost indicators, financial metrics |

### Communication Icons (2)
| Icon | Component | Usage |
|------|-----------|-------|
| ✉ | `Mail` | Email links, contact information, newsletter signup |
| 📞 | `Phone` | Phone numbers, contact information, support calls |

### Analytics Icons (3)
| Icon | Component | Usage |
|------|-----------|-------|
| 📊 | `BarChart3` | Analytics dashboards, data charts, statistics |
| 📈 | `LineChart` | Trend analysis, time series data, performance charts |
| 📅 | `Calendar` | Date pickers, schedule, event dates |

### UI Icons (4)
| Icon | Component | Usage |
|------|-----------|-------|
| ☀ | `Sun` | Light mode toggle, theme switcher, bright theme |
| 🌙 | `Moon` | Dark mode toggle, theme switcher, night theme |
| 🖥 | `Monitor` | System theme, auto theme, device theme |
| ○ | `Circle` | Bullet points, status indicators, radio buttons |

### Technology Icons (3)
| Icon | Component | Usage |
|------|-----------|-------|
| 🌐 | `Globe` | Web features, global reach, international |
| 🧠 | `Brain` | AI features, smart technology, machine learning |
| 🔗 | `Link2` | Link sharing, connections, relationships |

### File Icons (2)
| Icon | Component | Usage |
|------|-----------|-------|
| 📄✕ | `FileX` | File not found, missing files, file errors |

## 🛠️ Best Practices

### Accessibility
- Always provide descriptive `aria-label` attributes for standalone icons
- Use `aria-hidden="true"` for decorative icons
- Ensure sufficient color contrast (3:1 minimum)
- Consider providing text alternatives for important icons

### Performance
- Import only the icons you need to reduce bundle size
- Use the icon registry for dynamic icon selection
- Consider lazy loading for large icon collections

### Consistency
- Use consistent sizing throughout your application
- Follow established color patterns for status indicators
- Maintain consistent stroke widths within related components
- Group related icons using similar visual styling

### Responsive Design
- Scale icons appropriately for different screen sizes
- Consider touch targets for mobile interfaces (minimum 44px)
- Test icon visibility across different themes

---

**Last Updated**: October 2025  
**Maintained by**: SafeTrust Development Team  
**Library Version**: Lucide React (Latest)