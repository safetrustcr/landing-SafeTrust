# SafeTrust - Developer Quick Reference

Quick reference guide for common tasks and commands in the SafeTrust project.

## 🚀 Quick Commands

```bash
# Development
npm run dev                    # Start Next.js (localhost:3000)
npm run storybook              # Start Storybook (localhost:6006)

# Code Quality
npm run lint                   # Check linting
npm run lint:fix               # Fix linting issues
npm run type-check             # TypeScript check
npm run format                 # Format code

# Testing
npm test                       # Run all tests
npm run test:watch             # Watch mode
npm run test:coverage          # Coverage report

# Build
npm run build                  # Production build
npm run build-storybook        # Build Storybook

# Git
npm run prepare                # Setup hooks
```

## 📁 File Locations

```
Key Files:
├── src/components/ui/        # Reusable UI components
├── src/components/features/  # Feature components
├── src/stories/              # Storybook stories
├── src/hooks/                # Custom React hooks
├── docs/                     # Documentation
│   ├── DEVELOPMENT.md       # Development guide
│   ├── COMPONENTS.md        # Component docs
│   └── CONTRIBUTING.md      # Contribution guide
├── .storybook/              # Storybook config
├── eslint.config.js         # ESLint rules
├── .prettierrc              # Prettier config
└── jest.setup.js            # Jest config
```

## 🎨 Component Template

```typescript
// src/components/ui/ComponentName.tsx
import { FC } from 'react';

interface ComponentNameProps {
  /** Prop description */
  prop1: string;
  prop2?: number;
}

export const ComponentName: FC<ComponentNameProps> = ({ 
  prop1, 
  prop2 = 0 
}) => {
  return (
    <div className="component-class">
      {/* Component content */}
    </div>
  );
};
```

## 📖 Story Template

```typescript
// src/stories/ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@/components/ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prop1: 'value',
  },
};
```

## 🧪 Test Template

```typescript
// src/components/ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName prop1="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
```

## 🎯 Commit Messages

```bash
feat: add new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code refactoring
perf: performance
test: tests
chore: maintenance
```

## 🎨 Tailwind Classes

Common patterns:
```tsx
// Buttons
className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"

// Cards
className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"

// Containers
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

// Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Flex
className="flex items-center justify-between"
```

## 🔧 Common Tasks

### Add New Component

```bash
# 1. Create component
touch src/components/ui/NewComponent.tsx

# 2. Create story
touch src/stories/NewComponent.stories.tsx

# 3. Create test
touch src/components/ui/NewComponent.test.tsx

# 4. Start Storybook
npm run storybook
```

### Fix Linting Issues

```bash
npm run lint:fix
npm run format
```

### Run Tests for Changed Files

```bash
npm run test:staged
```

### Update Dependencies

```bash
npm outdated
npm update
npm audit fix
```

## 🐛 Troubleshooting

### Clear Caches

```bash
# Next.js
rm -rf .next

# Node modules
rm -rf node_modules package-lock.json
npm install

# Jest
npm test -- --clearCache

# Storybook
rm -rf node_modules/.cache/storybook
```

### Fix Git Hooks

```bash
rm -rf .husky
npm run prepare
chmod +x .husky/pre-commit
```

### Reset TypeScript

```bash
rm -rf .next
npm run type-check
```

## 📊 Coverage Thresholds

```
Minimum coverage: 70%
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%
```

## ♿ Accessibility Checklist

- [ ] Semantic HTML
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Color contrast (4.5:1)
- [ ] Focus indicators
- [ ] Alt text for images

## 🔍 Code Review Checklist

- [ ] Linting passes
- [ ] Tests pass
- [ ] Types correct
- [ ] Documentation updated
- [ ] Storybook story added
- [ ] Accessibility checked
- [ ] Performance considered
- [ ] Security reviewed

## 📚 Documentation Links

- [Development Guide](./docs/DEVELOPMENT.md)
- [Component Docs](./docs/COMPONENTS.md)
- [Contributing Guide](./docs/CONTRIBUTING.md)
- [Setup Guide](./SETUP.md)

## 🔗 External Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Storybook](https://storybook.js.org/docs)
- [Testing Library](https://testing-library.com/)

## 💡 Pro Tips

1. **Use Storybook first** - Build components in isolation
2. **Write tests early** - Don't wait until the end
3. **Commit often** - Small, focused commits
4. **Read error messages** - They usually tell you what's wrong
5. **Ask for help** - Check docs, then ask the team

## 🎯 Performance Tips

```typescript
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});

// Use useMemo for expensive calculations
const result = useMemo(() => expensiveCalc(data), [data]);

// Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);

// Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

## 🔐 Security Reminders

- Never commit private keys
- Never commit .env files
- Validate all user inputs
- Sanitize data before rendering
- Use environment variables for sensitive data
- Keep dependencies updated

## 📞 Get Help

1. Check this reference first
2. Read relevant documentation
3. Search GitHub issues
4. Ask in team chat
5. Create GitHub issue

---

**Keep this guide handy for quick reference while developing!**