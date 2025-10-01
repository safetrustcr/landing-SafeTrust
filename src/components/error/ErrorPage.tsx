'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Search, RefreshCw, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export interface ErrorPageProps {
  title: string
  description: string
  statusCode: number
  action?: React.ReactNode
  illustration?: React.ReactNode
  showSearch?: boolean
  className?: string
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title,
  description,
  statusCode,
  action,
  illustration,
  showSearch = false,
  className = '',
}) => {
  const defaultIllustration = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center justify-center w-32 h-32 mx-auto mb-6"
    >
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
          <AlertTriangle className="w-16 h-16 text-blue-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">{statusCode}</span>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            {illustration || defaultIllustration}
            <CardTitle className="text-3xl font-bold text-foreground mb-4">
              {title}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Status Code Display */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-muted-foreground">
                <span className="text-sm font-medium">Error Code:</span>
                <span className="font-mono font-bold text-lg">{statusCode}</span>
              </div>
            </div>

            {/* Search Functionality */}
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search for what you're looking for..."
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              {action || (
                <>
                  <Button asChild className="flex-1">
                    <Link href="/">
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link href="/dashboard">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                </>
              )}
            </motion.div>

            {/* Helpful Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-center pt-4 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground mb-3">
                Need help? Try these popular pages:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#features">Features</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#pricing">Pricing</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#support">Support</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/demo">Demo</Link>
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ErrorPage
