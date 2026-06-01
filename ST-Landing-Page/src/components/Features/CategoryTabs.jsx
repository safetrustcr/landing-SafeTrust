import React, { useState, useMemo } from "react";
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

const CATEGORIES = ["all", "security", "payments", "trust"];
const TAB_LABELS = {
  all: "All",
  security: "Security",
  payments: "Payments",
  trust: "Trust",
};

const FEATURES_DATA = [
  {
    id: "secure-escrow",
    num: "01/08",
    icon: <Lock className="icon-element" />,
    title: "Secure escrow, held by code.",
    desc: "Deposits locked in Soroban smart contracts on Stellar mainnet — verifiable, immutable, and impossible to seize.",
    valueSecured: "$50.2M+",
    category: "security",
  },
  {
    id: "instant-transactions",
    num: "02",
    icon: <Zap className="icon-element" />,
    title: "Instant transactions",
    desc: "Fast, reliable, transparent payments.",
    category: "payments",
  },
  {
    id: "decentralized-trust",
    num: "03",
    icon: <Globe className="icon-element" />,
    title: "Decentralized trust",
    desc: "No intermediaries needed.",
    category: "trust",
  },
  {
    id: "real-time-tracking",
    num: "04",
    icon: <BarChart3 className="icon-element" />,
    title: "Real-time tracking",
    desc: "Monitor rentals in real-time.",
    category: "trust",
  },
  {
    id: "fair-dispute-resolution",
    num: "05",
    icon: <Scale className="icon-element" />,
    title: "Fair dispute resolution",
    desc: "Transparent arbitration process.",
    category: "trust",
  },
  {
    id: "cost-efficient",
    num: "06",
    icon: <Wallet className="icon-element" />,
    title: "Cost efficient",
    desc: "Lower fees than traditional services.",
    category: "payments",
  },
  {
    id: "enhanced-security",
    num: "07",
    icon: <ShieldCheck className="icon-element" />,
    title: "Enhanced security",
    desc: "Military-grade encryption.",
    category: "security",
  },
  {
    id: "multi-currency",
    num: "08",
    icon: <Coins className="icon-element" />,
    title: "Multi-currency",
    desc: "Accept payments in any token.",
    category: "payments",
  },
];

export default function InteractiveFeatures() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredFeatures = useMemo(() => {
    if (activeTab === "all") return FEATURES_DATA;
    return FEATURES_DATA.filter((f) => f.category === activeTab);
  }, [activeTab]);

  return (
    <div className="features-island-container">
      {/* Dynamic Tab Switcher */}
      <div
        className="tabs-wrapper"
        role="tablist"
        aria-label="Feature categories"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeTab === cat}
            className={`tab-btn ${activeTab === cat ? "tab-active" : ""}`}
            onClick={() => setActiveTab(cat)}
          >
            {TAB_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Grid Mechanic Display */}
      <div className="benefits-grid" role="list">
        {filteredFeatures.map((feature) => (
          <article
            key={feature.id}
            className={`benefit-card ${feature.id === "secure-escrow" ? "lead-card" : ""}`}
            role="listitem"
          >
            <div className="card-top-bar">
              <div className="icon-box">{feature.icon}</div>
              <span class="card-number">{feature.num}</span>
            </div>

            <div className="card-body">
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-desc">{feature.desc}</p>
            </div>

            {feature.valueSecured && (
              <div className="card-footer">
                <div className="divider-line" />
                <div className="footer-metrics">
                  <span className="metrics-label">VALUE SECURED</span>
                  <span className="metrics-value">{feature.valueSecured}</span>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
