"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Clock, ChevronDown } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showRecentSearches?: boolean;
  showAutocomplete?: boolean;
  autoFocus?: boolean;
}

export default function SearchBar({
  placeholder = "Search FAQs...",
  className,
  showRecentSearches = true,
  showAutocomplete = true,
  autoFocus = false,
}: SearchBarProps) {
  const {
    query,
    search,
    clearSearch,
    recentSearches,
    getAutocompleteSuggestions,
  } = useSearch();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    string[]
  >([]);
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle autocomplete suggestions
  useEffect(() => {
    if (query.length >= 2 && showAutocomplete) {
      const suggestions = getAutocompleteSuggestions(query);
      setAutocompleteSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setAutocompleteSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, getAutocompleteSuggestions, showAutocomplete]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setShowRecent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    search(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    search(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleRecentSearchClick = (recentQuery: string) => {
    search(recentQuery);
    setShowRecent(false);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (recentSearches.length > 0 && showRecentSearches) {
      setShowRecent(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
      setShowRecent(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="pl-10 pr-10 h-12 text-base bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/70 focus:ring-primary/20 hover:border-primary/50 transition-all duration-300 placeholder:text-muted-foreground"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Autocomplete Suggestions */}
      {showSuggestions && autocompleteSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto"
        >
          {autocompleteSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors duration-200 border-b border-border/30 last:border-b-0 text-foreground hover:text-primary"
            >
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Recent Searches */}
      {showRecent && recentSearches.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto"
        >
          <div className="px-4 py-2 border-b border-border/30 bg-muted/20">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Recent searches</span>
            </div>
          </div>
          {recentSearches.map((recent, index) => (
            <button
              key={index}
              onClick={() => handleRecentSearchClick(recent.query)}
              className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors duration-200 border-b border-border/30 last:border-b-0 text-foreground hover:text-primary"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{recent.query}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {recent.resultCount} results
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Recent Searches Toggle (when not focused) */}
      {!showRecent && recentSearches.length > 0 && showRecentSearches && (
        <div className="absolute top-full right-0 mt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRecent(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Clock className="h-4 w-4 mr-1" />
            Recent
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
