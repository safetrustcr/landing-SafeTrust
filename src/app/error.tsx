'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ErrorPage from '@/components/error/ErrorPage'
import { ServerCrash, RefreshCw, Home, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  const customIllustration = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center justify-center w-32 h-32 mx-auto mb-6"
    >
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 flex items-center justify-center">
          <ServerCrash className="w-16 h-16 text-red-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">500</span>
        </div>
      </div>
    </motion.div>
  )

  const customAction = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={reset} className="flex-1">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button variant="outline" asChild className="flex-1">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </Button>
      </div>
      
      {/* Contact Support Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-center pt-4 border-t border-border/50"
      >
        <p className="text-sm text-muted-foreground mb-3">
          Still having issues? Our support team is here to help.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="mailto:support@safetrust.com">
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="tel:+1-800-SAFETRUST">
              <Phone className="w-4 h-4 mr-2" />
              Call Support
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <ErrorPage
      title="Something went wrong"
      description="We're experiencing technical difficulties. Our team has been notified and is working to fix the issue."
      statusCode={500}
      illustration={customIllustration}
      action={customAction}
      showSearch={false}
    />
  )
}
