/** Shared copy templates for SEO message generation */
export const BRAND = 'SmartDigitalTips'

export const LOCALES = ['en', 'fr', 'rw', 'sw', 'ar', 'es', 'pt', 'zh']

export const COPY = {
  en: {
    free: 'Free',
    online: 'Online',
    noSignup: 'No signup required',
    private: 'Runs in your browser — your files stay private',
    suffix: `| ${BRAND}`,
  },
  fr: {
    free: 'Gratuit',
    online: 'En ligne',
    noSignup: 'Sans inscription',
    private: 'Dans votre navigateur — vos fichiers restent privés',
    suffix: `| ${BRAND}`,
  },
  rw: {
    free: 'Ubuntu',
    online: 'Kuri interineti',
    noSignup: 'Nta kwiyandikisha',
    private: 'Bikora mu mushakisha wawe — amadosiye yawe ararinze',
    suffix: `| ${BRAND}`,
  },
  sw: {
    free: 'Bure',
    online: 'Mtandaoni',
    noSignup: 'Hakuna usajili',
    private: 'Inafanya kazi kwenye kivinjari — faili zako zinabaki salama',
    suffix: `| ${BRAND}`,
  },
  ar: {
    free: 'مجاني',
    online: 'عبر الإنترنت',
    noSignup: 'بدون تسجيل',
    private: 'يعمل في متصفحك — ملفاتك تبقى خاصة',
    suffix: `| ${BRAND}`,
  },
  es: {
    free: 'Gratis',
    online: 'En línea',
    noSignup: 'Sin registro',
    private: 'En tu navegador — tus archivos permanecen privados',
    suffix: `| ${BRAND}`,
  },
  pt: {
    free: 'Grátis',
    online: 'Online',
    noSignup: 'Sem cadastro',
    private: 'No seu navegador — seus arquivos ficam privados',
    suffix: `| ${BRAND}`,
  },
  zh: {
    free: '免费',
    online: '在线',
    noSignup: '无需注册',
    private: '在浏览器中运行 — 文件保持私密',
    suffix: `| ${BRAND}`,
  },
}

/** Localized tool display names */
export const TOOL_NAMES = {
  'image-compressor': {
    en: 'Image Compressor', fr: "Compresseur d'images", rw: 'Gufata amashusho', sw: 'Kibana Picha',
    ar: 'ضاغط الصور', es: 'Compresor de imágenes', pt: 'Compressor de imagens', zh: '图片压缩',
  },
  'image-to-pdf': {
    en: 'Image to PDF', fr: 'Image en PDF', rw: 'Ifoto kuri PDF', sw: 'Picha hadi PDF',
    ar: 'صورة إلى PDF', es: 'Imagen a PDF', pt: 'Imagem para PDF', zh: '图片转PDF',
  },
  'image-resizer': {
    en: 'Image Resizer', fr: "Redimensionneur d'images", rw: "Guhindura ingano y'amashusho", sw: 'Kubadilisha Ukubwa wa Picha',
    ar: 'تغيير حجم الصور', es: 'Redimensionar imágenes', pt: 'Redimensionar imagens', zh: '图片尺寸调整',
  },
  'image-converter': {
    en: 'Image Converter', fr: "Convertisseur d'images", rw: 'Guhindura amashusho', sw: 'Kibadilishaji Picha',
    ar: 'محول الصور', es: 'Convertidor de imágenes', pt: 'Conversor de imagens', zh: '图片格式转换',
  },
  'merge-pdf': {
    en: 'Merge PDF', fr: 'Fusionner PDF', rw: 'Guhuza PDF', sw: 'Unganisha PDF',
    ar: 'دمج PDF', es: 'Unir PDF', pt: 'Mesclar PDF', zh: '合并PDF',
  },
  'split-pdf': {
    en: 'Split PDF', fr: 'Diviser PDF', rw: 'Gutandukanya PDF', sw: 'Gawanya PDF',
    ar: 'تقسيم PDF', es: 'Dividir PDF', pt: 'Dividir PDF', zh: '拆分PDF',
  },
  'pdf-to-word': {
    en: 'PDF to Word', fr: 'PDF en Word', rw: 'PDF kuri Word', sw: 'PDF hadi Word',
    ar: 'PDF إلى Word', es: 'PDF a Word', pt: 'PDF para Word', zh: 'PDF转Word',
  },
  'pdf-to-image': {
    en: 'PDF to Image', fr: 'PDF en image', rw: 'PDF kuri ifoto', sw: 'PDF hadi Picha',
    ar: 'PDF إلى صورة', es: 'PDF a imagen', pt: 'PDF para imagem', zh: 'PDF转图片',
  },
  'word-counter': {
    en: 'Word Counter', fr: 'Compteur de mots', rw: 'Kubara amagambo', sw: 'Kihesabu Maneno',
    ar: 'عداد الكلمات', es: 'Contador de palabras', pt: 'Contador de palavras', zh: '字数统计',
  },
  'case-converter': {
    en: 'Case Converter', fr: 'Convertisseur de casse', rw: 'Guhindura inyandiko', sw: 'Kibadilishaji Herufi',
    ar: 'محول حالة النص', es: 'Convertidor de mayúsculas', pt: 'Conversor de maiúsculas', zh: '大小写转换',
  },
  'text-to-speech': {
    en: 'Text to Speech', fr: 'Texte en parole', rw: 'Inyandiko kuri ijwi', sw: 'Maandishi hadi Sauti',
    ar: 'نص إلى كلام', es: 'Texto a voz', pt: 'Texto para fala', zh: '文字转语音',
  },
  'plagiarism-checker': {
    en: 'Plagiarism Checker', fr: 'Détecteur de plagiat', rw: 'Gusuzuma kwiba', sw: 'Kiangalia Wizi wa Maandishi',
    ar: 'فحص الانتحال', es: 'Detector de plagio', pt: 'Verificador de plágio', zh: '查重工具',
  },
  'gpa-calculator': {
    en: 'GPA Calculator', fr: 'Calculateur de GPA', rw: 'Kubara GPA', sw: 'Kikokotozo cha GPA',
    ar: 'حاسبة المعدل', es: 'Calculadora GPA', pt: 'Calculadora GPA', zh: 'GPA计算器',
  },
  'percentage-calculator': {
    en: 'Percentage Calculator', fr: 'Calculateur de pourcentage', rw: 'Kubara igice ku ijana', sw: 'Kikokotozo cha Asilimia',
    ar: 'حاسبة النسبة المئوية', es: 'Calculadora de porcentajes', pt: 'Calculadora de porcentagem', zh: '百分比计算器',
  },
  'grade-calculator': {
    en: 'Grade Calculator', fr: 'Calculateur de notes', rw: 'Kubara amanota', sw: 'Kikokotozo cha Alama',
    ar: 'حاسبة الدرجات', es: 'Calculadora de notas', pt: 'Calculadora de notas', zh: '成绩计算器',
  },
  'compound-interest': {
    en: 'Compound Interest Calculator', fr: "Calculateur d'intérêts composés", rw: 'Kubara inyungu zikubiye', sw: 'Riba changamfu',
    ar: 'حاسبة الفائدة المركبة', es: 'Interés compuesto', pt: 'Juros compostos', zh: '复利计算器',
  },
  'qr-code-generator': {
    en: 'QR Code Generator', fr: 'Générateur QR Code', rw: 'Gukora QR Code', sw: 'Kitengeneza QR',
    ar: 'مولد رمز QR', es: 'Generador de código QR', pt: 'Gerador de QR Code', zh: '二维码生成器',
  },
  'invoice-generator': {
    en: 'Invoice Generator', fr: 'Générateur de factures', rw: 'Gukora fagitire', sw: 'Kitengeneza Ankara',
    ar: 'مولد الفواتير', es: 'Generador de facturas', pt: 'Gerador de faturas', zh: '发票生成器',
  },
  'password-generator': {
    en: 'Password Generator', fr: 'Générateur de mots de passe', rw: 'Gukora ijambo ryibanga', sw: 'Kitengeneza Nenosiri',
    ar: 'مولد كلمات المرور', es: 'Generador de contraseñas', pt: 'Gerador de senhas', zh: '密码生成器',
  },
  'age-calculator': {
    en: 'Age Calculator', fr: "Calculateur d'âge", rw: 'Kubara imyaka', sw: 'Kikokotozo cha Umri',
    ar: 'حاسبة العمر', es: 'Calculadora de edad', pt: 'Calculadora de idade', zh: '年龄计算器',
  },
  'unit-converter': {
    en: 'Unit Converter', fr: "Convertisseur d'unités", rw: 'Guhindura ibipimo', sw: 'Kibadilishaji Vipimo',
    ar: 'محول الوحدات', es: 'Convertidor de unidades', pt: 'Conversor de unidades', zh: '单位换算',
  },
  'length-converter': {
    en: 'Length Converter', fr: 'Convertisseur de longueur', rw: 'Guhindura uburebure', sw: 'Urefu',
    ar: 'محول الطول', es: 'Convertidor de longitud', pt: 'Conversor de comprimento', zh: '长度换算',
  },
  'time-converter': {
    en: 'Time Zone Converter', fr: 'Convertisseur de fuseaux horaires', rw: 'Ibihe', sw: 'Majira ya Saa',
    ar: 'محول المناطق الزمنية', es: 'Zonas horarias', pt: 'Fuso horário', zh: '时区转换',
  },
  'crop-image': {
    en: 'Crop Image', fr: "Recadrer l'image", rw: 'Gukata ifoto', sw: 'Punguza Picha',
    ar: 'قص الصورة', es: 'Recortar imagen', pt: 'Recortar imagem', zh: '裁剪图片',
  },
  'jpg-to-png': {
    en: 'JPG to PNG', fr: 'JPG en PNG', rw: 'JPG kuri PNG', sw: 'JPG hadi PNG',
    ar: 'JPG إلى PNG', es: 'JPG a PNG', pt: 'JPG para PNG', zh: 'JPG转PNG',
  },
  'png-to-jpg': {
    en: 'PNG to JPG', fr: 'PNG en JPG', rw: 'PNG kuri JPG', sw: 'PNG hadi JPG',
    ar: 'PNG إلى JPG', es: 'PNG a JPG', pt: 'PNG para JPG', zh: 'PNG转JPG',
  },
  'webp-converter': {
    en: 'WebP Converter', fr: 'Convertisseur WebP', rw: 'WebP', sw: 'WebP',
    ar: 'محول WebP', es: 'Convertidor WebP', pt: 'Conversor WebP', zh: 'WebP转换',
  },
  'background-remover': {
    en: 'Background Remover', fr: "Suppression d'arrière-plan", rw: 'Gukuraho inyuma', sw: 'Ondoa Mandharinyuma',
    ar: 'إزالة الخلفية', es: 'Quitar fondo', pt: 'Remover fundo', zh: '去除背景',
  },
  'watermark-maker': {
    en: 'Watermark Maker', fr: "Filigrane", rw: 'Ikimenyetso', sw: 'Alama ya Maji',
    ar: 'علامة مائية', es: 'Marca de agua', pt: 'Marca d\'água', zh: '水印工具',
  },
  'character-counter': {
    en: 'Character Counter', fr: 'Compteur de caractères', rw: 'Kubara inyuguti', sw: 'Kihesabu Herufi',
    ar: 'عداد الأحرف', es: 'Contador de caracteres', pt: 'Contador de caracteres', zh: '字符计数',
  },
  'rewrite-text': {
    en: 'Rewrite Text', fr: 'Réécrire le texte', rw: 'Andika bundi', sw: 'Andika upya',
    ar: 'إعادة صياغة النص', es: 'Reescribir texto', pt: 'Reescrever texto', zh: '改写文本',
  },
  'grammar-checker': {
    en: 'Grammar Checker', fr: 'Correcteur grammatical', rw: 'Suzuma imvugo', sw: 'Sarufi',
    ar: 'مدقق نحوي', es: 'Corrector gramatical', pt: 'Corretor gramatical', zh: '语法检查',
  },
  'remove-duplicates': {
    en: 'Remove Duplicates', fr: 'Supprimer les doublons', rw: 'Kuraho duplicate', sw: 'Ondoa marudio',
    ar: 'إزالة التكرار', es: 'Eliminar duplicados', pt: 'Remover duplicatas', zh: '去重',
  },
  'summarizer': {
    en: 'Text Summarizer', fr: 'Résumé de texte', rw: 'Incamake', sw: 'Muhtasari',
    ar: 'ملخص النص', es: 'Resumidor de texto', pt: 'Resumidor de texto', zh: '文本摘要',
  },
  'citation-generator': {
    en: 'Citation Generator', fr: 'Générateur de citations', rw: 'Inkuru', sw: 'Citation',
    ar: 'مولد الاستشهادات', es: 'Generador de citas', pt: 'Gerador de citações', zh: '引用生成',
  },
  'study-timer': {
    en: 'Study Timer', fr: 'Minuteur Pomodoro', rw: 'Isaha yo kwiga', sw: 'Kipima muda cha kusoma',
    ar: 'مؤقت الدراسة', es: 'Temporizador de estudio', pt: 'Timer de estudo', zh: '学习计时器',
  },
  'random-name-picker': {
    en: 'Random Name Picker', fr: 'Tirage au sort de noms', rw: 'Guhitamo izina', sw: 'Chagua jina nasibu',
    ar: 'اختيار اسم عشوائي', es: 'Selector de nombres', pt: 'Sorteador de nomes', zh: '随机点名',
  },
  'scientific-calculator': {
    en: 'Scientific Calculator', fr: 'Calculatrice scientifique', rw: 'Kalkilateri ya siyansi', sw: 'Kikokotozo cha kisayansi',
    ar: 'آلة حاسبة علمية', es: 'Calculadora científica', pt: 'Calculadora científica', zh: '科学计算器',
  },
  'json-formatter': {
    en: 'JSON Formatter', fr: 'Formateur JSON', rw: 'JSON', sw: 'JSON',
    ar: 'منسق JSON', es: 'Formateador JSON', pt: 'Formatador JSON', zh: 'JSON格式化',
  },
  'base64-encoder': {
    en: 'Base64 Encoder', fr: 'Encodeur Base64', rw: 'Base64', sw: 'Base64',
    ar: 'مشفر Base64', es: 'Codificador Base64', pt: 'Codificador Base64', zh: 'Base64编码',
  },
  'css-minifier': {
    en: 'CSS Minifier', fr: 'Minificateur CSS', rw: 'CSS', sw: 'CSS',
    ar: 'ضاغط CSS', es: 'Minificador CSS', pt: 'Minificador CSS', zh: 'CSS压缩',
  },
  'html-beautifier': {
    en: 'HTML Beautifier', fr: 'Formateur HTML', rw: 'HTML', sw: 'HTML',
    ar: 'منسق HTML', es: 'Formateador HTML', pt: 'Formatador HTML', zh: 'HTML格式化',
  },
  'color-picker': {
    en: 'Color Picker', fr: 'Sélecteur de couleurs', rw: 'Amabara', sw: 'Chagua rangi',
    ar: 'منتقي الألوان', es: 'Selector de color', pt: 'Seletor de cores', zh: '颜色选择器',
  },
  'color-palette-generator': {
    en: 'Color Palette Generator', fr: 'Générateur de palettes', rw: 'Palette yamabara', sw: 'Palette ya rangi',
    ar: 'مولد لوحة الألوان', es: 'Paleta de colores', pt: 'Paleta de cores', zh: '配色方案生成',
  },
}

export const CATEGORY_NAMES = {
  image: {
    en: 'Image Tools', fr: "Outils d'image", rw: 'Amashusho', sw: 'Zana za Picha',
    ar: 'أدوات الصور', es: 'Herramientas de imagen', pt: 'Ferramentas de imagem', zh: '图片工具',
  },
  pdf: {
    en: 'PDF Tools', fr: 'Outils PDF', rw: 'PDF', sw: 'Zana za PDF',
    ar: 'أدوات PDF', es: 'Herramientas PDF', pt: 'Ferramentas PDF', zh: 'PDF工具',
  },
  text: {
    en: 'Text Tools', fr: 'Outils texte', rw: 'Inyandiko', sw: 'Zana za Maandishi',
    ar: 'أدوات النص', es: 'Herramientas de texto', pt: 'Ferramentas de texto', zh: '文本工具',
  },
  student: {
    en: 'Student Tools', fr: 'Outils étudiants', rw: 'Abanyeshuri', sw: 'Wanafunzi',
    ar: 'أدوات الطلاب', es: 'Herramientas estudiantiles', pt: 'Ferramentas estudantis', zh: '学生工具',
  },
  business: {
    en: 'Business Tools', fr: 'Outils business', rw: 'Ubucuruzi', sw: 'Biashara',
    ar: 'أدوات الأعمال', es: 'Herramientas de negocio', pt: 'Ferramentas de negócios', zh: '商务工具',
  },
  converter: {
    en: 'Converter Tools', fr: 'Convertisseurs', rw: 'Guhindura', sw: 'Vibadilishaji',
    ar: 'أدوات التحويل', es: 'Convertidores', pt: 'Conversores', zh: '转换工具',
  },
  developer: {
    en: 'Developer Tools', fr: 'Outils développeur', rw: 'Abakora porogaramu', sw: 'Wasanidi programu',
    ar: 'أدوات المطورين', es: 'Herramientas para desarrolladores', pt: 'Ferramentas para desenvolvedores', zh: '开发者工具',
  },
}

export const PAGES = {
  home: {
    en: {
      title: 'Free Online Tools — PDF Converter, Image Compressor & Browser Utilities',
      description:
        'Access free online tools instantly. Compress images, convert PDF to Word, generate QR codes, and more. 100% free, fast, and secure. No signup required.',
    },
    fr: {
      title: 'Outils en ligne gratuits — PDF, images, texte et productivité',
      description:
        'Compressez des images, convertissez PDF en Word, générez des QR codes et plus encore. 100 % gratuit, rapide et sécurisé. Sans inscription.',
    },
    rw: {
      title: 'Ibikoresho kuri interineti ubuntu — PDF, amashusho n\'ibindi',
      description:
        'Fata amashusho, hindura PDF, kora QR codes n\'ibindi. Byubuntu, byihuse, birinzwe. Nta kwiyandikisha.',
    },
    sw: {
      title: 'Zana za mtandaoni bure — PDF, picha na zana za kivinjari',
      description:
        'Bana picha, badilisha PDF kuwa Word, tengeneza QR codes na zaidi. Bure kabisa, haraka na salama. Hakuna usajili.',
    },
    ar: {
      title: 'أدوات مجانية عبر الإنترنت — PDF والصور والنص',
      description:
        'اضغط الصور، حوّل PDF إلى Word، أنشئ رموز QR والمزيد. مجاني بالكامل وسريع وآمن. بدون تسجيل.',
    },
    es: {
      title: 'Herramientas online gratis — PDF, imágenes y productividad',
      description:
        'Comprime imágenes, convierte PDF a Word, genera códigos QR y más. 100 % gratis, rápido y seguro. Sin registro.',
    },
    pt: {
      title: 'Ferramentas online grátis — PDF, imagens e produtividade',
      description:
        'Comprima imagens, converta PDF para Word, gere QR codes e mais. 100% grátis, rápido e seguro. Sem cadastro.',
    },
    zh: {
      title: '免费在线工具 — PDF转换、图片压缩与浏览器实用工具',
      description:
        '即时使用免费在线工具：压缩图片、PDF转Word、生成二维码等。完全免费、快速安全，无需注册。',
    },
  },
  about: {
    en: { title: 'About Us', description: 'Learn about SmartDigitalTips — free browser-based tools built for privacy and productivity worldwide.' },
    fr: { title: 'À propos', description: 'Découvrez SmartDigitalTips — des outils gratuits dans le navigateur, privés et accessibles partout.' },
    rw: { title: 'Twebwe', description: 'Menya SmartDigitalTips — ibikoresho byubuntu bikora mu mushakisha, byizewe kandi byihuse.' },
    sw: { title: 'Kuhusu sisi', description: 'Jifunze kuhusu SmartDigitalTips — zana za bure zinazofanya kazi kwenye kivinjari, salama na za faragha.' },
    ar: { title: 'من نحن', description: 'تعرّف على SmartDigitalTips — أدوات مجانية في المتصفح للخصوصية والإنتاجية حول العالم.' },
    es: { title: 'Sobre nosotros', description: 'Conoce SmartDigitalTips — herramientas gratuitas en el navegador, privadas y productivas.' },
    pt: { title: 'Sobre nós', description: 'Conheça o SmartDigitalTips — ferramentas grátis no navegador, privadas e produtivas.' },
    zh: { title: '关于我们', description: '了解 SmartDigitalTips — 免费浏览器工具，注重隐私与全球可用性。' },
  },
  contact: {
    en: { title: 'Contact Us', description: 'Get in touch with the SmartDigitalTips team for support, feedback, or partnership inquiries.' },
    fr: { title: 'Contact', description: 'Contactez l\'équipe SmartDigitalTips pour le support, les retours ou les partenariats.' },
    rw: { title: 'Twandikire', description: 'Vugana n\'itsinda rya SmartDigitalTips ku bufasha, ibitekerezo cyangwa ubufatanye.' },
    sw: { title: 'Wasiliana', description: 'Wasiliana na timu ya SmartDigitalTips kwa msaada, maoni au ushirikiano.' },
    ar: { title: 'اتصل بنا', description: 'تواصل مع فريق SmartDigitalTips للدعم أو الملاحظات أو الشراكات.' },
    es: { title: 'Contacto', description: 'Contacta al equipo de SmartDigitalTips para soporte, comentarios o alianzas.' },
    pt: { title: 'Contato', description: 'Fale com a equipe SmartDigitalTips para suporte, feedback ou parcerias.' },
    zh: { title: '联系我们', description: '联系 SmartDigitalTips 团队：支持、反馈或合作咨询。' },
  },
  blog: {
    en: { title: 'Digital Tips & Guides', description: 'Guides on image optimization, PDF tools, SEO, and productivity — free tutorials from SmartDigitalTips.' },
    fr: { title: 'Conseils et guides', description: 'Guides sur l\'optimisation d\'images, les PDF, le SEO et la productivité — tutoriels gratuits.' },
    rw: { title: 'Inama n\'amabwiriza', description: 'Inama ku mashusho, PDF, SEO n\'imikorere — byubuntu kuri SmartDigitalTips.' },
    sw: { title: 'Vidokezo na miongozo', description: 'Miongozo ya picha, PDF, SEO na tija — mafunzo ya bure kutoka SmartDigitalTips.' },
    ar: { title: 'نصائح وأدلة', description: 'أدلة لتحسين الصور وأدوات PDF وSEO والإنتاجية — دروس مجانية.' },
    es: { title: 'Consejos y guías', description: 'Guías de imágenes, PDF, SEO y productividad — tutoriales gratis.' },
    pt: { title: 'Dicas e guias', description: 'Guias de imagens, PDF, SEO e produtividade — tutoriais grátis.' },
    zh: { title: '技巧与指南', description: '图片优化、PDF工具、SEO与效率指南 — SmartDigitalTips 免费教程。' },
  },
  privacy: {
    en: { title: 'Privacy Policy', description: 'How SmartDigitalTips protects your privacy. Browser-based processing — we do not store your files.' },
    fr: { title: 'Politique de confidentialité', description: 'Comment SmartDigitalTips protège votre vie privée. Traitement dans le navigateur — pas de stockage de fichiers.' },
    rw: { title: 'Politiki y\'ibanga', description: 'Uko SmartDigitalTips irinda ibyangombwa byawe. Bikora mu mushakisha — ntitubika amadosiye.' },
    sw: { title: 'Sera ya faragha', description: 'Jinsi SmartDigitalTips inavyolinda faragha yako. Inafanya kazi kwenye kivinjari — hatuhifadhi faili.' },
    ar: { title: 'سياسة الخصوصية', description: 'كيف يحمي SmartDigitalTips خصوصيتك. المعالجة في المتصفح — لا نخزن ملفاتك.' },
    es: { title: 'Política de privacidad', description: 'Cómo SmartDigitalTips protege tu privacidad. Procesamiento en el navegador — no guardamos archivos.' },
    pt: { title: 'Política de privacidade', description: 'Como o SmartDigitalTips protege sua privacidade. Processamento no navegador — não armazenamos arquivos.' },
    zh: { title: '隐私政策', description: 'SmartDigitalTips 如何保护您的隐私。浏览器本地处理 — 不存储您的文件。' },
  },
  terms: {
    en: { title: 'Terms of Service', description: 'Terms of use for SmartDigitalTips free online tools and website services.' },
    fr: { title: 'Conditions d\'utilisation', description: 'Conditions d\'utilisation des outils gratuits SmartDigitalTips.' },
    rw: { title: 'Amategeko', description: 'Amategeko yo gukoresha ibikoresho bya SmartDigitalTips.' },
    sw: { title: 'Masharti', description: 'Masharti ya kutumia zana za bure za SmartDigitalTips.' },
    ar: { title: 'شروط الخدمة', description: 'شروط استخدام أدوات SmartDigitalTips المجانية.' },
    es: { title: 'Términos de servicio', description: 'Términos de uso de las herramientas gratuitas de SmartDigitalTips.' },
    pt: { title: 'Termos de serviço', description: 'Termos de uso das ferramentas gratuitas SmartDigitalTips.' },
    zh: { title: '服务条款', description: 'SmartDigitalTips 免费在线工具的使用条款。' },
  },
  cookies: {
    en: { title: 'Cookie Policy', description: 'How SmartDigitalTips uses cookies and how you can manage your preferences.' },
    fr: { title: 'Politique des cookies', description: 'Utilisation des cookies sur SmartDigitalTips et gestion de vos préférences.' },
    rw: { title: 'Cookies', description: 'Uko SmartDigitalTips ikoresha cookies n\'uburyo bwo kuyagenzura.' },
    sw: { title: 'Sera ya vidakuzi', description: 'Jinsi SmartDigitalTips inavyotumia vidakuzi na kudhibiti mapendeleo.' },
    ar: { title: 'سياسة ملفات تعريف الارتباط', description: 'كيف يستخدم SmartDigitalTips ملفات تعريف الارتباط وإدارة تفضيلاتك.' },
    es: { title: 'Política de cookies', description: 'Uso de cookies en SmartDigitalTips y gestión de preferencias.' },
    pt: { title: 'Política de cookies', description: 'Como o SmartDigitalTips usa cookies e como gerenciar preferências.' },
    zh: { title: 'Cookie 政策', description: 'SmartDigitalTips 如何使用 Cookie 及管理您的偏好。' },
  },
  disclaimer: {
    en: { title: 'Disclaimer', description: 'Legal disclaimer for SmartDigitalTips tools and educational content.' },
    fr: { title: 'Avertissement', description: 'Avertissement légal pour les outils et contenus SmartDigitalTips.' },
    rw: { title: 'Iburira', description: 'Iburira ry\'amategeko ku bikoresho na ibiri kuri SmartDigitalTips.' },
    sw: { title: 'Kanusho', description: 'Kanusho ya kisheria kwa zana na maudhui ya SmartDigitalTips.' },
    ar: { title: 'إخلاء المسؤولية', description: 'إخلاء مسؤولية قانوني لأدوات ومحتوى SmartDigitalTips.' },
    es: { title: 'Aviso legal', description: 'Aviso legal para herramientas y contenido de SmartDigitalTips.' },
    pt: { title: 'Aviso legal', description: 'Aviso legal para ferramentas e conteúdo do SmartDigitalTips.' },
    zh: { title: '免责声明', description: 'SmartDigitalTips 工具与教育内容的法律免责声明。' },
  },
}

export function buildToolSeo(tool, locale) {
  const copy = COPY[locale]
  const names = TOOL_NAMES[tool.id]
  const name = names?.[locale] || names?.en || tool.name

  if (locale === 'en') {
    return { title: tool.seoTitle, description: tool.seoDescription }
  }

  const title = `${copy.free} ${name} ${copy.online} ${copy.suffix}`
  const description = `${copy.free} ${name} ${copy.online}. ${copy.noSignup}. ${copy.private}.`

  return { title, description }
}

export function buildCategorySeo(category, locale) {
  const names = CATEGORY_NAMES[category.id]
  const label = names?.[locale] || names?.en || category.label
  const copy = COPY[locale]

  if (locale === 'en') {
    return {
      title: `${category.label} — Free Online Tools | ${BRAND}`,
      description: category.description,
    }
  }

  return {
    title: `${label} — ${copy.free} ${copy.online} ${copy.suffix}`,
    description: `${category.description} ${copy.noSignup}.`,
  }
}
