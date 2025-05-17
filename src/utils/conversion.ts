import { toZonedTime as tzToZonedTime, fromZonedTime as tzFromZonedTime } from 'date-fns-tz';
import { toDate as fnsToDate } from 'date-fns';
import { DateInput } from '../types';
import { resolveTimezone } from '../timezone-config';

// Ensure we're working with Date objects
const ensureDate = (date: DateInput): Date => {
  return date instanceof Date ? date : new Date(date);
};

/**
 * Convert any date value to a Date object, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const toDate = (date: DateInput, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  return tzToZonedTime(fnsToDate(date), tz);
};

/**
 * Convert a date to the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const toZonedTime = (date: DateInput, timezone?: string): Date => {
  return tzToZonedTime(ensureDate(date), resolveTimezone(timezone));
};

/**
 * Convert a date from the specified timezone to UTC
 * If no timezone is provided, the global default timezone will be used
 */
export const fromZonedTime = (zonedDate: DateInput, timezone?: string): Date => {
  return tzFromZonedTime(ensureDate(zonedDate), resolveTimezone(timezone));
};