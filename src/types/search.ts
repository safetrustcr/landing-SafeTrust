export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  categories: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags: string[];
}

export interface SearchQuery {
  query: string;
  filters: SearchFilters;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  item: FAQItem;
  relevanceScore: number;
  highlightedQuestion: string;
  highlightedAnswer: string;
  matchedTerms: string[];
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  query: string;
  filters: SearchFilters;
  searchTime: number;
}

export interface SearchAnalytics {
  query: string;
  timestamp: Date;
  resultCount: number;
  clickedResults: string[];
  filtersUsed: SearchFilters;
}

export interface RecentSearch {
  query: string;
  timestamp: Date;
  resultCount: number;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  recentSearches: RecentSearch[];
  searchAnalytics: SearchAnalytics[];
}

export interface SearchConfig {
  debounceDelay: number;
  maxRecentSearches: number;
  maxAnalyticsEntries: number;
  minQueryLength: number;
}

export type SearchCategory =
  | "general"
  | "security"
  | "fees"
  | "getting-started"
  | "blockchain"
  | "technical"
  | "support";
