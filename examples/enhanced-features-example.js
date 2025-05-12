// Example showing enhanced features of date-fns-toolkit
import React, { useState, useEffect } from 'react';
import {
  // Timezone configuration with auto-detection
  detectTimezone,
  setDefaultTimezone,
  getDefaultTimezone,
  
  // React hooks
  useDateTimezone,
  TimezoneProvider,
  
  // Enhanced date range functions
  getDateRange,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  
  // Relative time formatting
  formatDistance,
  formatDistanceToNow,
  timeAgo
} from 'date-fns-toolkit';

// Auto-detect and set the user's timezone
const detectedTimezone = detectTimezone();
setDefaultTimezone(detectedTimezone);
console.log(`Auto-detected timezone: ${detectedTimezone}`);

/**
 * Calendar component showing date ranges
 */
function Calendar() {
  const dateUtils = useDateTimezone();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  
  // Get date range based on view mode
  const range = dateUtils.getDateRange(selectedDate, viewMode);
  
  // Get all days in the range
  const days = dateUtils.eachDayOfInterval({
    start: range.start,
    end: range.end
  });
  
  return (
    <div className="calendar">
      <h2>Calendar ({viewMode})</h2>
      
      <div className="calendar-controls">
        <button onClick={() => setViewMode('day')}>Day</button>
        <button onClick={() => setViewMode('week')}>Week</button>
        <button onClick={() => setViewMode('month')}>Month</button>
        <button onClick={() => setViewMode('year')}>Year</button>
      </div>
      
      <div className="calendar-header">
        <p>From: {dateUtils.formatDateLong(range.start)}</p>
        <p>To: {dateUtils.formatDateLong(range.end)}</p>
        <p>Timezone: {dateUtils.getTimezone()}</p>
      </div>
      
      <div className="calendar-grid">
        {days.length > 31 ? (
          <p>Too many days to display ({days.length})</p>
        ) : (
          <ul>
            {days.map((day, index) => (
              <li key={index} 
                className={dateUtils.isSameDay(day, new Date()) ? 'today' : ''}>
                {dateUtils.format(day, 'EEE, MMM d')}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Relative time component showing time ago formatting
 */
function RelativeTimeDemo() {
  const dateUtils = useDateTimezone();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Create some example dates
  const fiveMinutesAgo = dateUtils.subDays(currentTime, 0.0035);
  const yesterday = dateUtils.subDays(currentTime, 1);
  const lastWeek = dateUtils.subDays(currentTime, 7);
  const nextMonth = dateUtils.addMonths(currentTime, 1);
  
  return (
    <div className="relative-time">
      <h2>Relative Time Formatting</h2>
      
      <ul>
        <li>
          <strong>Five minutes ago:</strong> {dateUtils.timeAgo(fiveMinutesAgo)}
        </li>
        <li>
          <strong>Yesterday:</strong> {dateUtils.timeAgo(yesterday)}
        </li>
        <li>
          <strong>Last week:</strong> {dateUtils.timeAgo(lastWeek)}
        </li>
        <li>
          <strong>Next month:</strong> {dateUtils.timeAgo(nextMonth)}
        </li>
        <li>
          <strong>Custom format:</strong> {dateUtils.formatDistance(lastWeek, nextMonth, { addSuffix: true })}
        </li>
      </ul>
    </div>
  );
}

/**
 * Main App component
 */
export default function EnhancedFeaturesApp() {
  return (
    <TimezoneProvider>
      <div className="app">
        <h1>Date-FNS Toolkit Enhanced Features</h1>
        
        <Calendar />
        <hr />
        <RelativeTimeDemo />
      </div>
    </TimezoneProvider>
  );
} 