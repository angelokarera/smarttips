export interface CategoryEditorial {
  overview: string[]
  highlights: string[]
  faqs: { question: string; answer: string }[]
}

export const CATEGORY_EDITORIAL: Record<string, CategoryEditorial> = {
  image: {
    overview: [
      'SmartDigitalTips image tools cover compression, resizing, format conversion, cropping, watermarks, and lightweight background cleanup. Each tool solves one problem clearly so you are not forced through a bloated editor.',
      'Because processing runs in your browser whenever possible, family photos, product shots, and client assets stay on your device. That matters for privacy-conscious creators and small businesses without an IT department.',
    ],
    highlights: [
      'Compress JPG, PNG, and WebP for faster websites',
      'Resize to social presets or custom pixels',
      'Convert between common formats in one click',
      'Merge images into PDFs for sharing or printing',
    ],
    faqs: [
      {
        question: 'Which image tool should I use first?',
        answer:
          'Start with Image Compressor if file size is the problem, Image Resizer if dimensions are wrong, and Image Converter if you need a different format. The category page lists every tool with a short description.',
      },
      {
        question: 'Will I lose quality when compressing?',
        answer:
          'Some loss is normal with lossy formats like JPG, but our compressor lets you balance size and clarity. For archival masters, keep an uncompressed original and export a web copy.',
      },
    ],
  },
  pdf: {
    overview: [
      'PDF utilities help you merge contracts, split chapters, convert to Word, or export pages as images. They are useful for students submitting assignments, freelancers sending proposals, and offices digitizing paperwork.',
      'You do not need Adobe Acrobat for basic tasks. Our tools focus on speed and clarity—upload, configure, download—without mandatory accounts.',
    ],
    highlights: [
      'Merge multiple PDFs with custom page order',
      'Extract page ranges into new files',
      'Convert PDF text into editable DOCX where supported',
      'Export slides or pages as JPG/PNG images',
    ],
    faqs: [
      {
        question: 'Are converted Word files perfect?',
        answer:
          'Conversion preserves most text and layout, but complex tables, fonts, or multi-column designs may need manual cleanup in Word or Google Docs.',
      },
      {
        question: 'Is there a page limit?',
        answer:
          'Practical limits depend on your device memory. Very large PDFs may take longer; split them first if your browser becomes slow.',
      },
    ],
  },
  text: {
    overview: [
      'Text tools support writing, editing, analysis, and accessibility. Count words for SEO briefs, convert casing for code, check grammar, generate citations, or listen to drafts with text-to-speech.',
      'These utilities are popular with bloggers, students, translators, and support teams who need fast answers without opening a heavy office suite.',
    ],
    highlights: [
      'Live word and character statistics',
      'Case and formatting helpers for developers',
      'Citation builder for APA, MLA, and Chicago',
      'Duplicate line removal for cleaned datasets',
    ],
    faqs: [
      {
        question: 'Do grammar tools catch every mistake?',
        answer:
          'They highlight common patterns and typos. Professional documents still benefit from human proofreading, especially for tone and domain-specific terminology.',
      },
    ],
  },
  student: {
    overview: [
      'Student tools include GPA and grade calculators, percentage math, compound interest examples, Pomodoro study timers, and scientific calculators. They are built for quick checks while studying—not as official registrar replacements.',
      'Always confirm grading policies with your school before relying on any calculated result for scholarships, probation, or graduation decisions.',
    ],
    highlights: [
      'Weighted grade and GPA estimators',
      'Percentage change and ratio math',
      'Focus timers with break intervals',
      'Scientific functions for STEM homework',
    ],
    faqs: [
      {
        question: 'Which GPA scale do you use?',
        answer:
          'Our GPA calculator supports common 4.0 and 5.0 scales plus percentage inputs. Select the scale that matches your institution’s handbook.',
      },
    ],
  },
  business: {
    overview: [
      'Business tools cover invoices, QR codes, passwords, and age calculations used by freelancers, retailers, and admin teams. They prioritize straightforward forms and instant downloads over enterprise complexity.',
      'Use them when you need one polished output fast—an invoice PDF, a payment QR, or a secure password—without subscribing to a full platform.',
    ],
    highlights: [
      'Branded invoice PDFs with line items',
      'QR codes for URLs, WiFi, and contacts',
      'Cryptographically strong password generation',
      'Exact age and date differences',
    ],
    faqs: [
      {
        question: 'Are invoices legally binding?',
        answer:
          'A PDF invoice is a professional request for payment. Tax rules vary by country—include required tax IDs and consult an accountant for compliance.',
      },
    ],
  },
  converter: {
    overview: [
      'Converters translate length, weight, temperature, volume, speed, and time zones using standard conversion factors. They are helpful for homework, travel planning, recipes, and international meetings.',
      'Results are instant, so you can compare multiple units while brainstorming or checking a supplier’s spec sheet.',
    ],
    highlights: [
      'Broad unit categories in one hub',
      'Dedicated length and time zone tools',
      'Mobile-friendly for on-the-go checks',
      'No account required',
    ],
    faqs: [
      {
        question: 'How accurate are conversions?',
        answer:
          'We use widely accepted conversion constants and show enough precision for everyday and educational use. Engineering projects with strict tolerances should verify against official standards.',
      },
    ],
  },
  developer: {
    overview: [
      'Developer tools format JSON, beautify HTML, minify CSS, encode Base64, and build accessible color palettes. They are ideal when you are debugging an API response, cleaning a snippet for documentation, or exploring UI colors.',
      'Everything runs client-side where possible, which keeps staging credentials and proprietary payloads off upload servers.',
    ],
    highlights: [
      'JSON validate, beautify, and minify',
      'CSS and HTML cleanup for prototypes',
      'Base64 encode/decode for tests',
      'Palette generator with contrast awareness',
    ],
    faqs: [
      {
        question: 'Can I trust formatted JSON in production?',
        answer:
          'Always re-validate before deploy. Formatting fixes whitespace; it does not change business logic but invalid JSON will still fail parsing.',
      },
    ],
  },
}

export function getCategoryEditorial(categoryId: string): CategoryEditorial | null {
  return CATEGORY_EDITORIAL[categoryId] ?? null
}
