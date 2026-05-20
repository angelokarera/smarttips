import type { Tool } from '@/data/tools'
import { getToolExtraFaqs, getToolUniqueParagraphs } from '@/lib/tool-unique-content'

export interface ToolEditorial {
  overview: string[]
  useCases: string[]
  tips: string[]
  faqs: { question: string; answer: string }[]
}

const COMMON_FAQ: ToolEditorial['faqs'] = [
  {
    question: 'Is this tool completely free?',
    answer:
      'Yes. SmartDigitalTips tools are free to use with no trial limits, no watermarks on exports, and no account required. We support the site through optional advertising that respects your consent choices.',
  },
  {
    question: 'Are my files or text uploaded to your servers?',
    answer:
      'In most cases, no. Processing happens in your web browser whenever possible, so your images, PDFs, and text stay on your device. We do not sell personal data.',
  },
  {
    question: 'Can I use this tool on mobile?',
    answer:
      'Yes. Our tools are responsive and work on modern phones and tablets. For large files, a desktop browser may be faster and more reliable.',
  },
  {
    question: 'Who operates SmartDigitalTips?',
    answer:
      'SmartDigitalTips is an independent free-tools website. We publish guides on each page so you understand limitations before relying on results for legal, medical, or academic decisions.',
  },
]

const CATEGORY_CONTEXT: Record<
  string,
  { intro: string; useCaseIdeas: string[]; tipIdeas: string[] }
> = {
  image: {
    intro:
      'Image tools on SmartDigitalTips are built for creators, marketers, students, and anyone who needs fast edits without desktop software. Each tool focuses on one job—compress, resize, convert, or crop—so you get clear results in seconds.',
    useCaseIdeas: [
      'Optimizing photos before uploading to a website or online store',
      'Preparing social media graphics at the correct dimensions',
      'Reducing email attachment size without visible quality loss',
      'Converting screenshots or scans into shareable PDFs',
    ],
    tipIdeas: [
      'Keep a backup of the original file before heavy compression or cropping.',
      'For web use, WebP often gives smaller files than JPG at similar quality.',
      'If a file is very large, try compressing before converting formats.',
    ],
  },
  pdf: {
    intro:
      'PDF tools help you merge, split, and convert documents for work, school, and personal archives. Our PDF utilities run in the browser where possible, which keeps sensitive contracts and records off third-party upload servers.',
    useCaseIdeas: [
      'Combining scanned pages into one submission packet',
      'Extracting a single chapter or invoice from a long PDF',
      'Turning a PDF into editable Word text for light edits',
      'Exporting presentation slides as images for slides or thumbnails',
    ],
    tipIdeas: [
      'Merge files in the order you want before downloading the final PDF.',
      'Complex layouts may need manual touch-ups after PDF-to-Word conversion.',
      'For archival storage, keep the original PDF even after splitting.',
    ],
  },
  text: {
    intro:
      'Text tools support writers, students, SEO specialists, and professionals who need quick analysis, formatting, or proofreading helpers. Paste or type directly in the editor and see results update in real time on supported tools.',
    useCaseIdeas: [
      'Checking word count and reading time for blog posts or essays',
      'Reformatting titles, code identifiers, or bulk text lists',
      'Drafting citations and cleaning duplicate lines from spreadsheets',
      'Listening to drafts with text-to-speech while proofreading',
    ],
    tipIdeas: [
      'Paste plain text when possible to avoid hidden formatting from Word or Google Docs.',
      'Use case conversion after final edits so names and acronyms stay correct.',
      'Grammar and plagiarism helpers are guides—always review important work manually.',
    ],
  },
  student: {
    intro:
      'Student tools cover grades, percentages, study timers, and math helpers used in classrooms worldwide. They are designed for quick homework checks and planning—not as a replacement for your instructor’s official grading policy.',
    useCaseIdeas: [
      'Estimating semester GPA before official transcripts post',
      'Calculating weighted assignment averages for a syllabus',
      'Running Pomodoro study sessions with timed breaks',
      'Solving homework-style math with a scientific calculator',
    ],
    tipIdeas: [
      'Confirm your school’s GPA scale (4.0, 5.0, or percentage) before submitting anything official.',
      'Add all weighted categories from your syllabus for accurate grade projections.',
      'Use study timers in a quiet environment and disable distracting notifications.',
    ],
  },
  business: {
    intro:
      'Business tools help freelancers, shop owners, and teams handle everyday tasks like invoices, QR codes, and secure passwords. They are lightweight alternatives to heavy suites when you only need one feature done well.',
    useCaseIdeas: [
      'Generating payment QR codes for market stalls or invoices',
      'Creating one-off invoices for clients without subscription software',
      'Producing strong passwords for new accounts or team onboarding',
      'Calculating exact age or tenure for contracts and HR forms',
    ],
    tipIdeas: [
      'Store generated passwords in a reputable password manager, not a plain text file.',
      'Test QR codes with your phone camera before printing marketing materials.',
      'Include your tax ID and payment terms on every invoice for faster approval.',
    ],
  },
  converter: {
    intro:
      'Converter tools translate measurements between imperial, metric, and specialty units used in science, travel, cooking, and engineering. Results update instantly so you can compare values while planning or checking homework.',
    useCaseIdeas: [
      'Converting recipe ingredients between cups and grams',
      'Translating road trip distances from miles to kilometers',
      'Checking temperature readings for weather or lab reports',
      'Scheduling meetings across international time zones',
    ],
    tipIdeas: [
      'Double-check unit labels—some countries use US gallons vs imperial gallons.',
      'For science work, note significant figures required by your instructor.',
      'Time zone tools may not include every regional holiday—verify critical meetings manually.',
    ],
  },
  developer: {
    intro:
      'Developer tools format JSON, beautify HTML, encode Base64, test regex patterns, and explore color systems for front-end and API work. They are handy during code reviews, debugging sessions, and early UI prototyping when you want fast feedback in the browser.',
    useCaseIdeas: [
      'Pretty-printing API responses copied from network tabs',
      'Minifying CSS before production deploys to reduce page weight',
      'Generating accessible color palettes for new dashboard themes',
      'Encoding small payloads for tests and documentation examples',
    ],
    tipIdeas: [
      'Validate JSON after formatting—invalid syntax will be reported by the formatter.',
      'Keep minified CSS in source control only if your build pipeline expects it.',
      'Check WCAG contrast ratios when picking text and background pairs from palettes.',
    ],
  },
  security: {
    intro:
      'Security tools focus on password generation and strength analysis without sending secrets to a server. Use them when onboarding accounts, rotating credentials, or teaching basic hygiene—always pair with a password manager for storage.',
    useCaseIdeas: [
      'Creating unique passwords for new SaaS trials',
      'Checking whether a passphrase meets length and complexity goals',
      'Generating WiFi or portal passwords for guests',
      'Auditing personal password habits before a breach news cycle',
    ],
    tipIdeas: [
      'Never reuse passwords across banking, email, and social accounts.',
      'Long passphrases with random words can be stronger than short symbol-heavy strings.',
      'Strength meters here are educational—not a substitute for breach monitoring services.',
    ],
  },
  productivity: {
    intro:
      'Productivity timers help you time-box email, study, workouts, and meetings. Browser-based countdowns and stopwatches avoid installing yet another app with notification permissions.',
    useCaseIdeas: [
      'Running 25-minute Pomodoro focus blocks',
      'Timing presentation rehearsals',
      'Tracking workout intervals with lap splits',
      'Reminding yourself to take breaks from desk work',
    ],
    tipIdeas: [
      'Keep the tab visible for best timer accuracy—background tabs may throttle JavaScript.',
      'Set realistic intervals; very long countdowns are easier to forget.',
      'Combine timers with a written task list so breaks feel earned.',
    ],
  },
  design: {
    intro:
      'Design utilities generate CSS gradients, box shadows, and color values for marketing sites and apps. Copy snippets directly into your stylesheets without leaving the browser.',
    useCaseIdeas: [
      'Prototyping hero section backgrounds',
      'Tuning card elevation shadows for dark mode',
      'Picking accessible text/background pairs',
      'Sharing HEX codes with contractors',
    ],
    tipIdeas: [
      'Preview gradients on both mobile and desktop widths.',
      'Test shadows on real content, not empty boxes, before shipping.',
      'Document chosen tokens in your design system README.',
    ],
  },
  system: {
    intro:
      'System pages explain network concepts honestly. Live IP lookup runs only on button click; speed pages labeled as simulations avoid misleading users about real bandwidth.',
    useCaseIdeas: [
      'Confirming VPN or proxy public IP after connecting',
      'Teaching students how speed-test UIs look without claiming live measurement',
      'Checking router setup homework assignments',
      'Demonstrating latency concepts in IT workshops',
    ],
    tipIdeas: [
      'For real throughput, use your ISP or an established speed-test service.',
      'IP addresses can change—refresh if you reconnect VPN.',
      'Never share public IP screenshots if they reveal internal network details you wish to keep private.',
    ],
  },
}

function buildOverview(tool: Tool): string[] {
  const unique = getToolUniqueParagraphs(tool)
  const ctx = CATEGORY_CONTEXT[tool.category]
  const paragraphs = [...unique]
  if (ctx && !paragraphs.some((p) => p.includes(ctx.intro.slice(0, 40)))) {
    paragraphs.splice(1, 0, ctx.intro)
  }
  return paragraphs
}

function buildUseCases(tool: Tool): string[] {
  const ctx = CATEGORY_CONTEXT[tool.category]
  const specific = ctx?.useCaseIdeas ?? [
    'Completing a quick task without installing desktop software',
    'Working from a shared or locked-down computer',
    'Trying a workflow before committing to a paid app',
  ]
  return [
    `Primary scenario: ${tool.description}`,
    ...specific,
    ...tool.benefits.slice(0, 2).map((b) => `Helpful when you need to ${b.replace(/\.$/, '').toLowerCase()}.`),
  ]
}

function buildTips(tool: Tool): string[] {
  const ctx = CATEGORY_CONTEXT[tool.category]
  const fromCategory = ctx?.tipIdeas ?? [
    'Refresh the page if the tool stops responding after a long session.',
    'Use the latest version of Chrome, Firefox, Safari, or Edge for best compatibility.',
  ]
  return [
    ...tool.howToUse.map((step, i) => `Step ${i + 1}: ${step}`),
    ...fromCategory,
  ]
}

function buildToolSpecificFaqs(tool: Tool): ToolEditorial['faqs'] {
  const extras: ToolEditorial['faqs'] = []

  if (tool.faq.length === 0) {
    extras.push({
      question: `What does ${tool.name} do?`,
      answer: `${tool.description} This page includes step-by-step instructions, benefits, related tools, and privacy notes so you know what to expect before you start.`,
    })
  }

  if (tool.category === 'image' || tool.category === 'pdf') {
    extras.push({
      question: 'What file sizes work best?',
      answer:
        'Most tools handle everyday file sizes comfortably on modern devices. Very large files may be slower on mobile; if performance drops, try a smaller export or compress first using our Image Compressor.',
    })
  }

  if (tool.id === 'plagiarism-checker') {
    extras.push({
      question: 'Can this replace a university plagiarism report?',
      answer:
        'No. Use it as a self-check before submission. Institutions may use proprietary databases; always follow your school’s academic integrity policies.',
    })
  }

  if (tool.id === 'background-remover') {
    extras.push({
      question: 'Does this use AI background removal?',
      answer:
        'This tool uses browser-based pixel thresholding for light or white backgrounds. For complex hair or busy scenes, dedicated AI editors may give better results.',
    })
  }

  return extras
}

/** Editorial blocks with 300+ words of unique, human-readable content per tool page. */
export function getToolEditorial(tool: Tool): ToolEditorial {
  const seen = new Set<string>()
  const mergedFaqs: ToolEditorial['faqs'] = []

  for (const item of [
    ...tool.faq,
    ...buildToolSpecificFaqs(tool),
    ...getToolExtraFaqs(tool),
    ...COMMON_FAQ,
  ]) {
    const key = item.question.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    mergedFaqs.push(item)
  }

  return {
    overview: buildOverview(tool),
    useCases: buildUseCases(tool),
    tips: buildTips(tool),
    faqs: mergedFaqs.slice(0, 8),
  }
}
