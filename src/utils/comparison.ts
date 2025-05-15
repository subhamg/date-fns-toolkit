import {
  isBefore as fnsIsBefore,
  isAfter as fnsIsAfter,
  isSameDay as fnsIsSameDay,
  isEqual as fnsIsEqual,
  isWithinInterval as fnsIsWithinInterval,
  isSameMonth as fnsIsSameMonth,
  isSameYear as fnsIsSameYear,
  isSameWeek as fnsIsSameWeek,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { DateInput } from "../types";
import { resolveTimezone } from "../timezone-config";

// Ensure we're working with Date objects
const ensureDate = (date: DateInput): Date => {
  return date instanceof Date ? date : new Date(date);
};

/**
 * Check if the first date is before the second date, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isBefore = (
  date1: DateInput,
  date2: DateInput,
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  return fnsIsBefore(
    toZonedTime(ensureDate(date1), tz),
    toZonedTime(ensureDate(date2), tz)
  );
};

/**
 * Check if the first date is after the second date, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isAfter = (
  date1: DateInput,
  date2: DateInput,
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  return fnsIsAfter(
    toZonedTime(ensureDate(date1), tz),
    toZonedTime(ensureDate(date2), tz)
  );
};

/**
 * Check if two dates are the same day, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isSameDay = (
  date1: DateInput,
  date2: DateInput,
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  return fnsIsSameDay(
    toZonedTime(ensureDate(date1), tz),
    toZonedTime(ensureDate(date2), tz)
  );
};

/**
 * Check if two dates are equal, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isEqual = (
  date1: DateInput,
  date2: DateInput,
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  return fnsIsEqual(
    toZonedTime(ensureDate(date1), tz),
    toZonedTime(ensureDate(date2), tz)
  );
};

/**
 * Check if the date is within the interval, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isWithinInterval = (
  date: DateInput,
  interval: { start: DateInput; end: DateInput },
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  return fnsIsWithinInterval(toZonedTime(ensureDate(date), tz), {
    start: toZonedTime(ensureDate(interval.start), tz),
    end: toZonedTime(ensureDate(interval.end), tz),
  });
};

/**
 * Check if the first date is the same as or after the second date, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isSameOrAfter = (
  date1: DateInput,
  date2: DateInput,
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  const zonedDate1 = toZonedTime(ensureDate(date1), tz);
  const zonedDate2 = toZonedTime(ensureDate(date2), tz);

  return (
    fnsIsEqual(zonedDate1, zonedDate2) || fnsIsAfter(zonedDate1, zonedDate2)
  );
};

/**
 * Check if the first date is the same as or before the second date, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isSameOrBefore = (
  date1: DateInput,
  date2: DateInput,
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  const zonedDate1 = toZonedTime(ensureDate(date1), tz);
  const zonedDate2 = toZonedTime(ensureDate(date2), tz);

  return (
    fnsIsEqual(zonedDate1, zonedDate2) || fnsIsBefore(zonedDate1, zonedDate2)
  );
};

/**
 * Check if two dates are in the same month, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isSameMonth = (
  date1: DateInput,
  date2: DateInput,
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  return fnsIsSameMonth(
    toZonedTime(ensureDate(date1), tz),
    toZonedTime(ensureDate(date2), tz)
  );
};

/**
 * Check if two dates are in the same year, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isSameYear = (
  date1: DateInput,
  date2: DateInput,
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  return fnsIsSameYear(
    toZonedTime(ensureDate(date1), tz),
    toZonedTime(ensureDate(date2), tz)
  );
};

/**
 * Check if two dates are in the same week, in the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const isSameWeek = (
  date1: DateInput,
  date2: DateInput,
  timezone?: string
): boolean => {
  const tz = resolveTimezone(timezone);
  return fnsIsSameWeek(
    toZonedTime(ensureDate(date1), tz),
    toZonedTime(ensureDate(date2), tz)
  );
};
