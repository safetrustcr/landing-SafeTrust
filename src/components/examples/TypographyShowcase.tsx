/**
 * Typography Showcase Component
 *
 * This component demonstrates the different text styles used across
 * the Analytics & Dashboard UI. Each element is annotated with comments
 * to explain its intended purpose, hierarchy, and visual design.
 */

import React from "react";
import "../../styles/typography.css";
const TypographyShowcase = () => {
  return (
    <div className="space-y-8 p-6 bg-slate-900 text-foreground">
      {/* ======================= ERRORS ======================= */}
      <section>
        <h2 className="text-xl font-semibold text-destructive">
          Error Loading Analytics
        </h2>
        <p className="text-muted-foreground">Error</p>
      </section>

      {/* ======================= DASHBOARD TITLES ======================= */}
      <section>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Analytics Dashboard
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Real-time insights into your platform&apos;s performance
        </p>
      </section>

      {/* ======================= EMPTY STATES ======================= */}
      <section>
        <h3 className="text-xl font-semibold text-white">No Data Available</h3>
        <p className="text-muted-foreground">
          Select a different date range or check back later for analytics data.
        </p>
      </section>

      {/* ======================= SUBSECTIONS ======================= */}
      <section>
        <h2 className="text-lg font-semibold">Transactions</h2>
        <p className="text-gray-400">✅ Tooltip Component Working!</p>
      </section>

      {/* ======================= MARKETING HEADLINES ======================= */}
      <section className="text-center">
        <h2 className="text-4xl text-foreground font-bold">
          Discover the Power of <span className="text-primary">SafeTrust</span>
        </h2>
        <p className="text-muted-foreground text-lg  ">
          SafeTrust is engineered with cutting-edge blockchain technology
          designed to revolutionize the way you handle P2P transactions, secure
          deposits, and manage digital assets.
        </p>
      </section>

      {/* ======================= CARD HEADINGS ======================= */}
      <section>
        <h3 className="text-lg font-semibold text-foreground">title</h3>
        <p className="text-muted-foreground">description</p>

        <h3 className="text-lg font-medium text-foreground ">title</h3>
        <p className="text-muted-foreground text-sm">description</p>
      </section>

      {/* ======================= INLINE EMPHASIS ======================= */}
      <section>
        <span className="text-primary">Works</span>
      </section>

      {/* ======================= SECTION HEADLINES ======================= */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Making Your <span className="text-primary">Business Life Easier</span>
        </h2>
        <h3 className="text-xl md:text-2xl font-medium text-foreground">
          Ready to secure your business transactions?
        </h3>
      </section>

      {/* ======================= FEATURE SECTIONS ======================= */}
      <section>
        <h2 className="text-3xl font-bold text-center">
          SafeTrust Security Features
        </h2>
      </section>

      {/* ======================= FAQ HEADLINE ======================= */}
      <section>
        <h1 className="text-4xl md:text-5xl font-bold">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          We&apos;ve compiled a list of the most frequently asked questions
          about SafeTrust to help you understand our P2P transaction platform
          better.
        </p>
      </section>

      {/* ======================= LABELS ======================= */}
      <section>
        <span className="text-muted-foreground text-sm sm:text-base">
          Monthly
        </span>
      </section>

      {/* ======================= PRODUCT HEADINGS ======================= */}
      <section>
        <h3 className="font-semibold text-foreground">Product</h3>
      </section>

      {/* ======================= HERO SECTION ======================= */}
      <section>
        <h1 className="text-5xl font-bold leading-tight">
          <span className="text-blue-500">Secure</span> p2p
          <span className="block">transactions platform</span>
        </h1>
        <p className="text-xl text-gray-400">
          Experience the power of decentralized trust and seamless blockchain
          transactions. Our blue-chip security standards ensure your deposits
          are always protected in our revolutionary P2P platform.
        </p>
      </section>
    </div>
  );
};

export default TypographyShowcase;
