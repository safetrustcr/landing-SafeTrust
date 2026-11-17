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
    num: "01",
    icon: <Lock className="icon-element" />,
    title: "Secure escrow, held by code.",
    desc: "Rent and deposits are locked in Soroban smart contracts on Stellar — verifiable, and no single party can take them.",
    valueSecured: "$50.2M+",
    category: "security",
  },
  {
    id: "instant-transactions",
    num: "02",
    icon: <Zap className="icon-element" />,
    title: "Fast host payouts",
    desc: "Hosts are paid within seconds of check-in.",
    category: "payments",
  },
  {
    id: "decentralized-trust",
    num: "03",
    icon: <Globe className="icon-element" />,
    title: "Decentralized trust",
    desc: "No booking platform holds the money in the middle.",
    category: "trust",
  },
  {
    id: "real-time-tracking",
    num: "04",
    icon: <BarChart3 className="icon-element" />,
    title: "Real-time tracking",
    desc: "Guest and host see the booking status at every step.",
    category: "trust",
  },
  {
    id: "fair-dispute-resolution",
    num: "05",
    icon: <Scale className="icon-element" />,
    title: "Fair dispute resolution",
    desc: "Damage claims follow rules both sides can see.",
    category: "trust",
  },
  {
    id: "cost-efficient",
    num: "06",
    icon: <Wallet className="icon-element" />,
    title: "Cost efficient",
    desc: "Stellar network fees cost a fraction of a cent.",
    category: "payments",
  },
  {
    id: "enhanced-security",
    num: "07",
    icon: <ShieldCheck className="icon-element" />,
    title: "Private payments",
    desc: "Pay from your wallet. No card or bank details go to the host.",
    category: "security",
  },
  {
    id: "multi-currency",
    num: "08",
    icon: <Coins className="icon-element" />,
    title: "Stablecoin payments",
    desc: "Pay rent in USDC, so prices don't swing.",
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
              <span className="card-number">{feature.num}</span>
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
