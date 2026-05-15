import type { Tool } from '@/data/tools'

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
      'Yes. SmartDigitalTips tools are free to use with no trial limits, no watermarks on exports, and no account required. We support the site through optional advertising.',
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
      'Developer tools format JSON, minify CSS, encode Base64, and explore color systems for front-end and API work. They are handy during code reviews, debugging sessions, and early UI prototyping when you want fast feedback in the browser.',
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
}

function buildOverview(tool: Tool): string[] {
  const ctx = CATEGORY_CONTEXT[tool.category]
  const paragraphs: string[] = [
    `${tool.name} on SmartDigitalTips lets you ${tool.description.replace(/\.$/, '').toLowerCase()}. It is free, works in modern browsers, and is designed for everyday productivity without sign-up walls.`,
  ]
  if (ctx) {
    paragraphs.push(ctx.intro)
  }
  paragraphs.push(
    'We publish clear instructions, benefits, and FAQs on every tool page so you know what to expect before you start. If you rely on a tool regularly, bookmark the page or use the language switcher in the header to open the version in your preferred language.',
  )
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
    `Using ${tool.name} for: ${tool.description.replace(/\.$/, '')}`,
    ...specific.slice(0, 3),
  ]
}

function buildTips(tool: Tool): string[] {
  const ctx = CATEGORY_CONTEXT[tool.category]
  const fromCategory = ctx?.tipIdeas ?? [
    'Refresh the page if the tool stops responding after a long session.',
    'Use the latest version of Chrome, Firefox, Safari, or Edge for best compatibility.',
  ]
  return [
    ...tool.howToUse.slice(0, 1).map((step) => `Follow step 1 carefully: ${step}`),
    ...fromCategory.slice(0, 3),
  ]
}

function buildToolSpecificFaqs(tool: Tool): ToolEditorial['faqs'] {
  const extras: ToolEditorial['faqs'] = []

  if (tool.faq.length === 0) {
    extras.push({
      question: `What does ${tool.name} do?`,
      answer: `${tool.description} This page includes step-by-step instructions and related tools you can try next.`,
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

/** Merge tool data with editorial blocks and guarantee at least 3 FAQs for AdSense-quality pages. */
export function getToolEditorial(tool: Tool): ToolEditorial {
  const seen = new Set<string>()
  const mergedFaqs: ToolEditorial['faqs'] = []

  for (const item of [...tool.faq, ...buildToolSpecificFaqs(tool), ...COMMON_FAQ]) {
    const key = item.question.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    mergedFaqs.push(item)
  }

  return {
    overview: buildOverview(tool),
    useCases: buildUseCases(tool),
    tips: buildTips(tool),
    faqs: mergedFaqs.slice(0, 6),
  }
}
