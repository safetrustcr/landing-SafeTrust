"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/Hero";
import { LazySkeletonFallback } from "@/components/LazyWrapper";
import SwipeNavigation from "@/components/SwipeNavigation";
import PullToRefresh from "@/components/ui/PullToRefresh";

const FaqSection = dynamic(() => import("@/components/FaqSection"), {
    loading: () => <LazySkeletonFallback height="400px" className="my-8" />,
});

const TransactionTiers = dynamic(() => import("@/components/PriceSection"), {
    loading: () => <LazySkeletonFallback height="500px" className="my-8" />,
});

const Discover = dynamic(() => import("@/components/DiscoverSection"), {
    loading: () => <LazySkeletonFallback height="400px" className="my-8" />,
});

const Footer = dynamic(
    () =>
        import("@/components/FooterSection").then((mod) => ({
            default: mod.Footer,
        })),
    { loading: () => <LazySkeletonFallback height="200px" /> },
);

const FeaturesSection = dynamic(
    () => import("@/components/Features/FeaturesSection"),
    {
        loading: () => <LazySkeletonFallback height="500px" className="my-8" />,
    },
);

const HowItWorksSection = dynamic(
    () => import("@/components/HowItWorksSection"),
    {
        loading: () => <LazySkeletonFallback height="500px" className="my-8" />,
    },
);

const SecuritySection = dynamic(() => import("@/components/SecuritySection"), {
    loading: () => <LazySkeletonFallback height="400px" className="my-8" />,
});

const TestimonialSection = dynamic(
    () => import("@/components/TestimonialSection"),
    {
        loading: () => <LazySkeletonFallback height="500px" className="my-8" />,
    },
);

export default function Home() {
    const handleRefresh = async () => {
        // Simulate refresh delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.reload();
    };

    const sections = [
        { id: "hero", title: "Hero", content: <HeroSection /> },
        { id: "discover", title: "Discover", content: <Discover /> },
        { id: "features", title: "Features", content: <FeaturesSection /> },
        {
            id: "howItworks",
            title: "How It Works",
            content: <HowItWorksSection />,
        },
        {
            id: "securitySection",
            title: "Security Section",
            content: <SecuritySection />,
        },
        {
            id: "testimonialSection",
            title: "Testimonial Section",
            content: <TestimonialSection />,
        },
        { id: "faqSection", title: "Faq Section", content: <FaqSection /> },
        {
            id: "transactionTiers",
            title: "Transaction Tiers",
            content: <TransactionTiers />,
        },
        { id: "footer", title: "Footer", content: <Footer /> },
    ];

    return (
        <>
            {/* Desktop Content */}
            <main className="block ">
                <HeroSection />
                <Discover />
                <FeaturesSection />
                <HowItWorksSection />
                <SecuritySection />
                <TestimonialSection />
                <FaqSection />
                <TransactionTiers />
                <Footer />
            </main>
        </>
    );
}
