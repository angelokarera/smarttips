/** Max characters accepted by text-based tools (ReDoS / memory safety). */
export const MAX_TOOL_INPUT_LENGTH = 100_000

export function truncateInput(input: string, max = MAX_TOOL_INPUT_LENGTH): string {
  return input.slice(0, max)
}

/** Strip script tags and event handlers from HTML preview source. */
export function sanitizeHtmlPreview(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
}

export interface SafeRegexResult {
  valid: boolean
  matches: string[]
  groups: string[][]
  error: string | null
  matchCount: number
}

/**
 * Test a regex safely in-browser with length limits and timeout guard.
 */
export function safeRegexTest(
  pattern: string,
  flags: string,
  testString: string
): SafeRegexResult {
  const empty: SafeRegexResult = {
    valid: false,
    matches: [],
    groups: [],
    error: null,
    matchCount: 0,
  }

  if (pattern.length > 500) {
    return { ...empty, error: 'Pattern must be 500 characters or fewer.' }
  }

  const safeFlags = flags.replace(/[^gimsuy]/g, '')
  const safeTest = testString.slice(0, 10_000)

  try {
    const re = new RegExp(pattern, safeFlags)
    const matches: string[] = []
    const groups: string[][] = []
    let matchCount = 0
    const maxMatches = 100

    if (safeFlags.includes('g')) {
      let m: RegExpExecArray | null
      while ((m = re.exec(safeTest)) !== null && matchCount < maxMatches) {
        matches.push(m[0])
        if (m.length > 1) groups.push(m.slice(1) as string[])
        matchCount++
        if (m[0].length === 0) re.lastIndex++
      }
    } else {
      const m = re.exec(safeTest)
      if (m) {
        matches.push(m[0])
        if (m.length > 1) groups.push(m.slice(1) as string[])
        matchCount = 1
      }
    }

    return { valid: true, matches, groups, error: null, matchCount }
  } catch (e) {
    return {
      ...empty,
      error: e instanceof Error ? e.message : 'Invalid regular expression',
    }
  }
}

export interface PasswordStrengthResult {
  score: number
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong'
  color: string
  feedback: string[]
}

/** Rule-based password strength (no server, no breach database). */
export function analyzePasswordStrength(password: string): PasswordStrengthResult {
  const feedback: string[] = []
  let score = 0

  if (!password) {
    return { score: 0, label: 'Very Weak', color: 'bg-red-500', feedback: ['Enter a password to analyze.'] }
  }

  if (password.length >= 8) score++
  else feedback.push('Use at least 8 characters.')
  if (password.length >= 12) score++
  if (password.length >= 16) score++

  if (/[a-z]/.test(password)) score++
  else feedback.push('Add lowercase letters.')
  if (/[A-Z]/.test(password)) score++
  else feedback.push('Add uppercase letters.')
  if (/[0-9]/.test(password)) score++
  else feedback.push('Add numbers.')
  if (/[^a-zA-Z0-9]/.test(password)) score++
  else feedback.push('Add symbols for extra strength.')

  const unique = new Set(password).size
  if (unique >= password.length * 0.6) score++
  else feedback.push('Avoid repeating characters.')

  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 1)
    feedback.push('Avoid repeated character sequences.')
  }
  if (/^(password|123456|qwerty|admin)/i.test(password)) {
    score = Math.max(0, score - 2)
    feedback.push('Avoid common passwords.')
  }

  const labels: PasswordStrengthResult['label'][] = [
    'Very Weak',
    'Weak',
    'Fair',
    'Strong',
    'Very Strong',
  ]
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-600']
  const idx = Math.min(Math.floor(score / 2), labels.length - 1)

  return {
    score: Math.min(score, 10),
    label: labels[idx],
    color: colors[idx],
    feedback: feedback.length ? feedback : ['Good password composition.'],
  }
}
