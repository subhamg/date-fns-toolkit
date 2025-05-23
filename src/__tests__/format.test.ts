import { format, formatDateShort, formatDateLong } from '../utils/format';

describe('Format utilities', () => {
  // Use an ISO string with UTC time to ensure consistency across environments
  const isoDate = '2023-05-15T14:30:00.000Z'; // This is exactly 14:30:00 UTC
  const testDate = new Date(isoDate);
  const timezone = 'UTC';

  describe('format', () => {
    it('should format a date with custom format string', () => {
      const result = format(testDate, 'yyyy-MM-dd HH:mm:ss', timezone);
      expect(result).toBe('2023-05-15 14:30:00');
    });

    it('should handle different format patterns', () => {
      expect(format(testDate, 'MMMM d, yyyy', timezone)).toBe('May 15, 2023');
      expect(format(testDate, 'h:mm a', timezone)).toBe('2:30 PM');
    });
  });

  describe('formatDateShort', () => {
    it('should format a date in short format', () => {
      const result = formatDateShort(testDate, timezone);
      expect(result).toBe('05/15/2023');
    });
  });

  describe('formatDateLong', () => {
    it('should format a date in long format', () => {
      const result = formatDateLong(testDate, timezone);
      expect(result).toBe('May 15, 2023');
    });
  });
}); 