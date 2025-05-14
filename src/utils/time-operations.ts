import {
  addMinutes as fnsAddMinutes,
  subWeeks as fnsSubWeeks,
  addWeeks as fnsAddWeeks,
  startOfISOWeek as fnsStartOfISOWeek,
  endOfISOWeek as fnsEndOfISOWeek,
  getUnixTime as fnsGetUnixTime,
  getDaysInMonth as fnsGetDaysInMonth,
  differenceInMilliseconds as fnsDifferenceInMilliseconds,
  differenceInDays as fnsDifferenceInDays,
  differenceInYears as fnsDifferenceInYears,
  differenceInMonths as fnsDifferenceInMonths,
  differenceInWeeks as fnsDifferenceInWeeks,
  differenceInHours as fnsDifferenceInHours,
  differenceInMinutes as fnsDifferenceInMinutes,
  differenceInSeconds as fnsDifferenceInSeconds
} from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { DateInput } from '../types';
import { resolveTimezone } from '../timezone-config';

// Ensure we're working with Date objects
const ensureDate = (date: DateInput): Date => {
  return date instanceof Date ? date : new Date(date);
};

/**
 * Add minutes to a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const addMinutes = (date: DateInput, amount: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsAddMinutes(zonedDate, amount);
  return fromZonedTime(newDate, tz);
};

/**
 * Add weeks to a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const addWeeks = (date: DateInput, amount: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsAddWeeks(zonedDate, amount);
  return fromZonedTime(newDate, tz);
};

/**
 * Subtract weeks from a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const subWeeks = (date: DateInput, amount: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsSubWeeks(zonedDate, amount);
  return fromZonedTime(newDate, tz);
};

/**
 * Get the start of ISO week for a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const startOfISOWeek = (date: DateInput, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const result = fnsStartOfISOWeek(zonedDate);
  return fromZonedTime(result, tz);
};

/**
 * Get the end of ISO week for a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const endOfISOWeek = (date: DateInput, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const result = fnsEndOfISOWeek(zonedDate);
  return fromZonedTime(result, tz);
};

/**
 * Get the Unix timestamp (seconds since Unix epoch) for a date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const getUnixTime = (date: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  return fnsGetUnixTime(zonedDate);
};

/**
 * Get the number of days in the month of the given date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const getDaysInMonth = (date: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  return fnsGetDaysInMonth(zonedDate);
};

/**
 * Get the difference in milliseconds between two dates, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const differenceInMilliseconds = (dateLeft: DateInput, dateRight: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  return fnsDifferenceInMilliseconds(
    toZonedTime(ensureDate(dateLeft), tz),
    toZonedTime(ensureDate(dateRight), tz)
  );
};

/**
 * Get the difference in days between two dates, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const differenceInDays = (dateLeft: DateInput, dateRight: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  return fnsDifferenceInDays(
    toZonedTime(ensureDate(dateLeft), tz),
    toZonedTime(ensureDate(dateRight), tz)
  );
};

/**
 * Get the difference in years between two dates, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const differenceInYears = (dateLeft: DateInput, dateRight: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  return fnsDifferenceInYears(
    toZonedTime(ensureDate(dateLeft), tz),
    toZonedTime(ensureDate(dateRight), tz)
  );
};

/**
 * Get the difference in months between two dates, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const differenceInMonths = (dateLeft: DateInput, dateRight: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  return fnsDifferenceInMonths(
    toZonedTime(ensureDate(dateLeft), tz),
    toZonedTime(ensureDate(dateRight), tz)
  );
};

/**
 * Get the difference in weeks between two dates, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const differenceInWeeks = (dateLeft: DateInput, dateRight: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  return fnsDifferenceInWeeks(
    toZonedTime(ensureDate(dateLeft), tz),
    toZonedTime(ensureDate(dateRight), tz)
  );
};

/**
 * Get the difference in hours between two dates, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const differenceInHours = (dateLeft: DateInput, dateRight: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  return fnsDifferenceInHours(
    toZonedTime(ensureDate(dateLeft), tz),
    toZonedTime(ensureDate(dateRight), tz)
  );
};

/**
 * Get the difference in minutes between two dates, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const differenceInMinutes = (dateLeft: DateInput, dateRight: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  return fnsDifferenceInMinutes(
    toZonedTime(ensureDate(dateLeft), tz),
    toZonedTime(ensureDate(dateRight), tz)
  );
};

/**
 * Get the difference in seconds between two dates, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const differenceInSeconds = (dateLeft: DateInput, dateRight: DateInput, timezone?: string): number => {
  const tz = resolveTimezone(timezone);
  return fnsDifferenceInSeconds(
    toZonedTime(ensureDate(dateLeft), tz),
    toZonedTime(ensureDate(dateRight), tz)
  );
}; 