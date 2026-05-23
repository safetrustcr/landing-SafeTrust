"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/Hero";
import { LazySkeletonFallback } from "@/components/LazyWrapper";
// import HowItWorksSection from "@/components/HowItWorksSection";


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

const TransactionPreviewSection = dynamic(
    () => import("@/components/TransactionPreviewSection"),
    {
        loading: () => <LazySkeletonFallback height="360px" className="my-8" />,
    },
);

const TestimonialSection = dynamic(
    () => import("@/components/TestimonialSection"),
    {
        loading: () => <LazySkeletonFallback height="500px" className="my-8" />,
    },
);

export default function Home() {
    return (
        <>
            {/* Desktop Content */}
            <main className="block ">
                <HeroSection />
                <Discover />
                <FeaturesSection />
                <HowItWorksSection />
                <SecuritySection />
                <TransactionPreviewSection />
                <TestimonialSection />
                <FaqSection />
                <TransactionTiers />
                <Footer />
            </main>
        </>
    );
}
