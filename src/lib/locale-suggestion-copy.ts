import type { AppLocale } from '@/lib/locale-config'

/** Banner copy shown in the visitor's preferred (browser) language. */
export const LOCALE_SUGGESTION_COPY: Record<
  AppLocale,
  {
    title: string
    message: (languageName: string) => string
    switch: (languageName: string) => string
    stay: (languageName: string) => string
  }
> = {
  en: {
    title: 'Language',
    message: (name) => `SmartDigitalTips is available in ${name}. Would you like to view the site in your language?`,
    switch: (name) => `Switch to ${name}`,
    stay: (name) => `Stay in ${name}`,
  },
  fr: {
    title: 'Langue',
    message: (name) => `SmartDigitalTips est disponible en ${name}. Souhaitez-vous afficher le site dans votre langue ?`,
    switch: (name) => `Passer en ${name}`,
    stay: (name) => `Rester en ${name}`,
  },
  sw: {
    title: 'Lugha',
    message: (name) => `SmartDigitalTips inapatikana kwa ${name}. Ungependa kuona tovuti kwa lugha yako?`,
    switch: (name) => `Badilisha hadi ${name}`,
    stay: (name) => `Baki kwa ${name}`,
  },
  ar: {
    title: 'اللغة',
    message: (name) => `SmartDigitalTips متاح باللغة ${name}. هل تريد عرض الموقع بلغتك؟`,
    switch: (name) => `التبديل إلى ${name}`,
    stay: (name) => `البقاء على ${name}`,
  },
  es: {
    title: 'Idioma',
    message: (name) => `SmartDigitalTips está disponible en ${name}. ¿Quieres ver el sitio en tu idioma?`,
    switch: (name) => `Cambiar a ${name}`,
    stay: (name) => `Permanecer en ${name}`,
  },
  pt: {
    title: 'Idioma',
    message: (name) => `O SmartDigitalTips está disponível em ${name}. Deseja ver o site no seu idioma?`,
    switch: (name) => `Mudar para ${name}`,
    stay: (name) => `Permanecer em ${name}`,
  },
  zh: {
    title: '语言',
    message: (name) => `SmartDigitalTips 提供${name}版本。是否切换到您的语言？`,
    switch: (name) => `切换到${name}`,
    stay: (name) => `继续使用${name}`,
  },
}
