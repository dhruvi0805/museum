/**
 * Safe `background-image: url(...)` value for arbitrary HTTPS URLs.
 * Unquoted url() breaks on some Commons filenames; JSON.stringify quotes and escapes.
 */
export function cssBackgroundUrl(href: string): string {
  return `url(${JSON.stringify(href)})`;
}
