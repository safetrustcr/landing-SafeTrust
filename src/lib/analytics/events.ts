/**
 * Event Tracking Functions
 *
 * Predefined event tracking functions for common user interactions.
 * These events are tracked in both Google Analytics and our internal tracker.
 */

import { event } from './gtag';

// Button click tracking
export const trackButtonClick = (buttonName: string, location?: string, metadata?: Record<string, unknown>): void => {
  event({
    action: 'button_click',
    category: 'engagement',
    label: buttonName,
    button_name: buttonName,
    button_location: location,
    ...metadata,
  });
};

// CTA conversion tracking
export const trackCTAClick = (ctaName: string, ctaType: 'primary' | 'secondary' | 'tertiary', location?: string): void => {
  event({
    action: 'cta_click',
    category: 'conversion',
    label: ctaName,
    cta_name: ctaName,
    cta_type: ctaType,
    cta_location: location,
  });
};

// Form submission tracking
export const trackFormSubmit = (
  formName: string,
  formType: string,
  success: boolean,
  errorMessage?: string
): void => {
  event({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'form',
    label: formName,
    form_name: formName,
    form_type: formType,
    success: success,
    error_message: errorMessage,
  });
};

// Link click tracking (external links)
export const trackLinkClick = (url: string, linkText?: string, linkType?: 'external' | 'download' | 'email'): void => {
  event({
    action: 'link_click',
    category: 'navigation',
    label: linkText || url,
    link_url: url,
    link_text: linkText,
    link_type: linkType,
  });
};

// Search tracking
export const trackSearch = (searchTerm: string, resultCount?: number): void => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    search_term: searchTerm,
    result_count: resultCount,
  });
};

// Video interaction tracking
export const trackVideoInteraction = (
  videoTitle: string,
  action: 'play' | 'pause' | 'complete' | 'seek',
  currentTime?: number
): void => {
  event({
    action: `video_${action}`,
    category: 'media',
    label: videoTitle,
    video_title: videoTitle,
    video_current_time: currentTime,
  });
};

// File download tracking
export const trackDownload = (fileName: string, fileType?: string): void => {
  event({
    action: 'file_download',
    category: 'engagement',
    label: fileName,
    file_name: fileName,
    file_type: fileType,
  });
};

// Error tracking
export const trackError = (errorName: string, errorMessage?: string, errorStack?: string, isFatal?: boolean): void => {
  event({
    action: 'error',
    category: 'error',
    label: errorName,
    error_name: errorName,
    error_message: errorMessage,
    error_stack: errorStack,
    is_fatal: isFatal,
  });
};

// 404 error tracking
export const track404 = (path: string, referrer?: string): void => {
  event({
    action: '404_error',
    category: 'error',
    label: path,
    page_path: path,
    referrer: referrer,
  });
};

// Social share tracking
export const trackSocialShare = (platform: string, contentType?: string, contentId?: string): void => {
  event({
    action: 'social_share',
    category: 'engagement',
    label: platform,
    social_platform: platform,
    content_type: contentType,
    content_id: contentId,
  });
};

// Scroll depth tracking
export const trackScrollDepth = (depth: number, pageUrl?: string): void => {
  event({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${depth}%`,
    scroll_depth: depth,
    page_url: pageUrl,
  });
};

// Time on page tracking
export const trackTimeOnPage = (timeInSeconds: number, pageUrl?: string): void => {
  event({
    action: 'time_on_page',
    category: 'engagement',
    value: timeInSeconds,
    label: pageUrl || window.location.pathname,
    time_in_seconds: timeInSeconds,
  });
};

// User signup/registration tracking
export const trackSignup = (method: string, userId?: string): void => {
  event({
    action: 'sign_up',
    category: 'conversion',
    label: method,
    signup_method: method,
    user_id: userId,
  });
};

// Login tracking
export const trackLogin = (method: string, userId?: string): void => {
  event({
    action: 'login',
    category: 'conversion',
    label: method,
    login_method: method,
    user_id: userId,
  });
};

// Custom event tracking (flexible)
export const trackCustomEvent = (
  eventName: string,
  category: string = 'custom',
  metadata?: Record<string, unknown>
): void => {
  event({
    action: eventName,
    category: category,
    label: eventName,
    ...metadata,
  });
};
