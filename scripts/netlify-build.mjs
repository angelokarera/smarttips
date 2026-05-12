#!/usr/bin/env node

// Netlify Build Script - Handles build process with error recovery
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Starting Netlify build process...\n');

// Step 1: Generate SEO assets
console.log('📝 Step 1: Generating SEO assets...');
try {
  execSync('node scripts/generate-seo-assets.mjs', { stdio: 'inherit' });
  console.log('✅ SEO assets generated\n');
} catch (error) {
  console.warn('⚠️  SEO asset generation failed, continuing...\n');
}

// Step 2: TypeScript compilation
console.log('📝 Step 2: Compiling TypeScript...');
try {
  execSync('tsc -b', { stdio: 'inherit' });
  console.log('✅ TypeScript compiled\n');
} catch (error) {
  console.error('❌ TypeScript compilation failed');
  process.exit(1);
}

// Step 3: Vite build
console.log('📝 Step 3: Building with Vite...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Vite build completed\n');
} catch (error) {
  console.error('❌ Vite build failed');
  process.exit(1);
}

// Step 4: Verify dist folder
console.log('📝 Step 4: Verifying build output...');
if (existsSync('dist/index.html')) {
  console.log('✅ Build output verified\n');
  console.log('🎉 Build completed successfully!\n');
} else {
  console.error('❌ Build output missing');
  process.exit(1);
}
