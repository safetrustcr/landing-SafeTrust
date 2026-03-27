/**
 * Image Validation Tests
 * 
 * Comprehensive tests for image validation utilities and components
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  isValidImageUrl,
  getValidImageUrl,
  isImageUrl,
  sanitizeImageUrl,
  generateInitials,
  generateColorPlaceholder,
  hasValidImageUrl,
  extractValidImageUrl,
  validateImageForRendering,
} from '@/utils/image-validation';

describe('Image Validation Utilities', () => {
  describe('isValidImageUrl', () => {
    it('should return true for valid non-empty strings', () => {
      expect(isValidImageUrl('/avatar.jpg')).toBe(true);
      expect(isValidImageUrl('https://cdn.com/image.png')).toBe(true);
      expect(isValidImageUrl('image.webp')).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidImageUrl(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidImageUrl(undefined)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isValidImageUrl('')).toBe(false);
    });

    it('should return false for whitespace-only string', () => {
      expect(isValidImageUrl('   ')).toBe(false);
    });

    it('should return false for non-string types', () => {
      expect(isValidImageUrl(123)).toBe(false);
      expect(isValidImageUrl({})).toBe(false);
      expect(isValidImageUrl([])).toBe(false);
      expect(isValidImageUrl(true)).toBe(false);
    });
  });

  describe('getValidImageUrl', () => {
    it('should return the URL for valid strings', () => {
      const url = 'https://example.com/image.jpg';
      expect(getValidImageUrl(url)).toBe(url);
    });

    it('should return undefined for invalid values', () => {
      expect(getValidImageUrl(null)).toBeUndefined();
      expect(getValidImageUrl(undefined)).toBeUndefined();
      expect(getValidImageUrl('')).toBeUndefined();
      expect(getValidImageUrl(123)).toBeUndefined();
    });

    it('should trim whitespace and return URL', () => {
      const url = '  https://example.com/image.jpg  ';
      expect(getValidImageUrl(url)).toBe('https://example.com/image.jpg');
    });

    it('should return undefined for whitespace-only strings', () => {
      expect(getValidImageUrl('   ')).toBeUndefined();
    });
  });

  describe('isImageUrl', () => {
    it('should return true for URLs with image extensions', () => {
      expect(isImageUrl('/avatar.jpg')).toBe(true);
      expect(isImageUrl('image.png')).toBe(true);
      expect(isImageUrl('photo.gif')).toBe(true);
      expect(isImageUrl('picture.webp')).toBe(true);
      expect(isImageUrl('graphic.svg')).toBe(true);
    });

    it('should return true for relative paths', () => {
      expect(isImageUrl('/avatars/user.jpg')).toBe(true);
      expect(isImageUrl('./images/photo.png')).toBe(true);
    });

    it('should return true for CDN URLs', () => {
      expect(isImageUrl('https://cloudinary.com/path/image.jpg')).toBe(true);
      expect(isImageUrl('https://imgix.net/path/photo.png')).toBe(true);
      expect(isImageUrl('https://cdn.example.com/image.jpg')).toBe(true);
    });

    it('should return true for avatar/profile URLs', () => {
      expect(isImageUrl('https://example.com/avatar/user.jpg')).toBe(true);
      expect(isImageUrl('https://example.com/profile-pic.png')).toBe(true);
    });

    it('should return false for non-image URLs', () => {
      expect(isImageUrl('https://example.com/page')).toBe(false);
      expect(isImageUrl('https://example.com/api/data')).toBe(false);
      expect(isImageUrl('document.pdf')).toBe(false);
    });
  });

  describe('sanitizeImageUrl', () => {
    it('should return valid URL for proper input', () => {
      const url = 'https://example.com/image.jpg';
      expect(sanitizeImageUrl(url)).toBe(url);
    });

    it('should return undefined for invalid input', () => {
      expect(sanitizeImageUrl(null)).toBeUndefined();
      expect(sanitizeImageUrl('')).toBeUndefined();
      expect(sanitizeImageUrl(undefined)).toBeUndefined();
    });

    it('should validate format when strict=true', () => {
      expect(sanitizeImageUrl('/image.jpg', true)).toBe('/image.jpg');
      expect(sanitizeImageUrl('/page', true)).toBeUndefined();
      expect(sanitizeImageUrl('https://example.com/image.jpg', true)).toBe(
        'https://example.com/image.jpg'
      );
    });

    it('should not validate format when strict=false', () => {
      expect(sanitizeImageUrl('/page', false)).toBe('/page');
      expect(sanitizeImageUrl('anything', false)).toBe('anything');
    });
  });

  describe('generateInitials', () => {
    it('should generate correct initials for two-word names', () => {
      expect(generateInitials('John Doe')).toBe('JD');
      expect(generateInitials('Jane Smith')).toBe('JS');
    });

    it('should generate correct initials for single-word names', () => {
      expect(generateInitials('John')).toBe('J');
      expect(generateInitials('Madonna')).toBe('M');
    });

    it('should generate correct initials for multi-word names', () => {
      expect(generateInitials('John Michael Doe')).toBe('JM');
      expect(generateInitials('Mary Jane Watson Parker')).toBe('MW');
    });

    it('should handle lowercase input', () => {
      expect(generateInitials('john doe')).toBe('JD');
      expect(generateInitials('jane smith')).toBe('JS');
    });

    it('should handle extra whitespace', () => {
      expect(generateInitials('  John   Doe  ')).toBe('JD');
      expect(generateInitials('John    Michael')).toBe('JM');
    });

    it('should return ? for empty or invalid input', () => {
      expect(generateInitials('')).toBe('?');
      expect(generateInitials('   ')).toBe('?');
    });

    it('should respect maxChars parameter', () => {
      expect(generateInitials('John Doe Smith', 3)).toBe('JDS');
      expect(generateInitials('John Doe Smith', 1)).toBe('J');
    });

    it('should handle non-string input', () => {
      expect(generateInitials(null as any)).toBe('?');
      expect(generateInitials(undefined as any)).toBe('?');
    });
  });

  describe('generateColorPlaceholder', () => {
    it('should generate valid data URL', () => {
      const placeholder = generateColorPlaceholder();
      expect(placeholder).toMatch(/^data:image\/svg\+xml/);
    });

    it('should include specified color', () => {
      const placeholder = generateColorPlaceholder('ff0000');
      expect(placeholder).toContain('ff0000');
    });

    it('should use default color when not specified', () => {
      const placeholder = generateColorPlaceholder();
      expect(placeholder).toContain('e5e7eb');
    });

    it('should use specified size', () => {
      const placeholder = generateColorPlaceholder('000000', 100);
      expect(placeholder).toContain('100');
    });
  });

  describe('hasValidImageUrl', () => {
    it('should return true when avatar is valid', () => {
      expect(hasValidImageUrl({ avatar: '/avatar.jpg' })).toBe(true);
    });

    it('should return true when image is valid', () => {
      expect(hasValidImageUrl({ image: 'photo.png' })).toBe(true);
    });

    it('should return true when any property is valid', () => {
      expect(hasValidImageUrl({ photo: '/photo.jpg' })).toBe(true);
      expect(hasValidImageUrl({ profilePicture: '/pic.png' })).toBe(true);
      expect(hasValidImageUrl({ profileImage: '/img.jpg' })).toBe(true);
      expect(hasValidImageUrl({ src: '/src.jpg' })).toBe(true);
    });

    it('should return false when all properties are invalid', () => {
      expect(hasValidImageUrl({})).toBe(false);
      expect(hasValidImageUrl({ avatar: null })).toBe(false);
      expect(hasValidImageUrl({ avatar: undefined })).toBe(false);
      expect(hasValidImageUrl({ avatar: '', image: null })).toBe(false);
    });
  });

  describe('extractValidImageUrl', () => {
    it('should extract avatar URL', () => {
      expect(extractValidImageUrl({ avatar: '/avatar.jpg' })).toBe('/avatar.jpg');
    });

    it('should extract from multiple properties with priority', () => {
      const obj = {
        profilePicture: '/pic1.jpg',
        image: '/pic2.jpg',
        avatar: '/pic3.jpg',
      };
      // Avatar has first priority
      expect(extractValidImageUrl(obj)).toBe('/pic1.jpg');
    });

    it('should return undefined when no valid URL found', () => {
      expect(extractValidImageUrl({})).toBeUndefined();
      expect(extractValidImageUrl({ avatar: null, image: '' })).toBeUndefined();
    });

    it('should return first valid URL in priority order', () => {
      const obj = {
        avatar: null,
        image: '/image.jpg',
        photo: '/photo.jpg',
      };
      expect(extractValidImageUrl(obj)).toBe('/image.jpg');
    });
  });

  describe('validateImageForRendering', () => {
    it('should indicate rendering image for valid URL', () => {
      const result = validateImageForRendering('https://example.com/image.jpg');
      expect(result.shouldRenderImage).toBe(true);
      expect(result.imageUrl).toBe('https://example.com/image.jpg');
      expect(result.shouldShowFallback).toBe(false);
    });

    it('should indicate fallback for invalid URL', () => {
      const result = validateImageForRendering(null);
      expect(result.shouldRenderImage).toBe(false);
      expect(result.imageUrl).toBeUndefined();
      expect(result.shouldShowFallback).toBe(true);
    });

    it('should not show fallback when fallbackOnMissing=false', () => {
      const result = validateImageForRendering(null, {
        fallbackOnMissing: false,
      });
      expect(result.shouldShowFallback).toBe(false);
    });

    it('should include fallback identifier for initials', () => {
      const result = validateImageForRendering(null, {
        fallbackType: 'initials',
        identifier: 'John Doe',
      });
      expect(result.shouldShowFallback).toBe(true);
      expect(result.fallbackIdentifier).toBe('John Doe');
    });

    it('should not include identifier for non-initials fallback', () => {
      const result = validateImageForRendering(null, {
        fallbackType: 'icon',
        identifier: 'John Doe',
      });
      expect(result.fallbackIdentifier).toBeUndefined();
    });
  });
});

describe('Image Validation Integration Tests', () => {
  it('should prevent network request for invalid avatar', () => {
    const invalidUrls = [null, undefined, '', '   '];
    
    invalidUrls.forEach((url) => {
      expect(isValidImageUrl(url)).toBe(false);
      expect(getValidImageUrl(url)).toBeUndefined();
    });
  });

  it('should validate multiple image properties', () => {
    const user = {
      name: 'John Doe',
      avatar: null,
      profilePicture: '',
      photo: undefined,
    };

    expect(hasValidImageUrl(user)).toBe(false);
    expect(extractValidImageUrl(user)).toBeUndefined();
  });

  it('should handle user with valid image', () => {
    const user = {
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg',
    };

    expect(hasValidImageUrl(user)).toBe(true);
    expect(extractValidImageUrl(user)).toBe('/avatars/jane.jpg');
    expect(generateInitials(user.name)).toBe('JS');
  });

  it('should provide complete rendering solution', () => {
    const user = { name: 'John Doe', avatar: null };

    const result = validateImageForRendering(user.avatar, {
      fallbackOnMissing: true,
      fallbackType: 'initials',
      identifier: user.name,
    });

    expect(result.shouldRenderImage).toBe(false);
    expect(result.shouldShowFallback).toBe(true);
    expect(result.fallbackIdentifier).toBe('John Doe');
    expect(generateInitials(result.fallbackIdentifier!)).toBe('JD');
  });
});
