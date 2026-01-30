

export interface BundleBudget {
  name: string;
  maxSize: number; // in KB
  currentSize?: number;
  status?: 'ok' | 'warning' | 'exceeded';
}

export const BUNDLE_BUDGETS: BundleBudget[] = [
  { name: 'First Load JS', maxSize: 100 },
  { name: 'Page JS', maxSize: 50 },
  { name: 'Shared Chunks', maxSize: 150 },
  { name: 'Total Initial', maxSize: 300 },
];

export const PERFORMANCE_BUDGETS = {
  firstContentfulPaint: 1800,
  largestContentfulPaint: 2500,
  timeToInteractive: 3800,
  totalBlockingTime: 200,
  cumulativeLayoutShift: 0.1,
  speedIndex: 3400,
};

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function checkBudget(currentSize: number, maxSize: number): 'ok' | 'warning' | 'exceeded' {
  const ratio = currentSize / maxSize;
  if (ratio <= 0.8) return 'ok';
  if (ratio <= 1) return 'warning';
  return 'exceeded';
}

export const HEAVY_DEPENDENCIES = [
  'moment',
  'lodash',
  'jquery',
  'bootstrap',
  'material-ui',
  'antd',
] as const;

export const RECOMMENDED_ALTERNATIVES: Record<string, string> = {
  moment: 'date-fns or dayjs',
  lodash: 'lodash-es with tree-shaking or native methods',
  jquery: 'Native DOM APIs',
  bootstrap: 'Tailwind CSS',
  'material-ui': 'Consider lighter alternatives or tree-shake properly',
  antd: 'Consider lighter alternatives or use babel-plugin-import',
};

export function getOptimizationTips(): string[] {
  return [
    'Use dynamic imports for below-the-fold components',
    'Implement route-based code splitting',
    'Lazy load heavy libraries only when needed',
    'Use next/image for automatic image optimization',
    'Enable gzip/brotli compression on your server',
    'Remove unused CSS with PurgeCSS or Tailwind JIT',
    'Use tree-shaking friendly imports (import { x } from "lib")',
    'Consider using lighter alternatives for heavy dependencies',
    'Analyze and remove duplicate dependencies',
    'Use production builds for all dependencies',
  ];
}

export function analyzeDependencySize(packageName: string): {
  isHeavy: boolean;
  alternative?: string;
} {
  const isHeavy = HEAVY_DEPENDENCIES.includes(packageName as typeof HEAVY_DEPENDENCIES[number]);
  return {
    isHeavy,
    alternative: isHeavy ? RECOMMENDED_ALTERNATIVES[packageName] : undefined,
  };
}
