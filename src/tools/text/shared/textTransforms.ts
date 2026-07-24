// Shared, dependency-free text transformation helpers used by the text tools.

/** Split a string into word tokens, stripping punctuation between words. */
export function toWords(input: string): string[] {
  return input
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

export function toTitleCase(input: string): string {
  return input.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
}

export function toSentenceCase(input: string): string {
  const lower = input.toLowerCase()
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase())
}

export function toCamelCase(input: string): string {
  const words = toWords(input)
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('')
}

export function toPascalCase(input: string): string {
  return toWords(input)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('')
}

export function toSnakeCase(input: string): string {
  return toWords(input)
    .map((w) => w.toLowerCase())
    .join('_')
}

export function toKebabCase(input: string): string {
  return toWords(input)
    .map((w) => w.toLowerCase())
    .join('-')
}

export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function reverseText(input: string): string {
  return Array.from(input).reverse().join('')
}

// Upside-down character map for the "flip text" tool.
const FLIP_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ',
  k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ',
  u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: 'q', C: 'Ɔ', D: 'p', E: 'Ǝ', F: 'Ⅎ', G: 'פ', H: 'H', I: 'I', J: 'ſ',
  K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Q', R: 'ᴚ', S: 'S', T: '┴',
  U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6', '.': '˙', ',': "'", '?': '¿', '!': '¡', '"': ',,', "'": ',',
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<',
  '&': '⅋', '_': '‾',
}

export function flipText(input: string): string {
  return Array.from(input)
    .map((ch) => FLIP_MAP[ch] ?? ch)
    .reverse()
    .join('')
}
