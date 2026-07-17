import type { BlogPost } from '@/data/blog'
import type { Tool, ToolCategory } from '@/data/tools'

export const platformKeywords = [
  // ── Core platform (HIGH VOLUME GLOBAL) ──────────────────────────────────
  'free online tools',
  'online tools 2025',
  'online tools 2026',
  'web tools',
  'browser tools',
  'free web utilities',
  'no signup tools',
  'instant online tools',
  'best free online tools',
  'top online tools',
  'free tools online no download',
  'online tools no registration',
  'online utility tools free',

  // ── Category keywords ────────────────────────────────────────────────────
  'frontend tools',
  'web development tools',
  'developer tools',
  'student tools',
  'business tools',
  'productivity tools',
  'startup tools',
  'freelancer tools',
  'remote work tools',
  'tools for writers',
  'tools for designers',
  'tools for marketers',

  // ── Tool type keywords ───────────────────────────────────────────────────
  'PDF tools',
  'image tools',
  'text tools',
  'converter tools',
  'calculator tools',
  'generator tools',
  'editor tools',
  'optimizer tools',
  'compressor tools',
  'downloader tools',

  // ── Privacy & security feature keywords ─────────────────────────────────
  'browser based tools',
  'no download required',
  'secure online tools',
  'fast online tools',
  'free tools no registration',
  'privacy focused tools',
  'client side tools',
  'offline capable tools',
  'no upload required',
  'instant results',
  'no cloud upload',
  'process files locally',
  'private file processing',
  'no account needed tools',

  // ── Design & creative tools ──────────────────────────────────────────────
  'color palette generator',
  'CSS generators',
  'design tools',
  'UI tools',
  'graphics tools',
  'css animation generator',
  'css flexbox generator',
  'css grid generator',
  'gradient generator',

  // ── Global reach ─────────────────────────────────────────────────────────
  'multilingual tools',
  'international tools',
  'global online tools',
  'worldwide free tools',
  'tools for everyone',
  'universal web tools',
  'herramientas online gratis',         // Spanish
  'outils en ligne gratuits',           // French
  'ferramentas online gratuitas',       // Portuguese
  'أدوات مجانية عبر الإنترنت',          // Arabic
  'kostenlose Online-Tools',            // German
  '免费在线工具',                          // Chinese
  'मुफ्त ऑनलाइन उपकरण',                  // Hindi
  'free online tools kenya',
  'free online tools nigeria',
  'free online tools india',

  // ── Long-tail (HIGH CONVERSION) ──────────────────────────────────────────
  'free online tools no sign up required',
  'best free online tools 2025',
  'best free online tools 2026',
  'free browser tools no download',
  'secure free online utilities',
  'privacy first online tools',
  'fastest online tools',
  'professional free tools',
  'reliable online tools',
  'best alternative to smallpdf',
  'best alternative to ilovepdf',
  'best alternative to tinypng',
  'free alternative to adobe tools',
  'free alternative to canva',
  'free alternative to photoshop online',
  'tools like smallpdf free',
  'tools like ilovepdf free',

  // ── Problem-solving intent ───────────────────────────────────────────────
  'reduce pdf file size online free',
  'compress image without quality loss',
  'merge multiple pdf files free',
  'convert pdf to word accurate',
  'generate strong password online',
  'create qr code free',
  'format json code online',
  'word count online free',
  'check grammar online free',
  'convert image format online',
  'resize image online free',
  'convert jpg to png free',
  'convert png to webp free',
  'split pdf online free',
  'remove background from image free',
  'base64 encode decode online',
  'url encode decode online',
  'css minifier online free',
  'html beautifier online free',
  'regex tester online free',
  'gpa calculator online free',
  'unit converter online free',
  'timestamp converter online',
  'color picker online free',
  'gradient generator css free',
  'lorem ipsum generator free',
  'markdown to html converter free',
  'json to csv converter free',
  'pomodoro timer online free',
  'diff checker online free',

  // ── Voice search & question-based (2026 trend) ───────────────────────────
  'what is the best free pdf converter',
  'how to compress an image for free',
  'how to merge pdf files without adobe',
  'how to generate a qr code for free',
  'how to count words in a document',
  'how to create a strong password',
  'what is the best free image compressor',
  'how to convert pdf to word for free',
  'how to resize an image online',
  'how to format json online',

  // ── AI search optimization (ChatGPT, Perplexity, Gemini) ────────────────
  'best free tools for students 2026',
  'best free tools for developers 2026',
  'best free tools for small business 2026',
  'best free tools for freelancers 2026',
  'best free tools for content creators 2026',
  'free tools that work offline in browser',
  'privacy safe online tools no data upload',

  // ── Regional: English-speaking markets ──────────────────────────────────
  'free online tools usa',
  'free online tools uk',
  'free online tools australia',
  'free online tools canada',
  'free online tools india',
  'free online tools south africa',
  'free online tools ghana',
  'free online tools rwanda',
  'free online tools worldwide',
  'international web utilities',
]

export function getToolKeywords(tool: Tool): string[] {
  const currentYear = new Date().getFullYear()
  
  return [
    // Primary keywords
    tool.name,
    tool.categoryLabel,
    `${tool.name} online`,
    `${tool.name} free`,
    `${tool.name} tool`,
    `${tool.name} ${currentYear}`,
    `best ${tool.name}`,
    `free ${tool.name} online`,
    
    // Long-tail keywords
    `how to use ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} no signup`,
    `${tool.name.toLowerCase()} without registration`,
    `online ${tool.name.toLowerCase()} free`,
    `${tool.name.toLowerCase()} browser`,
    `secure ${tool.name.toLowerCase()}`,
    
    // Benefits as keywords
    ...tool.benefits.flatMap((benefit) => benefit.split(/[,.]/).slice(0, 2)),
    
    // Related tools
    ...tool.relatedTools,
    
    // Platform keywords
    ...platformKeywords,
  ].filter(Boolean)
}

export function getCategoryKeywords(category: ToolCategory): string[] {
  const currentYear = new Date().getFullYear()
  
  return [
    category.label,
    `${category.label} online`,
    `free ${category.label.toLowerCase()}`,
    `${category.id} tools`,
    `${category.id} tools ${currentYear}`,
    `best ${category.id} tools`,
    `online ${category.id} tools`,
    `free ${category.id} tools online`,
    category.description,
    ...platformKeywords,
  ]
}

export function getBlogKeywords(post: BlogPost): string[] {
  const isWindows = post.category.toLowerCase() === 'windows'
  const windowsKeywords = isWindows ? [
    'windows 11 hidden features',
    'how to speed up windows 11',
    'windows 11 keyboard shortcuts',
    'windows 11 security tips',
    'best free windows software',
    'windows 11 optimization guide',
    'windows 11 shortcut keys list',
    'how to make windows 11 run faster',
    'windows 11 performance tweaks',
    'must-have apps for windows 11',
    'open source windows software',
    'windows 11 security settings',
    'speed up windows 11 PC',
    'best windows 11 utilities',
    'hidden features in windows 11'
  ] : []

  return [
    post.title,
    post.category,
    'digital tips',
    'online tools guide',
    'productivity tips',
    'productivity tools',
    'how to guide',
    'tutorial',
    'best practices',
    ...windowsKeywords,
    ...post.excerpt.split(/[,.]/).slice(0, 3),
    ...platformKeywords,
  ]
}

export function uniqueKeywords(keywords: string[]): string[] {
  return Array.from(
    new Set(
      keywords
        .map((keyword) => keyword.trim().toLowerCase())
        .filter(Boolean)
        .filter((keyword) => keyword.length > 2)
    )
  ).slice(0, 40) // 40 keywords for maximum Bing/Yahoo coverage
}
