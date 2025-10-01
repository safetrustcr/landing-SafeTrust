"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { SearchCategory } from "@/types/search";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  className?: string;
  showCategories?: boolean;
  showTags?: boolean;
  showDateRange?: boolean;
  collapsible?: boolean;
}

const CATEGORY_LABELS: Record<SearchCategory, string> = {
  general: "General",
  security: "Security",
  fees: "Fees & Pricing",
  "getting-started": "Getting Started",
  blockchain: "Blockchain",
  technical: "Technical",
  support: "Support",
};

export default function SearchFilters({
  className,
  showCategories = true,
  showTags = true,
  showDateRange = false,
  collapsible = true,
}: SearchFiltersProps) {
  const { filters, updateFilters, clearFilters, getCategories, getTags } =
    useSearch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  const availableCategories = getCategories();
  const availableTags = getTags();

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.dateRange !== undefined;

  const toggleCategory = (category: SearchCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    updateFilters({ categories: newCategories });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];

    updateFilters({ tags: newTags });
  };

  const removeCategory = (category: SearchCategory) => {
    updateFilters({
      categories: filters.categories.filter((c) => c !== category),
    });
  };

  const removeTag = (tag: string) => {
    updateFilters({
      tags: filters.tags.filter((t) => t !== tag),
    });
  };

  const clearAllFilters = () => {
    clearFilters();
  };

  const displayedCategories = showAllCategories
    ? availableCategories
    : availableCategories.slice(0, 6);

  const displayedTags = showAllTags ? availableTags : availableTags.slice(0, 8);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              Active Filters
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge key={category} className="px-2 py-1 text-xs">
                {CATEGORY_LABELS[category as SearchCategory]}
                <button
                  onClick={() => removeCategory(category as SearchCategory)}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {filters.tags.map((tag) => (
              <Badge key={tag} className="px-2 py-1 text-xs">
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {showCategories && availableCategories.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {displayedCategories.map((category) => (
              <Button
                key={category}
                variant={
                  filters.categories.includes(category) ? "default" : "outline"
                }
                size="sm"
                onClick={() => toggleCategory(category)}
                className="justify-start text-xs h-8"
              >
                {CATEGORY_LABELS[category]}
              </Button>
            ))}
          </div>
          {availableCategories.length > 6 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              {showAllCategories ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Show all ({availableCategories.length})
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Tags */}
      {showTags && availableTags.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {displayedTags.map((tag) => (
              <Button
                key={tag}
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag)}
                className="text-xs h-7 px-2"
              >
                {tag}
              </Button>
            ))}
          </div>
          {availableTags.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              {showAllTags ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Show all ({availableTags.length})
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Date Range - Placeholder for future implementation */}
      {showDateRange && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Date Range</h3>
          <div className="text-sm text-muted-foreground">
            Date range filtering coming soon...
          </div>
        </div>
      )}
    </div>
  );

  if (!collapsible) {
    return (
      <div className={cn("bg-muted/30 rounded-lg p-4", className)}>
        <FilterContent />
      </div>
    );
  }

  return (
    <div className={cn("bg-muted/30 rounded-lg", className)}>
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between p-4 h-auto"
      >
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <Badge className="text-xs">
              {filters.categories.length + filters.tags.length}
            </Badge>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <FilterContent />
        </div>
      )}
    </div>
  );
}
