"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, X, ChevronDown } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: string;
  value: string;
  number: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "accordion-1",
    value: "item-1",
    number: 1,
    question: "What is SafeTrust?",
    answer:
      "SafeTrust is a decentralized P2P transaction platform that provides secure escrow services and safe deposit solutions using blockchain technology. Our platform ensures trust and security in every transaction between parties.",
    category: "General",
    tags: ["platform", "overview"],
  },
  {
    id: "accordion-2",
    value: "item-2",
    number: 2,
    question: "How do I get started with SafeTrust?",
    answer:
      "Getting started with SafeTrust is easy! Simply connect your wallet, verify your account, and start using our secure P2P transaction features. Our intuitive interface and comprehensive onboarding process will guide you through each step.",
    category: "Getting Started",
    tags: ["onboarding", "setup", "wallet"],
  },
  {
    id: "accordion-3",
    value: "item-3",
    number: 3,
    question: "What security measures does SafeTrust use?",
    answer:
      "SafeTrust employs multiple layers of security, including smart contracts, multi-signature wallets, and advanced encryption. Our blue-chip security standards ensure your assets are protected throughout every transaction.",
    category: "Security",
    tags: ["security", "encryption", "protection"],
  },
  {
    id: "accordion-4",
    value: "item-4",
    number: 4,
    question: "What are the transaction fees?",
    answer:
      "Our fees are transparent and competitive, starting from 0.5% per transaction for basic users. We offer tiered pricing based on transaction volume, with reduced rates for pro users and custom solutions for enterprise clients.",
    category: "Pricing",
    tags: ["fees", "pricing", "costs"],
  },
  {
    id: "accordion-5",
    value: "item-5",
    number: 5,
    question: "Which blockchains does SafeTrust support?",
    answer:
      "SafeTrust supports multiple blockchain networks including Ethereum, Stellar, and other major chains. This ensures maximum flexibility and accessibility for all your P2P transaction needs.",
    category: "Technical",
    tags: ["blockchain", "networks", "compatibility"],
  },
  {
    id: "accordion-6",
    value: "item-6",
    number: 6,
    question: "How long does a transaction take?",
    answer:
      "Transaction times vary depending on the blockchain network and current network congestion. Typically, transactions are completed within 5-30 minutes. You can monitor your transaction status in real-time through your dashboard.",
    category: "Transactions",
    tags: ["speed", "timing", "processing"],
  },
  {
    id: "accordion-7",
    value: "item-7",
    number: 7,
    question: "Is my data private on SafeTrust?",
    answer:
      "Yes, we prioritize your privacy. SafeTrust uses end-to-end encryption and complies with GDPR and other privacy regulations. Your personal data is never shared with third parties without your explicit consent.",
    category: "Privacy",
    tags: ["privacy", "data", "compliance"],
  },
  {
    id: "accordion-8",
    value: "item-8",
    number: 8,
    question: "What happens if there's a dispute?",
    answer:
      "Our dispute resolution process is transparent and fair. We have a dedicated team that reviews disputes within 48 hours. Both parties can provide evidence, and we make decisions based on our smart contract terms and platform policies.",
    category: "Support",
    tags: ["disputes", "resolution", "support"],
  },
] as const;

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [expandedItems, setExpandedItems] = useState<string[]>(["item-1"]);
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(FAQ_ITEMS.map((item) => item.category)));
    return ["All categories", ...cats];
  }, []);

  // Filter FAQ items based on search and category
  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "All categories" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleAccordionChange = (value: string[]) => {
    setExpandedItems(value);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      id="faqSection"
      className="min-h-screen bg-background text-foreground py-16 px-4 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none transition-colors duration-300"></div>

      <div className="container max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">
              Support / FAQ
            </span>
          </div>

          {/* Headline with Italic Accent */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Frequently Asked{" "}
            <span className="text-primary italic">Questions</span>
          </h1>

          {/* Subheading */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about SafeTrust and how to make the
            most of our secure P2P transaction platform.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative inline-block w-full" ref={dropdownRef}>
            <div className="relative">
              <button
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground text-left flex items-center justify-between hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-sm font-medium">{selectedCategory}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-border bg-background/95 backdrop-blur-sm shadow-lg z-50 overflow-hidden">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-primary/5"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results Count */}
          {searchQuery || selectedCategory !== "All categories" ? (
            <p className="text-sm text-muted-foreground text-center">
              Showing {filteredItems.length} of {FAQ_ITEMS.length} questions
            </p>
          ) : null}
        </div>

        {/* Accordion Section */}
        {filteredItems.length > 0 ? (
          <Accordion
            type="multiple"
            value={expandedItems}
            onValueChange={handleAccordionChange}
            className="space-y-3"
          >
            {filteredItems.map((item) => (
              <AccordionItem
                key={item.id}
                id={item.id}
                value={item.value}
                className="border rounded-lg border-border px-4 py-2 data-[state=open]:border-primary/50 data-[state=open]:bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
              >
                <AccordionTrigger className="hover:text-primary transition-colors duration-200 py-4 no-underline">
                  <div className="flex items-start gap-4 text-left">
                    <span className="text-lg font-semibold text-primary/60 min-w-fit">
                      {item.number.toString().padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-foreground">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 pt-2">
                  <div className="ml-12 space-y-4">
                    <p>{item.answer}</p>
                    {/* Category and Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {item.category}
                      </span>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12 space-y-4">
            <p className="text-lg text-muted-foreground">
              No questions found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All categories");
              }}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Footer Link */}
        <div className="text-center pt-8 border-t border-border/50">
          <p className="text-muted-foreground mb-4">
            Didn&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Contact our team
          </Link>
        </div>
      </div>
    </div>
  );
}
