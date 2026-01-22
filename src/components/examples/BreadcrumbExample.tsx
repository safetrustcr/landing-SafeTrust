'use client'

import React from 'react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { BreadcrumbItem } from '@/components/ui/BreadcrumbItem'
import { useBreadcrumb } from '@/hooks/use-breadcrumb'

export function BasicBreadcrumbExample() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Basic Breadcrumb</h3>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/features">Features</BreadcrumbItem>
        <BreadcrumbItem active>Security</BreadcrumbItem>
      </Breadcrumb>
    </div>
  )
}

export function CustomSeparatorExample() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Custom Separator</h3>
      <Breadcrumb separator="›">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/dashboard/analytics">Analytics</BreadcrumbItem>
        <BreadcrumbItem active>Reports</BreadcrumbItem>
      </Breadcrumb>

      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">With Arrow Separator</h4>
        <Breadcrumb separator="→">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem active>Profile</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  )
}

export function TruncationExample() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Path Truncation</h3>
      <Breadcrumb maxItems={3}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/dashboard/admin">Admin</BreadcrumbItem>
        <BreadcrumbItem href="/dashboard/admin/users">Users</BreadcrumbItem>
        <BreadcrumbItem href="/dashboard/admin/users/details">Details</BreadcrumbItem>
        <BreadcrumbItem active>Edit</BreadcrumbItem>
      </Breadcrumb>
    </div>
  )
}

export function DynamicBreadcrumbExample() {
  const breadcrumbs = useBreadcrumb({
    customLabels: {
      'dashboard': 'Dashboard',
      'analytics': 'Analytics',
      'settings': 'Settings',
    },
  })

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Dynamic Breadcrumb from Route</h3>
      <Breadcrumb>
        {breadcrumbs.map((item) => (
          <BreadcrumbItem key={item.href} href={item.href} active={item.active}>
            {item.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  )
}

export function BreadcrumbExamples() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      <BasicBreadcrumbExample />
      <CustomSeparatorExample />
      <TruncationExample />
      <DynamicBreadcrumbExample />
    </div>
  )
}
