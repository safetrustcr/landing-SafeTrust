"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { searchEngine } from "@/lib/search-engine";
import {
  SearchState,
  SearchQuery,
  SearchResponse,
  SearchFilters,
  RecentSearch,
  SearchAnalytics,
  SearchConfig,
} from "@/types/search";

const DEFAULT_CONFIG: SearchConfig = {
  debounceDelay: 300,
  maxRecentSearches: 10,
  maxAnalyticsEntries: 100,
  minQueryLength: 2,
};

const STORAGE_KEYS = {
  recentSearches: "safetrust_recent_searches",
  searchAnalytics: "safetrust_search_analytics",
};

export function useSearch(config: Partial<SearchConfig> = {}) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<SearchState>({
    query: "",
    results: [],
    filters: {
      categories: [],
      tags: [],
    },
    isLoading: false,
    error: null,
    totalCount: 0,
    recentSearches: [],
    searchAnalytics: [],
  });

  const loadStoredData = useCallback(() => {
    try {
      const recentSearches = localStorage.getItem(STORAGE_KEYS.recentSearches);
      const searchAnalytics = localStorage.getItem(
        STORAGE_KEYS.searchAnalytics
      );

      setState((prev) => ({
        ...prev,
        recentSearches: recentSearches ? JSON.parse(recentSearches) : [],
        searchAnalytics: searchAnalytics ? JSON.parse(searchAnalytics) : [],
      }));
    } catch (error) {
      console.error("Failed to load stored search data:", error);
    }
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    loadStoredData();
  }, [loadStoredData]);

  const saveRecentSearches = useCallback((searches: RecentSearch[]) => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.recentSearches,
        JSON.stringify(searches)
      );
    } catch (error) {
      console.error("Failed to save recent searches:", error);
    }
  }, []);

  const saveSearchAnalytics = useCallback((analytics: SearchAnalytics[]) => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.searchAnalytics,
        JSON.stringify(analytics)
      );
    } catch (error) {
      console.error("Failed to save search analytics:", error);
    }
  }, []);

  const addRecentSearch = useCallback(
    (query: string, resultCount: number) => {
      const recentSearch: RecentSearch = {
        query,
        timestamp: new Date(),
        resultCount,
      };

      setState((prev) => {
        const newRecentSearches = [
          recentSearch,
          ...prev.recentSearches.filter((s) => s.query !== query),
        ].slice(0, finalConfig.maxRecentSearches);

        saveRecentSearches(newRecentSearches);

        return {
          ...prev,
          recentSearches: newRecentSearches,
        };
      });
    },
    [finalConfig.maxRecentSearches, saveRecentSearches]
  );

  const addSearchAnalytics = useCallback(
    (query: string, resultCount: number, filters: SearchFilters) => {
      const analytics: SearchAnalytics = {
        query,
        timestamp: new Date(),
        resultCount,
        clickedResults: [],
        filtersUsed: filters,
      };

      setState((prev) => {
        const newAnalytics = [
          analytics,
          ...prev.searchAnalytics.filter((a) => a.query !== query),
        ].slice(0, finalConfig.maxAnalyticsEntries);

        saveSearchAnalytics(newAnalytics);

        return {
          ...prev,
          searchAnalytics: newAnalytics,
        };
      });
    },
    [finalConfig.maxAnalyticsEntries, saveSearchAnalytics]
  );

  const performSearch = useCallback(
    async (searchQuery: SearchQuery) => {
      if (
        searchQuery.query.length < finalConfig.minQueryLength &&
        searchQuery.query.length > 0
      ) {
        setState((prev) => ({
          ...prev,
          results: [],
          totalCount: 0,
          error: null,
        }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response: SearchResponse = await searchEngine.search(searchQuery);

        setState((prev) => ({
          ...prev,
          results: response.results,
          totalCount: response.totalCount,
          isLoading: false,
          error: null,
        }));

        // Add to recent searches if query is not empty
        if (searchQuery.query.trim()) {
          addRecentSearch(searchQuery.query, response.totalCount);
          addSearchAnalytics(
            searchQuery.query,
            response.totalCount,
            searchQuery.filters
          );
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Search failed",
        }));
      }
    },
    [finalConfig.minQueryLength, addRecentSearch, addSearchAnalytics]
  );

  const debouncedSearch = useCallback(
    (searchQuery: SearchQuery) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, finalConfig.debounceDelay);
    },
    [performSearch, finalConfig.debounceDelay]
  );

  const search = useCallback(
    (query: string) => {
      setState((prev) => ({ ...prev, query }));

      const searchQuery: SearchQuery = {
        query,
        filters: state.filters,
      };

      debouncedSearch(searchQuery);
    },
    [state.filters, debouncedSearch]
  );

  const updateFilters = useCallback(
    (filters: Partial<SearchFilters>) => {
      setState((prev) => {
        const newFilters = { ...prev.filters, ...filters };
        const searchQuery: SearchQuery = {
          query: prev.query,
          filters: newFilters,
        };

        debouncedSearch(searchQuery);

        return {
          ...prev,
          filters: newFilters,
        };
      });
    },
    [debouncedSearch]
  );

  const clearSearch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      query: "",
      results: [],
      totalCount: 0,
      error: null,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setState((prev) => {
      const newFilters: SearchFilters = {
        categories: [],
        tags: [],
      };

      const searchQuery: SearchQuery = {
        query: prev.query,
        filters: newFilters,
      };

      debouncedSearch(searchQuery);

      return {
        ...prev,
        filters: newFilters,
      };
    });
  }, [debouncedSearch]);

  const clearRecentSearches = useCallback(() => {
    setState((prev) => ({
      ...prev,
      recentSearches: [],
    }));
    saveRecentSearches([]);
  }, [saveRecentSearches]);

  const getAutocompleteSuggestions = useCallback((query: string) => {
    return searchEngine.getAutocompleteSuggestions(query);
  }, []);

  const getCategories = useCallback(() => {
    return searchEngine.getCategories();
  }, []);

  const getTags = useCallback(() => {
    return searchEngine.getTags();
  }, []);

  const trackResultClick = useCallback(
    (resultId: string) => {
      setState((prev) => {
        const updatedAnalytics = prev.searchAnalytics.map((analytics) => {
          if (analytics.query === prev.query) {
            return {
              ...analytics,
              clickedResults: [...analytics.clickedResults, resultId],
            };
          }
          return analytics;
        });

        saveSearchAnalytics(updatedAnalytics);

        return {
          ...prev,
          searchAnalytics: updatedAnalytics,
        };
      });
    },
    [saveSearchAnalytics]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    ...state,

    // Actions
    search,
    updateFilters,
    clearSearch,
    clearFilters,
    clearRecentSearches,

    // Utilities
    getAutocompleteSuggestions,
    getCategories,
    getTags,
    trackResultClick,
  };
}
