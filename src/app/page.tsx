"use client";

import HeroSection from "@/components/HeroSection";
import FaqSection from "@/components/FaqSection";
import TransactionTiers from "@/components/PriceSection";
import Discover from "@/components/DiscoverSection";
import { Footer } from "@/components/FooterSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SecuritySection from "@/components/SecuritySection";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/Tooltip";
import ProgressBar from "@/components/ui/ProgressBar";
import SwipeNavigation from '@/components/SwipeNavigation';
import PullToRefresh from "@/components/ui/PullToRefresh";

export default function Home() {

  const handleRefresh = async () => {
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.reload();
  };

  const sections = [
    { id: "hero", title: "Hero", content: <HeroSection /> },
    {
      id: "toolTip", title: "Tool Tip", content: <div className="bg-[#0a0a15] py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">✅ Tooltip Component Working!</p>
          <Tooltip content="This explains the feature">
            <Button className="bg-green-600 hover:bg-green-700">
              Hover me
            </Button>
          </Tooltip>
        </div>
      </div>
    },
    {
      id: "progressBar", title: "Progress Bar", content: <div className="max-w-4xl mx-auto my-16 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Progress Bar Component Showcase
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Linear Progress Examples */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Linear Progress</h3>

            {/* Determinate with label and percentage */}
            <ProgressBar
              value={65}
              max={100}
              label="Form Completion"
              showPercentage
            />

            {/* Different sizes */}
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

            {/* Different colors */}
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

            {/* Indeterminate */}
            <ProgressBar
              isIndeterminate
              label="Loading..."
            />
          </div>

          {/* Circular Progress Examples */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Circular Progress</h3>

            {/* Determinate circular */}
            <div className="flex justify-center">
              <ProgressBar
                variant="circular"
                value={75}
                max={100}
                label="Download Progress"
                showPercentage
              />
            </div>

            {/* Different sizes */}
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

            {/* Indeterminate circular */}
            <div className="flex justify-center">
              <ProgressBar
                variant="circular"
                isIndeterminate
                label="Processing..."
                color="indigo"
              />
            </div>

            {/* Custom color */}
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

        {/* Usage Examples */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Usage Examples</h3>
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Linear Progress</h4>
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
    },
    { id: "faq", title: "FAQ", content: <FaqSection /> },
    { id: "transaction-tiers", title: "Transaction Tiers", content: <TransactionTiers /> },
    { id: "discover", title: "Discover", content: <Discover /> },
    { id: "how-it-works", title: "How It Works", content: <HowItWorksSection /> },
    { id: "security", title: "Security", content: <SecuritySection /> },
    { id: "footer", title: "Footer", content: <Footer /> },
  ]

  return (
    <>
      {/* Mobile Navigation */}
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="block md:hidden h-[calc(100vh-70px)]">
          <SwipeNavigation sections={sections} />
        </div>
      </PullToRefresh>

      {/* Desktop Content */}
      <main className="hidden md:block">
        <HeroSection />

        {/* Quick Tooltip Test Section */}
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
        <div className="max-w-4xl mx-auto my-16 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            Progress Bar Component Showcase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Linear Progress Examples */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Linear Progress</h3>

              {/* Determinate with label and percentage */}
              <ProgressBar
                value={65}
                max={100}
                label="Form Completion"
                showPercentage
              />

              {/* Different sizes */}
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

              {/* Different colors */}
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

              {/* Indeterminate */}
              <ProgressBar
                isIndeterminate
                label="Loading..."
              />
            </div>

            {/* Circular Progress Examples */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Circular Progress</h3>

              {/* Determinate circular */}
              <div className="flex justify-center">
                <ProgressBar
                  variant="circular"
                  value={75}
                  max={100}
                  label="Download Progress"
                  showPercentage
                />
              </div>

              {/* Different sizes */}
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

              {/* Indeterminate circular */}
              <div className="flex justify-center">
                <ProgressBar
                  variant="circular"
                  isIndeterminate
                  label="Processing..."
                  color="indigo"
                />
              </div>

              {/* Custom color */}
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

          {/* Usage Examples */}
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

        <Discover />
        <HowItWorksSection />
        <SecuritySection />
        <FaqSection />
        <TransactionTiers />
        <Footer />
      </main>
    </>
  );
}
