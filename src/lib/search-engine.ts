import {
  FAQItem,
  SearchQuery,
  SearchResult,
  SearchResponse,
  SearchCategory,
} from "@/types/search";

// Mock FAQ data - in a real app, this would come from an API or database
const FAQ_DATA: FAQItem[] = [
  {
    id: "1",
    question: "What is SafeTrust?",
    answer:
      "SafeTrust is a decentralized P2P transaction platform that provides secure escrow services and safe deposit solutions using blockchain technology. Our platform ensures trust and security in every transaction between parties.",
    category: "general",
    tags: ["platform", "decentralized", "p2p", "escrow", "blockchain"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    question: "How do I get started with SafeTrust?",
    answer:
      "Getting started with SafeTrust is easy! Simply connect your wallet, verify your account, and start using our secure P2P transaction features. Our intuitive interface and comprehensive onboarding process will guide you through each step.",
    category: "getting-started",
    tags: ["onboarding", "wallet", "verification", "setup"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    question: "What security measures does SafeTrust use?",
    answer:
      "SafeTrust employs multiple layers of security, including smart contracts, multi-signature wallets, and advanced encryption. Our blue-chip security standards ensure your assets are protected throughout every transaction.",
    category: "security",
    tags: [
      "security",
      "smart-contracts",
      "multi-signature",
      "encryption",
      "protection",
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    question: "What are the transaction fees?",
    answer:
      "Our fees are transparent and competitive, starting from 0.5% per transaction for basic users. We offer tiered pricing based on transaction volume, with reduced rates for pro users and custom solutions for enterprise clients.",
    category: "fees",
    tags: ["fees", "pricing", "transparent", "competitive", "tiered"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    question: "Which blockchains does SafeTrust support?",
    answer:
      "SafeTrust supports multiple blockchain networks including Ethereum, Stellar, and other major chains. This ensures maximum flexibility and accessibility for all your P2P transaction needs.",
    category: "blockchain",
    tags: ["blockchain", "ethereum", "stellar", "networks", "compatibility"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

class SearchEngine {
  private faqData: FAQItem[];

  constructor(faqData: FAQItem[] = FAQ_DATA) {
    this.faqData = faqData;
  }

  /**
   * Perform search with query and filters
   */
  async search(searchQuery: SearchQuery): Promise<SearchResponse> {
    const startTime = performance.now();

    try {
      let results = [...this.faqData];

      // Apply category filters
      if (searchQuery.filters.categories.length > 0) {
        results = results.filter((item) =>
          searchQuery.filters.categories.includes(item.category)
        );
      }

      // Apply tag filters
      if (searchQuery.filters.tags.length > 0) {
        results = results.filter((item) =>
          searchQuery.filters.tags.some((tag) =>
            item.tags.some((itemTag) =>
              itemTag.toLowerCase().includes(tag.toLowerCase())
            )
          )
        );
      }

      // Apply date range filter
      if (searchQuery.filters.dateRange) {
        const { start, end } = searchQuery.filters.dateRange;
        results = results.filter(
          (item) => item.createdAt >= start && item.createdAt <= end
        );
      }

      // Perform text search if query exists
      let searchResults: SearchResult[] = [];
      if (searchQuery.query.trim()) {
        searchResults = this.performTextSearch(results, searchQuery.query);
        // Sort by relevance score
        searchResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
      } else {
        // If no query, convert FAQ items to search results
        searchResults = results.map((item) => ({
          item,
          relevanceScore: 1,
          highlightedQuestion: item.question,
          highlightedAnswer: item.answer,
          matchedTerms: [],
        }));
      }

      // Apply pagination
      const offset = searchQuery.offset || 0;
      const limit = searchQuery.limit || 50;
      const paginatedResults = searchResults.slice(offset, offset + limit);

      const searchTime = performance.now() - startTime;

      return {
        results: paginatedResults,
        totalCount: searchResults.length,
        query: searchQuery.query,
        filters: searchQuery.filters,
        searchTime,
      };
    } catch (error) {
      console.error("Search error:", error);
      throw new Error("Search failed");
    }
  }

  /**
   * Perform text search with relevance scoring
   */
  private performTextSearch(items: FAQItem[], query: string): SearchResult[] {
    const queryTerms = this.tokenizeQuery(query.toLowerCase());

    const searchResults: SearchResult[] = [];

    items.forEach((item) => {
      const questionScore = this.calculateRelevanceScore(
        item.question,
        queryTerms
      );
      const answerScore = this.calculateRelevanceScore(item.answer, queryTerms);
      const tagScore = this.calculateTagRelevanceScore(item.tags, queryTerms);

      // Weighted scoring: question (40%), answer (35%), tags (25%)
      const relevanceScore =
        questionScore * 0.4 + answerScore * 0.35 + tagScore * 0.25;

      if (relevanceScore > 0) {
        searchResults.push({
          item,
          relevanceScore,
          highlightedQuestion: this.highlightText(item.question, queryTerms),
          highlightedAnswer: this.highlightText(item.answer, queryTerms),
          matchedTerms: this.getMatchedTerms(item, queryTerms),
        });
      }
    });

    return searchResults;
  }

  /**
   * Calculate relevance score for text content
   */
  private calculateRelevanceScore(text: string, queryTerms: string[]): number {
    const textLower = text.toLowerCase();
    let score = 0;

    for (const term of queryTerms) {
      // Exact phrase match (highest score)
      if (textLower.includes(term)) {
        score += 10;

        // Bonus for exact word matches
        const wordRegex = new RegExp(`\\b${term}\\b`, "gi");
        const wordMatches = (textLower.match(wordRegex) || []).length;
        score += wordMatches * 5;
      }
    }

    return score;
  }

  /**
   * Calculate relevance score for tags
   */
  private calculateTagRelevanceScore(
    tags: string[],
    queryTerms: string[]
  ): number {
    let score = 0;

    for (const tag of tags) {
      for (const term of queryTerms) {
        if (tag.toLowerCase().includes(term.toLowerCase())) {
          score += 8; // Higher score for tag matches
        }
      }
    }

    return score;
  }

  /**
   * Tokenize search query into individual terms
   */
  private tokenizeQuery(query: string): string[] {
    return query
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 0)
      .map((term) => term.replace(/[^\w]/g, ""));
  }

  /**
   * Highlight matching terms in text
   */
  private highlightText(text: string, queryTerms: string[]): string {
    let highlightedText = text;

    for (const term of queryTerms) {
      if (term.length > 0) {
        const regex = new RegExp(`(${term})`, "gi");
        highlightedText = highlightedText.replace(
          regex,
          '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
        );
      }
    }

    return highlightedText;
  }

  /**
   * Get matched terms for a search result
   */
  private getMatchedTerms(item: FAQItem, queryTerms: string[]): string[] {
    const matchedTerms: string[] = [];
    const allText = `${item.question} ${item.answer} ${item.tags.join(
      " "
    )}`.toLowerCase();

    for (const term of queryTerms) {
      if (allText.includes(term.toLowerCase())) {
        matchedTerms.push(term);
      }
    }

    return matchedTerms;
  }

  /**
   * Get all available categories
   */
  getCategories(): SearchCategory[] {
    const categories = new Set<SearchCategory>();
    this.faqData.forEach((item) =>
      categories.add(item.category as SearchCategory)
    );
    return Array.from(categories);
  }

  /**
   * Get all available tags
   */
  getTags(): string[] {
    const tags = new Set<string>();
    this.faqData.forEach((item) => item.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }

  /**
   * Get autocomplete suggestions
   */
  getAutocompleteSuggestions(query: string, limit: number = 5): string[] {
    if (query.length < 2) return [];

    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    // Add matching questions
    this.faqData.forEach((item) => {
      if (item.question.toLowerCase().includes(queryLower)) {
        suggestions.add(item.question);
      }
    });

    // Add matching tags
    this.getTags().forEach((tag) => {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.add(tag);
      }
    });

    return Array.from(suggestions).slice(0, limit);
  }
}

// Export singleton instance
export const searchEngine = new SearchEngine();
export default SearchEngine;
