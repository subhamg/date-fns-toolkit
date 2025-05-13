import {
  formatDistance as fnsFormatDistance,
  formatDistanceToNow as fnsFormatDistanceToNow,
  formatRelative as fnsFormatRelative,
  differenceInCalendarDays as fnsDifferenceInCalendarDays
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { DateInput } from '../types';
import { resolveTimezone } from '../timezone-config';

// Ensure we're working with Date objects
const ensureDate = (date: DateInput): Date => {
  return date instanceof Date ? date : new Date(date);
};

/**
 * Format the distance between two dates with timezone awareness
 * If no timezone is provided, the global default timezone will be used
 */
export const formatDistance = (
  date: DateInput, 
  baseDate: DateInput, 
  options?: Parameters<typeof fnsFormatDistance>[2],
  timezone?: string
): string => {
  const tz = resolveTimezone(timezone);
  return fnsFormatDistance(
    toZonedTime(ensureDate(date), tz),
    toZonedTime(ensureDate(baseDate), tz),
    options
  );
};

/**
 * Format the distance between a date and now with timezone awareness
 * If no timezone is provided, the global default timezone will be used
 */
export const formatDistanceToNow = (
  date: DateInput,
  options?: Parameters<typeof fnsFormatDistanceToNow>[1],
  timezone?: string
): string => {
  const tz = resolveTimezone(timezone);
  return fnsFormatDistanceToNow(
    toZonedTime(ensureDate(date), tz),
    options
  );
};

/**
 * Format a date relative to a base date with timezone awareness
 * If no timezone is provided, the global default timezone will be used
 */
export const formatRelative = (
  date: DateInput,
  baseDate: DateInput,
  options?: Parameters<typeof fnsFormatRelative>[2],
  timezone?: string
): string => {
  const tz = resolveTimezone(timezone);
  return fnsFormatRelative(
    toZonedTime(ensureDate(date), tz),
    toZonedTime(ensureDate(baseDate), tz),
    options
  );
};

/**
 * Get the difference in calendar days between two dates with timezone awareness
 * If no timezone is provided, the global default timezone will be used
 */
export const differenceInCalendarDays = (
  dateLeft: DateInput,
  dateRight: DateInput,
  timezone?: string
): number => {
  const tz = resolveTimezone(timezone);
  return fnsDifferenceInCalendarDays(
    toZonedTime(ensureDate(dateLeft), tz),
    toZonedTime(ensureDate(dateRight), tz)
  );
};

/**
 * Format a date as a time ago string (e.g., "2 hours ago") with timezone awareness
 * If no timezone is provided, the global default timezone will be used
 */
export const timeAgo = (
  date: DateInput,
  timezone?: string
): string => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const zonedNow = toZonedTime(new Date(), tz);
  return fnsFormatDistance(zonedDate, zonedNow, { addSuffix: true });
}; 