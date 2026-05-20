// SEO Audit Utility - Verify SEO Implementation
export interface SEOAuditResult {
  category: string
  item: string
  status: 'pass' | 'warning' | 'fail'
  message: string
  priority: 'high' | 'medium' | 'low'
}

export class SEOAuditor {
  private results: SEOAuditResult[] = []

  // Audit page meta tags
  auditMetaTags(): SEOAuditResult[] {
    const results: SEOAuditResult[] = []

    // Check title
    const title = document.querySelector('title')?.textContent || ''
    results.push({
      category: 'Meta Tags',
      item: 'Title Tag',
      status: title.length > 0 && title.length <= 60 ? 'pass' : 'warning',
      message: title.length > 60 ? `Title too long (${title.length} chars)` : 'Title optimized',
      priority: 'high'
    })

    // Check description
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    results.push({
      category: 'Meta Tags',
      item: 'Meta Description',
      status: description.length > 0 && description.length <= 160 ? 'pass' : 'warning',
      message: description.length > 160 ? `Description too long (${description.length} chars)` : 'Description optimized',
      priority: 'high'
    })

    // Check keywords
    const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || ''
    results.push({
      category: 'Meta Tags',
      item: 'Meta Keywords',
      status: keywords.length > 0 ? 'pass' : 'warning',
      message: keywords.length > 0 ? 'Keywords present' : 'No keywords found',
      priority: 'medium'
    })

    // Check robots
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || ''
    results.push({
      category: 'Meta Tags',
      item: 'Robots Meta',
      status: robots.includes('index') && robots.includes('follow') ? 'pass' : 'fail',
      message: robots.includes('index') ? 'Indexing enabled' : 'Indexing disabled',
      priority: 'high'
    })

    return results
  }

  // Audit Open Graph tags
  auditOpenGraph(): SEOAuditResult[] {
    const results: SEOAuditResult[] = []
    const requiredOGTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']

    requiredOGTags.forEach(tag => {
      const element = document.querySelector(`meta[property="${tag}"]`)
      results.push({
        category: 'Open Graph',
        item: tag,
        status: element ? 'pass' : 'fail',
        message: element ? 'Present' : 'Missing',
        priority: 'high'
      })
    })

    return results
  }

  // Audit Twitter Cards
  auditTwitterCards(): SEOAuditResult[] {
    const results: SEOAuditResult[] = []
    const requiredTwitterTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']

    requiredTwitterTags.forEach(tag => {
      const element = document.querySelector(`meta[name="${tag}"]`)
      results.push({
        category: 'Twitter Cards',
        item: tag,
        status: element ? 'pass' : 'fail',
        message: element ? 'Present' : 'Missing',
        priority: 'medium'
      })
    })

    return results
  }

  // Audit structured data
  auditStructuredData(): SEOAuditResult[] {
    const results: SEOAuditResult[] = []
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')

    results.push({
      category: 'Structured Data',
      item: 'JSON-LD Scripts',
      status: scripts.length > 0 ? 'pass' : 'fail',
      message: `Found ${scripts.length} JSON-LD scripts`,
      priority: 'high'
    })

    scripts.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent || '{}')
        results.push({
          category: 'Structured Data',
          item: `Schema ${index + 1}: ${data['@type'] || 'Unknown'}`,
          status: 'pass',
          message: `Valid ${data['@type']} schema`,
          priority: 'medium'
        })
      } catch {
        results.push({
          category: 'Structured Data',
          item: `Schema ${index + 1}`,
          status: 'fail',
          message: 'Invalid JSON-LD',
          priority: 'high'
        })
      }
    })

    return results
  }

  // Audit canonical URL
  auditCanonical(): SEOAuditResult[] {
    const results: SEOAuditResult[] = []
    const canonical = document.querySelector('link[rel="canonical"]')

    results.push({
      category: 'Technical SEO',
      item: 'Canonical URL',
      status: canonical ? 'pass' : 'warning',
      message: canonical ? `Set to ${canonical.getAttribute('href')}` : 'No canonical URL',
      priority: 'high'
    })

    return results
  }

  // Audit hreflang tags
  auditHreflang(): SEOAuditResult[] {
    const results: SEOAuditResult[] = []
    const hreflangTags = document.querySelectorAll('link[rel="alternate"][hreflang]')

    results.push({
      category: 'International SEO',
      item: 'Hreflang Tags',
      status: hreflangTags.length > 0 ? 'pass' : 'warning',
      message: `Found ${hreflangTags.length} hreflang tags`,
      priority: 'medium'
    })

    return results
  }

  // Audit images
  auditImages(): SEOAuditResult[] {
    const results: SEOAuditResult[] = []
    const images = document.querySelectorAll('img')
    let missingAlt = 0

    images.forEach(img => {
      if (!img.getAttribute('alt')) {
        missingAlt++
      }
    })

    results.push({
      category: 'Content',
      item: 'Image Alt Tags',
      status: missingAlt === 0 ? 'pass' : 'warning',
      message: missingAlt > 0 ? `${missingAlt} images missing alt text` : 'All images have alt text',
      priority: 'medium'
    })

    return results
  }

  // Audit headings
  auditHeadings(): SEOAuditResult[] {
    const results: SEOAuditResult[] = []
    const h1s = document.querySelectorAll('h1')

    results.push({
      category: 'Content',
      item: 'H1 Tags',
      status: h1s.length === 1 ? 'pass' : 'warning',
      message: h1s.length === 1 ? 'Single H1 found' : `Found ${h1s.length} H1 tags`,
      priority: 'high'
    })

    return results
  }

  // Audit performance
  auditPerformance(): SEOAuditResult[] {
    const results: SEOAuditResult[] = []

    // Check for lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]')
    results.push({
      category: 'Performance',
      item: 'Lazy Loading',
      status: lazyImages.length > 0 ? 'pass' : 'warning',
      message: `${lazyImages.length} images use lazy loading`,
      priority: 'medium'
    })

    // Check for preconnect
    const preconnects = document.querySelectorAll('link[rel="preconnect"]')
    results.push({
      category: 'Performance',
      item: 'Preconnect',
      status: preconnects.length > 0 ? 'pass' : 'warning',
      message: `${preconnects.length} preconnect links`,
      priority: 'low'
    })

    return results
  }

  // Run full audit
  runFullAudit(): SEOAuditResult[] {
    this.results = [
      ...this.auditMetaTags(),
      ...this.auditOpenGraph(),
      ...this.auditTwitterCards(),
      ...this.auditStructuredData(),
      ...this.auditCanonical(),
      ...this.auditHreflang(),
      ...this.auditImages(),
      ...this.auditHeadings(),
      ...this.auditPerformance()
    ]

    return this.results
  }

  // Get audit summary
  getSummary(): {
    total: number
    passed: number
    warnings: number
    failed: number
    score: number
  } {
    const total = this.results.length
    const passed = this.results.filter(r => r.status === 'pass').length
    const warnings = this.results.filter(r => r.status === 'warning').length
    const failed = this.results.filter(r => r.status === 'fail').length
    const score = Math.round((passed / total) * 100)

    return { total, passed, warnings, failed, score }
  }

  // Generate report
  generateReport(): string {
    const summary = this.getSummary()
    let report = `
SEO AUDIT REPORT
================
Score: ${summary.score}/100
Total Checks: ${summary.total}
✅ Passed: ${summary.passed}
⚠️  Warnings: ${summary.warnings}
❌ Failed: ${summary.failed}

DETAILED RESULTS
================
`

    const categories = [...new Set(this.results.map(r => r.category))]
    categories.forEach(category => {
      report += `\n${category}\n${'-'.repeat(category.length)}\n`
      const categoryResults = this.results.filter(r => r.category === category)
      categoryResults.forEach(result => {
        const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'
        report += `${icon} ${result.item}: ${result.message}\n`
      })
    })

    return report
  }
}

// Export singleton instance
export const seoAuditor = new SEOAuditor()

// Console command for easy testing
if (typeof window !== 'undefined') {
  ;(window as Window & { runSEOAudit?: () => ReturnType<SEOAuditor['getSummary']> }).runSEOAudit = () => {
    const auditor = new SEOAuditor()
    auditor.runFullAudit()
    console.log(auditor.generateReport())
    return auditor.getSummary()
  }
}
