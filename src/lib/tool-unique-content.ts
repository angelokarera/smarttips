import type { Tool } from '@/data/tools'

/**
 * Unique opening hook per tool (AdSense / thin-content mitigation).
 * Each entry must be original — not duplicated across tools.
 */
export const TOOL_UNIQUE_HOOKS: Record<string, string> = {
  'image-compressor':
    'Large image files slow down websites, inflate email attachments, and waste mobile data. Our Image Compressor lets you shrink JPG, PNG, and WebP files while comparing quality side by side, so you choose the right balance before publishing.',
  'image-to-pdf':
    'Scanned receipts, portfolio pages, and photo albums are easier to share as a single PDF than as dozens of attachments. This converter builds a clean PDF from your images with page order you control—ideal for submissions and archiving.',
  'image-resizer':
    'Social platforms, ad banners, and CMS templates all demand exact pixel dimensions. Upload once, set width and height (or pick common presets), and export a correctly sized file without opening Photoshop.',
  'image-converter':
    'Different apps expect different formats—WebP for the web, PNG for transparency, JPG for photos. Convert between popular image types in seconds when a client or platform changes requirements overnight.',
  'merge-pdf':
    'Contracts, coursework, and onboarding packets often arrive as separate PDFs. Merging them into one document keeps signatures, page order, and printing simple for reviewers on the other end.',
  'split-pdf':
    'When you only need chapter three of a manual or one invoice from a statement PDF, splitting by page range saves bandwidth and avoids sending sensitive extra pages.',
  'pdf-to-word':
    'Need to edit text trapped inside a PDF? This converter extracts content into an editable Word-friendly flow so you can fix typos and tables without retyping entire pages.',
  'pdf-to-image':
    'Slides, diagrams, and certificate PDFs sometimes work better as PNG or JPG thumbnails for presentations, websites, or chat apps—export pages as images in a few clicks.',
  'word-counter':
    'Editors, students, and SEO specialists track word count for briefs, essays, and meta descriptions. Live counts for words, characters, sentences, paragraphs, and estimated reading time update as you type.',
  'case-converter':
    'Developers cleaning API keys, marketers fixing headline casing, and students formatting titles all need reliable case conversion. Switch between uppercase, lowercase, title case, camelCase, and more in one paste.',
  'text-to-speech':
    'Proofread by ear: listening to drafts catches awkward phrasing your eyes skip. Browser text-to-speech supports adjustable speed and voice selection without exporting audio files to third parties.',
  'plagiarism-checker':
    'Before submitting coursework or client copy, a quick self-check for overlapping phrases helps you rewrite weak sections. This is an educational helper—not an official institutional plagiarism report.',
  'character-counter':
    'Tweet limits, SMS segments, meta titles, and ad headlines all have character caps. See live totals with and without spaces so you trim copy precisely before publishing.',
  'rewrite-text':
    'Rule-based paraphrasing modes help you rephrase sentences for clarity, simplify jargon, or vary vocabulary while staying in control—no external AI API and no hidden rewriting on a server.',
  'grammar-checker':
    'Catch common grammar, punctuation, and style issues while drafting emails, blog posts, or homework. Use it as a first pass, then proofread important documents yourself.',
  'remove-duplicates':
    'Pasted lists from spreadsheets, logs, or surveys often contain duplicate lines. Strip repeats while preserving order so imports and mail-merge lists stay clean.',
  'summarizer':
    'Long articles and meeting notes can be shortened with extractive summarization that scores important sentences—helpful for study guides and executive skim-reading without calling a paid API.',
  'citation-generator':
    'Academic writing requires consistent citations. Build APA, MLA, and Chicago-style references from ISBNs, URLs, or manual fields, then paste into your bibliography.',
  'gpa-calculator':
    'Planning scholarships or probation recovery starts with knowing your term GPA. Enter grades and credit hours for a quick estimate—always confirm final numbers with your registrar.',
  'percentage-calculator':
    'Discounts, tax lines, exam scores, and tip math share the same percentage patterns. Solve for part, whole, or percent without hunting through spreadsheet formulas.',
  'grade-calculator':
    'Weighted syllabi make manual averaging error-prone. Enter categories, weights, and scores to project your course grade before finals week.',
  'compound-interest':
    'Savings goals and loan curiosity scenarios are easier to understand with year-by-year compound growth tables—educational math, not personalized financial advice.',
  'qr-code-generator':
    'Restaurants, freelancers, and event hosts use QR codes for menus, payment links, and WiFi sharing. Generate scannable codes locally and test them on your phone before printing.',
  'invoice-generator':
    'Send a polished PDF invoice with line items, tax fields, and your branding without subscribing to accounting software for occasional client work.',
  'password-generator':
    'Reusing passwords is risky; memorizing unique ones is hard. Generate cryptographically random strings with length and symbol options, then store them in a dedicated password manager.',
  'age-calculator':
    'Forms asking for age in years, months, and days are tedious to compute by hand—especially across leap years and varying month lengths.',
  'unit-converter':
    'Recipes, science homework, and hardware specs mix metric and imperial units daily. Convert temperature, mass, volume, and more with instant feedback.',
  'length-converter':
    'Fabric measurements, blueprint dimensions, and running distances often jump between inches, feet, meters, and miles—convert precisely for one-off tasks.',
  'time-converter':
    'Remote teams schedule meetings across zones. Compare local times and offsets without installing a desktop world-clock app.',
  'crop-image':
    'Profile photos, product thumbnails, and banner crops need tight framing. Select the visible region and export a new file at the aspect ratio you need.',
  'jpg-to-png':
    'JPG compression is great for photos but cannot preserve transparency. Convert to PNG when logos or icons need clear backgrounds on websites.',
  'png-to-jpg':
    'PNG screenshots and graphics are often oversized for email. Convert to JPG when transparency is unnecessary and smaller files matter.',
  'webp-converter':
    'Modern sites use WebP for smaller payloads. Convert legacy JPG or PNG assets so pages load faster on mobile networks.',
  'background-remover':
    'Simple product shots on white backgrounds can be isolated with threshold-based removal in the browser—best for clean edges, not hair-level AI masking.',
  'watermark-maker':
    'Protect draft photography or brand previews by overlaying text or logo watermarks before sharing proofs with clients.',
  'study-timer':
    'The Pomodoro technique alternates focused work blocks with short breaks to reduce burnout. Pick a preset interval and let the timer signal when to rest.',
  'random-name-picker':
    'Teachers, streamers, and meeting facilitators use fair random picks to call on participants or choose giveaway winners from a pasted name list.',
  'scientific-calculator':
    'Trigonometry, logarithms, and exponentials for homework are faster on a dedicated scientific keypad than on a basic phone calculator.',
  'json-formatter':
    'API debugging starts with readable JSON. Paste responses, fix syntax errors, beautify indentation, or minify for production payloads—all locally.',
  'base64-encoder':
    'Developers encode small text payloads for data URLs, tests, and config snippets. Toggle encode/decode without installing CLI utilities.',
  'css-minifier':
    'Shipping readable CSS is fine in development; production benefits from minified files. Remove whitespace and comments to cut download size.',
  'html-beautifier':
    'Minified HTML from templates is hard to review. Re-indent markup for code reviews, documentation snippets, and learning exercises.',
  'color-picker':
    'Designers and developers copy HEX, RGB, and HSL values from a visual picker, then explore tints and complementary colors for UI work.',
  'color-palette-generator':
    'New landing pages need harmonious primary, accent, and text colors. Generate balanced palettes with contrast notes for accessible combinations.',
  'speech-to-text':
    'Dictation helps you draft emails or notes hands-free. Microphone access stays in your browser via the Web Speech API—we never receive audio files.',
  'random-sentence-generator':
    'Writers blocked on placeholder copy can spin up random sentences for mockups, classroom icebreakers, or creative prompts—rule-based, not generative AI.',
  'html-live-editor':
    'Learning HTML or testing a snippet is faster with a split editor and sandboxed preview where scripts are stripped for safety.',
  'url-encoder':
    'Query strings and path segments must be percent-encoded for valid URLs. Encode or decode components when building links or debugging APIs.',
  'regex-tester':
    'Regular expressions are powerful but easy to mistype. Test patterns, flags, and sample strings with highlighted matches before dropping them into production code.',
  'password-strength-checker':
    'Before adopting a new password, check length, character variety, and common patterns locally—nothing is uploaded or compared to breach databases here.',
  'gradient-generator':
    'Hero sections and buttons often use CSS gradients. Pick colors and angles, preview the blend, and copy ready-to-paste background rules.',
  'box-shadow-generator':
    'Elevation on cards and modals comes from tuned box shadows. Adjust offset, blur, spread, and opacity with a live preview.',
  'speed-test-simulator':
    'This page demonstrates how speed-test UIs look and behave using simulated numbers only—it does not measure your real connection.',
  'ip-checker':
    'Your public IP appears when you click check—useful for VPN verification or router troubleshooting. We do not store the address; the lookup calls ipify.org on demand.',
  'countdown-timer':
    'Cooking, workouts, presentations, and study blocks benefit from a visible countdown you can pause and reset without installing another app.',
  'stopwatch':
    'Lap times for workouts, lab experiments, or meeting activities are easy to record with centisecond precision in the browser.',
}

const CATEGORY_DEEP_DIVE: Record<string, (tool: Tool) => string> = {
  image: (tool) =>
    `Image workflows on SmartDigitalTips treat ${tool.name} as a single-purpose utility: ${tool.description.replace(/\.$/, '')}. Because files stay on your device whenever possible, you can compress client assets, resize social graphics, or convert formats without uploading sensitive photography to unknown servers.`,
  pdf: (tool) =>
    `PDF tasks pile up quickly in offices and classrooms. ${tool.name} focuses on ${tool.description.replace(/\.$/, '')}, helping you finish one step at a time instead of paying for a full desktop suite. For legal contracts or graded submissions, keep originals archived even after merging or splitting copies.`,
  text: (tool) =>
    `Writing and editing tools should be fast and transparent. ${tool.name} supports ${tool.description.replace(/\.$/, '')}. Pair it with our other text utilities—counters, case converters, citation builders—to polish drafts before publication.`,
  student: (tool) =>
    `Students use ${tool.name} for ${tool.description.replace(/\.$/, '')}. Treat outputs as planning aids: syllabi, official transcripts, and exam policies always override calculator results.`,
  business: (tool) =>
    `Freelancers and small businesses reach for ${tool.name} when they need ${tool.description.replace(/\.$/, '')} without onboarding a paid SaaS trial. Double-check tax, payment, and branding details before sending invoices or QR materials to customers.`,
  converter: (tool) =>
    `Measurement mistakes are expensive in engineering and embarrassing in recipes. ${tool.name} applies standard conversion factors for ${tool.description.replace(/\.$/, '')}. For regulated industries, verify critical values against official tables.`,
  developer: (tool) =>
    `Front-end and back-end developers use ${tool.name} to ${tool.description.replace(/\.$/, '')}. Local processing keeps API keys, sample payloads, and stylesheet experiments off shared upload servers during debugging.`,
  security: (tool) =>
    `Security hygiene starts with strong, unique passwords. ${tool.name} helps you ${tool.description.replace(/\.$/, '')} entirely in the browser. We never log credentials—still use a reputable password manager for storage.`,
  productivity: (tool) =>
    `Time-boxing work reduces procrastination. ${tool.name} supports ${tool.description.replace(/\.$/, '')} with a lightweight timer that requires no account sync.`,
  design: (tool) =>
    `UI designers and marketers use ${tool.name} to ${tool.description.replace(/\.$/, '')}. Copy generated CSS values directly into your component library or design handoff doc.`,
  system: (tool) =>
    `Network utilities should be honest about what they measure. ${tool.name} provides ${tool.description.replace(/\.$/, '')}. Read the on-page notes so you know whether a feature is live data or an educational simulation.`,
}

const PROBLEM_KEYWORDS: Partial<Record<string, string>> = {
  'word-counter':
    'People search for “how many words is this,” “character count for Instagram,” and “reading time calculator”—this page answers all three in one editor.',
  'password-strength-checker':
    'Searches like “how strong is my password” and “password security check free” lead here for local, rule-based feedback without breach-database lookups.',
  'html-live-editor':
    'Queries such as “online html editor free” and “test html in browser” match a sandboxed preview that blocks scripts for safer learning.',
  'regex-tester':
    'Developers looking for “regex tester online” or “test regular expression” get live highlighting plus safe pattern length limits.',
  'image-compressor':
    '“Compress image online” and “reduce jpg size” are common intents—we show before/after size so you see savings immediately.',
  'merge-pdf':
    '“Combine pdf files free” and “merge pdf online” visitors can order pages before downloading a single document.',
}

export function getToolUniqueParagraphs(tool: Tool): string[] {
  const hook = TOOL_UNIQUE_HOOKS[tool.id]
  const categoryPara = CATEGORY_DEEP_DIVE[tool.category]?.(tool)
  const keywordPara = PROBLEM_KEYWORDS[tool.id]

  const paragraphs: string[] = []

  if (hook) paragraphs.push(hook)
  if (categoryPara) paragraphs.push(categoryPara)

  paragraphs.push(
    `Every section below explains how ${tool.name} works, who benefits most, and how to combine it with related utilities on SmartDigitalTips. Bookmark this page if you use it weekly, or switch languages from the header for localized navigation.`,
  )

  if (tool.benefits.length > 0) {
    paragraphs.push(
      `Practical advantages include ${tool.benefits.slice(0, 4).join('; ').replace(/;/g, ';')}. These points reflect what you can do today in the live tool above—not a future roadmap.`,
    )
  }

  if (keywordPara) {
    paragraphs.push(keywordPara)
  }

  paragraphs.push(
    `We do not require accounts, we do not sell personal data, and we aim to keep each tool page useful on its own so you understand the feature before you click. If something fails on an older browser, try an updated version of Chrome, Firefox, Safari, or Edge.`,
  )

  return paragraphs
}

export function getToolExtraFaqs(tool: Tool): { question: string; answer: string }[] {
  const extras: { question: string; answer: string }[] = [
    {
      question: `How do I get the best results from ${tool.name}?`,
      answer: `Follow the numbered steps on this page, start with a small sample file or text snippet, then scale up. ${tool.howToUse[0] ?? 'Open the tool and follow the on-screen labels.'}`,
    },
    {
      question: `Which related tools should I try next?`,
      answer: `Browse the "${tool.categoryLabel}" category for similar utilities, or use the related tools list at the bottom of this page for hand-picked alternatives.`,
    },
  ]

  if (tool.id === 'plagiarism-checker') {
    extras.push({
      question: 'Will my school accept this report?',
      answer:
        'No. Schools may use Turnitin or other databases. Use this page only as a self-review helper and follow your institution’s academic integrity rules.',
    })
  }

  if (tool.id === 'speed-test-simulator') {
    extras.push({
      question: 'Why does this not match my ISP speed test?',
      answer:
        'Because it is a demo simulator with random sample numbers, not a measurement of your connection.',
    })
  }

  return extras
}
