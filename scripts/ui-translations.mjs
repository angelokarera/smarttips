/** UI copy per locale — merged into messages/*.json by generate-seo-messages.mjs */

const L = (en, fr, sw, ar, es, pt, zh) => ({ en, fr, sw, ar, es, pt, zh })

export const UI = {
  nav: {
    home: L('Home', 'Accueil', 'Nyumbani', 'الرئيسية', 'Inicio', 'Início', '首页'),
    tools: L('Tools', 'Outils', 'Zana', 'أدوات', 'Herramientas', 'Ferramentas', '工具'),
    blog: L('Blog', 'Blog', 'Blogu', 'المدونة', 'Blog', 'Blog', '博客'),
    about: L('About', 'À propos', 'Kuhusu', 'من نحن', 'Sobre nosotros', 'Sobre', '关于'),
    contact: L('Contact', 'Contact', 'Wasiliana', 'اتصل', 'Contacto', 'Contato', '联系'),
    search: L('Search...', 'Rechercher...', 'Tafuta...', 'بحث...', 'Buscar...', 'Pesquisar...', '搜索...'),
    searchPlaceholder: L('Search tools...', 'Rechercher un outil...', 'Tafuta zana...', 'ابحث عن أداة...', 'Buscar herramientas...', 'Pesquisar ferramentas...', '搜索工具...'),
    noResults: L('No tools found', 'Aucun outil trouvé', 'Hakuna zana', 'لم يتم العثور على أدوات', 'Sin resultados', 'Nenhuma ferramenta', '未找到工具'),
  },
  common: {
    new: L('New', 'Nouveau', 'Mpya', 'جديد', 'Nuevo', 'Novo', '新'),
    trending: L('Trending', 'Tendance', 'Maarufu', 'رائج', 'Tendencia', 'Em alta', '热门'),
    popular: L('Popular', 'Populaire', 'Maarufu', 'شائع', 'Popular', 'Popular', '热门'),
    free: L('All free', 'Tout gratuit', 'Bure', 'مجاني', 'Gratis', 'Grátis', '免费'),
    allTools: L('All tools', 'Tous les outils', 'Zana zote', 'كل الأدوات', 'Todas', 'Todas', '全部工具'),
    viewAll: L('View all', 'Voir tout', 'Angalia zote', 'عرض الكل', 'Ver todo', 'Ver tudo', '查看全部'),
    browseAll: L('Browse all tools', 'Parcourir les outils', 'Angalia zana zote', 'تصفح الأدوات', 'Ver herramientas', 'Ver ferramentas', '浏览全部工具'),
    loading: L('Loading interface...', 'Chargement...', 'Inapakia...', 'جاري التحميل...', 'Cargando...', 'Carregando...', '加载中...'),
    comingSoon: L('Coming soon', 'Bientôt disponible', 'Inakuja hivi karibuni', 'قريباً', 'Próximamente', 'Em breve', '即将推出'),
    relatedTools: L('Related tools', 'Outils associés', 'Zana zinazohusiana', 'أدوات ذات صلة', 'Herramientas relacionadas', 'Ferramentas relacionadas', '相关工具'),
    otherCategories: L('Other categories', 'Autres catégories', 'Kategoria nyingine', 'فئات أخرى', 'Otras categorías', 'Outras categorias', '其他分类'),
    toolsCount: L('tools', 'outils', 'zana', 'أدوات', 'herramientas', 'ferramentas', '个工具'),
  },
  home: {
    badge: L(
      '100% browser-based — your files never leave your device',
      '100 % dans le navigateur — vos fichiers restent sur votre appareil',
      '100% kwenye kivinjari — faili zako hubaki kwenye kifaa chako',
      '100٪ في المتصفح — ملفاتك لا تغادر جهازك',
      '100 % en el navegador — tus archivos no salen de tu dispositivo',
      '100% no navegador — seus arquivos não saem do dispositivo',
      '100% 浏览器运行 — 文件不会离开您的设备'
    ),
    heroTitle: L(
      'Stop uploading your files to strangers.',
      'Arrêtez d\'envoyer vos fichiers à des inconnus.',
      'Acha kupakia faili zako kwa wageni.',
      'توقف عن رفع ملفاتك لغرباء.',
      'Deja de subir tus archivos a desconocidos.',
      'Pare de enviar seus arquivos a estranhos.',
      '别再把文件上传给陌生人。'
    ),
    heroSubtitle: L(
      'Free tools for images, PDFs, text, and more. Everything runs locally in your browser. No accounts. No watermarks. No data collection.',
      'Outils gratuits pour images, PDF, texte et plus. Tout fonctionne localement dans votre navigateur. Sans compte. Sans filigrane.',
      'Zana za bure za picha, PDF, maandishi na zaidi. Kila kitu kinafanya kazi kwenye kivinjari. Hakuna akaunti. Hakuna alama ya maji.',
      'أدوات مجانية للصور وPDF والنص والمزيد. كل شيء يعمل محلياً في متصفحك. بدون حسابات أو علامات مائية.',
      'Herramientas gratis para imágenes, PDF, texto y más. Todo en tu navegador. Sin cuentas ni marcas de agua.',
      'Ferramentas grátis para imagens, PDF, texto e mais. Tudo no navegador. Sem contas nem marcas d\'água.',
      '免费的图片、PDF、文本等工具。一切都在浏览器本地运行。无需注册、无水印。'
    ),
    tryWordCounter: L('Try Word Counter', 'Compteur de mots', 'Kihesabu maneno', 'عداد الكلمات', 'Contador de palabras', 'Contador de palavras', '试试字数统计'),
    cardPrivateTitle: L('Private by default', 'Privé par défaut', 'Faragha kwa chaguo-msingi', 'خصوصية افتراضياً', 'Privado por defecto', 'Privado por padrão', '默认私密'),
    cardPrivateText: L(
      'Files are processed in your browser tab. We physically cannot see, store, or sell your data.',
      'Les fichiers sont traités dans votre navigateur. Nous ne voyons ni ne stockons vos données.',
      'Faili zinachakatwa kwenye kivinjari. Hatuoni, kuhifadhi, au kuuza data yako.',
      'تتم معالجة الملفات في متصفحك. لا نرى بياناتك ولا نخزنها.',
      'Los archivos se procesan en tu navegador. No vemos ni vendemos tus datos.',
      'Os arquivos são processados no navegador. Não vemos nem vendemos seus dados.',
      '文件在浏览器标签页中处理。我们无法查看、存储或出售您的数据。'
    ),
    cardInstantTitle: L('Instant results', 'Résultats instantanés', 'Matokeo papo hapo', 'نتائج فورية', 'Resultados al instante', 'Resultados instantâneos', '即时结果'),
    cardInstantText: L(
      'No loading spinners, no server roundtrips. Open a tool, drop in a file, get a result.',
      'Pas d\'aller-retour serveur. Ouvrez un outil, déposez un fichier, obtenez un résultat.',
      'Hakuna kusubiri seva. Fungua zana, weka faili, pata matokeo.',
      'بدون انتظار الخادم. افتح أداة، أضف ملفاً، احصل على نتيجة.',
      'Sin esperar al servidor. Abre una herramienta, sube un archivo, obtén resultado.',
      'Sem esperar servidor. Abra uma ferramenta, envie um arquivo, veja o resultado.',
      '无需等待服务器。打开工具、放入文件、立即得到结果。'
    ),
    cardFreeTitle: L('No strings attached', 'Sans conditions', 'Bila masharti', 'بدون قيود', 'Sin condiciones', 'Sem pegadinhas', '无任何附加条件'),
    cardFreeText: L(
      'No accounts, no usage limits, no premium tier. Every tool is free. Period.',
      'Pas de compte, pas de limite, pas de version premium. Tout est gratuit.',
      'Hakuna akaunti, hakuna kikomo, hakuna premium. Kila zana ni bure.',
      'بدون حسابات أو حدود أو اشتراك مدفوع. كل الأدوات مجانية.',
      'Sin cuentas, límites ni premium. Todas las herramientas son gratis.',
      'Sem contas, limites ou premium. Todas as ferramentas são grátis.',
      '无需账户、无使用限制、无付费版。所有工具均免费。'
    ),
    mostUsed: L('Most-used tools', 'Outils les plus utilisés', 'Zana zinazotumika zaidi', 'الأدوات الأكثر استخداماً', 'Herramientas más usadas', 'Ferramentas mais usadas', '最常用工具'),
    browseByCategory: L('Browse by category', 'Parcourir par catégorie', 'Vinjari kwa kategoria', 'تصفح حسب الفئة', 'Explorar por categoría', 'Explorar por categoria', '按分类浏览'),
    trendingNow: L('Trending now', 'Tendances', 'Maarufu sasa', 'الرائج الآن', 'Tendencias', 'Em alta agora', '当前热门'),
    newTools: L('New tools', 'Nouveaux outils', 'Zana mpya', 'أدوات جديدة', 'Nuevas herramientas', 'Novas ferramentas', '新工具'),
    ctaTitle: L('Need a specific tool?', 'Besoin d\'un outil précis ?', 'Unahitaji zana maalum?', 'تحتاج أداة معينة؟', '¿Necesitas una herramienta?', 'Precisa de uma ferramenta?', '需要特定工具？'),
    ctaText: L(
      'We add new tools every week. Tell us what you need.',
      'Nous ajoutons des outils chaque semaine. Dites-nous ce qu\'il vous faut.',
      'Tunaongeza zana kila wiki. Tuambie unachohitaji.',
      'نضيف أدوات جديدة كل أسبوع. أخبرنا بما تحتاج.',
      'Añadimos herramientas cada semana. Cuéntanos qué necesitas.',
      'Adicionamos ferramentas toda semana. Diga o que precisa.',
      '我们每周添加新工具。告诉我们您的需求。'
    ),
    contactUs: L('Contact us', 'Contactez-nous', 'Wasiliana nasi', 'اتصل بنا', 'Contáctanos', 'Fale conosco', '联系我们'),
    mostUsedSubtitle: L(
      'What people actually come back for.',
      'Ce que les gens utilisent vraiment.',
      'Zana watu wanazotumia tena.',
      'ما يعود إليه المستخدمون فعلاً.',
      'Lo que la gente usa de verdad.',
      'O que as pessoas realmente usam.',
      '用户真正会反复使用的工具。'
    ),
    pickCategoryTitle: L(
      'Pick a category. Get to work.',
      'Choisissez une catégorie. Au travail.',
      'Chagua kategoria. Anza kazi.',
      'اختر فئة وابدأ.',
      'Elige una categoría. A trabajar.',
      'Escolha uma categoria. Mãos à obra.',
      '选一个分类，马上开工。'
    ),
    pickCategorySubtitle: L(
      'Seven categories. Zero friction between you and done.',
      'Sept catégories. Aucune friction entre vous et le résultat.',
      'Kategoria saba. Hakuna kikwazo.',
      'سبع فئات. بدون عوائق.',
      'Siete categorías. Sin fricción.',
      'Sete categorias. Sem atrito.',
      '七个分类，零阻力完成任务。'
    ),
    explore: L('Explore', 'Explorer', 'Chunguza', 'استكشف', 'Explorar', 'Explorar', '探索'),
    trendingRightNow: L('Trending right now', 'Tendances actuelles', 'Maarufu sasa', 'الرائج الآن', 'Tendencias ahora', 'Em alta agora', '当前热门'),
    justShipped: L('Just shipped', 'Tout juste ajouté', 'Imeongezwa hivi karibuni', 'أُضيف للتو', 'Recién publicado', 'Acabou de sair', '刚刚上线'),
    ctaHeroTitle: L('Your files stay yours.', 'Vos fichiers restent les vôtres.', 'Faili zako ni zako.', 'ملفاتك تبقى ملكك.', 'Tus archivos siguen siendo tuyos.', 'Seus arquivos continuam seus.', '您的文件始终属于您。'),
    ctaHeroText: L(
      'Pick any tool and start using it. No setup, no account creation, no learning curve.',
      'Choisissez un outil et commencez. Pas de configuration ni de compte.',
      'Chagua zana yoyote na uanze. Hakuna usanidi wala akaunti.',
      'اختر أي أداة وابدأ. بدون إعداد أو حساب.',
      'Elige una herramienta y empieza. Sin configuración ni cuenta.',
      'Escolha uma ferramenta e comece. Sem configuração nem conta.',
      '选择任意工具即可使用。无需设置、注册或学习成本。'
    ),
    getStarted: L('Get started', 'Commencer', 'Anza', 'ابدأ', 'Empezar', 'Começar', '开始使用'),
  },
  search: {
    results: L('Results', 'Résultats', 'Matokeo', 'النتائج', 'Resultados', 'Resultados', '结果'),
    nothingFound: L('Nothing found for', 'Rien trouvé pour', 'Hakuna matokeo kwa', 'لا نتائج لـ', 'Sin resultados para', 'Nada encontrado para', '未找到'),
    toolCategories: L('Tool Categories', 'Catégories', 'Kategoria za zana', 'فئات الأدوات', 'Categorías', 'Categorias', '工具分类'),
  },
  tool: {
    howItWorks: L('How it works', 'Comment ça marche', 'Jinsi inavyofanya kazi', 'كيف يعمل', 'Cómo funciona', 'Como funciona', '使用方法'),
    whyThisTool: L('Why this tool', 'Pourquoi cet outil', 'Kwa nini zana hii', 'لماذا هذه الأداة', 'Por qué esta herramienta', 'Por que esta ferramenta', '为什么用这个工具'),
    faq: L('FAQ', 'FAQ', 'Maswali', 'الأسئلة الشائعة', 'Preguntas', 'Perguntas', '常见问题'),
    notFound: L('Tool not found', 'Outil introuvable', 'Zana haipatikani', 'الأداة غير موجودة', 'Herramienta no encontrada', 'Ferramenta não encontrada', '未找到工具'),
    notFoundDesc: L(
      'This tool doesn\'t exist or may have been moved.',
      'Cet outil n\'existe pas ou a été déplacé.',
      'Zana hii haipo au imehamishwa.',
      'هذه الأداة غير موجودة أو تم نقلها.',
      'Esta herramienta no existe o fue movida.',
      'Esta ferramenta não existe ou foi movida.',
      '该工具不存在或已移动。'
    ),
    backHome: L('Back to home', 'Retour à l\'accueil', 'Rudi nyumbani', 'العودة للرئيسية', 'Volver al inicio', 'Voltar ao início', '返回首页'),
    comingSoonDesc: L(
      'This tool is being built. Check back in a few days — we ship fast.',
      'Cet outil est en cours de création. Revenez dans quelques jours.',
      'Zana hii inatengenezwa. Rudi baada ya siku chache.',
      'هذه الأداة قيد الإنشاء. عد لاحقاً.',
      'Esta herramienta está en desarrollo. Vuelve pronto.',
      'Esta ferramenta está em desenvolvimento. Volte em breve.',
      '该工具正在开发中，请稍后再来。'
    ),
  },
  category: {
    toolsCount: L('tools', 'outils', 'zana', 'أدوات', 'herramientas', 'ferramentas', '个工具'),
    whatYouCanDo: L('What you can do here', 'Ce que vous pouvez faire', 'Unachoweza kufanya', 'ما يمكنك فعله', 'Qué puedes hacer', 'O que você pode fazer', '您可以在这里做什么'),
    categoryFaq: L('Category FAQ', 'FAQ catégorie', 'Maswali ya kategoria', 'أسئلة الفئة', 'FAQ de categoría', 'FAQ da categoria', '分类常见问题'),
    notFound: L('Category not found', 'Catégorie introuvable', 'Kategoria haipatikani', 'الفئة غير موجودة', 'Categoría no encontrada', 'Categoria não encontrada', '未找到分类'),
    notFoundDesc: L(
      'This category doesn\'t exist.',
      'Cette catégorie n\'existe pas.',
      'Kategoria hii haipo.',
      'هذه الفئة غير موجودة.',
      'Esta categoría no existe.',
      'Esta categoria não existe.',
      '该分类不存在。'
    ),
    empty: L('No tools in this category yet.', 'Aucun outil dans cette catégorie.', 'Hakuna zana bado.', 'لا أدوات في هذه الفئة بعد.', 'Sin herramientas aún.', 'Nenhuma ferramenta ainda.', '此分类暂无工具。'),
  },
  footer: {
    tagline: L(
      '50+ browser-based tools. No uploads, no accounts, no nonsense.',
      '50+ outils dans le navigateur. Pas d\'envoi, pas de compte.',
      'Zana 50+ kwenye kivinjari. Hakuna upakiaji, hakuna akaunti.',
      'أكثر من 50 أداة في المتصفح. بدون رفع أو حسابات.',
      'Más de 50 herramientas en el navegador. Sin subidas ni cuentas.',
      'Mais de 50 ferramentas no navegador. Sem uploads nem contas.',
      '50+ 款浏览器工具。无需上传、无需注册。'
    ),
    tools: L('Tools', 'Outils', 'Zana', 'أدوات', 'Herramientas', 'Ferramentas', '工具'),
    company: L('Company', 'Entreprise', 'Kampuni', 'الشركة', 'Empresa', 'Empresa', '公司'),
    rights: L('All rights reserved.', 'Tous droits réservés.', 'Haki zote zimehifadhiwa.', 'جميع الحقوق محفوظة.', 'Todos los derechos reservados.', 'Todos os direitos reservados.', '版权所有。'),
    privacy: L('Privacy', 'Confidentialité', 'Faragha', 'الخصوصية', 'Privacidad', 'Privacidade', '隐私'),
    cookies: L('Cookies', 'Cookies', 'Vidakuzi', 'ملفات تعريف الارتباط', 'Cookies', 'Cookies', 'Cookie'),
    terms: L('Terms', 'Conditions', 'Masharti', 'الشروط', 'Términos', 'Termos', '条款'),
    disclaimer: L('Disclaimer', 'Avertissement', 'Kanusho', 'إخلاء المسؤولية', 'Aviso legal', 'Aviso legal', '免责声明'),
    privacyNote: L(
      'Everything runs in your browser. We never see your files.',
      'Tout s\'exécute dans votre navigateur. Nous ne voyons jamais vos fichiers.',
      'Kila kitu kinafanya kazi kwenye kivinjari. Hatuoni faili zako.',
      'كل شيء يعمل في متصفحك. لا نرى ملفاتك أبداً.',
      'Todo funciona en tu navegador. Nunca vemos tus archivos.',
      'Tudo roda no navegador. Nunca vemos seus arquivos.',
      '一切都在浏览器中运行。我们绝不会看到您的文件。'
    ),
  },
  cookie: {
    title: L('Cookies, ads, and analytics', 'Cookies, publicités et analytique', 'Vidakuzi na matangazo', 'ملفات تعريف الارتباط والإعلانات', 'Cookies y anuncios', 'Cookies e anúncios', 'Cookie 与广告'),
    body: L(
      'We use essential storage for preferences and may use Google Analytics and Google AdSense cookies for measurement, ad delivery, fraud prevention, and personalized ads where allowed. You can accept or reject optional cookies.',
      'Nous utilisons un stockage essentiel et pouvons utiliser Google Analytics et AdSense. Vous pouvez accepter ou refuser les cookies optionnels.',
      'Tunatumia uhifadhi muhimu na tunaweza kutumia Google Analytics na AdSense. Unaweza kukubali au kukataa vidakuzi hiari.',
      'نستخدم تخزيناً أساسياً وقد نستخدم Google Analytics وAdSense. يمكنك قبول أو رفض ملفات تعريف الارتباط الاختيارية.',
      'Usamos almacenamiento esencial y podemos usar Google Analytics y AdSense. Puedes aceptar o rechazar cookies opcionales.',
      'Usamos armazenamento essencial e podemos usar Google Analytics e AdSense. Você pode aceitar ou rejeitar cookies opcionais.',
      '我们使用必要存储，并可能使用 Google Analytics 和 AdSense。您可接受或拒绝可选 Cookie。'
    ),
    accept: L('Accept all', 'Tout accepter', 'Kubali zote', 'قبول الكل', 'Aceptar todo', 'Aceitar tudo', '全部接受'),
    reject: L('Reject optional', 'Refuser optionnels', 'Kataa hiari', 'رفض الاختيارية', 'Rechazar opcionales', 'Rejeitar opcionais', '拒绝可选'),
    privacy: L('Privacy Policy', 'Politique de confidentialité', 'Sera ya faragha', 'سياسة الخصوصية', 'Política de privacidad', 'Política de privacidade', '隐私政策'),
    cookiesLink: L('Cookie Policy', 'Politique des cookies', 'Sera ya vidakuzi', 'سياسة ملفات تعريف الارتباط', 'Política de cookies', 'Política de cookies', 'Cookie 政策'),
  },
}

export const CATEGORY_UI = {
  image: {
    label: L('Image Tools', 'Outils image', 'Zana za Picha', 'أدوات الصور', 'Herramientas de imagen', 'Ferramentas de imagem', '图片工具'),
    description: L(
      'Compress, convert, edit, and transform images effortlessly.',
      'Compressez, convertissez et modifiez vos images facilement.',
      'Bana, badilisha na hariri picha kwa urahisi.',
      'اضغط وحوّل وحرّر الصور بسهولة.',
      'Comprime, convierte y edita imágenes fácilmente.',
      'Comprima, converta e edite imagens com facilidade.',
      '轻松压缩、转换、编辑和变换图片。'
    ),
  },
  pdf: {
    label: L('PDF Tools', 'Outils PDF', 'Zana za PDF', 'أدوات PDF', 'Herramientas PDF', 'Ferramentas PDF', 'PDF工具'),
    description: L(
      'Merge, split, convert, and manipulate PDF documents.',
      'Fusionnez, divisez et convertissez vos PDF.',
      'Unganisha, gawanya na badilisha PDF.',
      'دمج وتقسيم وتحويل مستندات PDF.',
      'Combina, divide y convierte PDF.',
      'Mescle, divida e converta PDFs.',
      '合并、拆分、转换和处理 PDF 文档。'
    ),
  },
  text: {
    label: L('Text Tools', 'Outils texte', 'Zana za Maandishi', 'أدوات النص', 'Herramientas de texto', 'Ferramentas de texto', '文本工具'),
    description: L(
      'Count words, convert case, format, and analyze text.',
      'Comptez les mots, changez la casse et analysez le texte.',
      'Hesabu maneno, badilisha herufi na chambua maandishi.',
      'عدّ الكلمات وحوّل الحالة وحلّل النص.',
      'Cuenta palabras, cambia mayúsculas y analiza texto.',
      'Conte palavras, altere maiúsculas e analise texto.',
      '统计字数、转换大小写并分析文本。'
    ),
  },
  student: {
    label: L('Student Tools', 'Outils étudiants', 'Zana za Wanafunzi', 'أدوات الطلاب', 'Herramientas estudiantiles', 'Ferramentas estudantis', '学生工具'),
    description: L(
      'Calculators, converters, and helpers for academic success.',
      'Calculatrices et aides pour réussir à l\'école.',
      'Vikokotozo na visaidizi vya masomo.',
      'حاسبات وأدوات مساعدة للنجاح الدراسي.',
      'Calculadoras y ayudas para el éxito académico.',
      'Calculadoras e ajudas para o sucesso acadêmico.',
      '计算器和学习辅助工具。'
    ),
  },
  business: {
    label: L('Business Tools', 'Outils business', 'Zana za Biashara', 'أدوات الأعمال', 'Herramientas de negocio', 'Ferramentas de negócios', '商务工具'),
    description: L(
      'Invoices, QR codes, and productivity utilities.',
      'Factures, codes QR et outils de productivité.',
      'Ankara, QR codes na zana za tija.',
      'فواتير ورموز QR وأدوات إنتاجية.',
      'Facturas, códigos QR y productividad.',
      'Faturas, QR codes e produtividade.',
      '发票、二维码和商务效率工具。'
    ),
  },
  converter: {
    label: L('Converter Tools', 'Convertisseurs', 'Vibadilishaji', 'أدوات التحويل', 'Convertidores', 'Conversores', '转换工具'),
    description: L(
      'Unit conversions and measurement tools.',
      'Conversions d\'unités et de mesures.',
      'Ubadilishaji wa vipimo na vitengo.',
      'تحويل الوحدات وأدوات القياس.',
      'Conversiones de unidades y medidas.',
      'Conversão de unidades e medidas.',
      '单位换算和度量工具。'
    ),
  },
  developer: {
    label: L('Developer Tools', 'Outils développeur', 'Zana za Wasanidi', 'أدوات المطورين', 'Herramientas para desarrolladores', 'Ferramentas para desenvolvedores', '开发者工具'),
    description: L(
      'Format, minify, and encode code and data.',
      'Formatez, minifiez et encodez code et données.',
      'Panga, fupisha na simba msimbo na data.',
      'تنسيق وتصغير وترميز الكود والبيانات.',
      'Formatea, minifica y codifica datos.',
      'Formate, minifique e codifique dados.',
      '格式化、压缩和编码代码与数据。'
    ),
  },
}

function pickLocale(map, locale) {
  return map[locale] || map.en
}

export function buildUiBundle(locale) {
  const ui = {}
  for (const [section, keys] of Object.entries(UI)) {
    ui[section] = {}
    for (const [key, translations] of Object.entries(keys)) {
      ui[section][key] = pickLocale(translations, locale)
    }
  }
  return ui
}

export function buildCategoryLabels(locale, categories) {
  const out = {}
  for (const cat of categories) {
    const t = CATEGORY_UI[cat.id]
    if (t) {
      out[cat.id] = {
        label: pickLocale(t.label, locale),
        description: pickLocale(t.description, locale),
      }
    } else {
      out[cat.id] = { label: cat.label, description: cat.description }
    }
  }
  return out
}

function firstSentence(text) {
  const match = text.match(/^[^.!?。]+[.!?。]?/)
  return match ? match[0].trim() : text
}

export function buildToolLabels(locale, tools, TOOL_NAMES, toolSeo = {}) {
  const out = {}
  for (const tool of tools) {
    const names = TOOL_NAMES[tool.id]
    const name = names?.[locale] || names?.en || tool.name
    const seo = toolSeo[tool.id]
    const description =
      locale === 'en'
        ? tool.description
        : seo?.description
          ? firstSentence(seo.description)
          : tool.description
    out[tool.id] = { name, description }
  }
  return out
}
