#!/usr/bin/env node

// SEO Build Script - Generate all SEO assets before build
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://smartdigitaltips.com';

console.log('🚀 Starting SEO asset generation...\n');

const publicDir = join(process.cwd(), 'public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

console.log('📝 Generating ads.txt...');
const adsTxt = `google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0`;
writeFileSync(join(publicDir, 'ads.txt'), adsTxt);
console.log('✅ ads.txt generated\n');

console.log('📝 Generating security.txt...');
const securityTxt = `Contact: mailto:security@smartdigitaltips.com
Expires: 2025-12-31T23:59:59.000Z
Preferred-Languages: en, fr, es
Canonical: ${BASE_URL}/.well-known/security.txt`;

const wellKnownDir = join(publicDir, '.well-known');
if (!existsSync(wellKnownDir)) {
  mkdirSync(wellKnownDir, { recursive: true });
}
writeFileSync(join(wellKnownDir, 'security.txt'), securityTxt);
console.log('✅ security.txt generated\n');

console.log('📝 Generating humans.txt...');
const humansTxt = `/* TEAM */
Developer: SmartDigitalTips Team
Site: ${BASE_URL}
Location: Worldwide

/* SITE */
Last update: ${new Date().toISOString().split('T')[0]}
Standards: HTML5, CSS3, JavaScript ES6+
Components: React, TypeScript, Vite`;

writeFileSync(join(publicDir, 'humans.txt'), humansTxt);
console.log('✅ humans.txt generated\n');

console.log('📝 Generating offline.html...');
const offlineHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offline - SmartDigitalTips</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 20px;
    }
    h1 { font-size: 3rem; margin: 0 0 1rem; }
    p { font-size: 1.2rem; opacity: 0.9; }
  </style>
</head>
<body>
  <div>
    <h1>📡 You're Offline</h1>
    <p>Please check your internet connection and try again.</p>
  </div>
</body>
</html>`;

writeFileSync(join(publicDir, 'offline.html'), offlineHtml);
console.log('✅ offline.html generated\n');

console.log('📝 Generating browserconfig.xml...');
const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#3b82f6</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;

writeFileSync(join(publicDir, 'browserconfig.xml'), browserConfig);
console.log('✅ browserconfig.xml generated\n');

console.log('🎉 All SEO assets generated successfully!\n');
