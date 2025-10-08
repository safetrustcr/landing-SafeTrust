"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Copy, Check, Filter, Grid, List } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  iconRegistry, 
  getIconsByCategory, 
  searchIcons, 
  getAllCategories,
  getCategoryCount,
  type IconInfo 
} from "@/utils/icon-registry";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";
type FilterCategory = IconInfo['category'] | "all";

interface IconShowcaseProps {
  className?: string;
  defaultCategory?: FilterCategory;
  searchable?: boolean;
  viewModeToggle?: boolean;
}

const IconShowcase: React.FC<IconShowcaseProps> = ({
  className,
  defaultCategory = "all",
  searchable = true,
  viewModeToggle = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>(defaultCategory);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const filteredIcons = useMemo(() => {
    let icons: IconInfo[] = [];

    if (searchQuery.trim()) {
      icons = searchIcons(searchQuery);
    } else if (selectedCategory === "all") {
      icons = Object.values(iconRegistry);
    } else {
      icons = getIconsByCategory(selectedCategory);
    }

    return icons.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedCategory]);

  const handleCopyIcon = async (iconName: string) => {
    const importStatement = `import { ${iconName} } from "lucide-react";`;
    try {
      await navigator.clipboard.writeText(importStatement);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleCopyUsage = async (iconName: string) => {
    const usageExample = `<${iconName} size={24} className="text-foreground" />`;
    try {
      await navigator.clipboard.writeText(usageExample);
      setCopiedIcon(`${iconName}-usage`);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const categories = getAllCategories();

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Icon Showcase</h2>
            <p className="text-muted-foreground">
              Browse and copy {Object.keys(iconRegistry).length} Lucide React icons used in SafeTrust
            </p>
          </div>
          
          {viewModeToggle && (
            <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List size={16} />
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        {searchable && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search icons by name, description, or usage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as FilterCategory)}
                className="px-3 py-2 border border-border rounded-md bg-background text-sm"
              >
                <option value="all">All Categories ({Object.keys(iconRegistry).length})</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} ({getCategoryCount(category)})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Showing {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''}
          </span>
          {searchQuery && (
            <Badge className="text-xs bg-secondary text-secondary-foreground">
              Search: "{searchQuery}"
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge className="text-xs border border-border bg-background">
              Category: {selectedCategory}
            </Badge>
          )}
        </div>
      </div>

      {/* Icons Grid/List */}
      <AnimatePresence mode="wait">
        {filteredIcons.length > 0 ? (
          <motion.div
            key={`${viewMode}-${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-2"
            )}
          >
            {filteredIcons.map((icon) => (
              <IconCard
                key={icon.name}
                icon={icon}
                viewMode={viewMode}
                copiedIcon={copiedIcon}
                onCopyIcon={handleCopyIcon}
                onCopyUsage={handleCopyUsage}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-muted-foreground">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No icons found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface IconCardProps {
  icon: IconInfo;
  viewMode: ViewMode;
  copiedIcon: string | null;
  onCopyIcon: (iconName: string) => void;
  onCopyUsage: (iconName: string) => void;
}

const IconCard: React.FC<IconCardProps> = ({
  icon,
  viewMode,
  copiedIcon,
  onCopyIcon,
  onCopyUsage,
}) => {
  const IconComponent = icon.component;
  const isCopied = copiedIcon === icon.name;
  const isUsageCopied = copiedIcon === `${icon.name}-usage`;

  if (viewMode === "list") {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-muted rounded-lg">
            <IconComponent size={24} className="text-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium text-sm">{icon.name}</h3>
              <Badge className="text-xs border border-border bg-background">
                {icon.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{icon.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {icon.usage.slice(0, 3).map((usage, index) => (
                <Badge key={index} className="text-xs bg-secondary text-secondary-foreground">
                  {usage}
                </Badge>
              ))}
              {icon.usage.length > 3 && (
                <Badge className="text-xs bg-secondary text-secondary-foreground">
                  +{icon.usage.length - 3} more
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopyIcon(icon.name)}
                className="text-xs h-7"
              >
                {isCopied ? <Check size={12} /> : <Copy size={12} />}
                {isCopied ? "Copied!" : "Import"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopyUsage(icon.name)}
                className="text-xs h-7"
              >
                {isUsageCopied ? <Check size={12} /> : <Copy size={12} />}
                {isUsageCopied ? "Copied!" : "Usage"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group p-4 hover:shadow-md transition-all duration-200 hover:scale-105">
      <div className="text-center space-y-3">
        <div className="p-4 bg-muted rounded-lg group-hover:bg-muted/80 transition-colors">
          <IconComponent size={32} className="text-foreground mx-auto" />
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium text-sm truncate">{icon.name}</h3>
          <Badge className="text-xs border border-border bg-background">
            {icon.category}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
          {icon.description}
        </p>

        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopyIcon(icon.name)}
            className="flex-1 text-xs h-7"
          >
            {isCopied ? <Check size={10} /> : <Copy size={10} />}
            {isCopied ? "✓" : "Import"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopyUsage(icon.name)}
            className="flex-1 text-xs h-7"
          >
            {isUsageCopied ? <Check size={10} /> : <Copy size={10} />}
            {isUsageCopied ? "✓" : "Usage"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Example usage components for documentation
export const IconUsageExamples = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Search size={20} className="text-muted-foreground" />
            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
              {`<Search size={20} className="text-muted-foreground" />`}
            </span>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Size Variations</h3>
        <Card className="p-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Search size={16} />
              <div className="text-xs mt-1">16px</div>
            </div>
            <div className="text-center">
              <Search size={24} />
              <div className="text-xs mt-1">24px</div>
            </div>
            <div className="text-center">
              <Search size={32} />
              <div className="text-xs mt-1">32px</div>
            </div>
            <div className="text-center">
              <Search size={48} />
              <div className="text-xs mt-1">48px</div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Color Variations</h3>
        <Card className="p-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Search size={24} className="text-foreground" />
              <div className="text-xs mt-1">Default</div>
            </div>
            <div className="text-center">
              <Search size={24} className="text-primary" />
              <div className="text-xs mt-1">Primary</div>
            </div>
            <div className="text-center">
              <Search size={24} className="text-muted-foreground" />
              <div className="text-xs mt-1">Muted</div>
            </div>
            <div className="text-center">
              <Search size={24} className="text-destructive" />
              <div className="text-xs mt-1">Destructive</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IconShowcase;