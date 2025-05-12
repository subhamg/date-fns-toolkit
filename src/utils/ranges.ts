import {
  startOfWeek as fnsStartOfWeek,
  endOfWeek as fnsEndOfWeek,
  startOfMonth as fnsStartOfMonth,
  endOfMonth as fnsEndOfMonth,
  startOfYear as fnsStartOfYear,
  endOfYear as fnsEndOfYear,
  eachDayOfInterval as fnsEachDayOfInterval,
  startOfDay as fnsStartOfDay,
  endOfDay as fnsEndOfDay
} from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { DateInput } from '../types';
import { resolveTimezone } from '../timezone-config';

// Ensure we're working with Date objects
const ensureDate = (date: DateInput): Date => {
  return date instanceof Date ? date : new Date(date);
};

/**
 * Get the start of week for a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const startOfWeek = (date: DateInput, options?: Parameters<typeof fnsStartOfWeek>[1], timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const result = fnsStartOfWeek(zonedDate, options);
  return fromZonedTime(result, tz);
};

/**
 * Get the end of week for a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const endOfWeek = (date: DateInput, options?: Parameters<typeof fnsEndOfWeek>[1], timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const result = fnsEndOfWeek(zonedDate, options);
  return fromZonedTime(result, tz);
};

/**
 * Get the start of month for a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const startOfMonth = (date: DateInput, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const result = fnsStartOfMonth(zonedDate);
  return fromZonedTime(result, tz);
};

/**
 * Get the end of month for a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const endOfMonth = (date: DateInput, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const result = fnsEndOfMonth(zonedDate);
  return fromZonedTime(result, tz);
};

/**
 * Get the start of year for a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const startOfYear = (date: DateInput, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const result = fnsStartOfYear(zonedDate);
  return fromZonedTime(result, tz);
};

/**
 * Get the end of year for a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const endOfYear = (date: DateInput, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const result = fnsEndOfYear(zonedDate);
  return fromZonedTime(result, tz);
};

/**
 * Get an array of dates for each day in the given interval, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const eachDayOfInterval = (
  interval: { start: DateInput; end: DateInput },
  timezone?: string
): Date[] => {
  const tz = resolveTimezone(timezone);
  const zonedStart = toZonedTime(ensureDate(interval.start), tz);
  const zonedEnd = toZonedTime(ensureDate(interval.end), tz);
  
  const result = fnsEachDayOfInterval({ start: zonedStart, end: zonedEnd });
  
  // Convert each result date back to UTC
  return result.map(date => fromZonedTime(date, tz));
};

/**
 * Get a date range for a given time period
 * If no timezone is provided, the global default timezone will be used
 */
export const getDateRange = (
  date: DateInput,
  rangeType: 'day' | 'week' | 'month' | 'year',
  timezone?: string
): { start: Date; end: Date } => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  
  let start: Date;
  let end: Date;
  
  switch (rangeType) {
    case 'day':
      start = fnsStartOfDay(zonedDate);
      end = fnsEndOfDay(zonedDate);
      break;
    case 'week':
      start = fnsStartOfWeek(zonedDate);
      end = fnsEndOfWeek(zonedDate);
      break;
    case 'month':
      start = fnsStartOfMonth(zonedDate);
      end = fnsEndOfMonth(zonedDate);
      break;
    case 'year':
      start = fnsStartOfYear(zonedDate);
      end = fnsEndOfYear(zonedDate);
      break;
    default:
      throw new Error(`Invalid range type: ${rangeType}`);
  }
  
  return {
    start: fromZonedTime(start, tz),
    end: fromZonedTime(end, tz)
  };
}; 