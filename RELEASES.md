# date-fns-toolkit - Release Notes & Migration Guides

This document provides release notes and migration guides for major versions of date-fns-toolkit.

## Version 1.0.9 (Latest)

**Release Date:** May 30, 2024

### Key Features
- Full compatibility with all JavaScript environments (Node.js, browsers, Next.js)
- Multiple module formats (CommonJS, ESM) with automatic selection
- Dedicated Next.js example and integration guide

### Upgrade Instructions
1. Update your package.json:
   ```json
   "date-fns-toolkit": "^1.0.9"
   ```
2. Run `npm install` or `yarn install`
3. No code changes required - this is a drop-in replacement for previous versions

### Next.js Users
If you're using Next.js, you now have multiple options:

1. **Standard Import (Recommended):**
   ```javascript
   import { formatDateTime, addDays } from 'date-fns-toolkit';
   ```

2. **Explicit ESM Import:**
   ```javascript
   import { formatDateTime, addDays } from 'date-fns-toolkit/dist/index.mjs';
   ```

3. **Explicit CommonJS Import:**
   ```javascript
   import { formatDateTime, addDays } from 'date-fns-toolkit/dist/index.js';
   ```

4. **Next.js Configuration:**
   If you experience module loading issues, add the following to your `next.config.js`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     webpack: (config) => {
       config.module.rules.push({
         test: /node_modules\/date-fns-toolkit\/dist\/.*\.js$/,
         type: 'javascript/auto',
         resolve: {
           fullySpecified: false
         }
       });
       return config;
     }
   };
   
   module.exports = nextConfig;
   ```

See [NEXT_JS_USAGE.md](./NEXT_JS_USAGE.md) for more detailed instructions.

## Version 1.0.8

**Release Date:** May 25, 2024

### Key Changes
- Fixed "exports is not defined in ES module scope" error in Next.js
- Updated core module exports to use proper ESM syntax

### Upgrade Instructions
1. Update your package.json:
   ```json
   "date-fns-toolkit": "^1.0.8"
   ```
2. Run `npm install` or `yarn install`

## Version 1.0.7

**Release Date:** May 23, 2024

### Key Changes
- Initial Next.js compatibility improvements
- Added Next.js configuration guide

### Upgrade Instructions
1. Update your package.json:
   ```json
   "date-fns-toolkit": "^1.0.7"
   ```
2. Run `npm install` or `yarn install`
3. For Next.js users, follow the configuration guide in NEXT_JS_USAGE.md

## Version 1.0.0 - 1.0.5

Initial releases with core functionality. We recommend upgrading to the latest version for best compatibility and features. 