"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import IconShowcase, { IconUsageExamples } from "@/components/examples/IconShowcase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";

export default function IconsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <Container className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">SafeTrust Icons</h1>
                <p className="text-muted-foreground">
                  Comprehensive icon library documentation and visual catalog
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                href="https://lucide.dev" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <ExternalLink size={16} className="mr-2" />
                  Lucide React
                </Button>
              </Link>
              <Link href="/docs/ICONS.md">
                <Button variant="outline" size="sm">
                  <BookOpen size={16} className="mr-2" />
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8">
        <div className="space-y-12">
          {/* Icon Showcase */}
          <section>
            <IconShowcase />
          </section>

          {/* Usage Examples */}
          <section>
            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-bold mb-6">Usage Examples</h2>
              <IconUsageExamples />
            </div>
          </section>

          {/* Implementation Guide */}
          <section>
            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-bold mb-6">Quick Implementation Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">1. Import the Icon</h3>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    {`import { Search } from "lucide-react";`}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">2. Use in Component</h3>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    {`<Search size={24} className="text-primary" />`}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">3. With Button</h3>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    {`<Button>
  <Search size={16} className="mr-2" />
  Search
</Button>`}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">4. Icon Registry</h3>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    {`import { iconRegistry } from "@/utils/icon-registry";

const icon = iconRegistry.Search;
const IconComponent = icon.component;`}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section>
            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-600">✅ Do</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      Use consistent sizing throughout your app
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      Import only the icons you need
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      Follow semantic meaning for icon usage
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      Use proper color contrast for accessibility
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      Provide aria-labels for standalone icons
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600">❌ Don't</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      Use icons without considering their meaning
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      Import the entire lucide-react library
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      Use inconsistent sizes in related components
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      Forget about mobile touch targets (44px minimum)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      Use too many different icons in one interface
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}