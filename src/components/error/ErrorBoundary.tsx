"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-lg font-semibold text-destructive">
            Something went wrong.
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {this.state.error?.message}
          </p>
          <Button onClick={this.handleRetry} className="mt-4">
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
