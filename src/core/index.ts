/**
 * Re-exports of date-fns and date-fns-tz core functionality
 * This allows users to import all date functions from a single package
 */

// Re-export everything from date-fns except functions we override with timezone-aware versions
import * as dateFns from 'date-fns';

// Functions that we provide timezone-aware versions for
const overriddenFunctions = [
  'addDays', 'subDays', 'addMonths', 'subMonths', 'addYears', 'subYears',
  'startOfDay', 'endOfDay', 'isBefore', 'isAfter', 'isSameDay', 'format'
];

// Create a new object with all non-overridden functions
const nonOverriddenFunctions = Object.fromEntries(
  Object.entries(dateFns).filter(([key]) => !overriddenFunctions.includes(key))
);

// Export all non-overridden functions
export const {
  parse,
  parseISO,
  isValid,
  formatDistance: originalFormatDistance,
  formatDistanceToNow: originalFormatDistanceToNow,
  formatRelative: originalFormatRelative,
  differenceInCalendarDays: originalDifferenceInCalendarDays,
  // Export all other date-fns functions
  ...rest
} = nonOverriddenFunctions;

// Re-export everything from date-fns-tz
export * from 'date-fns-tz';