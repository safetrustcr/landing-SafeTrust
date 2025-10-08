/**
 * Link helper utilities
 * - isAbsoluteUrl: whether href begins with http(s)://
 * - getHostname: extracts hostname from an absolute url
 * - isExternalLink: determines if a link is external relative to the current site
 *
 * Note: On server-side rendering we can't access window.location. In that
 * case any absolute http(s) URL will be considered external. Relative paths
 * (starting with "/", "#" or without protocol) are treated as internal.
 */

export function isAbsoluteUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

export function getHostname(href: string): string | null {
  try {
    if (!isAbsoluteUrl(href)) return null;
    const url = new URL(href);
    return url.hostname;
  } catch (e) {
    console.log(e)
    return null;
  }
}

/**
 * Determine whether a given href should be considered external.
 *
 * @param href - the link href
 * @param siteHost - optional hostname of the site (e.g. 'example.com'). If
 * not provided and running in the browser, window.location.hostname will be used.
 * If neither is available (SSR), any absolute URL is treated as external.
 */
export function isExternalLink(href: string, siteHost?: string) {
  if (!href) return false;

  // hash and mailto / tel links are not external in the sense we need to mark
  if (/^#|^mailto:|^tel:/i.test(href)) return false;

  const absolute = isAbsoluteUrl(href);
  if (!absolute) return false; // relative URLs are internal

  const hostname = getHostname(href);
  if (!hostname) return false;

  const hostToCompare =
    siteHost ?? (typeof window !== "undefined" ? window.location.hostname : undefined);

  if (!hostToCompare) {
    // SSR: assume any absolute URL is external
    return true;
  }

  // Normalize hosts by lowercasing
  return hostname.toLowerCase() !== hostToCompare.toLowerCase();
}

export default {
  isAbsoluteUrl,
  getHostname,
  isExternalLink,
};
