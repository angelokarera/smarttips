import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig, type PluginOption } from "vite"
import { tools, categories } from "./src/data/tools"
import { blogPosts } from "./src/data/blog"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function injectCrawlerDirectory(): PluginOption {
  return {
    name: 'inject-crawler-directory',
    transformIndexHtml(html: string) {
      const locales = ['en', 'fr', 'sw', 'ar', 'es', 'pt', 'zh']
      const staticPages = [
        { path: '', name: 'Home' },
        { path: '/about', name: 'About Us' },
        { path: '/contact', name: 'Contact Us' },
        { path: '/blog', name: 'Blog' },
        { path: '/privacy', name: 'Privacy Policy' },
        { path: '/cookies', name: 'Cookie Policy' },
        { path: '/terms', name: 'Terms of Service' },
        { path: '/disclaimer', name: 'Disclaimer' },
      ]

      let linksHtml = '<noscript>\n  <div style="padding: 20px; font-family: sans-serif; display: none;">\n'
      linksHtml += '    <h2>SmartDigitalTips - Site Directory</h2>\n'
      linksHtml += '    <p>A directory of all our free, browser-based online tools, categories, and articles.</p>\n'

      // 1. Static pages across all locales
      linksHtml += '    <h3>Static Pages</h3>\n    <ul>\n'
      for (const page of staticPages) {
        for (const loc of locales) {
          const path = `/${loc}${page.path}`
          linksHtml += `      <li><a href="${path}">${page.name} (${loc.toUpperCase()})</a></li>\n`
        }
      }
      linksHtml += '    </ul>\n'

      // 2. Categories across all locales
      linksHtml += '    <h3>Categories</h3>\n    <ul>\n'
      for (const cat of categories) {
        for (const loc of locales) {
          const path = `/${loc}/category/${cat.id}`
          linksHtml += `      <li><a href="${path}">${cat.label} (${loc.toUpperCase()}) - ${cat.description}</a></li>\n`
        }
      }
      linksHtml += '    </ul>\n'

      // 3. Tools across all locales
      linksHtml += '    <h3>Tools</h3>\n    <ul>\n'
      for (const tool of tools) {
        for (const loc of locales) {
          const path = `/${loc}${tool.path}`
          linksHtml += `      <li><a href="${path}">${tool.name} (${loc.toUpperCase()}) - ${tool.description}</a></li>\n`
        }
      }
      linksHtml += '    </ul>\n'

      // 4. Blog posts across all locales
      linksHtml += '    <h3>Articles &amp; Guides</h3>\n    <ul>\n'
      for (const post of blogPosts) {
        for (const loc of locales) {
          const path = `/${loc}/blog/${post.slug}`
          linksHtml += `      <li><a href="${path}">${post.title} (${loc.toUpperCase()}) - ${post.excerpt}</a></li>\n`
        }
      }
      linksHtml += '    </ul>\n'

      linksHtml += '  </div>\n</noscript>'

      // Insert noscript at the beginning of body
      return html.replace('<body>', `<body>\n  ${linksHtml}`)
    }
  }
}

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [react(), injectCrawlerDirectory()]

  // Only load kimi-plugin in development, not in production builds
  if (command === "serve") {
    try {
      const { inspectAttr } = await import("kimi-plugin-inspect-react")
      plugins.unshift(inspectAttr())
    } catch {
      console.warn('kimi-plugin-inspect-react not available, skipping...')
    }
  }

  return {
    base: "/",
    plugins,
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover'],
            'pdf-vendor': ['jspdf', 'html2canvas'],
            'qr-vendor': ['qrcode.react'],
          },
        },
      },
    },
  }
})
