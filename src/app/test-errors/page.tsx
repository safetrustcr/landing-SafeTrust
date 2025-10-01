'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ErrorBoundary from '@/components/error/ErrorBoundary'
import NetworkError from '@/components/error/NetworkError'
import { AlertTriangle, Wifi, Bug } from 'lucide-react'

// Component that throws an error for testing
const ErrorThrower = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('This is a test error for the ErrorBoundary component!')
  }

  return (
    <Button onClick={() => setShouldThrow(true)} variant="destructive">
      <Bug className="w-4 h-4 mr-2" />
      Throw Error (Test ErrorBoundary)
    </Button>
  )
}

export default function TestErrorsPage() {
  const [showNetworkError, setShowNetworkError] = useState(false)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Components Test Page</h1>
          <p className="text-muted-foreground">
            Test the error page components and error boundary functionality
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Error Boundary Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="w-5 h-5" />
                Error Boundary Test
              </CardTitle>
              <CardDescription>
                Test the React ErrorBoundary component by triggering an error
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorBoundary
                onError={(error, errorInfo) => {
                  console.log('Error caught by boundary:', error, errorInfo)
                }}
              >
                <ErrorThrower />
              </ErrorBoundary>
            </CardContent>
          </Card>

          {/* Network Error Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                Network Error Test
              </CardTitle>
              <CardDescription>
                Test the NetworkError component for connectivity issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowNetworkError(!showNetworkError)}
                variant="outline"
              >
                <Wifi className="w-4 h-4 mr-2" />
                {showNetworkError ? 'Hide' : 'Show'} Network Error
              </Button>
            </CardContent>
          </Card>

          {/* Navigation Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Navigation Tests
              </CardTitle>
              <CardDescription>
                Test 404 and 500 error pages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full">
                <a href="/non-existent-page">Test 404 Page</a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href="/test-500">Test 500 Page</a>
              </Button>
            </CardContent>
          </Card>

          {/* Component Information */}
          <Card>
            <CardHeader>
              <CardTitle>Error Components</CardTitle>
              <CardDescription>
                Available error handling components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>ErrorPage:</span>
                  <span className="text-green-500">✓ Implemented</span>
                </div>
                <div className="flex justify-between">
                  <span>ErrorBoundary:</span>
                  <span className="text-green-500">✓ Implemented</span>
                </div>
                <div className="flex justify-between">
                  <span>NetworkError:</span>
                  <span className="text-green-500">✓ Implemented</span>
                </div>
                <div className="flex justify-between">
                  <span>404 Page:</span>
                  <span className="text-green-500">✓ Implemented</span>
                </div>
                <div className="flex justify-between">
                  <span>500 Page:</span>
                  <span className="text-green-500">✓ Implemented</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Error Component */}
        {showNetworkError && (
          <NetworkError
            onRetry={() => {
              console.log('Network retry attempted')
              setShowNetworkError(false)
            }}
            onDismiss={() => setShowNetworkError(false)}
          />
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">1. Error Boundary Test:</h4>
                <p>Click the &quot;Throw Error&quot; button to test the ErrorBoundary component. It should catch the error and display a fallback UI.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Network Error Test:</h4>
                <p>Click &quot;Show Network Error&quot; to display the NetworkError component. It will show connection status and retry options.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. 404 Page Test:</h4>
                <p>Click &quot;Test 404 Page&quot; to navigate to a non-existent page and see the 404 error page.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">4. 500 Page Test:</h4>
                <p>Click &quot;Test 500 Page&quot; to see the 500 server error page (if implemented).</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
