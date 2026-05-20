import type { Tool } from '@/data/tools'

/** Benefit-first titles for higher CTR — applied at render time. */
const CTR_TITLES: Partial<Record<string, string>> = {
  'word-counter':
    'Free Word Counter — Instantly Count Words, Characters & Reading Time',
  'character-counter':
    'Free Character Counter — Count Letters, Spaces & Symbols Online',
  'case-converter':
    'Free Case Converter — Uppercase, Lowercase & Title Case Online',
  'text-to-speech':
    'Free Text to Speech — Listen to Text Online in Your Browser',
  'speech-to-text':
    'Free Speech to Text — Voice Transcription in Your Browser',
  'summarizer':
    'Free Text Summarizer — Shorten Articles Instantly (Browser-Based)',
  'rewrite-text':
    'Free Paraphrasing Tool — Rephrase Text Online Without Sign-Up',
  'grammar-checker':
    'Free Grammar Checker — Fix Writing Errors Online',
  'plagiarism-checker':
    'Plagiarism Self-Check — Review Writing Before You Submit',
  'random-sentence-generator':
    'Random Sentence Generator — Creative Writing Prompts Free',
  'password-generator':
    'Free Password Generator — Create Strong Random Passwords Instantly',
  'password-strength-checker':
    'Free Password Strength Checker — Test Security in Your Browser',
  'json-formatter':
    'Free JSON Formatter — Beautify & Validate JSON Online',
  'html-live-editor':
    'Free HTML Live Editor — Sandboxed Preview in Your Browser',
  'html-beautifier':
    'Free HTML Beautifier — Format & Minify HTML Online',
  'regex-tester':
    'Free Regex Tester — Test Regular Expressions with Live Matches',
  'url-encoder':
    'Free URL Encoder Decoder — Encode URI Components Online',
  'base64-encoder':
    'Free Base64 Encoder Decoder — Convert Text Online',
  'image-compressor':
    'Free Image Compressor — Reduce JPG & PNG Size Without Losing Quality',
  'merge-pdf':
    'Free PDF Merger — Combine PDF Files Online in Seconds',
  'qr-code-generator':
    'Free QR Code Generator — Create QR Codes for URLs & WiFi',
  'countdown-timer':
    'Free Countdown Timer — Set Hours, Minutes & Seconds Online',
  'stopwatch':
    'Free Online Stopwatch — Lap Timer in Your Browser',
  'study-timer':
    'Free Pomodoro Timer — Focus Sessions with Scheduled Breaks',
  'gradient-generator':
    'Free CSS Gradient Generator — Linear & Radial Backgrounds',
  'box-shadow-generator':
    'Free Box Shadow Generator — CSS Shadow Builder with Preview',
  'ip-checker':
    'What Is My IP? — Free Public IP Lookup (On Demand)',
  'speed-test-simulator':
    'Internet Speed Test Demo — Educational Simulation (Not a Real Test)',
}

const CTR_DESCRIPTIONS: Partial<Record<string, string>> = {
  'word-counter':
    'Count words, characters, sentences, and reading time instantly. Free browser tool for writers, students, and SEO—no account, no upload.',
  'password-strength-checker':
    'Check password strength locally in your browser. Rule-based tips for length, symbols, and patterns—nothing stored or sent to a server.',
  'html-live-editor':
    'Edit HTML with a live sandboxed preview. Scripts stripped for safety. Free online editor for learning and quick prototypes.',
  'plagiarism-checker':
    'Self-check writing for overlapping phrases before submission. Educational browser tool—not a replacement for institutional plagiarism systems.',
  'speech-to-text':
    'Transcribe speech with your microphone using the Web Speech API. Private, permission-based, and free—audio stays on your device.',
}

export function getBenefitFirstTitle(tool: Tool): string {
  return CTR_TITLES[tool.id] ?? `Free ${tool.name} — ${tool.description.replace(/\.$/, '')} Online`
}

export function getBenefitFirstDescription(tool: Tool): string {
  if (CTR_DESCRIPTIONS[tool.id]) return CTR_DESCRIPTIONS[tool.id]!
  const benefit = tool.benefits[0] ?? tool.description
  return `${tool.description} ${benefit}. Free, instant, and private—runs in your browser on SmartDigitalTips. No sign-up required.`
}
