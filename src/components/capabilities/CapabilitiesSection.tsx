"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Globe,
  Zap,
  FileCheck,
  TrendingUp,
  Clock,
} from "lucide-react";

const capabilities = [
  {
    index: "01",
    icon: Shield,
    title: "Smart Escrow",
    description: "Automated contract execution with multi-signature protection for every transaction.",
    tag: "Security",
  },
  {
    index: "02",
    icon: Globe,
    title: "Multi-Chain",
    description: "Seamless interoperability across Ethereum, Stellar, and other major networks.",
    tag: "Compatibility",
  },
  {
    index: "03",
    icon: Zap,
    title: "Real-Time",
    description: "Instant settlement with on-chain verification and zero intermediaries.",
    tag: "Speed",
  },
  {
    index: "04",
    icon: FileCheck,
    title: "Audit Ready",
    description: "Fully transparent transaction history with verifiable audit trails.",
    tag: "Compliance",
  },
];

const stats = [
  { label: "CONTRACTS/24H", value: "2,847", icon: TrendingUp },
  { label: "AVG SETTLEMENT", value: "0.8s", icon: Clock },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

function CapabilityCard({
  capability,
}: {
  capability: (typeof capabilities)[0];
}) {
  const Icon = capability.icon;
  return (
    <motion.article
      variants={itemVariants}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      role="article"
      aria-label={capability.title}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
            <Icon size={20} />
          </div>
          <span className="text-sm font-mono font-medium text-muted-foreground/60">
            {capability.index}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{capability.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            {capability.description}
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors duration-300 group-hover:bg-primary/10">
          {capability.tag}
        </span>
      </div>
    </motion.article>
  );
}

function FeaturedCard() {
  return (
    <motion.article
      variants={itemVariants}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[320px] sm:min-h-[400px]"
      role="article"
      aria-label="Platform statistics"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          Live Network
        </div>
        <h3 className="mt-4 text-xl sm:text-2xl font-bold text-white">
          Platform Scale
        </h3>
        <p className="mt-2 text-sm text-white/60 max-w-xs">
          Real-time metrics from the SafeTrust network
        </p>
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-4 mt-auto">
        {stats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:bg-white/10"
            >
              <div className="flex items-center gap-2 text-white/50 text-xs font-medium mb-2">
                <StatIcon size={14} />
                {stat.label}
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}

export default function CapabilitiesSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Capabilities
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Discover the power of <span className="italic text-primary">SafeTrust</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Enterprise-grade infrastructure built for the next generation of decentralized
            transactions. Secure, transparent, and verifiable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <div className="lg:col-span-1 lg:row-span-2">
            <FeaturedCard />
          </div>
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.index} capability={capability} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
