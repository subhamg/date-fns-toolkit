import {
  setMinutes as fnsSetMinutes,
  setHours as fnsSetHours,
  setSeconds as fnsSetSeconds,
  setMilliseconds as fnsSetMilliseconds,
  setDate as fnsSetDate,
  setMonth as fnsSetMonth,
  setYear as fnsSetYear
} from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { DateInput } from '../types';
import { resolveTimezone } from '../timezone-config';

// Ensure we're working with Date objects
const ensureDate = (date: DateInput): Date => {
  return date instanceof Date ? date : new Date(date);
};

/**
 * Set minutes to date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const setMinutes = (date: DateInput, minutes: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsSetMinutes(zonedDate, minutes);
  return fromZonedTime(newDate, tz);
};

/**
 * Set hours to date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const setHours = (date: DateInput, hours: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsSetHours(zonedDate, hours);
  return fromZonedTime(newDate, tz);
};

/**
 * Set seconds to date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const setSeconds = (date: DateInput, seconds: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsSetSeconds(zonedDate, seconds);
  return fromZonedTime(newDate, tz);
};

/**
 * Set milliseconds to date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const setMilliseconds = (date: DateInput, milliseconds: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsSetMilliseconds(zonedDate, milliseconds);
  return fromZonedTime(newDate, tz);
};

/**
 * Set day of month to date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const setDate = (date: DateInput, dayOfMonth: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsSetDate(zonedDate, dayOfMonth);
  return fromZonedTime(newDate, tz);
};

/**
 * Set month to date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const setMonth = (date: DateInput, month: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsSetMonth(zonedDate, month);
  return fromZonedTime(newDate, tz);
};

/**
 * Set year to date, respecting the timezone
 * If no timezone is provided, the global default timezone will be used
 */
export const setYear = (date: DateInput, year: number, timezone?: string): Date => {
  const tz = resolveTimezone(timezone);
  const zonedDate = toZonedTime(ensureDate(date), tz);
  const newDate = fnsSetYear(zonedDate, year);
  return fromZonedTime(newDate, tz);
}; 