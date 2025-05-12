/**
 * Global default timezone configuration
 */

// Default timezone storage
let defaultTimezone: string = 'UTC';

/**
 * Detect the local timezone from the browser
 * @returns The detected timezone or 'UTC' if detection fails
 */
export function detectTimezone(): string {
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      console.warn('Failed to detect timezone:', e);
    }
  }
  return 'UTC';
}

/**
 * Set the global default timezone for all date functions
 * @param timezone - IANA timezone string (e.g., 'America/New_York', 'Europe/London')
 */
export function setDefaultTimezone(timezone: string): void {
  defaultTimezone = timezone;
}

/**
 * Get the currently configured default timezone
 * @returns The current default timezone
 */
export function getDefaultTimezone(): string {
  return defaultTimezone;
}

/**
 * Initialize the default timezone based on the browser's timezone
 * Only works in browser environments
 */
export function initializeTimezone(): void {
  defaultTimezone = detectTimezone();
}

/**
 * Helper to resolve the timezone to use.
 * If a timezone is explicitly provided, use it; otherwise use the default
 * @param timezone - Optional explicitly provided timezone
 * @returns The timezone to use
 */
export function resolveTimezone(timezone?: string): string {
  return timezone || defaultTimezone;
}

// Auto-initialize timezone in browser environments
if (typeof window !== 'undefined') {
  initializeTimezone();
}