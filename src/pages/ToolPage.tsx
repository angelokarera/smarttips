import { lazy, Suspense, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { recordToolUsage } from '@/lib/favorites'
import { FavoriteButton } from '@/components/tools/FavoriteButton'
import { CheckCircle2, Star } from 'lucide-react'
import { getToolById, getRelatedTools, getToolsByCategory } from '@/data/tools'
import { SidebarAd } from '@/components/ads/AdBanner'

import { Layout } from '@/components/layout/Layout'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  generateToolSchema,
} from '@/components/seo/StructuredData'
import { getBenefitFirstDescription, getBenefitFirstTitle } from '@/lib/seo-ctr'
import { ToolEngagement } from '@/components/seo/ToolEngagement'
import { ToolEditorialContent } from '@/components/seo/ToolEditorialContent'
import { getToolEditorial } from '@/lib/tool-editorial'
import { getToolKeywords, uniqueKeywords } from '@/lib/seoKeywords'
import { useLocale, useLocalizedPath } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'
import { SITE_URL } from '@/lib/locale-config'
import { getToolSeo } from '@/lib/seo-messages'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ShareTool } from '@/components/seo/ShareTool'

// Lazy loaded tool imports
const WordCounter = lazy(() => import('@/tools/text/WordCounter'))
const CaseConverter = lazy(() => import('@/tools/text/CaseConverter'))
const TextToSpeech = lazy(() => import('@/tools/text/TextToSpeech'))
const PlagiarismChecker = lazy(() => import('@/tools/text/PlagiarismChecker'))
const QrCodeGenerator = lazy(() => import('@/tools/business/QrCodeGenerator'))
const InvoiceGenerator = lazy(() => import('@/tools/business/InvoiceGenerator'))
const PasswordGenerator = lazy(() => import('@/tools/business/PasswordGenerator'))
const AgeCalculator = lazy(() => import('@/tools/business/AgeCalculator'))
const GpaCalculator = lazy(() => import('@/tools/student/GpaCalculator'))
const PercentageCalculator = lazy(() => import('@/tools/student/PercentageCalculator'))
const GradeCalculator = lazy(() => import('@/tools/student/GradeCalculator'))
const CompoundInterest = lazy(() => import('@/tools/student/CompoundInterest'))
const UnitConverter = lazy(() => import('@/tools/converter/UnitConverter'))

const LengthConverter = lazy(() => import('@/tools/converter/LengthConverter'))
const TimeConverter = lazy(() => import('@/tools/converter/TimeConverter'))
const ImageCompressor = lazy(() => import('@/tools/image/ImageCompressor'))
const ImageToPdf = lazy(() => import('@/tools/image/ImageToPdf'))
const ImageResizer = lazy(() => import('@/tools/image/ImageResizer'))
const ImageConverter = lazy(() => import('@/tools/image/ImageConverter'))
const MergePdf = lazy(() => import('@/tools/pdf/MergePdf'))
const SplitPdf = lazy(() => import('@/tools/pdf/SplitPdf'))
const PdfToWord = lazy(() => import('@/tools/pdf/PdfToWord'))
const PdfToImage = lazy(() => import('@/tools/pdf/PdfToImage'))
const CropImage = lazy(() => import('@/tools/image/CropImage'))
const JpgToPng = lazy(() => import('@/tools/image/JpgToPng'))
const PngToJpg = lazy(() => import('@/tools/image/PngToJpg'))
const WebpConverter = lazy(() => import('@/tools/image/WebpConverter'))
const BackgroundRemover = lazy(() => import('@/tools/image/BackgroundRemover'))
const WatermarkMaker = lazy(() => import('@/tools/image/WatermarkMaker'))
const CharacterCounter = lazy(() => import('@/tools/text/CharacterCounter'))
const RewriteText = lazy(() => import('@/tools/text/RewriteText'))
const GrammarChecker = lazy(() => import('@/tools/text/GrammarChecker'))
const RemoveDuplicates = lazy(() => import('@/tools/text/RemoveDuplicates'))
const Summarizer = lazy(() => import('@/tools/text/Summarizer'))
const CitationGenerator = lazy(() => import('@/tools/text/CitationGenerator'))
const StudyTimer = lazy(() => import('@/tools/student/StudyTimer'))
const RandomNamePicker = lazy(() => import('@/tools/student/RandomNamePicker'))
const ScientificCalculator = lazy(() => import('@/tools/student/ScientificCalculator'))
const JsonFormatter = lazy(() => import('@/tools/developer/JsonFormatter'))
const Base64Encoder = lazy(() => import('@/tools/developer/Base64Encoder'))
const CssMinifier = lazy(() => import('@/tools/developer/CssMinifier'))
const HtmlBeautifier = lazy(() => import('@/tools/developer/HtmlBeautifier'))
const HtmlToText = lazy(() => import('@/tools/developer/HtmlToText'))
const ColorPicker = lazy(() => import('@/tools/developer/ColorPicker'))
const ColorPaletteGenerator = lazy(() => import('@/tools/developer/ColorPaletteGenerator'))
const SpeechToText = lazy(() => import('@/tools/text/SpeechToText'))
const RandomSentenceGenerator = lazy(() => import('@/tools/text/RandomSentenceGenerator'))
const HtmlLiveEditor = lazy(() => import('@/tools/developer/HtmlLiveEditor'))
const UrlEncoder = lazy(() => import('@/tools/developer/UrlEncoder'))
const RegexTester = lazy(() => import('@/tools/developer/RegexTester'))
const PasswordStrengthChecker = lazy(() => import('@/tools/security/PasswordStrengthChecker'))
const GradientGenerator = lazy(() => import('@/tools/design/GradientGenerator'))
const BoxShadowGenerator = lazy(() => import('@/tools/design/BoxShadowGenerator'))
const SpeedTestSimulator = lazy(() => import('@/tools/system/SpeedTestSimulator'))
const IpChecker = lazy(() => import('@/tools/system/IpChecker'))
const CountdownTimer = lazy(() => import('@/tools/productivity/CountdownTimer'))
const Stopwatch = lazy(() => import('@/tools/productivity/Stopwatch'))
const CssFlexboxGenerator = lazy(() => import('@/tools/developer/CssFlexboxGenerator'))
const CssGridGenerator = lazy(() => import('@/tools/developer/CssGridGenerator'))
const BorderRadiusGenerator = lazy(() => import('@/tools/design/BorderRadiusGenerator'))
const CssAnimationGenerator = lazy(() => import('@/tools/design/CssAnimationGenerator'))
const MetaTagGenerator = lazy(() => import('@/tools/developer/MetaTagGenerator'))
const HtmlEntityEncoder = lazy(() => import('@/tools/developer/HtmlEntityEncoder'))
const JsMinifier = lazy(() => import('@/tools/developer/JsMinifier'))
const MarkdownToHtml = lazy(() => import('@/tools/developer/MarkdownToHtml'))
const JsonToCsv = lazy(() => import('@/tools/developer/JsonToCsv'))
const YouTubeThumbnailDownloader = lazy(() => import('@/tools/image/YouTubeThumbnailDownloader'))
const LoremIpsumGenerator = lazy(() => import('@/tools/text/LoremIpsumGenerator'))
const AspectRatioCalculator = lazy(() => import('@/tools/image/AspectRatioCalculator'))
const UnixTimestamp = lazy(() => import('@/tools/developer/UnixTimestamp'))
const DiffChecker = lazy(() => import('@/tools/developer/DiffChecker'))
const ImageToBase64 = lazy(() => import('@/tools/developer/ImageToBase64'))
const PomodoroTimer = lazy(() => import('@/tools/productivity/PomodoroTimer'))
const OgPreview = lazy(() => import('@/tools/developer/OgPreview'))
const AiTextDetector = lazy(() => import('@/tools/text/AiTextDetector'))

const toolComponents: Record<string, React.ComponentType> = {
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'text-to-speech': TextToSpeech,
  'plagiarism-checker': PlagiarismChecker,
  'qr-code-generator': QrCodeGenerator,
  'invoice-generator': InvoiceGenerator,
  'password-generator': PasswordGenerator,
  'age-calculator': AgeCalculator,
  'gpa-calculator': GpaCalculator,
  'percentage-calculator': PercentageCalculator,
  'grade-calculator': GradeCalculator,
  'compound-interest': CompoundInterest,
  'unit-converter': UnitConverter,

  'length-converter': LengthConverter,
  'time-converter': TimeConverter,
  'image-compressor': ImageCompressor,
  'image-to-pdf': ImageToPdf,
  'image-resizer': ImageResizer,
  'image-converter': ImageConverter,
  'merge-pdf': MergePdf,
  'split-pdf': SplitPdf,
  'pdf-to-word': PdfToWord,
  'pdf-to-image': PdfToImage,
  'crop-image': CropImage,
  'jpg-to-png': JpgToPng,
  'png-to-jpg': PngToJpg,
  'webp-converter': WebpConverter,
  'background-remover': BackgroundRemover,
  'watermark-maker': WatermarkMaker,
  'character-counter': CharacterCounter,
  'rewrite-text': RewriteText,
  'grammar-checker': GrammarChecker,
  'remove-duplicates': RemoveDuplicates,
  'summarizer': Summarizer,
  'citation-generator': CitationGenerator,
  'study-timer': StudyTimer,
  'random-name-picker': RandomNamePicker,
  'scientific-calculator': ScientificCalculator,
  'json-formatter': JsonFormatter,
  'base64-encoder': Base64Encoder,
  'css-minifier': CssMinifier,
  'html-beautifier': HtmlBeautifier,
  'html-to-text': HtmlToText,
  'color-picker': ColorPicker,
  'color-palette-generator': ColorPaletteGenerator,
  'speech-to-text': SpeechToText,
  'random-sentence-generator': RandomSentenceGenerator,
  'html-live-editor': HtmlLiveEditor,
  'url-encoder': UrlEncoder,
  'regex-tester': RegexTester,
  'password-strength-checker': PasswordStrengthChecker,
  'gradient-generator': GradientGenerator,
  'box-shadow-generator': BoxShadowGenerator,
  'speed-test-simulator': SpeedTestSimulator,
  'ip-checker': IpChecker,
  'countdown-timer': CountdownTimer,
  'stopwatch': Stopwatch,
  'css-flexbox-generator': CssFlexboxGenerator,
  'css-grid-generator': CssGridGenerator,
  'border-radius-generator': BorderRadiusGenerator,
  'css-animation-generator': CssAnimationGenerator,
  'meta-tag-generator': MetaTagGenerator,
  'html-entity-encoder': HtmlEntityEncoder,
  'js-minifier': JsMinifier,
  'markdown-to-html': MarkdownToHtml,
  'json-to-csv': JsonToCsv,
  'youtube-thumbnail-downloader': YouTubeThumbnailDownloader,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'aspect-ratio-calculator': AspectRatioCalculator,
  'unix-timestamp': UnixTimestamp,
  'diff-checker': DiffChecker,
  'image-to-base64': ImageToBase64,
  'pomodoro-timer': PomodoroTimer,
  'og-preview': OgPreview,
  'ai-text-detector': AiTextDetector,
}

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>()
  const locale = useLocale()
  const lp = useLocalizedPath()
  const { t, localizeTool } = useTranslations()
  const rawTool = getToolById(toolId || '')

  useEffect(() => {
    if (toolId) recordToolUsage(toolId)
  }, [toolId])

  if (!rawTool) {
    return (
      <Layout meta={{ title: 'Tool Not Found', description: 'The requested tool could not be found.' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold mb-3">{t('tool.notFound')}</h1>
          <p className="text-muted-foreground mb-8">{t('tool.notFoundDesc')}</p>
          <Link to={lp('/')}>
            <Button className="rounded-xl">{t('tool.backHome')}</Button>
          </Link>
        </div>
      </Layout>
    )
  }

  const tool = localizeTool(rawTool)
  const relatedTools = getRelatedTools(tool.id).map(localizeTool)
  const ToolComponent = toolComponents[tool.id]
  const canonicalPath = lp(tool.path)
  const editorial = getToolEditorial(tool)

  const benefitTitle = getBenefitFirstTitle(tool)
  const benefitDescription = getBenefitFirstDescription(tool)

  const seo = getToolSeo(tool.id, locale, {
    title: benefitTitle,
    description: benefitDescription,
  })

  const meta = {
    title: seo.title,
    description: seo.description,
    canonical: tool.path,
    locale,
    keywords: uniqueKeywords(getToolKeywords(tool)),
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogType: 'website',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}${lp('/')}` },
        { name: tool.categoryLabel, url: `${SITE_URL}${lp(`/category/${tool.category}`)}` },
        { name: tool.name, url: `${SITE_URL}${canonicalPath}` },
      ]),
      generateToolSchema({ ...tool, path: canonicalPath, seoTitle: benefitTitle }),
      generateSoftwareApplicationSchema({ ...tool, path: canonicalPath }),
      ...(editorial.faqs.length > 0 ? [generateFAQSchema(editorial.faqs)] : []),
    ],
  }

  return (
    <Layout
      meta={meta}
      showPublisherAds
      breadcrumbs={[
        { name: tool.categoryLabel, path: `/category/${tool.category}` },
        { name: tool.name, path: tool.path },
      ]}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Tool Header */}
        <div className="mb-8 max-w-2xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link 
              to={lp(`/category/${tool.category}`)}
              className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider hover:bg-primary/20 transition-colors"
            >
              {tool.categoryLabel}
            </Link>
            {tool.new && (
              <span className="px-1.5 py-0.5 rounded bg-foreground text-background text-[10px] font-bold uppercase tracking-wider">
                {t('common.new')}
              </span>
            )}
            {tool.trending && (
              <span className="px-1.5 py-0.5 rounded bg-foreground/10 text-foreground text-[10px] font-bold uppercase tracking-wider">
                {t('common.trending')}
              </span>
            )}
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span>{tool.popular ? '4.9' : tool.trending ? '4.8' : '4.7'}</span>
              <span className="text-muted-foreground/80 font-normal">({tool.popular ? '1,342' : tool.trending ? '824' : '312'} ratings)</span>
            </div>
            <FavoriteButton toolId={tool.id} className="ml-auto" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">{tool.name}</h1>
          <p className="text-muted-foreground leading-relaxed">{tool.description}</p>
        </div>

        {/* Tool Component */}
        <div className="mb-20">
          {ToolComponent ? (
            <Suspense fallback={
              <div className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed border-border px-4 text-center text-muted-foreground animate-pulse">
                {t('common.loading')}
              </div>
            }>
              <ToolComponent />
            </Suspense>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center sm:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
                <span className="text-xl font-bold">?</span>
              </div>
              <h2 className="text-xl font-bold mb-2">{t('common.comingSoon')}</h2>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                {t('tool.comingSoonDesc')}
              </p>
            </div>
          )}
        </div>

        {/* Below the tool — editorial content layout */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column — How to Use + Benefits */}
          <div className="lg:col-span-3 space-y-16">
            <ToolEditorialContent tool={tool} />

            <div>
              <h2 className="text-xl font-bold tracking-tight mb-6">{t('tool.howItWorks')}</h2>
              <div className="space-y-4">
                {tool.howToUse.map((step, index) => (
                  <div key={index} className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-1.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-6">{t('tool.whyThisTool')}</h2>
              <div className="space-y-3">
                {tool.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Sidebar (sticky) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Clearly Labeled Advertisement Slot */}
              <SidebarAd />

              {/* Share & Support Tool */}
              <ShareTool tool={tool} locale={locale} />

              {/* Sidebar FAQ Accordion */}
              <div className="p-5 rounded-xl border border-border/85 bg-card/75 glass-card shadow-xs">
                <h2 className="text-base font-bold tracking-tight mb-3">{t('tool.faq')}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {editorial.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-border">
                      <AccordionTrigger className="text-left text-xs font-semibold hover:text-primary transition-colors py-3">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-3">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Other tools in Category */}
              <div className="p-5 rounded-xl border border-border/85 bg-card/75 glass-card shadow-xs">
                <h2 className="text-base font-bold tracking-tight mb-4">
                  More in {tool.categoryLabel}
                </h2>
                <div className="space-y-3">
                  {getToolsByCategory(tool.category)
                    .filter((t) => t.id !== tool.id)
                    .slice(0, 4)
                    .map(localizeTool)
                    .map((catTool) => (
                      <Link
                        key={catTool.id}
                        to={lp(catTool.path)}
                        className="block group/side text-xs hover:bg-secondary/40 p-2.5 rounded-lg border border-border/40 hover:border-primary/20 transition-all"
                      >
                        <p className="font-semibold group-hover/side:text-primary transition-colors truncate">
                          {catTool.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                          {catTool.description}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight mb-1">You might also like</h2>
              <p className="text-sm text-muted-foreground">More free tools — no sign-up, no uploads, instant results.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  to={lp(relatedTool.path)}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-border/80 bg-card/75 glass-card p-4 hover-lift sm:gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shrink-0">
                    <span className="text-xs font-bold font-mono">→</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {relatedTool.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">{relatedTool.categoryLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <ToolEngagement tool={tool} />
      </div>
    </Layout>
  )
}
