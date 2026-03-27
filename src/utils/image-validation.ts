/**
 * Image Validation Utilities
 * 
 * Provides functions to validate image URLs and prevent unnecessary network requests
 * for invalid or missing images. Prevents console errors and network failures.
 */

/**
 * Checks if a value is a valid image URL string
 * @param url - The URL to validate
 * @returns true if the URL is valid for rendering, false otherwise
 */
export function isValidImageUrl(url: unknown): url is string {
  if (!url) return false;
  if (typeof url !== 'string') return false;
  if (url.trim().length === 0) return false;
  return true;
}

/**
 * Safely validates an image URL and returns it or undefined
 * @param url - The URL to validate
 * @returns The URL if valid, undefined otherwise
 */
export function getValidImageUrl(url: unknown): string | undefined {
  if (isValidImageUrl(url)) {
    const trimmed = url.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
}

/**
 * Checks if a URL is likely a valid image format
 * @param url - The URL to check
 * @returns true if the URL appears to be an image
 */
export function isImageUrl(url: string): boolean {
  try {
    const lower = url.toLowerCase();
    const imageExtensions = [
      '.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg',
      '.bmp', '.ico', '.tiff', '.heic', '.heif'
    ];
    
    // Check by extension or common CDN patterns
    if (imageExtensions.some(ext => lower.includes(ext))) {
      return true;
    }
    
    // Check for common CDN patterns
    const cdnPatterns = [
      'cloudinary.com',
      'imgix.net',
      'unsplash.com',
      'images.pexels.com',
      'cdn',
      'static',
      'avatar',
      'profile'
    ];
    
    if (cdnPatterns.some(pattern => lower.includes(pattern))) {
      return true;
    }
    
    // Accept URLs that start with /
    if (url.startsWith('/')) {
      return true;
    }
    
    return false;
  } catch {
    return false;
  }
}

/**
 * Validates and sanitizes an image URL for safe rendering
 * This should be called before passing a URL to Image components
 * @param url - The URL to validate
 * @param strict - If true, also checks that URL looks like an image (default: false)
 * @returns The validated URL or undefined if invalid
 */
export function sanitizeImageUrl(url: unknown, strict: boolean = false): string | undefined {
  const validUrl = getValidImageUrl(url);
  
  if (!validUrl) {
    return undefined;
  }
  
  if (strict && !isImageUrl(validUrl)) {
    return undefined;
  }
  
  return validUrl;
}

/**
 * Type guard for checking if an object has a valid image property
 */
export interface HasImageUrl {
  avatar?: string | null;
  image?: string | null;
  photo?: string | null;
  profilePicture?: string | null;
  profileImage?: string | null;
  src?: string | null;
}

export function hasValidImageUrl<T extends HasImageUrl>(obj: T): boolean {
  const imageUrl = 
    obj.avatar || 
    obj.image || 
    obj.photo || 
    obj.profilePicture || 
    obj.profileImage || 
    obj.src;
  
  return isValidImageUrl(imageUrl);
}

/**
 * Extracts a valid image URL from an object with multiple possible image properties
 */
export function extractValidImageUrl<T extends HasImageUrl>(obj: T): string | undefined {
  const candidates = [
    obj.avatar,
    obj.image,
    obj.photo,
    obj.profilePicture,
    obj.profileImage,
    obj.src,
  ];
  
  for (const candidate of candidates) {
    const valid = getValidImageUrl(candidate);
    if (valid) return valid;
  }
  
  return undefined;
}

/**
 * Generates initials from a name for avatar fallbacks
 * @param name - The full name
 * @param maxChars - Maximum number of characters to use (default: 2)
 * @returns The initials in uppercase
 */
export function generateInitials(name: string, maxChars: number = 2): string {
  if (!name || typeof name !== 'string') return '?';
  
  return name
    .trim()
    .split(/\s+/)
    .map(part => part[0] ?? '')
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, maxChars);
}

/**
 * Creates a data URL for a colored circle placeholder
 * Useful as a fallback before initials load
 * @param color - Hex color without # (default: 'e5e7eb')
 * @param size - Size in pixels (default: 64)
 * @returns Data URL for the placeholder SVG
 */
export function generateColorPlaceholder(color: string = 'e5e7eb', size: number = 64): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#${color}"/>
    </svg>
  `.trim();
  
  try {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  } catch {
    // Fallback to simple data URL if encoding fails
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'%3E%3Ccircle cx='${size/2}' cy='${size/2}' r='${size/2}' fill='%23${color}'/%3E%3C/svg%3E`;
  }
}

/**
 * Configuration options for image rendering
 */
export interface ImageRenderConfig {
  /** Whether to render a fallback when image is missing */
  fallbackOnMissing?: boolean;
  /** The fallback to show (initials, icon, or placeholder) */
  fallbackType?: 'initials' | 'icon' | 'placeholder';
  /** The identifier to generate initials from */
  identifier?: string;
  /** Optional fallback color */
  fallbackColor?: string;
}

/**
 * Result of image validation - indicates what should be rendered
 */
export interface ImageRenderResult {
  shouldRenderImage: boolean;
  imageUrl?: string;
  shouldShowFallback: boolean;
  fallbackIdentifier?: string;
}

/**
 * Comprehensive image validation for rendering decisions
 * @param url - The image URL to validate
 * @param config - Configuration options
 * @returns Result indicating what should be rendered
 */
export function validateImageForRendering(
  url: unknown,
  config: ImageRenderConfig = {}
): ImageRenderResult {
  const {
    fallbackOnMissing = true,
    fallbackType = 'initials',
    identifier = '',
  } = config;
  
  const validUrl = sanitizeImageUrl(url, false);
  
  if (validUrl) {
    return {
      shouldRenderImage: true,
      imageUrl: validUrl,
      shouldShowFallback: false,
    };
  }
  
  return {
    shouldRenderImage: false,
    shouldShowFallback: fallbackOnMissing,
    fallbackIdentifier: fallbackType === 'initials' ? identifier : undefined,
  };
}
