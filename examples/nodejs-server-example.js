const express = require('express');
const {
  // Global timezone configuration
  setDefaultTimezone,
  getDefaultTimezone,
  
  // Utility functions
  format,
  formatDateTime,
  formatDateLong,
  addDays,
  addMonths,
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  isSameDay,
  parseInTimeZone,
  toZonedTime,
  fromZonedTime
} = require('date-fns-toolkit');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set global default timezone for the server
setDefaultTimezone('UTC');
console.log(`Server timezone set to: ${getDefaultTimezone()}`);

// Middleware to parse JSON
app.use(express.json());

// Sample data - events with dates
const events = [
  { id: 1, title: 'Product Launch', date: new Date(2023, 5, 15, 10, 0) },
  { id: 2, title: 'Quarterly Meeting', date: new Date(2023, 5, 30, 14, 30) },
  { id: 3, title: 'Annual Conference', date: new Date(2023, 6, 10, 9, 0) }
];

// Utility function to get date range for a month
function getMonthDateRange(year, month) {
  const startDate = startOfDay(new Date(year, month - 1, 1));
  const endDate = endOfDay(new Date(year, month, 0)); // Last day of month
  return { startDate, endDate };
}

// API routes
app.get('/api/server-time', (req, res) => {
  const now = new Date();
  
  // Client can request a specific timezone
  const clientTimezone = req.query.timezone || getDefaultTimezone();
  
  res.json({
    serverTimezone: getDefaultTimezone(),
    requestedTimezone: clientTimezone,
    timestamp: now.getTime(),
    formatted: {
      iso: now.toISOString(),
      utc: format(now, 'yyyy-MM-dd HH:mm:ss'),
      clientTime: format(now, 'yyyy-MM-dd HH:mm:ss', clientTimezone),
      longDate: formatDateLong(now, clientTimezone)
    }
  });
});

// Get all events
app.get('/api/events', (req, res) => {
  // Client can request a specific timezone
  const timezone = req.query.timezone || getDefaultTimezone();
  
  const formattedEvents = events.map(event => ({
    ...event,
    formattedDate: formatDateTime(event.date, timezone),
    isToday: isSameDay(event.date, new Date(), timezone)
  }));
  
  res.json(formattedEvents);
});

// Get events by date range
app.get('/api/events/range', (req, res) => {
  const { start, end, timezone = getDefaultTimezone() } = req.query;
  
  try {
    // Parse dates in the specified timezone
    const startDate = parseInTimeZone(start, 'yyyy-MM-dd', timezone);
    const endDate = parseInTimeZone(end, 'yyyy-MM-dd', timezone);
    
    // Filter events in the date range
    const filteredEvents = events.filter(event => {
      const eventDate = toZonedTime(event.date, timezone);
      return !isBefore(eventDate, startDate) && !isAfter(eventDate, endDate);
    });
    
    // Format events for response
    const formattedEvents = filteredEvents.map(event => ({
      ...event,
      formattedDate: formatDateTime(event.date, timezone)
    }));
    
    res.json(formattedEvents);
  } catch (err) {
    res.status(400).json({ error: 'Invalid date format. Use yyyy-MM-dd' });
  }
});

// Get events by month
app.get('/api/events/month/:year/:month', (req, res) => {
  const { year, month } = req.params;
  const timezone = req.query.timezone || getDefaultTimezone();
  
  try {
    // Get date range for the specified month
    const { startDate, endDate } = getMonthDateRange(parseInt(year), parseInt(month));
    
    // Filter events in the month
    const monthEvents = events.filter(event => {
      const eventDate = toZonedTime(event.date, timezone);
      return !isBefore(eventDate, startDate) && !isAfter(eventDate, endDate);
    });
    
    res.json({
      year,
      month,
      timezone,
      startDate: format(startDate, 'yyyy-MM-dd', timezone),
      endDate: format(endDate, 'yyyy-MM-dd', timezone),
      events: monthEvents.map(event => ({
        ...event,
        formattedDate: formatDateTime(event.date, timezone)
      }))
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid year or month' });
  }
});

// Create a new event
app.post('/api/events', (req, res) => {
  const { title, date, timezone = getDefaultTimezone() } = req.body;
  
  try {
    // Parse the date string in the specified timezone
    const parsedDate = parseInTimeZone(date, 'yyyy-MM-dd HH:mm', timezone);
    
    // Convert to UTC for storage
    const utcDate = fromZonedTime(parsedDate, timezone);
    
    // Create new event
    const newEvent = {
      id: events.length + 1,
      title,
      date: utcDate
    };
    
    events.push(newEvent);
    
    res.status(201).json({
      ...newEvent,
      formattedDate: formatDateTime(newEvent.date, timezone)
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid date format. Use yyyy-MM-dd HH:mm' });
  }
});

// Get upcoming events
app.get('/api/events/upcoming/:days', (req, res) => {
  const days = parseInt(req.params.days) || 7;
  const timezone = req.query.timezone || getDefaultTimezone();
  
  const now = new Date();
  const futureDate = addDays(now, days);
  
  // Filter upcoming events
  const upcomingEvents = events.filter(event => {
    return (
      isAfter(event.date, now) && 
      isBefore(event.date, futureDate)
    );
  });
  
  // Sort by date
  upcomingEvents.sort((a, b) => a.date - b.date);
  
  res.json({
    timezone,
    daysAhead: days,
    periodStart: formatDateTime(now, timezone),
    periodEnd: formatDateTime(futureDate, timezone),
    events: upcomingEvents.map(event => ({
      ...event,
      formattedDate: formatDateTime(event.date, timezone)
    }))
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Current time: ${formatDateTime(new Date())}`);
}); 