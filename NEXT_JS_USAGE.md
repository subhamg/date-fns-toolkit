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

## Solution

### Option 1: Add a Next.js Configuration File

Create or update your `next.config.js` file:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fix for date-fns-toolkit module parse error
    config.module.rules.push({
      test: /node_modules\/date-fns-toolkit\/dist\/index\.esm\.js$/,
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

### Option 2: Use the CommonJS Version Directly

If you're still having issues, you can import the CommonJS version directly:

```javascript
// Instead of:
import { format, addDays } from 'date-fns-toolkit';

// Use:
import { format, addDays } from 'date-fns-toolkit/dist/index.js';
```

### Option 3: Use date-fns and date-fns-tz Directly

If you're still facing issues, you can use the underlying libraries directly:

```javascript
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
```

## Troubleshooting

If you continue to experience issues:

1. Make sure you're using the latest version of date-fns-toolkit
2. Clear your Next.js cache: `rm -rf .next`
3. Reinstall node_modules: `rm -rf node_modules && npm install`

## Need Help?

If you're still having issues, please open an issue on our GitHub repository with:

1. Your Next.js version
2. Your date-fns-toolkit version
3. The exact error message
4. A minimal reproduction of the issue 