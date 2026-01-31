export interface ImageDimensions {
  width: number;
  height: number;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
}

export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 320, height: 240 },
  medium: { width: 640, height: 480 },
  large: { width: 1024, height: 768 },
  hero: { width: 1920, height: 1080 },
  card: { width: 400, height: 300 },
  avatar: { width: 64, height: 64 },
  icon: { width: 32, height: 32 },
} as const;

export const RESPONSIVE_SIZES = {
  fullWidth: '100vw',
  halfDesktop: '(min-width: 1024px) 50vw, 100vw',
  thirdDesktop: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  quarterDesktop: '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw',
  gridCard: '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  hero: '100vw',
  sidebar: '(min-width: 1024px) 300px, 100vw',
} as const;

export function generateBlurPlaceholder(color = '#f3f4f6'): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="1"/>
      </filter>
      <rect preserveAspectRatio="none" filter="url(#b)" x="0" y="0" height="100%" width="100%" fill="rgb(${r},${g},${b})"/>
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export function generateSrcSet(
  baseSrc: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): string {
  return widths
    .map((width) => {
      const url = addImageParams(baseSrc, { width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

interface ImageParams {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

export function addImageParams(src: string, params: ImageParams): string {
  if (src.startsWith('/') || src.startsWith('/_next')) {
    return src;
  }

  try {
    const url = new URL(src);
    
    if (url.hostname.includes('cloudinary.com')) {
      const transforms: string[] = [];
      if (params.width) transforms.push(`w_${params.width}`);
      if (params.height) transforms.push(`h_${params.height}`);
      if (params.quality) transforms.push(`q_${params.quality}`);
      if (params.format) transforms.push(`f_${params.format}`);
      
      if (transforms.length > 0) {
        const pathParts = url.pathname.split('/upload/');
        if (pathParts.length === 2) {
          url.pathname = `${pathParts[0]}/upload/${transforms.join(',')}/${pathParts[1]}`;
        }
      }
      return url.toString();
    }

    if (url.hostname.includes('imgix.net')) {
      if (params.width) url.searchParams.set('w', String(params.width));
      if (params.height) url.searchParams.set('h', String(params.height));
      if (params.quality) url.searchParams.set('q', String(params.quality));
      if (params.format) url.searchParams.set('fm', params.format);
      return url.toString();
    }

    if (url.hostname.includes('unsplash.com')) {
      if (params.width) url.searchParams.set('w', String(params.width));
      if (params.height) url.searchParams.set('h', String(params.height));
      if (params.quality) url.searchParams.set('q', String(params.quality));
      if (params.format) url.searchParams.set('fm', params.format);
      return url.toString();
    }
  } catch {
    // Invalid URL
  }

  return src;
}

export function getOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number
): ImageDimensions {
  const aspectRatio = originalWidth / originalHeight;

  let width = Math.min(originalWidth, maxWidth);
  let height = width / aspectRatio;

  if (maxHeight && height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}

export function isSupportedFormat(src: string): boolean {
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
  const lowerSrc = src.toLowerCase();
  return supportedFormats.some((format) => lowerSrc.includes(format));
}

export function shouldPrioritize(
  imageIndex: number,
  viewportPosition: 'hero' | 'above-fold' | 'below-fold'
): boolean {
  if (viewportPosition === 'hero') return true;
  if (viewportPosition === 'above-fold') return imageIndex < 3;
  return false;
}

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

type ImageLoader = (params: ImageLoaderParams) => string;

export function getImageLoader(src: string): ImageLoader | undefined {
  try {
    const url = new URL(src);
    
    if (url.hostname.includes('cloudinary.com')) {
      return ({ src: imgSrc, width, quality }) => {
        const transforms = [`w_${width}`, `q_${quality || 75}`, 'f_auto'];
        const srcUrl = new URL(imgSrc);
        const pathParts = srcUrl.pathname.split('/upload/');
        if (pathParts.length === 2) {
          srcUrl.pathname = `${pathParts[0]}/upload/${transforms.join(',')}/${pathParts[1]}`;
        }
        return srcUrl.toString();
      };
    }
  } catch {
    // Invalid URL
  }

  return undefined;
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
    img.src = src;
  });
}

export async function preloadImages(srcs: string[]): Promise<PromiseSettledResult<void>[]> {
  return Promise.allSettled(srcs.map(preloadImage));
}

interface CreateOptimizedImageOptions {
  size?: keyof typeof IMAGE_SIZES;
  responsive?: keyof typeof RESPONSIVE_SIZES;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
}

export function createOptimizedImageProps(
  src: string,
  alt: string,
  options: CreateOptimizedImageOptions = {}
): OptimizedImageProps {
  const { size, responsive, priority = false, quality = 75, fill = false } = options;

  const props: OptimizedImageProps = {
    src,
    alt,
    quality,
    loading: priority ? 'eager' : 'lazy',
    priority,
  };

  if (size && !fill) {
    const dimensions = IMAGE_SIZES[size];
    props.width = dimensions.width;
    props.height = dimensions.height;
  }

  if (responsive) {
    props.sizes = RESPONSIVE_SIZES[responsive];
  }

  if (src.startsWith('/') && !priority) {
    props.placeholder = 'blur';
    props.blurDataURL = generateBlurPlaceholder();
  }

  return props;
}

const imageOptimizer = {
  IMAGE_SIZES,
  RESPONSIVE_SIZES,
  generateBlurPlaceholder,
  generateSrcSet,
  addImageParams,
  getOptimalDimensions,
  isSupportedFormat,
  shouldPrioritize,
  getImageLoader,
  preloadImage,
  preloadImages,
  createOptimizedImageProps,
};

export default imageOptimizer;
