"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { SearchResult } from "@/types/search";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchResultsProps {
  className?: string;
  maxResults?: number;
  showCategories?: boolean;
  showTags?: boolean;
  showRelevanceScore?: boolean;
  collapsible?: boolean;
  onResultClick?: (result: SearchResult) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  general: "General",
  security: "Security",
  fees: "Fees & Pricing",
  "getting-started": "Getting Started",
  blockchain: "Blockchain",
  technical: "Technical",
  support: "Support",
};

const CATEGORY_COLORS: Record<string, string> = {
  general: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  security: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  fees: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "getting-started":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  blockchain:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  technical: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  support:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
};

export default function SearchResults({
  className,
  maxResults = 10,
  showCategories = true,
  showTags = true,
  showRelevanceScore = false,
  collapsible = true,
  onResultClick,
}: SearchResultsProps) {
  const { results, isLoading, totalCount, query, trackResultClick } =
    useSearch();
  const [expandedResults, setExpandedResults] = useState<Set<string>>(
    new Set()
  );
  const [copiedResults, setCopiedResults] = useState<Set<string>>(new Set());

  const displayResults = results.slice(0, maxResults);

  const toggleExpanded = (resultId: string) => {
    setExpandedResults((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(resultId)) {
        newSet.delete(resultId);
      } else {
        newSet.add(resultId);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (text: string, resultId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedResults((prev) => new Set(prev).add(resultId));
      setTimeout(() => {
        setCopiedResults((prev) => {
          const newSet = new Set(prev);
          newSet.delete(resultId);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    trackResultClick(result.item.id);
    onResultClick?.(result);
  };

  const getCategoryColor = (category: string) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.general;
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4 animate-pulse">
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!query && results.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">Start searching to find answers</p>
          <p className="text-sm">Type your question or browse by category</p>
        </div>
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">
            No results found for &quot;{query}&quot;
          </p>
          <p className="text-sm">
            Try different keywords or check your spelling
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Results Header */}
      {query && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {totalCount} result{totalCount !== 1 ? "s" : ""} for &quot;{query}
            &quot;
          </div>
          {results.length > maxResults && (
            <div className="text-xs text-muted-foreground">
              Showing {maxResults} of {results.length}
            </div>
          )}
        </div>
      )}

      {/* Results List */}
      <div className="space-y-3">
        {displayResults.map((result) => {
          const isExpanded = expandedResults.has(result.item.id);
          const isCopied = copiedResults.has(result.item.id);

          return (
            <div
              key={result.item.id}
              className="bg-background border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200"
            >
              {/* Question Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <button
                      onClick={() => handleResultClick(result)}
                      className="text-left hover:text-primary transition-colors duration-200"
                    >
                      <h3
                        className="font-medium text-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: result.highlightedQuestion,
                        }}
                      />
                    </button>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {showCategories && (
                        <Badge
                          className={cn(
                            "px-2 py-1",
                            getCategoryColor(result.item.category)
                          )}
                        >
                          {CATEGORY_LABELS[result.item.category] ||
                            result.item.category}
                        </Badge>
                      )}

                      {showRelevanceScore && (
                        <Badge className="px-2 py-1 border border-border">
                          {Math.round(result.relevanceScore * 100)}% match
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-1 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(result.item.answer, result.item.id)
                      }
                      className="h-8 w-8 p-0"
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>

                    {collapsible && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(result.item.id)}
                        className="h-8 w-8 p-0"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Answer Preview */}
                {!isExpanded && (
                  <div
                    className="text-muted-foreground text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html:
                        result.highlightedAnswer.length > 200
                          ? result.highlightedAnswer.substring(0, 200) + "..."
                          : result.highlightedAnswer,
                    }}
                  />
                )}

                {/* Full Answer */}
                {isExpanded && (
                  <div className="space-y-3">
                    <div
                      className="text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: result.highlightedAnswer,
                      }}
                    />

                    {/* Tags */}
                    {showTags && result.item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {result.item.tags.map((tag) => (
                          <Badge key={tag} className="text-xs px-2 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Matched Terms */}
                    {result.matchedTerms.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Matched: {result.matchedTerms.join(", ")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {results.length > maxResults && (
        <div className="text-center pt-4">
          <Button variant="outline" size="sm">
            Load more results
          </Button>
        </div>
      )}
    </div>
  );
}
