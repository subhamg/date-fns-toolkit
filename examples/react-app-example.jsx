import React, { useState, useEffect } from 'react';
import {
  // React-specific hooks and components
  TimezoneProvider,
  useTimezoneContext,
  useDateTimezone,
  
  // Global timezone configuration
  setDefaultTimezone,
  
  // Utility functions
  format,
  addDays,
  parseInTimeZone,
  formatDateTime,
  isSameDay
} from 'date-fns-toolkit';

// Set global default timezone (this affects all components)
setDefaultTimezone('America/New_York');

/**
 * Timezone selector component
 */
function TimezoneSelector() {
  const { timezone, setTimezone } = useTimezoneContext();
  
  const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];
  
  return (
    <div className="timezone-selector">
      <h3>Current Timezone: {timezone}</h3>
      <select 
        value={timezone} 
        onChange={(e) => setTimezone(e.target.value)}
      >
        {timezones.map(tz => (
          <option key={tz} value={tz}>{tz}</option>
        ))}
      </select>
    </div>
  );
}

/**
 * Date display component using the useDateTimezone hook
 */
function DateDisplay() {
  const dateUtils = useDateTimezone();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Calculate some example dates
  const tomorrow = dateUtils.addDays(currentDate, 1);
  const nextWeek = dateUtils.addDays(currentDate, 7);
  const nextMonth = dateUtils.addMonths(currentDate, 1);
  
  return (
    <div className="date-display">
      <h2>Date Information</h2>
      <p>Current timezone: <strong>{dateUtils.getTimezone()}</strong></p>
      
      <h3>Current Date & Time</h3>
      <p>{dateUtils.formatDateTime(currentDate)}</p>
      
      <h3>Upcoming Dates</h3>
      <ul>
        <li>Tomorrow: {dateUtils.formatDateLong(tomorrow)}</li>
        <li>Next Week: {dateUtils.formatDateLong(nextWeek)}</li>
        <li>Next Month: {dateUtils.formatDateLong(nextMonth)}</li>
      </ul>
      
      <h3>Time Formatting</h3>
      <p>Time only: {dateUtils.formatTime(currentDate)}</p>
      <p>Short date: {dateUtils.formatDateShort(currentDate)}</p>
      <p>Long date: {dateUtils.formatDateLong(currentDate)}</p>
      <p>Custom format: {dateUtils.format(currentDate, "EEEE, MMMM do yyyy 'at' h:mm a")}</p>
    </div>
  );
}

/**
 * Event scheduler component
 */
function EventScheduler() {
  const dateUtils = useDateTimezone();
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: new Date(2023, 5, 15, 10, 0) },
    { id: 2, title: 'Project Deadline', date: new Date(2023, 5, 30, 18, 0) },
    { id: 3, title: 'Conference Call', date: new Date(2023, 6, 5, 15, 30) }
  ]);
  
  // Parse a date string in the current timezone
  const handleAddEvent = () => {
    const title = prompt('Enter event title:');
    const dateStr = prompt('Enter date (YYYY-MM-DD HH:mm):');
    
    if (title && dateStr) {
      try {
        const date = dateUtils.parseInTimeZone(dateStr, 'yyyy-MM-dd HH:mm');
        setEvents([...events, { id: Date.now(), title, date }]);
      } catch (err) {
        alert('Invalid date format. Please use YYYY-MM-DD HH:mm');
      }
    }
  };
  
  return (
    <div className="event-scheduler">
      <h2>Event Scheduler</h2>
      <button onClick={handleAddEvent}>Add Event</button>
      
      <h3>Upcoming Events</h3>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {dateUtils.formatDateTime(event.date)}
            {dateUtils.isSameDay(event.date, new Date()) && 
              <span className="today-badge"> (Today)</span>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Main App component
 */
export default function App() {
  return (
    <TimezoneProvider syncWithGlobal={true}>
      <div className="app">
        <h1>Date-FNS Toolkit React Demo</h1>
        
        <TimezoneSelector />
        <hr />
        
        <div className="app-content">
          <DateDisplay />
          <EventScheduler />
        </div>
      </div>
    </TimezoneProvider>
  );
} 