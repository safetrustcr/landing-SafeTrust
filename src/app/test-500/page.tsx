'use client'

// This page simulates a 500 error by throwing an error
export default function Test500Page() {
  // Simulate a server error
  throw new Error('Simulated 500 Server Error - This is a test error for demonstration purposes.')
}
