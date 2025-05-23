import { formatInTimeZone } from 'date-fns-tz';
import { formatISO as fnsFormatISO } from 'date-fns';
import type { Locale } from 'date-fns';
import { DateInput } from '../types';
import { resolveTimezone } from '../timezone-config';
import { toZonedTime } from 'date-fns-tz';

// Ensure we're working with Date objects
const ensureDate = (date: DateInput): Date => {
  return date instanceof Date ? date : new Date(date);
};

/**
 * Format a date with a custom format string in specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const format = (
  date: DateInput, 
  formatStr: string, 
  timezone?: string, 
  options?: { locale?: Locale }
): string => {
  return formatInTimeZone(ensureDate(date), resolveTimezone(timezone), formatStr, options);
};

/**
 * Format a date in ISO 8601 format, respecting the specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const formatISO = (
  date: DateInput, 
  options?: Parameters<typeof fnsFormatISO>[1],
  timezone?: string
): string => {
  const tz = resolveTimezone(timezone);
  return fnsFormatISO(toZonedTime(ensureDate(date), tz), options);
};

/**
 * Format a date as MM/dd/yyyy in specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const formatDateShort = (date: DateInput, timezone?: string): string => {
  return formatInTimeZone(ensureDate(date), resolveTimezone(timezone), 'MM/dd/yyyy');
};

/**
 * Format a date as Month d, yyyy in specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const formatDateLong = (date: DateInput, timezone?: string): string => {
  return formatInTimeZone(ensureDate(date), resolveTimezone(timezone), 'MMMM d, yyyy');
};

/**
 * Format a date and time as MM/dd/yyyy HH:mm:ss in specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const formatDateTime = (date: DateInput, timezone?: string): string => {
  return formatInTimeZone(ensureDate(date), resolveTimezone(timezone), 'MM/dd/yyyy HH:mm:ss');
};

/**
 * Format time as HH:mm:ss in specified timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const formatTime = (date: DateInput, timezone?: string): string => {
  return formatInTimeZone(ensureDate(date), resolveTimezone(timezone), 'HH:mm:ss');
};