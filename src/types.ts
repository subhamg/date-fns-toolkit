/**
 * Common types used throughout the date-fns-toolkit
 */

/**
 * Acceptable date input types for utility functions
 * Uses generics to support libraries that extend the Date object
 */
export type DateInput<D = Date> = D | number | string;

/**
 * Type for the timezone context object
 */
export interface TimezoneContextType {
  /**
   * Current timezone in IANA format (e.g. 'America/New_York')
   */
  timezone: string;
  
  /**
   * Function to update the current timezone
   */
  setTimezone: (timezone: string) => void;
} 