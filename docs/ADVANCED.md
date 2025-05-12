# Advanced Usage Guide for date-fns-toolkit

This guide covers advanced usage patterns and features of date-fns-toolkit.

## Table of Contents

- [Localization](#localization)
- [Custom Formatting](#custom-formatting)
- [Working with Different Calendar Systems](#working-with-different-calendar-systems)
- [Performance Optimization](#performance-optimization)
- [Testing Strategies](#testing-strategies)
- [Advanced React Patterns](#advanced-react-patterns)
- [Server-Side Rendering](#server-side-rendering)

## Localization

date-fns-toolkit supports all the localization features from date-fns. You can use different locales for formatting dates:

```javascript
import { format } from 'date-fns-toolkit';
import { enUS, fr, ja } from 'date-fns/locale';

const date = new Date(2023, 4, 15); // May 15, 2023

// Format with different locales
console.log(format(date, 'PPP', 'America/New_York', { locale: enUS }));
// Output: May 15th, 2023

console.log(format(date, 'PPP', 'Europe/Paris', { locale: fr }));
// Output: 15 mai 2023

console.log(format(date, 'PPP', 'Asia/Tokyo', { locale: ja }));
// Output: 2023年5月15日
```

### Creating a Locale-Aware Formatter

You can create a helper function that combines timezone and locale settings:

```javascript
import { format } from 'date-fns-toolkit';
import { enUS, fr, ja } from 'date-fns/locale';

// Map of supported locales
const locales = {
  'en-US': enUS,
  'fr': fr,
  'ja': ja
};

// Helper function for localized, timezone-aware formatting
function formatLocalized(date, formatStr, timezone, localeCode = 'en-US') {
  const locale = locales[localeCode] || enUS;
  return format(date, formatStr, timezone, { locale });
}

// Usage
const date = new Date();
console.log(formatLocalized(date, 'PPP', 'America/New_York', 'fr'));
```

## Custom Formatting

### Creating Custom Format Functions

You can create your own custom format functions based on your application's needs:

```javascript
import { format } from 'date-fns-toolkit';

// Custom format for a specific application need
function formatAppointmentTime(date, timezone) {
  return format(date, "'Appointment on' EEEE, MMMM do 'at' h:mm a", timezone);
}

// Custom format for a specific region
function formatEuropeanDate(date, timezone) {
  return format(date, 'dd.MM.yyyy', timezone);
}

// Usage
const appointment = new Date(2023, 4, 15, 14, 30);
console.log(formatAppointmentTime(appointment, 'America/New_York'));
// Output: Appointment on Monday, May 15th at 2:30 PM

console.log(formatEuropeanDate(appointment, 'Europe/Berlin'));
// Output: 15.05.2023
```

### Extending the useDateTimezone Hook

You can extend the `useDateTimezone` hook with your own custom formatting functions:

```jsx
import React from 'react';
import { useDateTimezone } from 'date-fns-toolkit';
import { enUS, fr } from 'date-fns/locale';

function useExtendedDateTimezone(timezone, localeCode = 'en-US') {
  const dateUtils = useDateTimezone(timezone);
  const locale = localeCode === 'fr' ? fr : enUS;
  
  return React.useMemo(() => ({
    ...dateUtils,
    
    // Add custom formatting functions
    formatLocalizedLong: (date) => 
      dateUtils.format(date, 'PPPP', { locale }),
    
    formatAppointmentTime: (date) => 
      dateUtils.format(date, "'Appointment on' EEEE, MMMM do 'at' h:mm a", { locale }),
    
    formatRelativeToToday: (date) => {
      const today = new Date();
      if (dateUtils.isSameDay(date, today)) {
        return 'Today at ' + dateUtils.formatTime(date);
      } else if (dateUtils.isSameDay(date, dateUtils.addDays(today, 1))) {
        return 'Tomorrow at ' + dateUtils.formatTime(date);
      } else if (dateUtils.isSameDay(date, dateUtils.subDays(today, 1))) {
        return 'Yesterday at ' + dateUtils.formatTime(date);
      }
      return dateUtils.formatDateLong(date);
    }
  }), [dateUtils, locale]);
}

// Usage in a component
function AppointmentDisplay() {
  const dateUtils = useExtendedDateTimezone('America/New_York', 'fr');
  const appointment = new Date(2023, 4, 15, 14, 30);
  
  return (
    <div>
      <p>{dateUtils.formatLocalizedLong(appointment)}</p>
      <p>{dateUtils.formatAppointmentTime(appointment)}</p>
      <p>{dateUtils.formatRelativeToToday(appointment)}</p>
    </div>
  );
}
```

## Working with Different Calendar Systems

While date-fns-toolkit primarily works with the Gregorian calendar, you can integrate it with other calendar systems:

### Islamic Calendar Example

```javascript
import { format, addDays } from 'date-fns-toolkit';
import { toHijri, toGregorian } from 'hijri-converter'; // You would need to install this package

// Convert Gregorian to Hijri
function formatHijriDate(gregorianDate, timezone) {
  const date = new Date(gregorianDate);
  const hijriDate = toHijri(date.getFullYear(), date.getMonth() + 1, date.getDate());
  
  return `${hijriDate.hy}-${hijriDate.hm}-${hijriDate.hd}`;
}

// Convert Hijri to Gregorian
function hijriToGregorian(year, month, day) {
  const gregorian = toGregorian(year, month, day);
  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
}

// Usage
const today = new Date();
console.log(`Gregorian: ${format(today, 'yyyy-MM-dd')}`);
console.log(`Hijri: ${formatHijriDate(today)}`);

// Add days to Hijri date
const hijriDate = { year: 1444, month: 10, day: 25 };
const gregorianDate = hijriToGregorian(hijriDate.year, hijriDate.month, hijriDate.day);
const nextWeek = addDays(gregorianDate, 7);
console.log(`Next week in Hijri: ${formatHijriDate(nextWeek)}`);
```

## Performance Optimization

### Memoization

When working with date formatting in React components, use memoization to prevent unnecessary re-renders:

```jsx
import React, { useMemo } from 'react';
import { format, formatDateTime } from 'date-fns-toolkit';

function DateDisplay({ date, timezone }) {
  // Memoize formatted dates to prevent unnecessary re-renders
  const formattedDate = useMemo(() => {
    return formatDateTime(date, timezone);
  }, [date, timezone]);
  
  const formattedCustom = useMemo(() => {
    return format(date, "'Date:' MMMM do yyyy, 'Time:' h:mm a", timezone);
  }, [date, timezone]);
  
  return (
    <div>
      <p>{formattedDate}</p>
      <p>{formattedCustom}</p>
    </div>
  );
}
```

### Batch Processing

When working with large sets of dates, batch your operations:

```javascript
import { formatDateTime } from 'date-fns-toolkit';

function batchFormatDates(dates, timezone, batchSize = 100) {
  const results = [];
  
  for (let i = 0; i < dates.length; i += batchSize) {
    const batch = dates.slice(i, i + batchSize);
    
    // Process batch
    const formattedBatch = batch.map(date => formatDateTime(date, timezone));
    results.push(...formattedBatch);
    
    // If in browser, allow UI to update between batches
    if (typeof window !== 'undefined' && i + batchSize < dates.length) {
      setTimeout(() => {
        // Continue processing in next tick
      }, 0);
    }
  }
  
  return results;
}
```

## Testing Strategies

### Mocking Timezones

When testing timezone-specific functionality, you can mock the timezone functions:

```javascript
import { setDefaultTimezone, getDefaultTimezone } from 'date-fns-toolkit';

// Save original timezone
const originalTimezone = getDefaultTimezone();

describe('Date formatting tests', () => {
  beforeEach(() => {
    // Set a consistent timezone for tests
    setDefaultTimezone('UTC');
  });
  
  afterEach(() => {
    // Restore original timezone
    setDefaultTimezone(originalTimezone);
  });
  
  test('formats date correctly in UTC', () => {
    // Your test here
  });
  
  test('formats date correctly in New York timezone', () => {
    setDefaultTimezone('America/New_York');
    // Your test here
  });
});
```

### Testing with Fixed Dates

Use fixed dates in your tests to ensure consistent results:

```javascript
import { formatDateTime } from 'date-fns-toolkit';

test('formatDateTime returns correct format', () => {
  // Create a fixed date for testing (2023-05-15T12:00:00Z)
  const testDate = new Date(Date.UTC(2023, 4, 15, 12, 0, 0));
  
  expect(formatDateTime(testDate, 'UTC')).toBe('05/15/2023 12:00:00');
  expect(formatDateTime(testDate, 'America/New_York')).toBe('05/15/2023 08:00:00');
  expect(formatDateTime(testDate, 'Asia/Tokyo')).toBe('05/15/2023 21:00:00');
});
```

## Advanced React Patterns

### Context Composition

You can compose the TimezoneProvider with other contexts for more complex applications:

```jsx
import React from 'react';
import { TimezoneProvider } from 'date-fns-toolkit';

// Create a locale context
const LocaleContext = React.createContext({
  locale: 'en-US',
  setLocale: () => {}
});

// Combined provider component
function DateConfigProvider({ children, defaultTimezone, defaultLocale }) {
  const [locale, setLocale] = React.useState(defaultLocale || 'en-US');
  
  return (
    <TimezoneProvider defaultTimezone={defaultTimezone}>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        {children}
      </LocaleContext.Provider>
    </TimezoneProvider>
  );
}

// Combined hook for accessing both contexts
function useDateConfig() {
  const { timezone, setTimezone } = useTimezoneContext();
  const { locale, setLocale } = React.useContext(LocaleContext);
  
  return {
    timezone,
    setTimezone,
    locale,
    setLocale
  };
}
```

### Higher-Order Components

Create HOCs to inject date utilities into your components:

```jsx
import React from 'react';
import { useDateTimezone } from 'date-fns-toolkit';

// HOC that injects date utilities
function withDateUtils(Component, timezone) {
  return function WrappedComponent(props) {
    const dateUtils = useDateTimezone(timezone);
    
    return <Component {...props} dateUtils={dateUtils} />;
  };
}

// Usage
function EventDisplay({ event, dateUtils }) {
  return (
    <div>
      <h3>{event.title}</h3>
      <p>Date: {dateUtils.formatDateLong(event.date)}</p>
      <p>Time: {dateUtils.formatTime(event.date)}</p>
    </div>
  );
}

// Create a component with date utilities injected
const EventDisplayWithDateUtils = withDateUtils(EventDisplay, 'America/New_York');

// Use the enhanced component
function App() {
  const event = { title: 'Team Meeting', date: new Date() };
  
  return <EventDisplayWithDateUtils event={event} />;
}
```

## Server-Side Rendering

When using date-fns-toolkit with server-side rendering frameworks like Next.js, ensure consistent timezone handling:

```jsx
import { setDefaultTimezone } from 'date-fns-toolkit';

// In your _app.js or equivalent
function MyApp({ Component, pageProps }) {
  // Set a default timezone for SSR
  if (typeof window === 'undefined') {
    // On server, use UTC
    setDefaultTimezone('UTC');
  } else {
    // On client, try to detect user's timezone
    try {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setDefaultTimezone(detectedTimezone);
    } catch (e) {
      // Fallback to UTC
      setDefaultTimezone('UTC');
    }
  }
  
  return (
    <TimezoneProvider>
      <Component {...pageProps} />
    </TimezoneProvider>
  );
}

export default MyApp;
```

### Hydration Considerations

To avoid hydration mismatches, you can use a technique to synchronize server and client rendering:

```jsx
import React, { useState, useEffect } from 'react';
import { formatDateTime, detectTimezone } from 'date-fns-toolkit';

function TimeDisplay({ date }) {
  // Start with UTC for SSR
  const [timezone, setTimezone] = useState('UTC');
  const [isClient, setIsClient] = useState(false);
  
  // After hydration, update to client timezone
  useEffect(() => {
    setTimezone(detectTimezone());
    setIsClient(true);
  }, []);
  
  // Format with current timezone
  const formattedDate = formatDateTime(date, timezone);
  
  return (
    <div>
      <p>{formattedDate}</p>
      {isClient && <p>Your timezone: {timezone}</p>}
    </div>
  );
}
```

This ensures that the server and client initially render the same content (using UTC), and then the client updates to the correct timezone after hydration. 