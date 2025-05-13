# Using date-fns-toolkit with Next.js

If you're using date-fns-toolkit with Next.js, you might encounter module loading issues. This guide will help you resolve them.

## Common Issues

### "Module parse failed" Error

```
Next.js (14.x) is outdated
./node_modules/date-fns-toolkit/dist/index.esm.js
Module parse failed: 'import' and 'export' may appear only with 'sourceType: module'
```

### "require is not defined in ES module scope" Error

```
ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension
```

### "exports is not defined in ES module scope" Error

```
Error: Failed to load external module date-fns-toolkit: ReferenceError: exports is not defined in ES module scope
```

## Solution

### Option 1: Use the MJS Import

As of version 1.0.8, date-fns-toolkit provides a dedicated MJS file for ESM environments. In your Next.js application, import the package like this:

```javascript
// Use this import syntax
import { TimezoneProvider, useTimezoneContext } from 'date-fns-toolkit';

// Or explicitly use the MJS version
// import { TimezoneProvider, useTimezoneContext } from 'date-fns-toolkit/dist/index.mjs';
```

### Option 2: Add a Next.js Configuration File

If you're still encountering issues, create or update your `next.config.js` file:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fix for date-fns-toolkit module format issues
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

### Option 3: Use the CommonJS Version Directly

If you're still having issues, you can import the CommonJS version directly:

```javascript
// Instead of:
import { format, addDays } from 'date-fns-toolkit';

// Use:
import { format, addDays } from 'date-fns-toolkit/dist/index.js';
```

## Troubleshooting

If you continue to experience issues:

1. Make sure you're using the latest version of date-fns-toolkit (1.0.8 or later)
2. Clear your Next.js cache: `rm -rf .next`
3. Reinstall node_modules: `rm -rf node_modules && npm install`

## Need Help?

If you're still having issues, please open an issue on our GitHub repository with:

1. Your Next.js version
2. Your date-fns-toolkit version
3. The exact error message
4. A minimal reproduction of the issue 