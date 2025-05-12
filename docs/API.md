# date-fns-toolkit API Reference

This document provides a comprehensive reference for all functions, hooks, and components available in the date-fns-toolkit package.

## Table of Contents

- [Global Configuration](#global-configuration)
- [Core Functions](#core-functions)
- [Format Functions](#format-functions)
- [Parsing Functions](#parsing-functions)
- [Conversion Functions](#conversion-functions)
- [Date Operations](#date-operations)
- [Comparison Functions](#comparison-functions)
- [Range Functions](#range-functions)
- [Relative Time Functions](#relative-time-functions)
- [React Integration](#react-integration)
  - [Hooks](#hooks)
  - [Components](#components)
- [TypeScript Types](#typescript-types)

## Global Configuration

### `setDefaultTimezone(timezone: string): void`

Sets the global default timezone for all date functions.

```javascript
import { setDefaultTimezone } from 'date-fns-toolkit';

// Set timezone for the entire application
setDefaultTimezone('America/New_York');
```

### `getDefaultTimezone(): string`

Gets the current global default timezone.

```javascript
import { getDefaultTimezone } from 'date-fns-toolkit';

console.log(`Current timezone: ${getDefaultTimezone()}`);
```

### `detectTimezone(): string`

Detects the user's local timezone using browser APIs.

```javascript
import { detectTimezone } from 'date-fns-toolkit';

const userTimezone = detectTimezone();
console.log(`User timezone: ${userTimezone}`); // e.g., 'America/Los_Angeles'
```

### `initializeTimezone(): void`

Initializes the default timezone based on the browser's detected timezone.

```javascript
import { initializeTimezone } from 'date-fns-toolkit';

// Auto-detect and set the timezone
initializeTimezone();
```

## Core Functions

All core functions from `date-fns` and `date-fns-tz` are re-exported from this package, except for functions that have been overridden with timezone-aware versions.

```javascript
import { 
  parse,
  differenceInDays,
  formatDistance,
  formatInTimeZone
} from 'date-fns-toolkit';
```

## Format Functions

### `format(date: DateInput, formatStr: string, timezone?: string, options?: object): string`

Formats a date with a custom format string in the specified timezone.

```javascript
import { format } from 'date-fns-toolkit';

// Format a date in the global default timezone
const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

// Format a date in a specific timezone
const tokyoDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss', 'Asia/Tokyo');
```

### `formatDateShort(date: DateInput, timezone?: string): string`

Formats a date as MM/dd/yyyy in the specified timezone.

```javascript
import { formatDateShort } from 'date-fns-toolkit';

const shortDate = formatDateShort(new Date()); // e.g., '05/15/2023'
```

### `formatDateLong(date: DateInput, timezone?: string): string`

Formats a date as Month d, yyyy in the specified timezone.

```javascript
import { formatDateLong } from 'date-fns-toolkit';

const longDate = formatDateLong(new Date()); // e.g., 'May 15, 2023'
```

### `formatDateTime(date: DateInput, timezone?: string): string`

Formats a date and time as MM/dd/yyyy HH:mm:ss in the specified timezone.

```javascript
import { formatDateTime } from 'date-fns-toolkit';

const dateTime = formatDateTime(new Date()); // e.g., '05/15/2023 14:30:00'
```

### `formatTime(date: DateInput, timezone?: string): string`

Formats time as HH:mm:ss in the specified timezone.

```javascript
import { formatTime } from 'date-fns-toolkit';

const time = formatTime(new Date()); // e.g., '14:30:00'
```

## Parsing Functions

### `parseInTimeZone(dateString: string, formatStr: string, timezone?: string): Date`

Parses a date string in the specified timezone.

```javascript
import { parseInTimeZone } from 'date-fns-toolkit';

// Parse a date string in the global default timezone
const date = parseInTimeZone('2023-05-15 14:30', 'yyyy-MM-dd HH:mm');

// Parse a date string in a specific timezone
const tokyoDate = parseInTimeZone('2023-05-15 14:30', 'yyyy-MM-dd HH:mm', 'Asia/Tokyo');
```

## Conversion Functions

### `toZonedTime(date: DateInput, timezone?: string): Date`

Converts a date to the specified timezone.

```javascript
import { toZonedTime } from 'date-fns-toolkit';

// Convert a date to the global default timezone
const zonedDate = toZonedTime(new Date());

// Convert a date to a specific timezone
const tokyoDate = toZonedTime(new Date(), 'Asia/Tokyo');
```

### `fromZonedTime(zonedDate: DateInput, timezone?: string): Date`

Converts a date from the specified timezone to UTC.

```javascript
import { fromZonedTime } from 'date-fns-toolkit';

// Convert a date from the global default timezone to UTC
const utcDate = fromZonedTime(zonedDate);

// Convert a date from a specific timezone to UTC
const utcFromTokyo = fromZonedTime(tokyoDate, 'Asia/Tokyo');
```

## Date Operations

### `addDays(date: DateInput, amount: number, timezone?: string): Date`

Adds the specified number of days to the given date, respecting the timezone.

```javascript
import { addDays } from 'date-fns-toolkit';

// Add 5 days to the current date
const futureDate = addDays(new Date(), 5);
```

### `subDays(date: DateInput, amount: number, timezone?: string): Date`

Subtracts the specified number of days from the given date, respecting the timezone.

```javascript
import { subDays } from 'date-fns-toolkit';

// Subtract 5 days from the current date
const pastDate = subDays(new Date(), 5);
```

### `addMonths(date: DateInput, amount: number, timezone?: string): Date`

Adds the specified number of months to the given date, respecting the timezone.

```javascript
import { addMonths } from 'date-fns-toolkit';

// Add 2 months to the current date
const inTwoMonths = addMonths(new Date(), 2);
```

### `subMonths(date: DateInput, amount: number, timezone?: string): Date`

Subtracts the specified number of months from the given date, respecting the timezone.

```javascript
import { subMonths } from 'date-fns-toolkit';

// Subtract 2 months from the current date
const twoMonthsAgo = subMonths(new Date(), 2);
```

### `addYears(date: DateInput, amount: number, timezone?: string): Date`

Adds the specified number of years to the given date, respecting the timezone.

```javascript
import { addYears } from 'date-fns-toolkit';

// Add 1 year to the current date
const nextYear = addYears(new Date(), 1);
```

### `subYears(date: DateInput, amount: number, timezone?: string): Date`

Subtracts the specified number of years from the given date, respecting the timezone.

```javascript
import { subYears } from 'date-fns-toolkit';

// Subtract 1 year from the current date
const lastYear = subYears(new Date(), 1);
```

### `startOfDay(date: DateInput, timezone?: string): Date`

Returns the start of the day for the given date, respecting the timezone.

```javascript
import { startOfDay } from 'date-fns-toolkit';

// Get the start of today
const todayStart = startOfDay(new Date());
```

### `endOfDay(date: DateInput, timezone?: string): Date`

Returns the end of the day for the given date, respecting the timezone.

```javascript
import { endOfDay } from 'date-fns-toolkit';

// Get the end of today
const todayEnd = endOfDay(new Date());
```

## Comparison Functions

### `isBefore(date1: DateInput, date2: DateInput, timezone?: string): boolean`

Checks if the first date is before the second date, respecting the timezone.

```javascript
import { isBefore } from 'date-fns-toolkit';

// Check if date1 is before date2
const result = isBefore(date1, date2);
```

### `isAfter(date1: DateInput, date2: DateInput, timezone?: string): boolean`

Checks if the first date is after the second date, respecting the timezone.

```javascript
import { isAfter } from 'date-fns-toolkit';

// Check if date1 is after date2
const result = isAfter(date1, date2);
```

### `isSameDay(date1: DateInput, date2: DateInput, timezone?: string): boolean`

Checks if two dates are the same day, respecting the timezone.

```javascript
import { isSameDay } from 'date-fns-toolkit';

// Check if date1 and date2 are the same day
const result = isSameDay(date1, date2);
```

## Range Functions

### `startOfWeek(date: DateInput, options?: object, timezone?: string): Date`

Returns the start of the week for the given date, respecting the timezone.

```javascript
import { startOfWeek } from 'date-fns-toolkit';

// Get the start of the week for today
const weekStart = startOfWeek(new Date());

// With options (e.g., to set first day of week to Monday)
const weekStartMonday = startOfWeek(new Date(), { weekStartsOn: 1 });
```

### `endOfWeek(date: DateInput, options?: object, timezone?: string): Date`

Returns the end of the week for the given date, respecting the timezone.

```javascript
import { endOfWeek } from 'date-fns-toolkit';

// Get the end of the week for today
const weekEnd = endOfWeek(new Date());

// With options (e.g., to set first day of week to Monday)
const weekEndMonday = endOfWeek(new Date(), { weekStartsOn: 1 });
```

### `startOfMonth(date: DateInput, timezone?: string): Date`

Returns the start of the month for the given date, respecting the timezone.

```javascript
import { startOfMonth } from 'date-fns-toolkit';

// Get the start of the current month
const monthStart = startOfMonth(new Date());
```

### `endOfMonth(date: DateInput, timezone?: string): Date`

Returns the end of the month for the given date, respecting the timezone.

```javascript
import { endOfMonth } from 'date-fns-toolkit';

// Get the end of the current month
const monthEnd = endOfMonth(new Date());
```

### `startOfYear(date: DateInput, timezone?: string): Date`

Returns the start of the year for the given date, respecting the timezone.

```javascript
import { startOfYear } from 'date-fns-toolkit';

// Get the start of the current year
const yearStart = startOfYear(new Date());
```

### `endOfYear(date: DateInput, timezone?: string): Date`

Returns the end of the year for the given date, respecting the timezone.

```javascript
import { endOfYear } from 'date-fns-toolkit';

// Get the end of the current year
const yearEnd = endOfYear(new Date());
```

### `eachDayOfInterval(interval: { start: DateInput; end: DateInput }, timezone?: string): Date[]`

Returns an array of dates for each day in the given interval, respecting the timezone.

```javascript
import { eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns-toolkit';

// Get all days in the current week
const weekStart = startOfWeek(new Date());
const weekEnd = endOfWeek(new Date());
const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
```

### `getDateRange(date: DateInput, rangeType: 'day' | 'week' | 'month' | 'year', timezone?: string): { start: Date; end: Date }`

Returns a date range for the given time period, respecting the timezone.

```javascript
import { getDateRange } from 'date-fns-toolkit';

// Get the date range for the current week
const weekRange = getDateRange(new Date(), 'week');
console.log(weekRange.start, weekRange.end);

// Get the date range for the current month
const monthRange = getDateRange(new Date(), 'month');
console.log(monthRange.start, monthRange.end);
```

## Relative Time Functions

### `formatDistance(date: DateInput, baseDate: DateInput, options?: object, timezone?: string): string`

Formats the distance between two dates, respecting the timezone.

```javascript
import { formatDistance } from 'date-fns-toolkit';

// Format the distance between two dates
const distance = formatDistance(new Date(2023, 0, 1), new Date());
console.log(distance); // e.g., '4 months'

// With suffix
const distanceWithSuffix = formatDistance(new Date(2023, 0, 1), new Date(), { addSuffix: true });
console.log(distanceWithSuffix); // e.g., '4 months ago'
```

### `formatDistanceToNow(date: DateInput, options?: object, timezone?: string): string`

Formats the distance between a date and now, respecting the timezone.

```javascript
import { formatDistanceToNow } from 'date-fns-toolkit';

// Format the distance from a date to now
const distance = formatDistanceToNow(new Date(2023, 0, 1));
console.log(distance); // e.g., '4 months'

// With suffix
const distanceWithSuffix = formatDistanceToNow(new Date(2023, 0, 1), { addSuffix: true });
console.log(distanceWithSuffix); // e.g., '4 months ago'
```

### `formatRelative(date: DateInput, baseDate: DateInput, options?: object, timezone?: string): string`

Formats a date relative to the given base date, respecting the timezone.

```javascript
import { formatRelative } from 'date-fns-toolkit';

// Format a date relative to now
const relative = formatRelative(new Date(2023, 0, 1), new Date());
console.log(relative); // e.g., '01/01/2023'
```

### `differenceInCalendarDays(dateLeft: DateInput, dateRight: DateInput, timezone?: string): number`

Returns the number of calendar days between two dates, respecting the timezone.

```javascript
import { differenceInCalendarDays } from 'date-fns-toolkit';

// Get the number of calendar days between two dates
const days = differenceInCalendarDays(new Date(), new Date(2023, 0, 1));
console.log(days); // e.g., 135
```

### `timeAgo(date: DateInput, timezone?: string): string`

Returns a human-readable time ago string, respecting the timezone.

```javascript
import { timeAgo } from 'date-fns-toolkit';

// Get a human-readable time ago string
const ago = timeAgo(new Date(2023, 0, 1));
console.log(ago); // e.g., '4 months ago'

// For future dates
const future = timeAgo(new Date(2024, 0, 1));
console.log(future); // e.g., 'in 8 months'
```

## React Integration

### Hooks

#### `useDateTimezone(timezone?: string)`

React hook that returns timezone-aware date utility functions.

```jsx
import React from 'react';
import { useDateTimezone } from 'date-fns-toolkit';

function DateDisplay() {
  // Use the global default timezone
  const dateUtils = useDateTimezone();
  
  // Or specify a timezone
  const tokyoDateUtils = useDateTimezone('Asia/Tokyo');
  
  return (
    <div>
      <p>Current time: {dateUtils.formatDateTime(new Date())}</p>
      <p>Tokyo time: {tokyoDateUtils.formatDateTime(new Date())}</p>
    </div>
  );
}
```

#### `useTimezoneContext()`

React hook to access the timezone context.

```jsx
import React from 'react';
import { useTimezoneContext } from 'date-fns-toolkit';

function TimezoneSelector() {
  const { timezone, setTimezone } = useTimezoneContext();
  
  return (
    <div>
      <p>Current timezone: {timezone}</p>
      <select 
        value={timezone} 
        onChange={(e) => setTimezone(e.target.value)}
      >
        <option value="America/New_York">New York</option>
        <option value="Europe/London">London</option>
        <option value="Asia/Tokyo">Tokyo</option>
      </select>
    </div>
  );
}
```

### Components

#### `TimezoneProvider`

Context provider for application-wide timezone settings.

```jsx
import React from 'react';
import { TimezoneProvider } from 'date-fns-toolkit';

function App() {
  return (
    <TimezoneProvider defaultTimezone="America/New_York" syncWithGlobal={true}>
      {/* Your app components */}
      <DateDisplay />
      <TimezoneSelector />
    </TimezoneProvider>
  );
}
```

Props:
- `children`: React children
- `defaultTimezone`: (optional) Initial timezone to use
- `syncWithGlobal`: (optional, default: false) When true, changes to context timezone will also update the global default

## TypeScript Types

### `DateInput<D = Date>`

Type for acceptable date input values.

```typescript
import type { DateInput } from 'date-fns-toolkit';

// Can be used with generics for libraries that extend Date
function formatMyCustomDate<T extends Date>(date: DateInput<T>): string {
  // Implementation
}
```

### `TimezoneProviderProps`

Type for the props of the TimezoneProvider component.

```typescript
import type { TimezoneProviderProps } from 'date-fns-toolkit';

const providerProps: TimezoneProviderProps = {
  children: <App />,
  defaultTimezone: 'America/New_York',
  syncWithGlobal: true
};
``` 