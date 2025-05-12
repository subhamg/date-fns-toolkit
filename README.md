# date-fns-toolkit

[![CI](https://github.com/subhamg/date-fns-toolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/subhamg/date-fns-toolkit/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/subhamg/date-fns-toolkit/branch/main/graph/badge.svg)](https://codecov.io/gh/subhamg/date-fns-toolkit)
[![npm version](https://badge.fury.io/js/date-fns-toolkit.svg)](https://badge.fury.io/js/date-fns-toolkit)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-%23FFDD00?style=flat&logo=buy-me-a-coffee)](https://www.buymeacoffee.com/subhamg)

A comprehensive toolkit for working with dates in JavaScript, including global timezone support and React integration.

## Features

- ✅ **All-in-one package** - includes date-fns and date-fns-tz functionality
- ✅ **Global default timezone** - set once, use everywhere
- ✅ **Tree-shakable individual functions** - include only what you use
- ✅ **React hooks** for timezone-aware date handling in components
- ✅ **Consistent timezone handling** - no more timezone conversion bugs
- ✅ **TypeScript support** - with full type definitions

## Installation

```bash
# Using npm
npm install date-fns-toolkit

# Using yarn
yarn add date-fns-toolkit

# Using pnpm
pnpm add date-fns-toolkit
```

No need to install date-fns or date-fns-tz separately - they're included in the package!

## Usage

### Core date-fns functionality

Most date-fns and all date-fns-tz functions are re-exported from this package:

```javascript
// Import directly from date-fns-toolkit instead of date-fns
import { 
  parse,
  differenceInDays,
  formatDistance
} from 'date-fns-toolkit';

// date-fns-tz functions are also available
import { 
  formatInTimeZone,
  toZonedTime 
} from 'date-fns-toolkit';

// Use just like you would with date-fns and date-fns-tz
const formattedDate = formatDistance(new Date(), new Date(2021, 0, 1));
```

> **Note:** Some core date-fns functions (like `format`, `addDays`, etc.) are overridden with timezone-aware versions. If you need the original behavior, import directly from date-fns.

### Setting a Global Default Timezone

```javascript
import { setDefaultTimezone, formatDateTime, addDays } from 'date-fns-toolkit';

// Set the default timezone for your entire application
setDefaultTimezone('America/New_York');

// Now you can use date utilities without specifying timezone
const now = new Date();
console.log(`Current date and time: ${formatDateTime(now)}`);
console.log(`Tomorrow: ${formatDateTime(addDays(now, 1))}`);

// You can still override the timezone for specific calls
console.log(`Tokyo time: ${formatDateTime(now, 'Asia/Tokyo')}`);
```

### Individual Functions with Default Timezone

```jsx
import React from 'react';
// Import only the functions you need
import { formatDateTime, addDays, isBefore } from 'date-fns-toolkit';

function EventItem({ event }) {
  // Uses the global default timezone
  const displayTime = formatDateTime(event.startTime);
  
  // Get tomorrow
  const tomorrow = addDays(new Date(), 1);
  
  // Check if event is before tomorrow
  const isToday = isBefore(event.startTime, tomorrow);
  
  return (
    <div>
      <h3>{event.title}</h3>
      <p>Time: {displayTime}</p>
      {isToday && <span>Today!</span>}
    </div>
  );
}
```

### React Hook with Default Timezone

```jsx
import React from 'react';
import { useDateTimezone } from 'date-fns-toolkit';

function ClockDisplay() {
  // Hook will use the global default timezone if none provided
  const dateUtils = useDateTimezone();
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div>
      <h2>Current Time</h2>
      <p>{dateUtils.formatDateTime(time)}</p>
      <p>Timezone: {dateUtils.getTimezone()}</p>
    </div>
  );
}
```

### Using TimezoneProvider with Global Sync

```jsx
import React from 'react';
import { TimezoneProvider, useTimezoneContext } from 'date-fns-toolkit';

function App() {
  return (
    // syncWithGlobal will update the global default when context changes
    <TimezoneProvider syncWithGlobal={true}>
      <AppContent />
    </TimezoneProvider>
  );
}

function AppContent() {
  const { timezone, setTimezone } = useTimezoneContext();
  
  const handleTimezoneChange = (e) => {
    // This will update both context AND the global default
    setTimezone(e.target.value);
  };
  
  return (
    <div>
      <h1>Timezone Settings</h1>
      <select value={timezone} onChange={handleTimezoneChange}>
        <option value="America/New_York">New York</option>
        <option value="Europe/London">London</option>
        <option value="Asia/Tokyo">Tokyo</option>
      </select>
      
      {/* All components will use the selected timezone */}
      <DateDisplay />
      <EventCalendar />
    </div>
  );
}
```

## API Reference

### Core Date Functions

All functions from `date-fns` and `date-fns-tz` are available:

```javascript
import { 
  format,
  parse,
  addDays,
  addMonths,
  differenceInDays,
  isAfter,
  isBefore,
  formatInTimeZone,
  toZonedTime,
  fromZonedTime 
  // ...and many more
} from 'date-fns-toolkit';
```

For documentation on these functions, refer to:
- [date-fns documentation](https://date-fns.org/docs/Getting-Started)
- [date-fns-tz documentation](https://github.com/marnusw/date-fns-tz#readme)

### Global Configuration

#### `setDefaultTimezone(timezone: string): void`

Sets the global default timezone for all date functions.

```javascript
import { setDefaultTimezone } from 'date-fns-toolkit';

setDefaultTimezone('America/New_York');
```

#### `getDefaultTimezone(): string`

Gets the current global default timezone.

```javascript
import { getDefaultTimezone } from 'date-fns-toolkit';

console.log(`Current timezone: ${getDefaultTimezone()}`);
```

### React Hooks

#### `useDateTimezone(timezone?: string)`

Hook that returns timezone-aware date utility functions.
- If `timezone` is provided, it will use that timezone
- If not provided, it will use the global default timezone

```javascript
const dateUtils = useDateTimezone('Europe/Paris');
// OR
const dateUtils = useDateTimezone(); // Uses global default
```

#### `useTimezoneContext()`

Hook to access the timezone context when using `TimezoneProvider`.

```javascript
const { timezone, setTimezone } = useTimezoneContext();
```

### Components

#### `TimezoneProvider`

Context provider for application-wide timezone settings.

Props:
- `children`: React children
- `defaultTimezone`: (optional) Initial timezone to use. Falls back to global default if not provided
- `syncWithGlobal`: (optional, default: false) When true, changes to context timezone will also update the global default

### Toolkit Utility Functions

All toolkit utility functions accept an optional timezone parameter. If not provided, they use the global default timezone.

#### Format Functions
- `format(date, formatString, timezone?, options?)`
- `formatDateShort(date, timezone?)`
- `formatDateLong(date, timezone?)`
- `formatDateTime(date, timezone?)`
- `formatTime(date, timezone?)`

#### Conversion Functions
- `toZonedTime(date, timezone?)`
- `fromZonedTime(zonedDate, timezone?)`

#### Parsing Functions
- `parseInTimeZone(dateString, formatString, timezone?)`

#### Date Operations
- `addDays(date, amount, timezone?)`
- `subDays(date, amount, timezone?)`
- `addMonths(date, amount, timezone?)`
- `subMonths(date, amount, timezone?)`
- `addYears(date, amount, timezone?)`
- `subYears(date, amount, timezone?)`
- `startOfDay(date, timezone?)`
- `endOfDay(date, timezone?)`

#### Comparison Functions
- `isBefore(date1, date2, timezone?)`
- `isAfter(date1, date2, timezone?)`
- `isSameDay(date1, date2, timezone?)`

## Why Use This Library?

1. **All-in-one**: Includes date-fns and date-fns-tz functionality in a single package
2. **Global default timezone**: Set once, use everywhere - solves a major pain point with date-fns-tz
3. **Flexibility**: Choose between global defaults, explicit parameters, or React context
4. **Tree-shaking**: Only include the functions you actually use
5. **React integration**: First-class support for React with hooks and context
6. **TypeScript support**: Full type definitions for better development experience

## License

MIT

## Support

If you find my packages helpful or are interested in the platform I'm building, I'd really appreciate a coffee! Your support helps me dedicate more time to open source projects and platform development.

<a href="https://www.buymeacoffee.com/subhamg" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60" width="217">
</a>