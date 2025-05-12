// Example showing date-fns-toolkit as an all-in-one package
import React from 'react';
import {
  // Core date-fns functionality
  format,
  parse,
  addDays,
  differenceInDays,
  isAfter,
  
  // Core date-fns-tz functionality
  formatInTimeZone,
  toZonedTime,
  
  // Toolkit extensions
  setDefaultTimezone,
  formatDateTime,
  
  // React integration
  TimezoneProvider,
  useDateTimezone
} from 'date-fns-toolkit';

// Set a global default timezone
setDefaultTimezone('America/New_York');

// Function using core date-fns functionality
function calculateDaysDifference(startDate, endDate) {
  return differenceInDays(endDate, startDate);
}

// Function using toolkit extensions with global default timezone
function formatEvent(event) {
  return {
    ...event,
    formattedDate: formatDateTime(event.date),
    // Note: This uses the core date-fns isAfter, not the timezone-aware version
    isUpcoming: isAfter(new Date(event.date), new Date())
  };
}

// Function using date-fns-tz core functionality
function displayTimeInMultipleTimezones(date) {
  const timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
  
  return timezones.map(tz => ({
    timezone: tz,
    time: formatInTimeZone(date, tz, 'yyyy-MM-dd HH:mm:ss')
  }));
}

// React component using hooks
function DateDisplay() {
  const dateUtils = useDateTimezone();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const nextWeek = dateUtils.addDays(currentDate, 7);
  const daysDifference = calculateDaysDifference(currentDate, nextWeek);
  
  return (
    <div>
      <h2>Date Information</h2>
      <p>Current Date: {dateUtils.formatDateTime(currentDate)}</p>
      <p>Next Week: {dateUtils.formatDateTime(nextWeek)}</p>
      <p>Days Difference: {daysDifference}</p>
      
      <h3>Time Around the World</h3>
      <ul>
        {displayTimeInMultipleTimezones(currentDate).map(item => (
          <li key={item.timezone}>
            {item.timezone}: {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main app component
export default function App() {
  return (
    <TimezoneProvider>
      <div className="app">
        <h1>Date-FNS Toolkit Demo</h1>
        <p>An all-in-one date handling solution</p>
        <DateDisplay />
      </div>
    </TimezoneProvider>
  );
}