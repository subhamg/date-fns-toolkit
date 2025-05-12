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

// Re-export everything except the overridden functions
Object.entries(dateFns).forEach(([key, value]) => {
  if (!overriddenFunctions.includes(key)) {
    exports[key] = value;
  }
});

// Re-export everything from date-fns-tz
export * from 'date-fns-tz';