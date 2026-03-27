/**
 * Safe Avatar Component
 * 
 * Prevents unnecessary network requests for invalid image URLs.
 * Automatically renders a fallback with user initials when no valid image is available.
 */

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { isValidImageUrl, generateInitials } from '@/utils/image-validation';

export interface SafeAvatarProps {
  src?: string | null;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isActive?: boolean;
  showTooltip?: boolean;
  fallbackColor?: string;
}

const sizeMap = {
  xs: { container: 'w-8 h-8', text: 'text-xs', imageSize: 32 },
  sm: { container: 'w-10 h-10', text: 'text-sm', imageSize: 40 },
  md: { container: 'w-12 h-12', text: 'text-base', imageSize: 48 },
  lg: { container: 'w-14 h-14', text: 'text-lg', imageSize: 56 },
  xl: { container: 'w-16 h-16', text: 'text-xl', imageSize: 64 },
} as const;

/**
 * Safe Avatar component that prevents unnecessary image requests
 * 
 * @example
 * <SafeAvatar src={user.avatar} name={user.name} size="md" />
 * // If src is invalid/null, shows initials instead of making failed requests
 */
export const SafeAvatar = React.forwardRef<HTMLDivElement, SafeAvatarProps>(
  ({
    src,
    name,
    size = 'md',
    className,
    isActive = false,
    showTooltip = true,
    fallbackColor = 'f3f4f6',
  }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    // Validate the image URL - prevents network request if invalid
    const hasValidImage = isValidImageUrl(src) && !imageError;
    const initials = generateInitials(name, 2);
    const config = sizeMap[size];
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br',
          'ring-2 ring-offset-2 ring-offset-background transition-all duration-300',
          config.container,
          isActive ? 'ring-primary' : 'ring-border',
          'from-primary/20 to-primary/40',
          className
        )}
        title={showTooltip ? name : undefined}
        role="img"
        aria-label={`Avatar for ${name}`}
      >
        {hasValidImage ? (
          <Image
            src={src!}
            alt={`${name}'s profile picture`}
            width={config.imageSize}
            height={config.imageSize}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            priority={size === 'lg' || size === 'xl'}
          />
        ) : (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center',
              'bg-primary/20 text-primary font-semibold',
              config.text
            )}
          >
            {initials}
          </div>
        )}
      </div>
    );
  }
);

SafeAvatar.displayName = 'SafeAvatar';
