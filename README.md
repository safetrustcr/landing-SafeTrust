![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/safetrustcr/landing-SafeTrust?utm_source=oss&utm_medium=github&utm_campaign=safetrustcr%2Flanding-SafeTrust&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

#  🪐🚀 SafeTrust - Landing Page (Astro) 

This is the new version of the **SafeTrust** landing page, rebuilt with **Astro** for better performance, smaller bundle sizes, and easier component-level migration from the previous Next.js implementation.

## 🛠️ Technology Stack

- **Astro** – fast, content-focused static site framework with island architecture
- **React** – used for interactive components via `@astrojs/react`
- **CSS** – component-scoped stylesheets

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18

### Installation

```bash
cd ST-Landing-Page
npm install

# Install the React integration (if not already installed)
npm install @astrojs/react react react-dom
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
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ConnectWalletCTA.tsx
│   ├── Features/
│   │   ├── CategoryTabs.jsx
│   │   └── KeyBenefits.astro
│   ├── OurPromise.astro
│   ├── SecurityCard.astro
│   ├── SecuritySection.astro
│   └── Stepper.jsx
├── pages/
│   └── index.astro
└── styles/
    ├── KeyBenefits.css
    ├── our-promise.css
    ├── security.css
    └── stepper.css
```

## 🔄 Migration Notes

This project is an in-progress migration of the original Next.js landing page to Astro. Components are being ported incrementally:

- Static/presentational sections → `.astro` components (e.g. `OurPromise`, `SecuritySection`, `SecurityCard`)
- Interactive elements → React components hydrated as islands (e.g. `ConnectWalletCTA`, `Stepper`, `CategoryTabs`)

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

