import React from "react";
import {
  Lock,
  Zap,
  Globe,
  BarChart3,
  Scale,
  Wallet,
  ShieldCheck,
  Coins,
} from "lucide-react";

export const FEATURE_CATEGORIES = ["all", "security", "payments", "trust"] as const;
export type FeatureCategory = (typeof FEATURE_CATEGORIES)[number];

export interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  cta?: string;
  link?: string;
  category?: FeatureCategory;
}

const featuresData: Feature[] = [
  {
    id: "secure-escrow",
    icon: <Lock className="w-6 h-6" aria-hidden />,
    title: "Secure Escrow",
    description: "Hold deposits safely in blockchain",
    details:
      "Funds are held in smart contracts until conditions are met. No party can withdraw without agreement, reducing fraud and disputes.",
    cta: "Read more",
    link: "/features/secure-escrow",
    category: "security",
  },
  {
    id: "instant-transactions",
    icon: <Zap className="w-6 h-6" aria-hidden />,
    title: "Instant Transactions",
    description: "Fast, reliable, transparent payments",
    details:
      "Blockchain settlement removes banking delays. Payments confirm in minutes with full transparency for both parties.",
    cta: "Read more",
    link: "/features/instant-transactions",
    category: "payments",
  },
  {
    id: "decentralized-trust",
    icon: <Globe className="w-6 h-6" aria-hidden />,
    title: "Decentralized Trust",
    description: "No intermediaries needed",
    details:
      "Smart contracts enforce terms automatically. No need for a central custodian; the protocol secures the transaction.",
    cta: "Read more",
    link: "/features/decentralized-trust",
    category: "trust",
  },
  {
    id: "real-time-tracking",
    icon: <BarChart3 className="w-6 h-6" aria-hidden />,
    title: "Real-Time Tracking",
    description: "Monitor rentals in real-time",
    details:
      "Track deposit status, milestones, and release conditions in one dashboard. Get alerts when actions are required.",
    cta: "Read more",
    link: "/features/real-time-tracking",
    category: "trust",
  },
  {
    id: "fair-dispute-resolution",
    icon: <Scale className="w-6 h-6" aria-hidden />,
    title: "Fair Dispute Resolution",
    description: "Transparent arbitration process",
    details:
      "Disputes are resolved through documented evidence and optional third-party arbitrators. All steps are visible on-chain.",
    cta: "Read more",
    link: "/features/dispute-resolution",
    category: "trust",
  },
  {
    id: "cost-efficient",
    icon: <Wallet className="w-6 h-6" aria-hidden />,
    title: "Cost Efficient",
    description: "Lower fees than traditional services",
    details:
      "Cut out middlemen and banking fees. Pay only network and protocol fees, often a fraction of traditional escrow costs.",
    cta: "Read more",
    link: "/features/cost-efficient",
    category: "payments",
  },
  {
    id: "enhanced-security",
    icon: <ShieldCheck className="w-6 h-6" aria-hidden />,
    title: "Enhanced Security",
    description: "Military-grade encryption",
    details:
      "Funds and data are protected by industry-standard encryption and audited smart contracts.",
    cta: "Read more",
    link: "/features/security",
    category: "security",
  },
  {
    id: "multi-currency",
    icon: <Coins className="w-6 h-6" aria-hidden />,
    title: "Multi-Currency Support",
    description: "Accept payments in any token",
    details:
      "Support multiple cryptocurrencies and stablecoins. Choose the asset that fits your market and compliance needs.",
    cta: "Read more",
    link: "/features/multi-currency",
    category: "payments",
  },
];

export default featuresData;
