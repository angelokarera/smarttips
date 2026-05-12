// Multilingual SEO System
export const SUPPORTED_LOCALES = {
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr', code: 'en-US' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr', code: 'fr-FR' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr', code: 'es-ES' },
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl', code: 'ar-SA' },
  pt: { name: 'Português', flag: '🇧🇷', dir: 'ltr', code: 'pt-BR' },
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr', code: 'de-DE' },
  hi: { name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr', code: 'hi-IN' },
  sw: { name: 'Kiswahili', flag: '🇰🇪', dir: 'ltr', code: 'sw-KE' },
  zh: { name: '中文', flag: '🇨🇳', dir: 'ltr', code: 'zh-CN' }
} as const;

export type Locale = keyof typeof SUPPORTED_LOCALES;

// Country targeting for international SEO
export const COUNTRY_TARGETING = {
  en: ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA'],
  fr: ['FR', 'CA', 'BE', 'CH', 'LU', 'MC'],
  es: ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE'],
  ar: ['SA', 'AE', 'EG', 'MA', 'DZ', 'IQ', 'SY'],
  pt: ['BR', 'PT', 'AO', 'MZ'],
  de: ['DE', 'AT', 'CH', 'LI'],
  hi: ['IN'],
  sw: ['KE', 'TZ', 'UG'],
  zh: ['CN', 'TW', 'HK', 'SG']
};

// SEO translations for common terms
export const SEO_TRANSLATIONS = {
  free: {
    en: 'Free',
    fr: 'Gratuit',
    es: 'Gratis',
    ar: 'مجاني',
    pt: 'Grátis',
    de: 'Kostenlos',
    hi: 'मुफ़्त',
    sw: 'Bure',
    zh: '免费'
  },
  online: {
    en: 'Online',
    fr: 'En ligne',
    es: 'En línea',
    ar: 'عبر الإنترنت',
    pt: 'Online',
    de: 'Online',
    hi: 'ऑनलाइन',
    sw: 'Mtandaoni',
    zh: '在线'
  },
  tool: {
    en: 'Tool',
    fr: 'Outil',
    es: 'Herramienta',
    ar: 'أداة',
    pt: 'Ferramenta',
    de: 'Werkzeug',
    hi: 'उपकरण',
    sw: 'Zana',
    zh: '工具'
  },
  best: {
    en: 'Best',
    fr: 'Meilleur',
    es: 'Mejor',
    ar: 'الأفضل',
    pt: 'Melhor',
    de: 'Beste',
    hi: 'सर्वश्रेष्ठ',
    sw: 'Bora',
    zh: '最佳'
  }
};

export function generateHreflangTags(basePath: string, baseUrl = 'https://smartdigitaltips.com'): string {
  const locales = Object.keys(SUPPORTED_LOCALES) as Locale[];
  const tags: string[] = [];

  locales.forEach(locale => {
    tags.push(`<link rel="alternate" hreflang="${SUPPORTED_LOCALES[locale].code}" href="${baseUrl}/${locale}${basePath}" />`);
  });

  // Add x-default
  tags.push(`<link rel="alternate" hreflang="x-default" href="${baseUrl}/en${basePath}" />`);

  return tags.join('\n');
}

export function getLocalizedTitle(toolName: string, locale: Locale): string {
  const free = SEO_TRANSLATIONS.free[locale];
  const online = SEO_TRANSLATIONS.online[locale];
  const tool = SEO_TRANSLATIONS.tool[locale];
  
  return `${free} ${toolName} ${online} | ${tool}`;
}

export function detectUserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0];
  return (browserLang in SUPPORTED_LOCALES ? browserLang : 'en') as Locale;
}

export function getGeoTargetingMeta(locale: Locale): string {
  const countries = COUNTRY_TARGETING[locale] || [];
  return countries.join(', ');
}
