// Core Web Vitals Optimization
export interface WebVitalsMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

export class WebVitalsOptimizer {
  // Image optimization utilities
  static optimizeImage(src: string, width?: number, quality = 85): string {
    // Add query params for image optimization
    const url = new URL(src, window.location.origin);
    if (width) url.searchParams.set('w', width.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fm', 'webp');
    return url.toString();
  }

  // Lazy load images with Intersection Observer
  static lazyLoadImages(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Preload critical resources
  static preloadCriticalResources(resources: string[]): void {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      if (resource.endsWith('.woff2')) {
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
      } else if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      }
      
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Prefetch next pages
  static prefetchPages(urls: string[]): void {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        urls.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          document.head.appendChild(link);
        });
      });
    }
  }

  // Defer non-critical scripts
  static deferScripts(): void {
    document.querySelectorAll('script[data-defer]').forEach(script => {
      const newScript = document.createElement('script');
      newScript.src = script.getAttribute('src') || '';
      newScript.defer = true;
      script.parentNode?.replaceChild(newScript, script);
    });
  }

  // Optimize font loading
  static optimizeFonts(): void {
    // Add font-display: swap to all @font-face rules
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  // Reduce CLS by reserving space for images
  static reserveImageSpace(img: HTMLImageElement): void {
    if (img.width && img.height) {
      img.style.aspectRatio = `${img.width} / ${img.height}`;
      img.style.width = '100%';
      img.style.height = 'auto';
    }
  }

  // Monitor Web Vitals
  static monitorWebVitals(callback: (metrics: Partial<WebVitalsMetrics>) => void): void {
    // LCP
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          callback({ lcp: lastEntry.renderTime || lastEntry.loadTime });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            callback({ fid: entry.processingStart - entry.startTime });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              callback({ cls: clsValue });
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Web Vitals monitoring not supported');
      }
    }
  }

  // Generate performance report
  static async getPerformanceReport(): Promise<any> {
    if (!('performance' in window)) return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    return {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      domInteractive: navigation.domInteractive - navigation.fetchStart,
      domComplete: navigation.domComplete - navigation.fetchStart,
      loadComplete: navigation.loadEventEnd - navigation.fetchStart,
      fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
    };
  }
}

// Service Worker for caching
export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Generate Service Worker content
export const generateServiceWorkerContent = (): string => {
  return `
const CACHE_NAME = 'smartdigitaltips-v1';
const urlsToCache = [
  '/',
  '/logo.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;
};
