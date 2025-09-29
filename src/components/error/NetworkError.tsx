'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wifi, WifiOff, RefreshCw, CheckCircle } from 'lucide-react'

interface NetworkErrorProps {
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
}

const NetworkError: React.FC<NetworkErrorProps> = ({
  onRetry,
  onDismiss,
  className = '',
}) => {
  const [isOnline, setIsOnline] = useState(true)
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Check initial status
    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = async () => {
    setIsRetrying(true)
    setRetryCount(prev => prev + 1)
    
    try {
      // Simulate network check
      await fetch('/api/health', { 
        method: 'HEAD',
        cache: 'no-cache'
      })
      
      if (onRetry) {
        onRetry()
      }
    } catch (error) {
      // Network still down
      console.error('Network retry failed:', error)
    } finally {
      setIsRetrying(false)
    }
  }

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-4 right-4 z-50 w-full max-w-sm ${className}`}
      >
        <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    scale: isOnline ? 1 : [1, 1.2, 1],
                    rotate: isOnline ? 0 : [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: isOnline ? 0 : Infinity,
                    repeatDelay: 2
                  }}
                >
                  {isOnline ? (
                    <Wifi className="w-5 h-5 text-green-500" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-500" />
                  )}
                </motion.div>
                <div>
                  <CardTitle className="text-lg">
                    {isOnline ? 'Connection Restored' : 'Network Error'}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {isOnline 
                      ? 'Your internet connection is back online.' 
                      : 'Check your internet connection and try again.'
                    }
                  </CardDescription>
                </div>
              </div>
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Connection Status */}
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  isOnline ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-muted-foreground">
                  {isOnline ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              {/* Retry Information */}
              {!isOnline && (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    Retry attempts: {retryCount}
                  </div>
                  
                  <Button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="w-full"
                    size="sm"
                  >
                    {isRetrying ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry Connection
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Success Message */}
              {isOnline && retryCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Connection restored successfully!</span>
                </motion.div>
              )}

              {/* Troubleshooting Tips */}
              {!isOnline && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-2 border-t border-border/50"
                >
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="font-medium">Troubleshooting tips:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Check your WiFi connection</li>
                      <li>Try refreshing the page</li>
                      <li>Check if other websites work</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

export default NetworkError
export { NetworkError }
