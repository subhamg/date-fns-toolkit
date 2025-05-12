import { parse } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { resolveTimezone } from '../timezone-config';

/**
 * Parse a date string in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const parseInTimeZone = (dateString: string, formatStr: string, timezone?: string): Date => {
  // First parse the string to a date object (in local time)
  const parsedDate = parse(dateString, formatStr, new Date());
  // Then convert to the target timezone
  return toZonedTime(parsedDate, resolveTimezone(timezone));
};