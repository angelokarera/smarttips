# Netlify Deployment Troubleshooting Guide

## 🔧 Fixes Applied

### 1. **vite.config.ts** - Fixed
- ✅ Added try-catch for kimi-plugin-inspect-react (dev-only dependency)
- ✅ Added build optimizations
- ✅ Added manual chunks for better code splitting
- ✅ Plugin now gracefully skips if not available

### 2. **package.json** - Fixed
- ✅ Changed build script to use `npm run build:seo` instead of direct node call
- ✅ Better cross-platform compatibility

### 3. **netlify.toml** - Enhanced
- ✅ Added `CI=true` environment variable
- ✅ Proper Node version specified (20.19.0)
- ✅ Legacy peer deps flag for compatibility

### 4. **scripts/netlify-build.mjs** - Created
- ✅ Custom build script with error recovery
- ✅ Step-by-step build process
- ✅ Better error messages

---

## 🚨 Common Netlify Build Errors & Fixes

### Error 1: "Cannot find module 'kimi-plugin-inspect-react'"
**Symptom:** Build fails looking for kimi-plugin-inspect-react

**Fix Applied:** ✅ vite.config.ts now has try-catch wrapper

**Manual Fix (if needed):**
```bash
# Option 1: Move to devDependencies (already done)
# Option 2: Remove from vite.config.ts entirely
```

---

### Error 2: "Module not found" or "Cannot resolve"
**Symptom:** Missing dependencies during build

**Fix:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use legacy peer deps
npm install --legacy-peer-deps
```

---

### Error 3: TypeScript compilation errors
**Symptom:** `tsc -b` fails with type errors

**Fix:**
```bash
# Check for type errors locally
npm run build

# If errors exist, fix them or skip type checking temporarily
# In package.json, change:
"build": "npm run build:seo && vite build"
# (removes tsc -b)
```

---

### Error 4: "process is not defined" or Node builtin errors
**Symptom:** Vite tries to bundle Node.js code for browser

**Fix Applied:** ✅ vite.config.ts has proper build configuration

**Manual Fix (if needed):**
Add to vite.config.ts:
```typescript
export default defineConfig({
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['negotiator'], // Add problematic packages
  },
})
```

---

### Error 5: Out of memory during build
**Symptom:** "JavaScript heap out of memory"

**Fix:**
Add to netlify.toml:
```toml
[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"
```

---

### Error 6: Build succeeds but site shows blank page
**Symptom:** Build completes but deployed site is blank

**Fixes:**
1. Check browser console for errors
2. Verify base path in vite.config.ts is "/"
3. Check redirects in netlify.toml
4. Verify dist/index.html exists

---

## 📋 Pre-Deployment Checklist

### Before Pushing to Netlify:

1. **Test Build Locally**
```bash
# Clean install
rm -rf node_modules package-lock.json dist
npm install

# Test build
npm run build

# Verify dist folder
ls -la dist/
# Should see: index.html, assets/, etc.

# Test preview
npm run preview
# Visit http://localhost:4173
```

2. **Check for TypeScript Errors**
```bash
npx tsc --noEmit
```

3. **Check for ESLint Errors**
```bash
npm run lint
```

4. **Verify Environment Variables**
- Node version: 20.19.0 ✅
- NPM flags: --legacy-peer-deps ✅

---

## 🔍 How to Get Netlify Build Logs

1. Go to Netlify Dashboard
2. Click on your site
3. Click "Deploys" tab
4. Click on the failed deploy
5. Scroll down to see full build log
6. Copy the error section (last 50-100 lines)

---

## 📝 What to Share When Asking for Help

If build still fails, share:

1. **Full error from Netlify build log** (last 100 lines)
2. **The exact error message** (line with "Error:")
3. **Stack trace** (lines after the error)
4. **Files:**
   - package.json
   - vite.config.ts
   - netlify.toml
   - tsconfig.json

---

## 🛠️ Alternative Build Commands

If standard build fails, try these in netlify.toml:

### Option 1: Skip SEO generation
```toml
[build]
  command = "tsc -b && vite build"
```

### Option 2: Skip TypeScript check
```toml
[build]
  command = "npm run build:seo && vite build"
```

### Option 3: Use custom build script
```toml
[build]
  command = "node scripts/netlify-build.mjs"
```

### Option 4: Simple build
```toml
[build]
  command = "vite build"
```

---

## 🚀 Deployment Steps

### Step 1: Commit Changes
```bash
git add .
git commit -m "Fix Netlify build configuration"
git push
```

### Step 2: Monitor Netlify
1. Go to Netlify dashboard
2. Watch the deploy in real-time
3. Check for errors

### Step 3: If Build Fails
1. Copy the error log
2. Check this guide for the error type
3. Apply the fix
4. Commit and push again

### Step 4: If Build Succeeds
1. Visit your site URL
2. Check browser console for errors
3. Test navigation
4. Run SEO audit: `window.runSEOAudit()`

---

## 🎯 Quick Fixes Summary

| Error | Quick Fix |
|-------|-----------|
| kimi-plugin error | ✅ Already fixed in vite.config.ts |
| Module not found | `npm install --legacy-peer-deps` |
| TypeScript errors | Fix types or skip: remove `tsc -b` |
| Out of memory | Add NODE_OPTIONS to netlify.toml |
| Blank page | Check base path and redirects |
| Build timeout | Optimize build, reduce dependencies |

---

## 📞 Still Having Issues?

### Provide This Information:

1. **Netlify Build Log** (last 100 lines with error)
2. **Error Message** (exact line)
3. **Files:**
```bash
# Share these files
cat package.json
cat vite.config.ts
cat netlify.toml
cat tsconfig.json
```

4. **Local Build Test:**
```bash
# Run this and share output
npm run build 2>&1 | tail -50
```

---

## ✅ Expected Successful Build Output

```
🚀 Starting Netlify build process...

📝 Step 1: Generating SEO assets...
✅ SEO assets generated

📝 Step 2: Compiling TypeScript...
✅ TypeScript compiled

📝 Step 3: Building with Vite...
vite v7.2.4 building for production...
✓ 1234 modules transformed.
dist/index.html                   1.23 kB
dist/assets/index-abc123.js     234.56 kB
✅ Vite build completed

📝 Step 4: Verifying build output...
✅ Build output verified

🎉 Build completed successfully!
```

---

## 🎉 Success Indicators

After successful deployment:

1. ✅ Build completes without errors
2. ✅ Site loads at your Netlify URL
3. ✅ No console errors in browser
4. ✅ Navigation works
5. ✅ Tools function correctly
6. ✅ SEO audit passes: `window.runSEOAudit()`

---

**Last Updated:** 2025
**Status:** Ready for Deployment
**Node Version:** 20.19.0
