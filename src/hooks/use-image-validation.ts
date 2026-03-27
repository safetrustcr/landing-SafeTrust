/**
 * useImageValidation Hook
 * 
 * Custom hook for safely validating and managing image loading state
 * Prevents unnecessary network requests for invalid image URLs
 */

import { useState, useEffect, useCallback } from 'react';
import { isValidImageUrl } from '@/utils/image-validation';

export interface UseImageValidationOptions {
  onError?: (error: Error) => void;
  onLoad?: () => void;
  preloadImage?: boolean;
}

export interface UseImageValidationResult {
  isValid: boolean;
  hasError: boolean;
  isLoading: boolean;
  imageUrl?: string;
  retry: () => void;
  setError: (error: Error | null) => void;
}

/**
 * Hook for validating and managing image loading state
 * 
 * @example
 * const { isValid, imageUrl } = useImageValidation(userAvatar, {
 *   onError: (e) => console.log('Image failed to load:', e)
 * });
 * 
 * if (isValid && imageUrl) {
 *   return <Image src={imageUrl} alt="avatar" />
 * }
 * return <Fallback />
 */
export function useImageValidation(
  src: string | null | undefined,
  options: UseImageValidationOptions = {}
): UseImageValidationResult {
  const { onError, onLoad, preloadImage = false } = options;
  
  const [isValid, setIsValid] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validUrl, setValidUrl] = useState<string | undefined>();
  
  const validateUrl = useCallback(() => {
    if (isValidImageUrl(src)) {
      setValidUrl(src);
      setIsValid(true);
      setHasError(false);
    } else {
      setValidUrl(undefined);
      setIsValid(false);
    }
  }, [src]);
  
  const preload = useCallback(async (url: string) => {
    if (!preloadImage) return;
    
    setIsLoading(true);
    try {
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
      onLoad?.();
      setIsLoading(false);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setHasError(true);
      onError?.(err);
      setIsLoading(false);
    }
  }, [onError, onLoad, preloadImage]);
  
  const retry = useCallback(() => {
    setHasError(false);
    validateUrl();
    if (isValid && validUrl) {
      preload(validUrl);
    }
  }, [isValid, validUrl, validateUrl, preload]);
  
  const setError = useCallback((error: Error | null) => {
    if (error) {
      setHasError(true);
      onError?.(error);
    } else {
      setHasError(false);
    }
  }, [onError]);
  
  // Validate URL on mount and when src changes
  useEffect(() => {
    validateUrl();
  }, [src, validateUrl]);
  
  // Preload image if enabled
  useEffect(() => {
    if (isValid && validUrl && preloadImage) {
      preload(validUrl);
    }
  }, [isValid, validUrl, preloadImage, preload]);
  
  return {
    isValid,
    hasError,
    isLoading,
    imageUrl: validUrl,
    retry,
    setError,
  };
}
