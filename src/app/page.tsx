"use client";

import dynamic from 'next/dynamic';
import { HeroSection } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/Tooltip";
import { LazyWrapper, LazySkeletonFallback } from "@/components/LazyWrapper";

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
  () => import("@/components/FooterSection").then((mod) => ({ default: mod.Footer })),
  { loading: () => <LazySkeletonFallback height="200px" /> }
);

const HowItWorksSection = dynamic(() => import("@/components/HowItWorksSection"), {
  loading: () => <LazySkeletonFallback height="500px" className="my-8" />,
});

const SecuritySection = dynamic(() => import("@/components/SecuritySection"), {
  loading: () => <LazySkeletonFallback height="400px" className="my-8" />,
});

const ProgressBar = dynamic(() => import("@/components/ui/ProgressBar"), {
  loading: () => <LazySkeletonFallback height="20px" className="my-2" />,
  ssr: false,
});

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <div className="bg-[#0a0a15] py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">✅ Tooltip Component Working!</p>
          <Tooltip content="This explains the feature">
            <Button className="bg-green-600 hover:bg-green-700">
              Hover me
            </Button>
          </Tooltip>
        </div>
      </div>

      <LazyWrapper>
        <div className="max-w-4xl mx-auto my-16 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            Progress Bar Component Showcase
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Linear Progress</h3>
              
              <ProgressBar
                value={65}
                max={100}
                label="Form Completion"
                showPercentage
              />
              
              <ProgressBar
                value={45}
                max={100}
                size="small"
                label="Small Progress"
                showPercentage
              />
              
              <ProgressBar
                value={80}
                max={100}
                size="large"
                label="Large Progress"
                color="green"
                showPercentage
              />
              
              <ProgressBar
                value={30}
                max={100}
                label="Warning Level"
                color="yellow"
                showPercentage
              />
              
              <ProgressBar
                value={90}
                max={100}
                label="Critical Level"
                color="red"
                showPercentage
              />
              
              <ProgressBar
                isIndeterminate
                label="Loading..."
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Circular Progress</h3>
              
              <div className="flex justify-center">
                <ProgressBar
                  variant="circular"
                  value={75}
                  max={100}
                  label="Download Progress"
                  showPercentage
                />
              </div>
              
              <div className="flex justify-center space-x-4">
                <ProgressBar
                  variant="circular"
                  value={60}
                  max={100}
                  size="small"
                  color="blue"
                />
                <ProgressBar
                  variant="circular"
                  value={60}
                  max={100}
                  size="medium"
                  color="green"
                />
                <ProgressBar
                  variant="circular"
                  value={60}
                  max={100}
                  size="large"
                  color="purple"
                />
              </div>
              
              <div className="flex justify-center">
                <ProgressBar
                  variant="circular"
                  isIndeterminate
                  label="Processing..."
                  color="indigo"
                />
              </div>
              
              <div className="flex justify-center">
                <ProgressBar
                  variant="circular"
                  value={85}
                  max={100}
                  color="#ff6b6b"
                  strokeWidth={8}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Usage Examples</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// Basic usage
<ProgressBar 
  value={65} 
  max={100} 
  label="Form Completion"
  showPercentage 
/>

// Circular with custom color
<ProgressBar 
  variant="circular"
  value={75}
  color="green"
  size="large"
/>

// Indeterminate loading
<ProgressBar 
  isIndeterminate
  label="Loading..."
  color="blue"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </LazyWrapper>

      <Discover />
      <HowItWorksSection />
      <SecuritySection />
      <FaqSection />
      <TransactionTiers />
      <Footer />
    </>
  );
}
