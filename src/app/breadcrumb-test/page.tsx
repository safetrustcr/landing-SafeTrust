'use client'

import { BreadcrumbExamples } from '@/components/examples/BreadcrumbExample'

export default function BreadcrumbTestPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Breadcrumb Component Tests</h1>
          <p className="text-muted-foreground">
            Test all breadcrumb variations and features
          </p>
        </div>
        <BreadcrumbExamples />
      </div>
    </div>
  )
}
