import { isValid as fnsIsValid } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { DateInput } from '../types';
import { resolveTimezone } from '../timezone-config';

/**
 * Check if the date is valid, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isValid = (date: DateInput, timezone?: string): boolean => {
  if (!(date instanceof Date)) {
    return fnsIsValid(date);
  }
  
  const tz = resolveTimezone(timezone);
  try {
    const zonedDate = toZonedTime(date, tz);
    return fnsIsValid(zonedDate);
  } catch (e) {
    return false;
  }
}; 