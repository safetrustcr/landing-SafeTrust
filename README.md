![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/safetrustcr/landing-SafeTrust?utm_source=oss&utm_medium=github&utm_campaign=safetrustcr%2Flanding-SafeTrust&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

# 🌐 SafeTrust - Landing Page

Welcome to the **SafeTrust** landing page repository. This repo contains two landing page implementations:

- **Root directory** — the original Next.js landing page (legacy, kept for reference)
- **`ST-Landing-Page/`** — the new Astro-based landing page, currently under active development
- https://github.com/safetrustcr/landing-SafeTrust/tree/new-lp/ST-Landing-Page(new%20one)


> 🚧 **Migration in progress:** All sections and components from the original Next.js landing page are being rebuilt and migrated into the new Astro implementation under `ST-Landing-Page/`. The Astro version will become the canonical landing page once the migration is complete.

---

## 🛠️ Technology Stack

### New Astro Landing Page (`ST-Landing-Page/`)

- **Astro** v5 — static-first framework with island architecture; most content is server-rendered HTML with zero JS by default
- **React** — used only for interactive islands (`client:visible` / `client:load`) such as the wallet CTA, escrow card, and animated stepper
- **Motion** — scroll-driven and inView animations for the How It Works stepper
- **astro-icon** + **Lucide** — icon system
- **TypeScript** — type safety across `.tsx` islands
- **CSS** — component-scoped stylesheets (no Tailwind in the Astro version)

### Original Next.js Landing Page (legacy)

- **Next.js** v14.2.15, **React** v18.3.1, **Tailwind CSS** v3.4.14, **TypeScript** v5.6.3

---

## 🚀 Getting Started — Astro Landing Page

### Prerequisites
- Node.js >= 18

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/safetrustcr/landing-SafeTrust.git
cd landing-SafeTrust
```

### 2️⃣ Add Upstream Remote

```bash
git remote add upstream https://github.com/safetrustcr/landing-SafeTrust.git
```

### 3️⃣ Switch to the active branch

```bash
git checkout new-lp
cd ST-Landing-Page
```

### 4️⃣ Install Dependencies

```bash
npm install
```

### 5️⃣ Start the Development Server

```bash
# Local only
npm run dev

# Expose on local network (for mobile testing)
npm run dev -- --host
```

Dev server runs at `http://localhost:4321/`.

### 6️⃣ Build & Preview

```bash
npm run build
npm run preview
```

---

## 🔄 Migration Status

The table below tracks which sections have been ported from the original Next.js landing to the new Astro implementation.

| Section | Original (Next.js) | Astro Status |
|---|---|---|
| Navbar | ✅ | ✅ Migrated |
| Hero Section | ✅ | ✅ Migrated |
| Live Escrow Card | ✅ | ✅ Migrated (React island) |
| Our Promise | ✅ | ✅ Migrated |
| Connect Wallet CTA | ✅ | ✅ Migrated (React island) |
| Discover SafeTrust | ✅ | ✅ Migrated |
| Key Benefits + Category Tabs | ✅ | ✅ Migrated (React island) |
| How It Works Stepper | ✅ | ✅ Migrated (React island) |
| Security Section | ✅ | ✅ Migrated |
| Final CTA | ✅ | ✅ Migrated |
| Footer | ✅ | ✅ Migrated |
| Analytics Dashboard | ✅ | ⛔ Removed — moved to `dApp-SafeTrust` |

---

## 🔍 About SafeTrust

**SafeTrust** is a decentralized P2P escrow platform built on the **Stellar blockchain** via the **TrustlessWork API**, targeting the tourism and hospitality sector. It brings security and transparency to booking and rental transactions without relying on intermediaries.

### 🔒 How It Works

1. **Secure Deposits** — Funds are locked into a smart-contract escrow on booking. Not in a database, not in a bank — in code.
2. **Transaction Safety** — Funds are held on-chain while the stay or service is active. Released only on dual consent (2/2 signature).
3. **Dispute Resolution** — Transparent, on-chain arbitration with verifiable evidence ensures fair outcomes.

### 🌟 Why SafeTrust?

- **🔐 Security** — Soroban smart contracts on Stellar mainnet; tamper-proof and immutable.
- **🌈 Transparency** — Every transaction is verifiable on-chain.
- **🌍 Decentralized Trust** — No intermediaries required.
- **⚙️ Automation** — From deposit to release, the escrow lifecycle is fully automated.

---

## 📜 License

© 2026 SafeTrust. Released under the [MIT License](https://opensource.org/license/MIT).
