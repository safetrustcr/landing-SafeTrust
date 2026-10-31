#  🪐🚀 SafeTrust - Landing Page (Astro)

This is the new version of the **SafeTrust** landing page, rebuilt with **Astro** for better performance, smaller bundle sizes, and easier component-level migration from the previous Next.js implementation.

## 🛠️ Technology Stack

| Tool | Purpose |
| --- | --- |
| **Astro 5** | Static site framework with island architecture |
| **React 19** (`@astrojs/react`) | Interactive islands (wallet CTA, escrow card, tabs, stepper) |
| **Motion** (`motion`) | Scroll / hover / spring animations in the How It Works stepper |
| **astro-icon** + `@iconify-json/lucide` | Lucide icons inside `.astro` components (allow-listed in `astro.config.mjs`) |
| **lucide-react** | Lucide icons inside React components |
| **@stellar/freighter-api** | Connects the visitor's Freighter (Stellar) wallet |
| **CSS** | Design tokens in `theme.css` + per-section stylesheets / scoped `<style>` blocks |

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.20.8 (required by Astro 5)

### Installation

```bash
cd landing-SafeTrust
npm install
```

### Environment variables (optional)

| Variable | Used by | Description |
| --- | --- | --- |
| `GITHUB_TOKEN` | `Contributors.astro` | Contributors are fetched from the GitHub API at build time. A token avoids the unauthenticated rate limit (60 req/h). Without it the section still renders, it just may come back empty. |

```bash
# landing-SafeTrust/.env
GITHUB_TOKEN=ghp_xxx
```

### Development

```bash
# Start the dev server (default: http://localhost:4321)
npm run dev

# To use a different port:
npm run dev -- --port 3000
```

### Build & Preview

```bash
npm run build     # outputs static site to dist/
npm run preview
```

## 📁 Project Structure

```
landing-SafeTrust/
├── astro.config.mjs              # React + astro-icon integrations, Lucide icon allow-list
├── package.json
├── public/
│   ├── landing-logo.jpeg         # favicon
│   └── landing-logo-Photoroom.png
└── src/
    ├── env.d.ts
    ├── pages/
    │   └── index.astro           # the landing page (assembles every section)
    ├── components/
    │   ├── Navbar.astro
    │   ├── ThemeToggle.astro
    │   ├── Hero/
    │   │   ├── HeroSection.astro
    │   │   ├── CTAButtons.astro
    │   │   ├── TrustBadges.astro
    │   │   └── EscrowCard.tsx            ⚛ island
    │   ├── OurPromise.astro
    │   ├── ConnectWalletCTA.tsx          ⚛ island
    │   ├── Features/
    │   │   ├── DiscoverSafeTrust.astro
    │   │   ├── KeyBenefits.astro
    │   │   └── CategoryTabs.jsx          ⚛ island
    │   ├── HowItWorks/
    │   │   ├── HowItWorksSection.astro
    │   │   └── Stepper.jsx               ⚛ island
    │   ├── SecuritySection.astro
    │   ├── SecurityCard.astro
    │   ├── Contributors.astro
    │   ├── FinalCTA.astro
    │   └── Footer.astro
    └── styles/
        ├── theme.css             # global design tokens (light / dark)
        ├── escrow-card.css
        ├── our-promise.css
        ├── KeyBenefits.css
        ├── stepper.css
        ├── security.css
        ├── contributors.css
        ├── hero.css              # not imported yet
        └── footer.css            # empty, Footer uses a scoped <style>
```

### Page composition

`src/pages/index.astro` renders the sections top-to-bottom in this order:

1. `HeroSection` – Navbar, headline, CTA buttons, trust badges and the animated `EscrowCard`
2. `OurPromise` – guarantees, badges and the `ConnectWalletCTA`
3. `DiscoverSafeTrust` – feature overview
4. `KeyBenefits` – filterable benefits grid (`CategoryTabs`)
5. `HowItWorksSection` – animated `Stepper`
6. `SecuritySection` – three `SecurityCard`s
7. `Contributors` – GitHub contributors (fetched at build time)
8. `FinalCTA`
9. `Footer`

### Interactive islands

Everything is static HTML by default. Only these components ship JavaScript to the browser:

| Component | Directive | What it does |
| --- | --- | --- |
| `Hero/EscrowCard.tsx` | `client:visible` | Animated escrow progress / transaction preview |
| `ConnectWalletCTA.tsx` | `client:visible` | Connects a Freighter wallet (`idle → connecting → connected`) |
| `Features/CategoryTabs.jsx` | `client:load` | Category filter tabs for the benefits grid |
| `HowItWorks/Stepper.jsx` | `client:load` | Step transitions + progress fill using `motion` |

`ThemeToggle.astro` uses a plain `<script>` (no framework) to switch Light / Dark / System. The choice is stored in `localStorage` under `theme`. An inline script in `index.astro` applies it as the `dark` class on `<html>` before first paint, so the page never flashes the wrong theme.

## ⚛️ Atomic Design

UI components follow **Atomic Design**: small, reusable pieces are composed into bigger ones, and the page only assembles sections. The table below maps each existing component to its level.

| Level | Responsibility | Components |
| --- | --- | --- |
| **Tokens** (sub-atomic) | Colors, surfaces and shadows as CSS custom properties, with light and dark values | `styles/theme.css` |
| **Atoms** | Smallest UI building blocks with no meaningful sub-parts | `Icon` (astro-icon / lucide-react), `ThemeToggle` |
| **Molecules** | A few atoms combined into one focused unit | `Hero/CTAButtons`, `Hero/TrustBadges`, `SecurityCard`, `ConnectWalletCTA` |
| **Organisms** | Self-contained sections or complex widgets built from molecules and atoms | `Navbar`, `Hero/EscrowCard`, `Features/CategoryTabs`, `HowItWorks/Stepper`, `Hero/HeroSection`, `OurPromise`, `Features/DiscoverSafeTrust`, `Features/KeyBenefits`, `HowItWorks/HowItWorksSection`, `SecuritySection`, `Contributors`, `FinalCTA`, `Footer` |
| **Templates** | Page skeleton: `<html>`, `<head>`, theme bootstrap, slots | *Currently inline in `index.astro`. Extract to `src/layouts/` when a second page is added.* |
| **Pages** | Concrete page that fills a template with sections | `pages/index.astro` |

Examples of the hierarchy in practice:

```
index.astro (page)
├── HeroSection (organism)
│   ├── Navbar (organism)
│   │   └── ThemeToggle (atom) → Icon (atom)
│   ├── CTAButtons (molecule)
│   ├── TrustBadges (molecule) → Icon (atom)
│   └── EscrowCard ⚛ (organism)
└── SecuritySection (organism)
    └── SecurityCard ×3 (molecule)
```

### Guidelines for new components

- **Pick the level first.** If it renders a single element (button, badge, icon), it is an atom. If it combines a few atoms around one purpose, it is a molecule. If it is a full page section or a complex widget, it is an organism.
- **Compose downward only.** A component may use components from its own level or lower levels, never higher ones.
- **Atoms and molecules are presentational.** Pass data in via `Props` (see `SecurityCard`). Keep content arrays and fetching in organisms.
- **Default to `.astro`.** Use a React island only when the component needs client-side state or browser APIs. Prefer `client:visible` over `client:load` for anything below the fold.
- **Use tokens, not hex values.** Read colors from `var(--…)` in `theme.css` so dark mode works automatically.
- **Group by section.** Section-specific parts live in that section's folder (`Hero/`, `Features/`, `HowItWorks/`). Shared atoms and molecules sit at the top level of `components/`.
- **New Lucide icons** used through `astro-icon` must be added to the allow-list in `astro.config.mjs`.

## 🔄 Migration Notes

This project is an in-progress migration of the original Next.js landing page to Astro. Components are being ported incrementally:

- Static/presentational sections → `.astro` components (e.g. `OurPromise`, `SecuritySection`, `SecurityCard`, `Footer`)
- Interactive elements → React components hydrated as islands (e.g. `ConnectWalletCTA`, `EscrowCard`, `Stepper`, `CategoryTabs`)

## 🤝 Contributing

- Branch from `new-lp` and open your PR against it. PRs are reviewed by CodeRabbit.
- Make **atomic commits**: each commit holds one logical change with a clear message (e.g. `feat(stepper): add progress fill animation`, `fix: contributor cards layout`).
- Reference the issue you are closing in the PR description (`Closes #123`).

## 🔍 About SafeTrust

**SafeTrust** is a decentralized P2P escrow platform that brings security and transparency to booking and rental transactions. Built on the **Stellar blockchain** via the **TrustlessWork API**, SafeTrust protects both parties in a transaction without relying on intermediaries.

### 🔒 How It Works

1. **Secure Deposits** – Funds are held in a smart contract-based escrow until agreed conditions are met.
2. **Transaction Safety** – Once conditions are verified (no disputes, terms fulfilled), funds are released transparently through SafeTrust.
3. **Dispute Resolution** – Transparent, predefined rules govern dispute handling for fair outcomes.

### 🌟 Why SafeTrust?

- **🔐 Security** – Blockchain-backed escrow ensures funds are tamper-proof.
- **🌈 Transparency** – Every transaction is verifiable on-chain.
- **🌍 Decentralized Trust** – No intermediaries required.
- **⚙️ Automation** – From deposits to releases, the process is automated end-to-end.

### 🌠 Astro Docs:
Docs: https://astro.build/

## 📜 License

© 2026 SafeTrust. Released under the [MIT License](https://opensource.org/license/MIT).
