# SafeTrust Development Tools Setup Guide

Complete guide for setting up the development environment, tools, and workflows for the SafeTrust project.

## 📋 Quick Start

```bash
# 1. fork, Clone and install
git fork https://github.com/safetrustcr/landing-SafeTrust
git clone https://github.com/your-github-username/landing-SafeTrust
cd landing-SafeTrust
npm install

# 2. Set up Git hooks
npm run prepare

# 3. Start development
npm run dev          # Start Next.js dev server
npm run storybook    # Start Storybook (in another terminal)
```

## 🛠️ Installation Steps

### Step 1: Install Core Dependencies

```bash
npm install
```

This installs:
- Next.js 15.1.7
- React 19.0.0 
- tailwind-merge 3.3.1
- tailwindcss-animate 1.0.7


### Step 2: Install Development Tools

Development dependencies are already in `package.json`. They include:

**Testing Tools:**
- Jest & Testing Library
- Jest DOM
- User Event

**Code Quality:**
- ESLint & plugins
- Prettier
- Husky
- Lint-staged

**Storybook:**
- Storybook for Next.js
- Accessibility addon
- Coverage addon
- Interactions addon

### Step 3: Set Up Git Hooks

```bash
npm run prepare
```

This sets up Husky to run pre-commit checks automatically.



## 📦 File Structure

After setup, your project should have these files:

```
landing-SafeTrust/
├── .husky/
│   ├── _/
│   └── pre-commit              # ✅ Created
├── .storybook/
│   ├── main.js                 # ✅ Created
│   └── preview.js              # ✅ Created
├── docs/
│   ├── COMPONENTS.md           # ✅ Created
│   ├── CONTRIBUTING.md         # ✅ Created
│   └── DEVELOPMENT.md          # ✅ Created
├── src/
│   ├── app/
│   ├── components/
│   └── stories/
│       ├── Button.stories.tsx  # ✅ Created
│       └── Card.stories.tsx    # ✅ Created
├── .eslintrc.json              # Update to eslint.config.js
├── .prettierrc                 # ✅ Created
├── .prettierignore             # ✅ Created
├── eslint.config.js            # ✅ Created
├── jest.config.js              # ✅ Add to package.json
├── jest.setup.js               # ✅ Created
├── package.json                # ✅ Updated with scripts
└── tsconfig.json               # ✅ Created/Updated
```

## 🔧 Configuration Files Explained

### 1. Storybook Configuration

**`.storybook/main.js`**
- Configures Storybook for Next.js
- Enables TypeScript support
- Sets up addons (a11y, coverage, interactions)
- Configures path aliases

**`.storybook/preview.js`**
- Imports global styles
- Configures themes and viewports
- Sets up backgrounds
- Defines global parameters

### 2. ESLint Configuration

**`eslint.config.js`**
- TypeScript rules
- React & React Hooks rules
- Accessibility rules (jsx-a11y)
- Next.js specific rules
- Custom project rules

### 3. Prettier Configuration

**`.prettierrc`**
- Code formatting rules
- Consistent style across team
- Integrates with ESLint

### 4. Jest Configuration

**`jest.setup.js`**
- Sets up testing environment
- Mocks Next.js components
- Mocks Web3 providers
- Configures test utilities

### 5. Git Hooks

**`.husky/pre-commit`**
- Runs linting
- Runs type checking
- Runs tests on staged files
- Prevents bad commits

## 🚀 Development Workflow

### Starting Development

```bash
# Terminal 1: Next.js development server
npm run dev
# Opens at http://localhost:3000

# Terminal 2: Storybook
npm run storybook
# Opens at http://localhost:6006
```

### Before Committing

Git hooks will automatically run, but you can also run manually:

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check

# Format code
npm run format

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Creating Components

1. **Create Component File**

```bash
src/components/ui/NewComponent.tsx
```

2. **Create Story File**

```bash
src/stories/NewComponent.stories.tsx
```

3. **Create Test File**

```bash
src/components/ui/NewComponent.test.tsx
```

4. **Verify in Storybook**

```bash
npm run storybook
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (for development)
npm run test:watch

# Coverage report
npm run test:coverage

# Test specific file
npm test -- NewComponent.test.tsx
```

## 🎨 Storybook Usage

### Viewing Components

1. Start Storybook: `npm run storybook`
2. Navigate to http://localhost:6006
3. Browse components in the sidebar
4. Test different props and states
5. View accessibility report
6. Check documentation

### Creating Stories

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prop1: 'value',
  },
};
```

### Building Storybook

```bash
# Build static Storybook
npm run build-storybook

# Output directory: storybook-static/
```

## 🧪 Testing Setup

### Test Structure

```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles interactions', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    
    render(<Component onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Coverage Reports

After running `npm run test:coverage`:

```
View coverage report at: coverage/lcov-report/index.html
```

Coverage thresholds (set in package.json):
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## 🔍 Code Quality Tools

### ESLint

```bash
# Check for linting errors
npm run lint

# Automatically fix errors
npm run lint:fix
```

Common rules:
- No console.logs (except warn/error)
- No unused variables
- Explicit TypeScript types
- Proper React hooks usage
- Accessibility requirements

### Prettier

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

Prettier runs automatically:
- On save (if configured in your IDE)
- In pre-commit hook
- Via lint-staged

### TypeScript

```bash
# Type check entire project
npm run type-check
```

Strict mode enabled:
- No implicit any
- Strict null checks
- Strict function types
- No unused locals

## 🔄 Git Workflow

### Branch Strategy

```
main (production)
  └── develop (integration)
      ├── feature/wallet-connection
      ├── feature/smart-contracts
      ├── fix/transaction-bug
      └── refactor/optimize-rendering
```

### Commit Messages

Follow conventional commits:

```bash
feat: add wallet connection feature
fix: resolve transaction confirmation bug
docs: update component documentation
style: format code with prettier
refactor: optimize contract calls
perf: improve rendering performance
test: add wallet connection tests
chore: update dependencies
```

### Pre-commit Checks

Automatically runs:
1. ✅ ESLint on staged files
2. ✅ Prettier formatting
3. ✅ TypeScript type checking
4. ✅ Jest tests on related files

If any check fails, the commit is blocked.

## 📝 Documentation

### Component Documentation

Every component should have:
- JSDoc comments
- Props interface with descriptions
- Usage examples
- Storybook story
- Unit tests

### Keeping Docs Updated

When you:
- Add a component → Update COMPONENTS.md
- Change workflow → Update DEVELOPMENT.md
- Fix bugs → Update CONTRIBUTING.md

## 🐛 Troubleshooting

### Common Issues

**1. Husky hooks not running**

```bash
# Reinstall Husky
rm -rf .husky
npm run prepare
```

**2. ESLint errors in node_modules**

```bash
# Clear cache
rm -rf node_modules .next
npm install
```

**3. Storybook build fails**

```bash
# Clear Storybook cache
rm -rf node_modules/.cache/storybook
npm run storybook
```

**4. Tests failing**

```bash
# Clear Jest cache
npm test -- --clearCache
npm test
```

**5. TypeScript errors**

```bash
# Rebuild TypeScript
rm -rf .next
npm run type-check
```

### Getting Help

1. Check documentation in `docs/`
2. Search existing GitHub issues
3. Ask in GitHub Discussions
4. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details



## 📊 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix linting issues |
| `npm run type-check` | Run TypeScript check |
| `npm run format` | Format with Prettier |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build static Storybook |
| `npm run prepare` | Install Git hooks |

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm run dev` starts without errors
- [ ] `npm run storybook` opens Storybook
- [ ] `npm test` passes all tests
- [ ] `npm run lint` shows no errors
- [ ] `npm run type-check` passes
- [ ] Git hooks work (try committing)
- [ ] Components appear in Storybook
- [ ] Tests run on file save
- [ ] Hot reload works

## 🎓 Next Steps

1. Read [DEVELOPMENT.md](./DEVELOPMENT.md) for coding guidelines
2. Review [COMPONENTS.md](./COMPONENTS.md) for component patterns
3. Check [CONTRIBUTING.md](./CONTRIBUTORS_GUIDELINE.md) for contribution process
4. Explore Storybook to see existing components
5. Write your first component with tests and stories!

## 📞 Support

Need help? Contact:
- GitHub Issues: https://github.com/safetrustcr/landing-SafeTrust/issues
