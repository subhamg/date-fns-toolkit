import { parse as fnsParse, parseISO as fnsParseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { resolveTimezone } from '../timezone-config';

/**
 * Parse a date string in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 * 
 * @param dateString - The string to parse
 * @param formatString - The format string
 * @param referenceDate - The reference date
 * @param timezone - Optional timezone (uses global default if not provided)
 * @returns A Date object
 */
export const parse = (
  dateString: string, 
  formatString: string, 
  referenceDate: Date,
  timezone?: string
): Date => {
  // First parse the string to a date object (in local time)
  const parsedDate = fnsParse(dateString, formatString, referenceDate);
  // Then convert to the target timezone
  return toZonedTime(parsedDate, resolveTimezone(timezone));
};

/**
 * Parse a date string in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const parseInTimeZone = (dateString: string, formatStr: string, timezone?: string): Date => {
  // First parse the string to a date object (in local time)
  const parsedDate = fnsParse(dateString, formatStr, new Date());
  // Then convert to the target timezone
  return toZonedTime(parsedDate, resolveTimezone(timezone));
};

/**
 * Parse an ISO date string in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const parseISO = (dateString: string, timezone?: string): Date => {
  // First parse the ISO string to a date object
  const parsedDate = fnsParseISO(dateString);
  // Then convert to the target timezone
  return toZonedTime(parsedDate, resolveTimezone(timezone));
};