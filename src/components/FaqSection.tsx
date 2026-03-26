"use client";

import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SearchBar from "@/components/search/SearchBar";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { useSearch } from "@/hooks/use-search";
import { SearchResult } from "@/types/search";

const FAQ_ITEMS = [
    {
        id: "accordion-1",
        value: "item-1",
        question: "What is SafeTrust?",
        answer: "SafeTrust is a decentralized P2P transaction platform that provides secure escrow services and safe deposit solutions using blockchain technology. Our platform ensures trust and security in every transaction between parties.",
    },
    {
        id: "accordion-2",
        value: "item-2",
        question: "How do I get started with SafeTrust?",
        answer: "Getting started with SafeTrust is easy! Simply connect your wallet, verify your account, and start using our secure P2P transaction features. Our intuitive interface and comprehensive onboarding process will guide you through each step.",
    },
    {
        id: "accordion-3",
        value: "item-3",
        question: "What security measures does SafeTrust use?",
        answer: "SafeTrust employs multiple layers of security, including smart contracts, multi-signature wallets, and advanced encryption. Our blue-chip security standards ensure your assets are protected throughout every transaction.",
    },
    {
        id: "accordion-4",
        value: "item-4",
        question: "What are the transaction fees?",
        answer: "Our fees are transparent and competitive, starting from 0.5% per transaction for basic users. We offer tiered pricing based on transaction volume, with reduced rates for pro users and custom solutions for enterprise clients.",
    },
    {
        id: "accordion-5",
        value: "item-5",
        question: "Which blockchains does SafeTrust support?",
        answer: "SafeTrust supports multiple blockchain networks including Ethereum, Stellar, and other major chains. This ensures maximum flexibility and accessibility for all your P2P transaction needs.",
    },
] as const;

export default function FAQ() {
    const [showSearch, setShowSearch] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { query } = useSearch();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleResultClick = (result: SearchResult) => {
        // Scroll to the corresponding accordion item
        const element = document.getElementById(`accordion-${result.item.id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

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
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Frequently Asked{" "}
                        <span className="text-primary">Questions</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We&apos;ve compiled a list of the most frequently asked
                        questions about SafeTrust to help you understand our P2P
                        transaction platform better.
                    </p>

                    {/* Search Section */}
                    <div className="max-w-2xl mx-auto space-y-4">
                        <SearchBar
                            placeholder="Search FAQs..."
                            className="w-full"
                            autoFocus={false}
                        />

                        <div className="flex items-center justify-between">
                            <SearchFilters
                                className="flex-1"
                                showCategories={true}
                                showTags={true}
                                showDateRange={false}
                                collapsible={true}
                            />

                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showSearch
                                    ? "Hide search results"
                                    : "Show search results"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Results */}
                {showSearch && query && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">
                            Search Results
                        </h2>
                        <SearchResults
                            onResultClick={handleResultClick}
                            maxResults={10}
                            showCategories={true}
                            showTags={true}
                            showRelevanceScore={true}
                            collapsible={true}
                        />
                    </div>
                )}

                {!mounted ? (
                    <div className="space-y-4">
                        {FAQ_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                id={item.id}
                                className="border rounded-lg border-border px-2 border-b border-border backdrop-blur-sm transition-colors duration-300"
                            >
                                <div className="flex flex-1 items-center justify-between py-4 text-sm font-medium text-left">
                                    {item.question}
                                </div>
                                <div className="pb-4 pt-0 text-sm text-muted-foreground overflow-hidden">
                                    {item.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Accordion type="multiple" className="space-y-4">
                        {FAQ_ITEMS.map((item) => (
                            <AccordionItem
                                key={item.id}
                                id={item.id}
                                value={item.value}
                                className="border rounded-lg border-border px-2 data-[state=open]:border-primary/50 data-[state=open]:bg-card backdrop-blur-sm transition-colors duration-300"
                            >
                                <AccordionTrigger className="hover:text-primary transition-colors duration-200">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    );
}
