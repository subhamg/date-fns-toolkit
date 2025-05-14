/**
 * This example demonstrates the usage of all timezone-aware functions in date-fns-toolkit
 */

import {
  // Timezone configuration
  setDefaultTimezone,
  getDefaultTimezone,

  // Date operations
  addDays,
  subDays,
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfDay,
  endOfDay,

  // Date range functions
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  getDateRange,

  // Formatting functions
  format,
  formatISO,
  formatDateShort,
  formatDateLong,
  formatDateTime,
  formatTime,

  // Relative time formatting
  formatDistance,
  formatDistanceToNow,
  formatRelative,
  differenceInCalendarDays,
  timeAgo,

  // Comparison functions
  isBefore,
  isAfter,
  isSameDay,
  isEqual,
  isWithinInterval,
  isSameOrAfter,
  isSameOrBefore,

  // Other date-fns functions will use the global timezone
  parseISO,
  isValid,
  parse
} from 'date-fns-toolkit';

// Set a global default timezone
setDefaultTimezone('America/New_York');
console.log(`Current global timezone: ${getDefaultTimezone()}`);

// Create a sample date
const date = new Date('2023-05-15T12:00:00Z');
const otherDate = new Date('2023-05-20T14:30:00Z');

// Date operations
console.log('\n--- Date Operations ---');
console.log(`Add 5 days: ${formatDateTime(addDays(date, 5))}`);
console.log(`Subtract 3 days: ${formatDateTime(subDays(date, 3))}`);
console.log(`Add 2 months: ${formatDateTime(addMonths(date, 2))}`);
console.log(`Subtract 1 month: ${formatDateTime(subMonths(date, 1))}`);
console.log(`Add 1 year: ${formatDateTime(addYears(date, 1))}`);
console.log(`Subtract 2 years: ${formatDateTime(subYears(date, 2))}`);
console.log(`Start of day: ${formatDateTime(startOfDay(date))}`);
console.log(`End of day: ${formatDateTime(endOfDay(date))}`);

// Date range functions
console.log('\n--- Date Range Functions ---');
console.log(`Start of week: ${formatDateTime(startOfWeek(date))}`);
console.log(`End of week: ${formatDateTime(endOfWeek(date))}`);
console.log(`Start of month: ${formatDateTime(startOfMonth(date))}`);
console.log(`End of month: ${formatDateTime(endOfMonth(date))}`);
console.log(`Start of year: ${formatDateTime(startOfYear(date))}`);
console.log(`End of year: ${formatDateTime(endOfYear(date))}`);

// Using eachDayOfInterval
const interval = { start: date, end: addDays(date, 5) };
console.log('Each day in interval:');
eachDayOfInterval(interval).forEach(day => {
  console.log(`- ${formatDateShort(day)}`);
});

// Using getDateRange
console.log('Date range for the month:');
const monthRange = getDateRange(date, 'month');
console.log(`- Start: ${formatDateTime(monthRange.start)}`);
console.log(`- End: ${formatDateTime(monthRange.end)}`);

// Formatting functions
console.log('\n--- Formatting Functions ---');
console.log(`Custom format: ${format(date, 'PPpp')}`);
console.log(`ISO format: ${formatISO(date)}`);
console.log(`Short date: ${formatDateShort(date)}`);
console.log(`Long date: ${formatDateLong(date)}`);
console.log(`Date and time: ${formatDateTime(date)}`);
console.log(`Time only: ${formatTime(date)}`);

// Relative time formatting
console.log('\n--- Relative Time Formatting ---');
console.log(`Format distance: ${formatDistance(date, otherDate)}`);
console.log(`Format distance to now: ${formatDistanceToNow(date)}`);
console.log(`Format relative: ${formatRelative(date, new Date())}`);
console.log(`Difference in calendar days: ${differenceInCalendarDays(date, otherDate)}`);
console.log(`Time ago: ${timeAgo(date)}`);

// Comparison functions
console.log('\n--- Comparison Functions ---');
console.log(`Is before: ${isBefore(date, otherDate)}`);
console.log(`Is after: ${isAfter(date, otherDate)}`);
console.log(`Is same day: ${isSameDay(date, new Date(date))}`);
console.log(`Is equal: ${isEqual(date, new Date(date))}`);
console.log(`Is within interval: ${isWithinInterval(date, { start: subDays(date, 1), end: addDays(date, 1) })}`);
console.log(`Is same or after: ${isSameOrAfter(date, subDays(date, 1))}`);
console.log(`Is same or before: ${isSameOrBefore(date, addDays(date, 1))}`);
console.log(`Is same or after (equal dates): ${isSameOrAfter(date, new Date(date))}`);
console.log(`Is same or before (equal dates): ${isSameOrBefore(date, new Date(date))}`);

// Using with explicit timezone
console.log('\n--- Using Explicit Timezone ---');
console.log(`Date in Tokyo: ${formatDateTime(date, 'Asia/Tokyo')}`);
console.log(`Date in London: ${formatDateTime(date, 'Europe/London')}`);

// Using standard date-fns functions (will use global timezone)
console.log('\n--- Standard date-fns Functions ---');
const isoDate = '2023-05-15T12:00:00Z';
const parsedDate = parseISO(isoDate);
console.log(`Parsed ISO date: ${formatDateTime(parsedDate)}`);
console.log(`Is valid date: ${isValid(parsedDate)}`);

// Compare timezone-aware parseISO with standard Date parsing
console.log('\n--- Comparing parseISO with new Date() ---');
console.log(`Using timezone-aware parseISO: ${formatDateTime(parseISO('2023-05-15T12:00:00Z'))}`);
console.log(`Using new Date(): ${formatDateTime(new Date('2023-05-15T12:00:00Z'))}`);

// Using parseISO with different timezones
console.log('\n--- parseISO with Different Timezones ---');
console.log(`New York (default): ${formatDateTime(parseISO('2023-05-15T12:00:00Z'))}`);
console.log(`Tokyo: ${formatDateTime(parseISO('2023-05-15T12:00:00Z', 'Asia/Tokyo'))}`);
console.log(`London: ${formatDateTime(parseISO('2023-05-15T12:00:00Z', 'Europe/London'))}`);

// Using parse function
const parsedCustomDate = parse('05/15/2023', 'MM/dd/yyyy', new Date());
console.log(`Parsed custom date: ${formatDateTime(parsedCustomDate)}`);

// Example with different timezones showing the difference
console.log('\n--- Timezone Comparison ---');
const dateStr = '2023-05-15T12:00:00';
console.log(`Original string: ${dateStr}`);
console.log(`In New York (default): ${formatDateTime(new Date(dateStr))}`);
console.log(`In Tokyo: ${formatDateTime(new Date(dateStr), 'Asia/Tokyo')}`);
console.log(`In London: ${formatDateTime(new Date(dateStr), 'Europe/London')}`); 