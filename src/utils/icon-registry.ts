import {
  // Navigation Icons
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Home,
  ExternalLink,

  // Action Icons
  Search,
  Filter,
  Download,
  Upload,
  Copy,
  RefreshCw,
  Check,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  
  // Status Icons
  AlertTriangle,
  Bug,
  ServerCrash,
  Wifi,
  WifiOff,
  Clock,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Minus,
  
  // Security Icons
  Shield,
  ShieldCheck,
  Lock,
  KeyRound,
  
  // Business Icons
  Wallet,
  DollarSign,
  
  // Communication Icons
  Mail,
  Phone,
  
  // Data & Analytics Icons
  BarChart3,
  LineChart,
  Calendar,
  
  // UI Icons
  Sun,
  Moon,
  Monitor,
  Circle,
  
  // Technology Icons
  Globe,
  Brain,
  Link2,
  
  // File Icons
  FileX,
} from "lucide-react";

export interface IconInfo {
  name: string;
  component: React.ComponentType<any>;
  category: 'navigation' | 'action' | 'status' | 'security' | 'business' | 'communication' | 'analytics' | 'ui' | 'technology' | 'file';
  description: string;
  usage: string[];
  commonProps: string[];
}

export const iconRegistry: Record<string, IconInfo> = {
  // Navigation Icons
  ChevronDown: {
    name: "ChevronDown",
    component: ChevronDown,
    category: "navigation",
    description: "Downward pointing chevron for dropdowns and expandable content",
    usage: ["Dropdown menus", "Accordions", "Expandable sections", "Sort indicators"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  ChevronUp: {
    name: "ChevronUp",
    component: ChevronUp,
    category: "navigation",
    description: "Upward pointing chevron for collapsible content",
    usage: ["Collapse sections", "Back to top", "Sort indicators", "Filter toggles"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  ChevronRight: {
    name: "ChevronRight",
    component: ChevronRight,
    category: "navigation",
    description: "Right pointing chevron for navigation and progression",
    usage: ["Breadcrumbs", "Menu items", "Next buttons", "Nested navigation"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  ArrowLeft: {
    name: "ArrowLeft",
    component: ArrowLeft,
    category: "navigation",
    description: "Left pointing arrow for back navigation",
    usage: ["Back buttons", "Previous navigation", "Breadcrumbs"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  ArrowRight: {
    name: "ArrowRight",
    component: ArrowRight,
    category: "navigation",
    description: "Right pointing arrow for forward navigation",
    usage: ["Next buttons", "Call-to-action buttons", "Process steps", "Links"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Menu: {
    name: "Menu",
    component: Menu,
    category: "navigation",
    description: "Hamburger menu icon for mobile navigation",
    usage: ["Mobile menu toggle", "Navigation drawer", "Sidebar toggle"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  X: {
    name: "X",
    component: X,
    category: "navigation",
    description: "Close icon for dismissing content",
    usage: ["Close buttons", "Clear inputs", "Dismiss modals", "Remove items"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Home: {
    name: "Home",
    component: Home,
    category: "navigation",
    description: "Home icon for main page navigation",
    usage: ["Homepage links", "Breadcrumb home", "Navigation menu", "Error page recovery"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  ExternalLink: {
    name: "ExternalLink",
    component: ExternalLink,
    category: "navigation",
    description: "External link indicator",
    usage: ["External URLs", "New tab links", "Third-party resources"],
    commonProps: ["size", "className", "strokeWidth"]
  },

  // Action Icons
  Search: {
    name: "Search",
    component: Search,
    category: "action",
    description: "Search icon for search functionality",
    usage: ["Search bars", "Search buttons", "Find features", "Filter search"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Filter: {
    name: "Filter",
    component: Filter,
    category: "action",
    description: "Filter icon for filtering content",
    usage: ["Filter controls", "Search filters", "Data filtering", "Content sorting"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Download: {
    name: "Download",
    component: Download,
    category: "action",
    description: "Download icon for file downloads",
    usage: ["Download buttons", "Export data", "Save files", "PDF downloads"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Copy: {
    name: "Copy",
    component: Copy,
    category: "action",
    description: "Copy icon for copying content to clipboard",
    usage: ["Copy buttons", "Copy to clipboard", "Duplicate content", "Share links"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  RefreshCw: {
    name: "RefreshCw",
    component: RefreshCw,
    category: "action",
    description: "Refresh icon for reloading content",
    usage: ["Refresh buttons", "Reload data", "Retry actions", "Update content"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Check: {
    name: "Check",
    component: Check,
    category: "action",
    description: "Checkmark icon for confirmation and success",
    usage: ["Success indicators", "Completed tasks", "Selected items", "Validation"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  CheckCircle: {
    name: "CheckCircle",
    component: CheckCircle,
    category: "action",
    description: "Checkmark in circle for success states",
    usage: ["Success messages", "Completed status", "Verified items", "Positive feedback"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  XCircle: {
    name: "XCircle",
    component: XCircle,
    category: "action",
    description: "X mark in circle for error states",
    usage: ["Error messages", "Failed status", "Rejected items", "Negative feedback"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Eye: {
    name: "Eye",
    component: Eye,
    category: "action",
    description: "Eye icon for viewing/showing content",
    usage: ["Show password", "View details", "Preview content", "Visibility toggle"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  EyeOff: {
    name: "EyeOff",
    component: EyeOff,
    category: "action",
    description: "Eye with slash for hiding content",
    usage: ["Hide password", "Hide details", "Privacy mode", "Visibility toggle"],
    commonProps: ["size", "className", "strokeWidth"]
  },

  // Status Icons
  AlertTriangle: {
    name: "AlertTriangle",
    component: AlertTriangle,
    category: "status",
    description: "Warning triangle for alerts and warnings",
    usage: ["Warning messages", "Error alerts", "Caution indicators", "Important notices"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Bug: {
    name: "Bug",
    component: Bug,
    category: "status",
    description: "Bug icon for errors and issues",
    usage: ["Error reporting", "Bug reports", "Issue tracking", "Debug mode"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  ServerCrash: {
    name: "ServerCrash",
    component: ServerCrash,
    category: "status",
    description: "Server crash icon for system errors",
    usage: ["Server errors", "System failures", "Service unavailable", "Critical errors"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Wifi: {
    name: "Wifi",
    component: Wifi,
    category: "status",
    description: "WiFi icon for network connectivity",
    usage: ["Network status", "Connection indicators", "Online status", "Signal strength"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  WifiOff: {
    name: "WifiOff",
    component: WifiOff,
    category: "status",
    description: "WiFi off icon for no network connection",
    usage: ["No connection", "Offline status", "Network errors", "Disconnected state"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Clock: {
    name: "Clock",
    component: Clock,
    category: "status",
    description: "Clock icon for time-related content",
    usage: ["Timestamps", "Duration", "Schedule", "Pending status", "Time filters"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  TrendingUp: {
    name: "TrendingUp",
    component: TrendingUp,
    category: "status",
    description: "Trending up icon for positive growth",
    usage: ["Analytics", "Growth indicators", "Positive trends", "Performance metrics"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  ArrowUp: {
    name: "ArrowUp",
    component: ArrowUp,
    category: "status",
    description: "Up arrow for increase indicators",
    usage: ["Increase values", "Positive change", "Sort ascending", "Go to top"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  ArrowDown: {
    name: "ArrowDown",
    component: ArrowDown,
    category: "status",
    description: "Down arrow for decrease indicators",
    usage: ["Decrease values", "Negative change", "Sort descending", "Go to bottom"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Minus: {
    name: "Minus",
    component: Minus,
    category: "status",
    description: "Minus icon for neutral or no change",
    usage: ["No change", "Neutral status", "Remove items", "Collapse content"],
    commonProps: ["size", "className", "strokeWidth"]
  },

  // Security Icons
  Shield: {
    name: "Shield",
    component: Shield,
    category: "security",
    description: "Shield icon for security and protection",
    usage: ["Security features", "Protection indicators", "Trust badges", "Safety measures"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  ShieldCheck: {
    name: "ShieldCheck",
    component: ShieldCheck,
    category: "security",
    description: "Shield with checkmark for verified security",
    usage: ["Security verification", "Trust indicators", "Protection confirmed", "Safe status"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Lock: {
    name: "Lock",
    component: Lock,
    category: "security",
    description: "Lock icon for secured content",
    usage: ["Secure features", "Private content", "Authentication", "Encryption"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  KeyRound: {
    name: "KeyRound",
    component: KeyRound,
    category: "security",
    description: "Key icon for access and authentication",
    usage: ["Authentication", "API keys", "Access control", "Password features"],
    commonProps: ["size", "className", "strokeWidth"]
  },

  // Business Icons
  Wallet: {
    name: "Wallet",
    component: Wallet,
    category: "business",
    description: "Wallet icon for financial features",
    usage: ["Payment methods", "Wallet connections", "Financial features", "Money management"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  DollarSign: {
    name: "DollarSign",
    component: DollarSign,
    category: "business",
    description: "Dollar sign for pricing and financial content",
    usage: ["Pricing", "Cost indicators", "Financial metrics", "Revenue data"],
    commonProps: ["size", "className", "strokeWidth"]
  },

  // Communication Icons
  Mail: {
    name: "Mail",
    component: Mail,
    category: "communication",
    description: "Email icon for email-related features",
    usage: ["Email links", "Contact information", "Newsletter signup", "Communication"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Phone: {
    name: "Phone",
    component: Phone,
    category: "communication",
    description: "Phone icon for phone-related features",
    usage: ["Phone numbers", "Contact information", "Support calls", "Communication"],
    commonProps: ["size", "className", "strokeWidth"]
  },

  // Data & Analytics Icons
  BarChart3: {
    name: "BarChart3",
    component: BarChart3,
    category: "analytics",
    description: "Bar chart icon for data visualization",
    usage: ["Analytics dashboards", "Data charts", "Statistics", "Reports"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  LineChart: {
    name: "LineChart",
    component: LineChart,
    category: "analytics",
    description: "Line chart icon for trend visualization",
    usage: ["Trend analysis", "Time series data", "Performance charts", "Analytics"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Calendar: {
    name: "Calendar",
    component: Calendar,
    category: "analytics",
    description: "Calendar icon for date-related features",
    usage: ["Date pickers", "Schedule", "Event dates", "Time filters"],
    commonProps: ["size", "className", "strokeWidth"]
  },

  // UI Icons
  Sun: {
    name: "Sun",
    component: Sun,
    category: "ui",
    description: "Sun icon for light theme",
    usage: ["Light mode toggle", "Theme switcher", "Bright theme", "Day mode"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Moon: {
    name: "Moon",
    component: Moon,
    category: "ui",
    description: "Moon icon for dark theme",
    usage: ["Dark mode toggle", "Theme switcher", "Night theme", "Dark mode"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Monitor: {
    name: "Monitor",
    component: Monitor,
    category: "ui",
    description: "Monitor icon for system theme",
    usage: ["System theme", "Auto theme", "Device theme", "Theme switcher"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Circle: {
    name: "Circle",
    component: Circle,
    category: "ui",
    description: "Circle icon for UI elements",
    usage: ["Bullet points", "Status indicators", "Radio buttons", "Decorative elements"],
    commonProps: ["size", "className", "strokeWidth"]
  },

  // Technology Icons
  Globe: {
    name: "Globe",
    component: Globe,
    category: "technology",
    description: "Globe icon for global or web features",
    usage: ["Web features", "Global reach", "International", "Online services"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Brain: {
    name: "Brain",
    component: Brain,
    category: "technology",
    description: "Brain icon for AI and smart features",
    usage: ["AI features", "Smart technology", "Machine learning", "Intelligence"],
    commonProps: ["size", "className", "strokeWidth"]
  },
  Link2: {
    name: "Link2",
    component: Link2,
    category: "technology",
    description: "Link icon for connections and relationships",
    usage: ["Link sharing", "Connections", "Relationships", "URL links"],
    commonProps: ["size", "className", "strokeWidth"]
  },

  // File Icons
  FileX: {
    name: "FileX",
    component: FileX,
    category: "file",
    description: "File with X for missing or error files",
    usage: ["File not found", "Missing files", "File errors", "404 pages"],
    commonProps: ["size", "className", "strokeWidth"]
  },
};

export const getIconsByCategory = (category: IconInfo['category']): IconInfo[] => {
  return Object.values(iconRegistry).filter(icon => icon.category === category);
};

export const searchIcons = (query: string): IconInfo[] => {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(iconRegistry).filter(icon => 
    icon.name.toLowerCase().includes(lowercaseQuery) ||
    icon.description.toLowerCase().includes(lowercaseQuery) ||
    icon.usage.some(usage => usage.toLowerCase().includes(lowercaseQuery))
  );
};

export const getAllCategories = (): IconInfo['category'][] => {
  return ['navigation', 'action', 'status', 'security', 'business', 'communication', 'analytics', 'ui', 'technology', 'file'];
};

export const getIconCount = (): number => {
  return Object.keys(iconRegistry).length;
};

export const getCategoryCount = (category: IconInfo['category']): number => {
  return getIconsByCategory(category).length;
};