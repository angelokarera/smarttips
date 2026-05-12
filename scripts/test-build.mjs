#!/usr/bin/env node

// Quick Build Test - Run this before deploying to Netlify
import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';

console.log('🧪 Testing build process locally...\n');

// Clean previous build
console.log('🧹 Cleaning previous build...');
if (existsSync('dist')) {
  rmSync('dist', { recursive: true, force: true });
  console.log('✅ Cleaned dist folder\n');
}

// Test 1: SEO Assets
console.log('📝 Test 1: SEO asset generation...');
try {
  execSync('node scripts/generate-seo-assets.mjs', { stdio: 'inherit' });
  console.log('✅ SEO assets: PASS\n');
} catch (error) {
  console.error('❌ SEO assets: FAIL');
  console.error('Fix: Check scripts/generate-seo-assets.mjs\n');
  process.exit(1);
}

// Test 2: TypeScript
console.log('📝 Test 2: TypeScript compilation...');
try {
  execSync('tsc -b', { stdio: 'inherit' });
  console.log('✅ TypeScript: PASS\n');
} catch (error) {
  console.error('❌ TypeScript: FAIL');
  console.error('Fix: Run "npx tsc --noEmit" to see errors\n');
  process.exit(1);
}

// Test 3: Vite Build
console.log('📝 Test 3: Vite build...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Vite build: PASS\n');
} catch (error) {
  console.error('❌ Vite build: FAIL');
  console.error('Fix: Check vite.config.ts and dependencies\n');
  process.exit(1);
}

// Test 4: Verify Output
console.log('📝 Test 4: Verifying build output...');
const requiredFiles = [
  'dist/index.html',
  'dist/assets',
];

let allFilesExist = true;
for (const file of requiredFiles) {
  if (!existsSync(file)) {
    console.error(`❌ Missing: ${file}`);
    allFilesExist = false;
  }
}

if (allFilesExist) {
  console.log('✅ Build output: PASS\n');
} else {
  console.error('❌ Build output: FAIL\n');
  process.exit(1);
}

// Success!
console.log('🎉 All tests passed! Build is ready for Netlify.\n');
console.log('Next steps:');
console.log('1. git add .');
console.log('2. git commit -m "Fix build configuration"');
console.log('3. git push');
console.log('4. Monitor Netlify deployment\n');
