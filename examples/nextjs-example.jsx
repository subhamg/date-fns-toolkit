/**
 * Example of using date-fns-toolkit in a Next.js application
 * 
 * This example demonstrates the recommended way to use date-fns-toolkit
 * in a Next.js application to avoid module loading issues.
 */

// Import from date-fns-toolkit directly
// Next.js will automatically use the appropriate module format (MJS)
import { 
  TimezoneProvider, 
  useTimezoneContext,
  formatDateTime, 
  addDays, 
  setDefaultTimezone 
} from 'date-fns-toolkit';

// Alternative import if you encounter issues:
// import { TimezoneProvider, useTimezoneContext } from 'date-fns-toolkit/dist/index.mjs';

// Initialize timezone for the entire application
// You might want to do this in _app.js or a similar entry point
setDefaultTimezone('America/New_York');

// Example Next.js page component
export default function DateTimeExample() {
  return (
    <TimezoneProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Date-FNS Toolkit Next.js Example</h1>
        <TimezoneSelector />
        <CurrentDateTime />
        <DateRangeDisplay />
      </div>
    </TimezoneProvider>
  );
}

// Component to select timezone
function TimezoneSelector() {
  const { timezone, setTimezone } = useTimezoneContext();
  
  const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Select Timezone:
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {timezones.map(tz => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

// Component to display current date and time
function CurrentDateTime() {
  const { timezone } = useTimezoneContext();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  
  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="p-4 border rounded-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Current Date & Time</h2>
      <p className="text-lg">
        {formatDateTime(currentTime, timezone)}
      </p>
      <p className="text-sm text-gray-500">
        Timezone: {timezone}
      </p>
    </div>
  );
}

// Component to display a range of dates
function DateRangeDisplay() {
  const { timezone } = useTimezoneContext();
  const today = new Date();
  
  // Create an array of the next 7 days
  const nextWeek = Array.from({ length: 7 }, (_, i) => {
    return addDays(today, i);
  });
  
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-2">Upcoming Week</h2>
      <ul className="space-y-2">
        {nextWeek.map((date, index) => (
          <li key={index} className="p-2 bg-gray-50 rounded">
            {formatDateTime(date, timezone)}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Add React import for Next.js
import React from 'react'; 