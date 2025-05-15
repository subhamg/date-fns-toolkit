import { useMemo } from "react";
import * as utils from "./utils";
import type { DateInput } from "./types";
import { resolveTimezone } from "./timezone-config";

/**
 * React hook for timezone-aware date operations.
 * Returns functions that automatically use the provided timezone.
 *
 * @param timezone - IANA timezone string (e.g., 'America/New_York')
 *                   If not provided, the global default timezone will be used
 */
export function useDateTimezone(timezone?: string) {
  return useMemo(() => {
    const tz = resolveTimezone(timezone);

    return {
      // Format functions
      format: (
        date: DateInput,
        formatStr: string,
        options?: Parameters<typeof utils.format>[3]
      ) => utils.format(date, formatStr, tz, options),

      formatDateShort: (date: DateInput) => utils.formatDateShort(date, tz),

      formatDateLong: (date: DateInput) => utils.formatDateLong(date, tz),

      formatDateTime: (date: DateInput) => utils.formatDateTime(date, tz),

      formatTime: (date: DateInput) => utils.formatTime(date, tz),

      formatISO: (
        date: DateInput,
        options?: Parameters<typeof utils.formatISO>[1]
      ) => utils.formatISO(date, options, tz),

      // Conversion functions
      toZonedTime: (date: DateInput) => utils.toZonedTime(date, tz),

      fromZonedTime: (zonedDate: DateInput) =>
        utils.fromZonedTime(zonedDate, tz),

      // Parsing functions
      parseInTimeZone: (dateString: string, formatStr: string) =>
        utils.parseInTimeZone(dateString, formatStr, tz),

      parseISO: (dateString: string) => utils.parseISO(dateString, tz),

      parse: (dateString: string, formatString: string, referenceDate: Date) =>
        utils.parse(dateString, formatString, referenceDate, tz),

      // Validation functions
      isValid: (date: DateInput) => utils.isValid(date, tz),

      // Date operations
      addDays: (date: DateInput, amount: number) =>
        utils.addDays(date, amount, tz),

      subDays: (date: DateInput, amount: number) =>
        utils.subDays(date, amount, tz),

      addMonths: (date: DateInput, amount: number) =>
        utils.addMonths(date, amount, tz),

      subMonths: (date: DateInput, amount: number) =>
        utils.subMonths(date, amount, tz),

      addYears: (date: DateInput, amount: number) =>
        utils.addYears(date, amount, tz),

      subYears: (date: DateInput, amount: number) =>
        utils.subYears(date, amount, tz),

      addMinutes: (date: DateInput, amount: number) =>
        utils.addMinutes(date, amount, tz),

      addWeeks: (date: DateInput, amount: number) =>
        utils.addWeeks(date, amount, tz),

      subWeeks: (date: DateInput, amount: number) =>
        utils.subWeeks(date, amount, tz),

      getDaysInMonth: (date: DateInput) => utils.getDaysInMonth(date, tz),

      getUnixTime: (date: DateInput) => utils.getUnixTime(date, tz),

      // Setters
      setMinutes: (date: DateInput, minutes: number) =>
        utils.setMinutes(date, minutes, tz),

      setHours: (date: DateInput, hours: number) =>
        utils.setHours(date, hours, tz),

      setSeconds: (date: DateInput, seconds: number) =>
        utils.setSeconds(date, seconds, tz),

      setMilliseconds: (date: DateInput, milliseconds: number) =>
        utils.setMilliseconds(date, milliseconds, tz),

      setDate: (date: DateInput, dayOfMonth: number) =>
        utils.setDate(date, dayOfMonth, tz),

      setMonth: (date: DateInput, month: number) =>
        utils.setMonth(date, month, tz),

      setYear: (date: DateInput, year: number) => utils.setYear(date, year, tz),

      startOfDay: (date: DateInput) => utils.startOfDay(date, tz),

      endOfDay: (date: DateInput) => utils.endOfDay(date, tz),

      // Comparison functions
      isBefore: (date1: DateInput, date2: DateInput) =>
        utils.isBefore(date1, date2, tz),

      isAfter: (date1: DateInput, date2: DateInput) =>
        utils.isAfter(date1, date2, tz),

      isSameDay: (date1: DateInput, date2: DateInput) =>
        utils.isSameDay(date1, date2, tz),

      isEqual: (date1: DateInput, date2: DateInput) =>
        utils.isEqual(date1, date2, tz),

      isWithinInterval: (
        date: DateInput,
        interval: { start: DateInput; end: DateInput }
      ) => utils.isWithinInterval(date, interval, tz),

      isSameOrAfter: (date1: DateInput, date2: DateInput) =>
        utils.isSameOrAfter(date1, date2, tz),

      isSameOrBefore: (date1: DateInput, date2: DateInput) =>
        utils.isSameOrBefore(date1, date2, tz),

      isSameMonth: (date1: DateInput, date2: DateInput) =>
        utils.isSameMonth(date1, date2, tz),

      isSameYear: (date1: DateInput, date2: DateInput) =>
        utils.isSameYear(date1, date2, tz),

      isSameWeek: (date1: DateInput, date2: DateInput) =>
        utils.isSameWeek(date1, date2, tz),

      // Range functions
      startOfWeek: (
        date: DateInput,
        options?: Parameters<typeof utils.startOfWeek>[1]
      ) => utils.startOfWeek(date, options, tz),

      endOfWeek: (
        date: DateInput,
        options?: Parameters<typeof utils.endOfWeek>[1]
      ) => utils.endOfWeek(date, options, tz),

      startOfMonth: (date: DateInput) => utils.startOfMonth(date, tz),

      endOfMonth: (date: DateInput) => utils.endOfMonth(date, tz),

      startOfYear: (date: DateInput) => utils.startOfYear(date, tz),

      endOfYear: (date: DateInput) => utils.endOfYear(date, tz),

      eachDayOfInterval: (interval: { start: DateInput; end: DateInput }) =>
        utils.eachDayOfInterval(interval, tz),

      getDateRange: (
        date: DateInput,
        rangeType: "day" | "week" | "month" | "year"
      ) => utils.getDateRange(date, rangeType, tz),

      startOfISOWeek: (date: DateInput) => utils.startOfISOWeek(date, tz),

      endOfISOWeek: (date: DateInput) => utils.endOfISOWeek(date, tz),

      // Relative time functions
      formatDistance: (
        date: DateInput,
        baseDate: DateInput,
        options?: Parameters<typeof utils.formatDistance>[2]
      ) => utils.formatDistance(date, baseDate, options, tz),

      formatDistanceToNow: (
        date: DateInput,
        options?: Parameters<typeof utils.formatDistanceToNow>[1]
      ) => utils.formatDistanceToNow(date, options, tz),

      formatRelative: (
        date: DateInput,
        baseDate: DateInput,
        options?: Parameters<typeof utils.formatRelative>[2]
      ) => utils.formatRelative(date, baseDate, options, tz),

      differenceInCalendarDays: (dateLeft: DateInput, dateRight: DateInput) =>
        utils.differenceInCalendarDays(dateLeft, dateRight, tz),

      timeAgo: (date: DateInput) => utils.timeAgo(date, tz),

      // New difference functions
      differenceInMilliseconds: (dateLeft: DateInput, dateRight: DateInput) =>
        utils.differenceInMilliseconds(dateLeft, dateRight, tz),

      differenceInDays: (dateLeft: DateInput, dateRight: DateInput) =>
        utils.differenceInDays(dateLeft, dateRight, tz),

      differenceInYears: (dateLeft: DateInput, dateRight: DateInput) =>
        utils.differenceInYears(dateLeft, dateRight, tz),

      differenceInMonths: (dateLeft: DateInput, dateRight: DateInput) =>
        utils.differenceInMonths(dateLeft, dateRight, tz),

      differenceInWeeks: (dateLeft: DateInput, dateRight: DateInput) =>
        utils.differenceInWeeks(dateLeft, dateRight, tz),

      differenceInHours: (dateLeft: DateInput, dateRight: DateInput) =>
        utils.differenceInHours(dateLeft, dateRight, tz),

      differenceInMinutes: (dateLeft: DateInput, dateRight: DateInput) =>
        utils.differenceInMinutes(dateLeft, dateRight, tz),

      differenceInSeconds: (dateLeft: DateInput, dateRight: DateInput) =>
        utils.differenceInSeconds(dateLeft, dateRight, tz),

      // Timezone info
      getTimezone: () => tz,
    };
  }, [timezone]);
}
