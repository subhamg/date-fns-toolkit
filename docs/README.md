# date-fns-toolkit Documentation

Welcome to the date-fns-toolkit documentation! This documentation will help you get started with date-fns-toolkit and explore its features.

## Table of Contents

- [Getting Started](./GETTING_STARTED.md) - Quick start guide and basic usage examples
- [API Reference](./API.md) - Complete reference of all available functions, hooks, and components
- [Advanced Usage](./ADVANCED.md) - Advanced patterns and techniques for power users

## What is date-fns-toolkit?

date-fns-toolkit is a comprehensive library for working with dates in JavaScript, combining the functionality of date-fns and date-fns-tz with additional features:

- **Global timezone configuration** - Set a default timezone once and use it everywhere
- **Automatic timezone detection** - Detect the user's timezone automatically
- **React integration** - Hooks and components for timezone-aware React applications
- **Consistent API** - A unified API for all date operations with timezone support
- **Extended functionality** - Additional utility functions for common date operations

## Key Features

### Global Default Timezone

Set a global default timezone that will be used by all date functions:

```javascript
import { setDefaultTimezone } from 'date-fns-toolkit';

// Set the default timezone for your entire application
setDefaultTimezone('America/New_York');
```

### React Hooks

Use the `useDateTimezone` hook to access timezone-aware date functions in your components:

```jsx
import React from 'react';
import { useDateTimezone } from 'date-fns-toolkit';

function DateDisplay() {
  const dateUtils = useDateTimezone();
  
  return (
    <div>
      <p>Current time: {dateUtils.formatDateTime(new Date())}</p>
      <p>Timezone: {dateUtils.getTimezone()}</p>
    </div>
  );
}
```

### Date Range Functions

Work with date ranges easily:

```javascript
import { getDateRange, eachDayOfInterval } from 'date-fns-toolkit';

// Get the range for the current month
const monthRange = getDateRange(new Date(), 'month');

// Get all days in the current month
const daysInMonth = eachDayOfInterval({
  start: monthRange.start,
  end: monthRange.end
});
```

### Relative Time Formatting

Format relative times with timezone awareness:

```javascript
import { timeAgo } from 'date-fns-toolkit';

const pastDate = new Date(2023, 0, 1);
console.log(timeAgo(pastDate)); // e.g., '5 months ago'
```

## Browser and Server Support

date-fns-toolkit works in both browser and Node.js environments:

- **Browser**: Full support with automatic timezone detection
- **Node.js**: Full support for server-side applications
- **React Native**: Compatible with React Native applications
- **Server-Side Rendering**: Special considerations for SSR applications

## Examples

Check out the [examples directory](../examples) for complete usage examples:

- [Basic Usage](../examples/all-in-one-usage.js)
- [React Application](../examples/react-app-example.jsx)
- [Node.js Server](../examples/nodejs-server-example.js)
- [Enhanced Features](../examples/enhanced-features-example.js)

## Contributing

Contributions are welcome! Please see the [contributing guidelines](../CONTRIBUTING.md) for more information. 