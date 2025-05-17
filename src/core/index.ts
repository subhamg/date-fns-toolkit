/**
 * Re-exports of date-fns and date-fns-tz core functionality
 * This allows users to import all date functions from a single package
 */

// Import everything from date-fns
import * as dateFns from 'date-fns';
import * as dateFnsTz from 'date-fns-tz';

// Functions that we already provide timezone-aware versions for
const overriddenFunctions = [
  'addDays', 'subDays', 'addMonths', 'subMonths', 'addYears', 'subYears',
  'startOfDay', 'endOfDay', 'isBefore', 'isAfter', 'isSameDay', 'format',
  'startOfWeek', 'endOfWeek', 'startOfMonth', 'endOfMonth', 
  'startOfYear', 'endOfYear', 'formatDistance', 'formatDistanceToNow',
  'formatRelative', 'differenceInCalendarDays', 'isEqual', 'isWithinInterval',
  'formatISO', 'parseISO', 'isSameOrAfter', 'isSameOrBefore',
  'isSameYear', 'isSameMonth', 'isSameWeek',
  // New functions
  'setMinutes', 'setHours', 'setSeconds', 'setMilliseconds', 'setDate', 'setMonth', 'setYear',
  'addMinutes', 'subWeeks', 'addWeeks', 'startOfISOWeek', 'endOfISOWeek',
  'getUnixTime', 'getDaysInMonth', 'differenceInMilliseconds', 'differenceInDays',
  'differenceInYears', 'differenceInMonths', 'differenceInWeeks', 'differenceInHours',
  'differenceInMinutes', 'differenceInSeconds', 'parse', 'isValid', 'toDate'
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
  // Export all other date-fns functions
  ...rest
} = nonOverriddenFunctions;

// Re-export everything from date-fns-tz except what we override
export const {
  // Export all date-fns-tz functions that we don't override
  ...tzFunctions
} = dateFnsTz;