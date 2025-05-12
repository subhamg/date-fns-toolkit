# Getting Started with date-fns-toolkit

This guide will help you get started with date-fns-toolkit, a comprehensive library for working with dates in JavaScript with timezone support and React integration.

## Installation

Install date-fns-toolkit using your package manager of choice:

```bash
# Using npm
npm install date-fns-toolkit

# Using yarn
yarn add date-fns-toolkit

# Using pnpm
pnpm add date-fns-toolkit
```

date-fns-toolkit includes all functionality from date-fns and date-fns-tz, so you don't need to install those packages separately.

## Basic Usage

### Setting a Global Default Timezone

One of the key features of date-fns-toolkit is the ability to set a global default timezone that will be used by all date functions:

```javascript
import { setDefaultTimezone } from 'date-fns-toolkit';

// Set the default timezone for your entire application
setDefaultTimezone('America/New_York');
```

### Automatic Timezone Detection

You can automatically detect and use the user's local timezone:

```javascript
import { detectTimezone, setDefaultTimezone } from 'date-fns-toolkit';

// Detect and set the user's timezone
const userTimezone = detectTimezone();
setDefaultTimezone(userTimezone);
console.log(`Using timezone: ${userTimezone}`);
```

### Basic Date Formatting

Format dates with timezone awareness:

```javascript
import { format, formatDateTime, formatDateLong } from 'date-fns-toolkit';

const now = new Date();

// Using the global default timezone
console.log(formatDateTime(now)); // e.g., '05/15/2023 14:30:00'

// Using a specific timezone
console.log(formatDateTime(now, 'Europe/London')); // e.g., '05/15/2023 19:30:00'

// Custom format
console.log(format(now, 'EEEE, MMMM do yyyy')); // e.g., 'Monday, May 15th 2023'
```

### Date Operations

Perform date calculations with timezone awareness:

```javascript
import { addDays, subMonths, startOfDay, endOfDay } from 'date-fns-toolkit';

const now = new Date();

// Add 7 days to the current date
const nextWeek = addDays(now, 7);

// Subtract 2 months from the current date
const twoMonthsAgo = subMonths(now, 2);

// Get the start and end of today
const todayStart = startOfDay(now);
const todayEnd = endOfDay(now);
```

### Date Comparisons

Compare dates with timezone awareness:

```javascript
import { isBefore, isAfter, isSameDay } from 'date-fns-toolkit';

const date1 = new Date(2023, 4, 15); // May 15, 2023
const date2 = new Date(2023, 4, 20); // May 20, 2023

console.log(isBefore(date1, date2)); // true
console.log(isAfter(date1, date2));  // false
console.log(isSameDay(date1, date2)); // false
```

### Working with Date Ranges

Get date ranges and iterate over days:

```javascript
import { 
  getDateRange, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek 
} from 'date-fns-toolkit';

const now = new Date();

// Get the range for the current week
const weekRange = getDateRange(now, 'week');
console.log(`Week starts: ${weekRange.start}`);
console.log(`Week ends: ${weekRange.end}`);

// Get all days in the current week
const weekDays = eachDayOfInterval({
  start: startOfWeek(now),
  end: endOfWeek(now)
});

// Print each day of the week
weekDays.forEach(day => {
  console.log(format(day, 'EEE, MMM d'));
});
```

### Relative Time Formatting

Format relative times with timezone awareness:

```javascript
import { 
  formatDistance, 
  formatDistanceToNow, 
  timeAgo 
} from 'date-fns-toolkit';

const pastDate = new Date(2023, 0, 1); // January 1, 2023
const futureDate = new Date(2024, 0, 1); // January 1, 2024

// Format the distance between two dates
console.log(formatDistance(pastDate, new Date(), { addSuffix: true }));
// e.g., '4 months ago'

// Format the distance to now
console.log(formatDistanceToNow(futureDate, { addSuffix: true }));
// e.g., 'in 8 months'

// Simple time ago formatting
console.log(timeAgo(pastDate)); // e.g., '4 months ago'
```

## React Integration

### Using the TimezoneProvider

Wrap your React application with the TimezoneProvider to provide timezone context:

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

### Using the useDateTimezone Hook

Access timezone-aware date functions in your components:

```jsx
import React from 'react';
import { useDateTimezone } from 'date-fns-toolkit';

function DateDisplay() {
  const dateUtils = useDateTimezone();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div>
      <h2>Current Date & Time</h2>
      <p>{dateUtils.formatDateTime(currentDate)}</p>
      <p>Timezone: {dateUtils.getTimezone()}</p>
      
      <h3>Tomorrow will be:</h3>
      <p>{dateUtils.formatDateLong(dateUtils.addDays(currentDate, 1))}</p>
    </div>
  );
}
```

### Creating a Timezone Selector

Allow users to change the timezone:

```jsx
import React from 'react';
import { useTimezoneContext } from 'date-fns-toolkit';

function TimezoneSelector() {
  const { timezone, setTimezone } = useTimezoneContext();
  
  const commonTimezones = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
    'UTC'
  ];
  
  return (
    <div>
      <label htmlFor="timezone-select">Select Timezone: </label>
      <select 
        id="timezone-select"
        value={timezone} 
        onChange={(e) => setTimezone(e.target.value)}
      >
        {commonTimezones.map(tz => (
          <option key={tz} value={tz}>{tz}</option>
        ))}
      </select>
    </div>
  );
}
```

## Node.js Server-side Usage

date-fns-toolkit works seamlessly in Node.js environments:

```javascript
const express = require('express');
const { 
  setDefaultTimezone, 
  formatDateTime, 
  addDays, 
  parseInTimeZone 
} = require('date-fns-toolkit');

const app = express();
const PORT = 3000;

// Set server timezone
setDefaultTimezone('UTC');

app.get('/api/time', (req, res) => {
  const now = new Date();
  
  // Client can request a specific timezone
  const clientTimezone = req.query.timezone || 'UTC';
  
  res.json({
    serverTime: formatDateTime(now),
    clientTime: formatDateTime(now, clientTimezone),
    tomorrow: formatDateTime(addDays(now, 1), clientTimezone)
  });
});

app.post('/api/parse-date', express.json(), (req, res) => {
  try {
    const { dateString, format, timezone } = req.body;
    const parsedDate = parseInTimeZone(dateString, format, timezone);
    
    res.json({
      success: true,
      parsedDate: parsedDate.toISOString(),
      formatted: formatDateTime(parsedDate, timezone)
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Next Steps

- Check out the [API Reference](./API.md) for a complete list of functions
- Explore the [examples](../examples) directory for more usage examples
- Learn about [advanced features](./ADVANCED.md) like custom formatting and localization 