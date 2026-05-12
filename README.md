# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## 🚀 SEO Optimization - FULLY IMPLEMENTED

**Your site is now optimized for global SEO!** See detailed documentation:

- 📘 **[SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md)** - Complete SEO guide
- 📗 **[SEO_QUICK_REFERENCE.md](./SEO_QUICK_REFERENCE.md)** - Quick reference
- 📕 **[SEO_SUMMARY.md](./SEO_SUMMARY.md)** - Summary report

### Key Features:
- ✅ 100+ targeted keywords for global reach
- ✅ 12 language support (en, fr, es, ar, pt, zh, sw, rw, de, hi, ja, ko)
- ✅ JSON-LD structured data (WebSite, Organization, ItemList)
- ✅ AI search optimization (ChatGPT, Claude, Perplexity, Gemini)
- ✅ Advanced search engine with TF-IDF algorithm
- ✅ Automated SEO auditor (run `window.runSEOAudit()` in console)
- ✅ Open Graph & Twitter Cards
- ✅ Hreflang tags for international SEO
- ✅ Performance optimization for Core Web Vitals

### Quick Test:
```bash
# Run development server
npm run dev

# Open browser console and run:
window.runSEOAudit()

# Build with SEO assets
npm run build
```

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
