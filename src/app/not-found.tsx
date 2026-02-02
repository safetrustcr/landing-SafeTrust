'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import ErrorPage from '@/components/error/ErrorPage'
import { FileX, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { track404 } from '@/lib/analytics/events'

export default function NotFound() {
  // Track 404 errors
  useEffect(() => {
    if (typeof window !== 'undefined') {
      track404(window.location.pathname, document.referrer);
    }
  }, []);
  const customIllustration = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center justify-center w-32 h-32 mx-auto mb-6"
    >
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
          <FileX className="w-16 h-16 text-orange-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">404</span>
        </div>
      </div>
    </motion.div>
  )

  const customAction = (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button asChild className="flex-1">
        <Link href="/">
          <Home className="w-4 h-4 mr-2" />
          Go Home
        </Link>
      </Button>
      <Button variant="outline" asChild className="flex-1">
        <Link href="javascript:history.back()">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Link>
      </Button>
    </div>
  )

  return (
    <ErrorPage
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved. Let's get you back on track."
      statusCode={404}
      illustration={customIllustration}
      action={customAction}
      showSearch={true}
    />
  )
}
