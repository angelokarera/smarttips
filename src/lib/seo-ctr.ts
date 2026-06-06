import type { Tool } from '@/data/tools'

/** Benefit-first titles for higher CTR — applied at render time. */
const CTR_TITLES: Partial<Record<string, string>> = {
  'word-counter':
    'Free Word Counter Online (100% Private & Instant) | SmartDigitalTips',
  'character-counter':
    'Free Character Counter — Count Letters & Symbols (No Signup)',
  'case-converter':
    'Free Case Converter — Convert text cases instantly (100% Free)',
  'text-to-speech':
    'Free Text to Speech Online — Realistic Voice Generator',
  'speech-to-text':
    'Free Speech to Text — Instant Voice Transcription (Secure)',
  'summarizer':
    'Free Text Summarizer — Summarize Articles instantly (100% Private)',
  'rewrite-text':
    'Free Paraphrasing Tool — Rephrase Text Online (No Signup Required)',
  'grammar-checker':
    'Free Grammar Checker — Fix Writing Errors Instantly (Free & Secure)',
  'plagiarism-checker':
    'Free Plagiarism Checker — Check Content Overlaps (100% Local & Private)',
  'random-sentence-generator':
    'Random Sentence Generator — Creative Writing Prompts (Free & Instant)',
  'password-generator':
    'Free Password Generator — Create Strong Passwords (100% Offline & Secure)',
  'password-strength-checker':
    'Free Password Strength Checker — Test Password Security (Local)',
  'json-formatter':
    'Free JSON Formatter & Validator — Format & Beautify JSON (Safe)',
  'html-live-editor':
    'Free HTML Live Editor — Sandbox HTML Preview (Instant)',
  'html-beautifier':
    'Free HTML Beautifier — Format & Minify HTML Code Online',
  'html-to-text':
    'Free HTML to Text Converter Online (100% Private) | SmartDigitalTips',
  'regex-tester':
    'Free Regex Tester — Test Regular Expressions (Live Matches)',
  'url-encoder':
    'Free URL Encoder Decoder — Quick URL Encoding & Decoding',
  'base64-encoder':
    'Free Base64 Encoder Decoder — Convert Text & Files Online',
  'image-compressor':
    'Free Image Compressor — Reduce JPG & PNG Size (No Quality Loss)',
  'merge-pdf':
    'Free PDF Merger — Combine PDF Files in Seconds (100% Free)',
  'qr-code-generator':
    'Free QR Code Generator — Create Custom QR Codes (WiFi & URLs)',
  'countdown-timer':
    'Free Countdown Timer — Fullscreen Timer Online (Instant)',
  'stopwatch':
    'Free Online Stopwatch — Lap Timer (Browser-Based & Simple)',
  'study-timer':
    'Free Pomodoro Timer — Focus Sessions & Study Timer Online',
  'gradient-generator':
    'Free CSS Gradient Generator — Create Gradients (Linear & Radial)',
  'box-shadow-generator':
    'Free Box Shadow Generator — Interactive CSS Shadow Builder',
  'ip-checker':
    'What Is My IP? — Free Public IP Address Lookup (Instant)',
  'speed-test-simulator':
    'Internet Speed Test Demo — Educational Connection Speed Simulator',
}

const CTR_DESCRIPTIONS: Partial<Record<string, string>> = {
  'word-counter':
    'Count words, characters, sentences, and reading time instantly. Free browser tool for writers, students, and SEO—no account, no upload.',
  'password-strength-checker':
    'Check password strength locally in your browser. Rule-based tips for length, symbols, and patterns—nothing stored or sent to a server.',
  'html-live-editor':
    'Edit HTML with a live sandboxed preview. Scripts stripped for safety. Free online editor for learning and quick prototypes.',
  'html-to-text':
    'Strip HTML tags and convert HTML code to plain text in real-time. 100% private browser-based tool—no signup required.',
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
