// SEO Analytics & Tracking System
export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export class SEOAnalytics {
  private gaId: string;
  private gscId: string;

  constructor(gaId = 'G-XXXXXXXXXX', gscId = '') {
    this.gaId = gaId;
    this.gscId = gscId;
  }

  // Initialize Google Analytics 4
  initGA4(): string {
    return `
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${this.gaId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${this.gaId}', {
    page_path: window.location.pathname,
    send_page_view: true
  });
</script>
    `.trim();
  }

  // Track custom events
  trackEvent(event: AnalyticsEvent): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }
  }

  // Track tool usage
  trackToolUsage(toolName: string, action: string): void {
    this.trackEvent({
      category: 'Tool Usage',
      action: action,
      label: toolName
    });
  }

  // Track conversions
  trackConversion(conversionType: string, value?: number): void {
    this.trackEvent({
      category: 'Conversion',
      action: conversionType,
      value: value
    });
  }

  // Track search queries
  trackSearch(query: string, resultsCount: number): void {
    this.trackEvent({
      category: 'Search',
      action: 'search_query',
      label: query,
      value: resultsCount
    });
  }

  // Initialize Microsoft Clarity
  initClarity(clarityId = 'XXXXXXXXXX'): string {
    return `
<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${clarityId}");
</script>
    `.trim();
  }

  // Initialize Hotjar
  initHotjar(hjid = 'XXXXXXX', hjsv = '6'): string {
    return `
<!-- Hotjar Tracking Code -->
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:${hjid},hjsv:${hjsv}};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
    `.trim();
  }

  // Generate Google Search Console verification
  generateGSCVerification(verificationCode: string): string {
    return `<meta name="google-site-verification" content="${verificationCode}" />`;
  }

  // Generate Bing Webmaster verification
  generateBingVerification(verificationCode: string): string {
    return `<meta name="msvalidate.01" content="${verificationCode}" />`;
  }

  // Generate Yandex verification
  generateYandexVerification(verificationCode: string): string {
    return `<meta name="yandex-verification" content="${verificationCode}" />`;
  }

  // Track Core Web Vitals
  trackWebVitals(): string {
    return `
<script>
  function sendToAnalytics(metric) {
    const body = JSON.stringify(metric);
    const url = '/api/analytics/web-vitals';
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: 'POST', keepalive: true });
    }
  }

  // Track CLS
  let clsValue = 0;
  let clsEntries = [];
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }
  });
  clsObserver.observe({ type: 'layout-shift', buffered: true });

  // Track LCP
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    sendToAnalytics({
      name: 'LCP',
      value: lastEntry.renderTime || lastEntry.loadTime,
      rating: lastEntry.renderTime < 2500 ? 'good' : lastEntry.renderTime < 4000 ? 'needs-improvement' : 'poor'
    });
  });
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

  // Track FID
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fid = entry.processingStart - entry.startTime;
      sendToAnalytics({
        name: 'FID',
        value: fid,
        rating: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor'
      });
    }
  });
  fidObserver.observe({ type: 'first-input', buffered: true });

  // Send CLS on page unload
  addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendToAnalytics({
        name: 'CLS',
        value: clsValue,
        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
      });
    }
  });
</script>
    `.trim();
  }

  // Generate complete analytics setup
  generateCompleteSetup(config: {
    gaId?: string;
    clarityId?: string;
    hotjarId?: string;
    gscVerification?: string;
    bingVerification?: string;
  }): string {
    let html = '';

    if (config.gaId) {
      this.gaId = config.gaId;
      html += this.initGA4() + '\n\n';
    }

    if (config.clarityId) {
      html += this.initClarity(config.clarityId) + '\n\n';
    }

    if (config.hotjarId) {
      html += this.initHotjar(config.hotjarId) + '\n\n';
    }

    if (config.gscVerification) {
      html += this.generateGSCVerification(config.gscVerification) + '\n';
    }

    if (config.bingVerification) {
      html += this.generateBingVerification(config.bingVerification) + '\n';
    }

    html += '\n' + this.trackWebVitals();

    return html;
  }

  // Track SEO metrics
  trackSEOMetrics(): void {
    if (typeof window === 'undefined') return;

    // Track page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        this.trackEvent({
          category: 'Performance',
          action: 'page_load_time',
          value: pageLoadTime
        });
      }, 0);
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
          this.trackEvent({
            category: 'Engagement',
            action: 'scroll_depth',
            label: `${scrollPercent}%`,
            value: scrollPercent
          });
        }
      }
    });

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      this.trackEvent({
        category: 'Engagement',
        action: 'time_on_page',
        value: timeOnPage
      });
    });
  }
}

export const seoAnalytics = new SEOAnalytics();
