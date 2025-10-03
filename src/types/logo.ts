export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LogoProps {
  size?: LogoSize;
  animated?: boolean;
  className?: string;
  /**
   * Optional accessible label for the logo. Falls back to "SafeTrust" if omitted.
   */
  'aria-label'?: string;
}

export interface AnimatedLogoProps extends LogoProps {
  /** When true, shows a subtle loading animation around the logo */
  loading?: boolean;
}

export const logoSizePx: Record<LogoSize, number> = {
  sm: 20,
  md: 28,
  lg: 36,
  xl: 48,
};
