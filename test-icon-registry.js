// Test script for icon registry functionality
// Run this in browser console to test the icon registry

import { 
  iconRegistry, 
  getIconsByCategory, 
  searchIcons, 
  getAllCategories,
  getIconCount,
  getCategoryCount 
} from "@/utils/icon-registry";

// Test 1: Check total icon count
console.log("Total icons:", getIconCount()); // Should return 49

// Test 2: Check all categories
console.log("All categories:", getAllCategories());

// Test 3: Test category filtering
console.log("Navigation icons:", getIconsByCategory("navigation"));
console.log("Security icons:", getIconsByCategory("security"));

// Test 4: Test search functionality
console.log("Search 'search':", searchIcons("search"));
console.log("Search 'arrow':", searchIcons("arrow"));
console.log("Search 'button':", searchIcons("button"));

// Test 5: Check category counts
console.log("Navigation count:", getCategoryCount("navigation")); // Should be 9
console.log("Action count:", getCategoryCount("action")); // Should be 10
console.log("Security count:", getCategoryCount("security")); // Should be 4

// Test 6: Verify specific icons exist
console.log("Search icon exists:", iconRegistry.Search ? "✅" : "❌");
console.log("ChevronDown icon exists:", iconRegistry.ChevronDown ? "✅" : "❌");
console.log("Shield icon exists:", iconRegistry.Shield ? "✅" : "❌");

// Test 7: Check icon metadata structure
const searchIcon = iconRegistry.Search;
if (searchIcon) {
  console.log("Search icon metadata:", {
    name: searchIcon.name,
    category: searchIcon.category,
    description: searchIcon.description,
    usage: searchIcon.usage,
    commonProps: searchIcon.commonProps
  });
}

console.log("🎉 Icon registry tests completed!");