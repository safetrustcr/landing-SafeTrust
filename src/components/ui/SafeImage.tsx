/**
 * Safe Image Component
 * 
 * Wrapper around Next.js Image component that validates URLs before rendering
 * to prevent unnecessary network requests and console errors for invalid images.
 */

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { isValidImageUrl } from '@/utils/image-validation';

export interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined;
  fallback?: React.ReactNode;
  onInvalidUrl?: (url: unknown) => void;
}

/**
 * Safe Image component that prevents rendering invalid image URLs
 * 
 * @example
 * <SafeImage 
 *   src={user.avatar} 
 *   alt="User avatar"
 *   fallback={<div className="bg-gray-100">No Image</div>}
 * />
 */
export const SafeImage = React.forwardRef<HTMLImageElement, SafeImageProps>(
  ({ src, fallback, onInvalidUrl, alt, ...props }, ref) => {
    const isValid = isValidImageUrl(src);
    
    React.useEffect(() => {
      if (!isValid && onInvalidUrl) {
        onInvalidUrl(src);
      }
    }, [isValid, src, onInvalidUrl]);
    
    if (!isValid) {
      return fallback || null;
    }
    
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        {...props}
      />
    );
  }
);

SafeImage.displayName = 'SafeImage';
