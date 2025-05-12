import {
    addDays as fnsAddDays,
    subDays as fnsSubDays,
    addMonths as fnsAddMonths,
    subMonths as fnsSubMonths,
    addYears as fnsAddYears,
    subYears as fnsSubYears,
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
   * Add days to a date, respecting the timezone
   * If no timezone is provided, the global default timezone will be used
   */
  export const addDays = (date: DateInput, amount: number, timezone?: string): Date => {
    const tz = resolveTimezone(timezone);
    const zonedDate = toZonedTime(ensureDate(date), tz);
    const newDate = fnsAddDays(zonedDate, amount);
    return fromZonedTime(newDate, tz);
  };
  
  /**
   * Subtract days from a date, respecting the timezone
   * If no timezone is provided, the global default timezone will be used
   */
  export const subDays = (date: DateInput, amount: number, timezone?: string): Date => {
    const tz = resolveTimezone(timezone);
    const zonedDate = toZonedTime(ensureDate(date), tz);
    const newDate = fnsSubDays(zonedDate, amount);
    return fromZonedTime(newDate, tz);
  };
  
  /**
   * Add months to a date, respecting the timezone
   * If no timezone is provided, the global default timezone will be used
   */
  export const addMonths = (date: DateInput, amount: number, timezone?: string): Date => {
    const tz = resolveTimezone(timezone);
    const zonedDate = toZonedTime(ensureDate(date), tz);
    const newDate = fnsAddMonths(zonedDate, amount);
    return fromZonedTime(newDate, tz);
  };
  
  /**
   * Subtract months from a date, respecting the timezone
   * If no timezone is provided, the global default timezone will be used
   */
  export const subMonths = (date: DateInput, amount: number, timezone?: string): Date => {
    const tz = resolveTimezone(timezone);
    const zonedDate = toZonedTime(ensureDate(date), tz);
    const newDate = fnsSubMonths(zonedDate, amount);
    return fromZonedTime(newDate, tz);
  };
  
  /**
   * Add years to a date, respecting the timezone
   * If no timezone is provided, the global default timezone will be used
   */
  export const addYears = (date: DateInput, amount: number, timezone?: string): Date => {
    const tz = resolveTimezone(timezone);
    const zonedDate = toZonedTime(ensureDate(date), tz);
    const newDate = fnsAddYears(zonedDate, amount);
    return fromZonedTime(newDate, tz);
  };
  
  /**
   * Subtract years from a date, respecting the timezone
   * If no timezone is provided, the global default timezone will be used
   */
  export const subYears = (date: DateInput, amount: number, timezone?: string): Date => {
    const tz = resolveTimezone(timezone);
    const zonedDate = toZonedTime(ensureDate(date), tz);
    const newDate = fnsSubYears(zonedDate, amount);
    return fromZonedTime(newDate, tz);
  };
  
  /**
   * Get the start of day for a date, respecting the timezone
   * If no timezone is provided, the global default timezone will be used
   */
  export const startOfDay = (date: DateInput, timezone?: string): Date => {
    const tz = resolveTimezone(timezone);
    const zonedDate = toZonedTime(ensureDate(date), tz);
    const result = fnsStartOfDay(zonedDate);
    return fromZonedTime(result, tz);
  };
  
  /**
   * Get the end of day for a date, respecting the timezone
   * If no timezone is provided, the global default timezone will be used
   */
  export const endOfDay = (date: DateInput, timezone?: string): Date => {
    const tz = resolveTimezone(timezone);
    const zonedDate = toZonedTime(ensureDate(date), tz);
    const result = fnsEndOfDay(zonedDate);
    return fromZonedTime(result, tz);
  };