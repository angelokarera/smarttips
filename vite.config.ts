import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig, type PluginOption } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [react()]

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
      cssCodeSplit: true,
      chunkSizeWarningLimit: 600,
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
