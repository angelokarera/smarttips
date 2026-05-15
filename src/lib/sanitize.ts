import DOMPurify from 'dompurify'

const BLOG_ALLOWED_TAGS = [
  'h2',
  'h3',
  'p',
  'ul',
  'ol',
  'li',
  'a',
  'strong',
  'em',
  'br',
  'blockquote',
]

const BLOG_ALLOWED_ATTR = ['href', 'title', 'target', 'rel']

let hooksRegistered = false

function registerHooks(): void {
  if (hooksRegistered || typeof window === 'undefined') return
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.getAttribute('href')) {
      node.setAttribute('target', '_blank')
      node.setAttribute('rel', 'noopener noreferrer')
    }
  })
  hooksRegistered = true
}

/** Sanitize trusted-but-static HTML (blog posts) before rendering. */
export function sanitizeBlogHtml(html: string): string {
  if (typeof window === 'undefined') return html
  registerHooks()
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: BLOG_ALLOWED_TAGS,
    ALLOWED_ATTR: BLOG_ALLOWED_ATTR,
  })
}

/** Escape plain text for safe display (no HTML). */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
