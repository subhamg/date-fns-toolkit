import {
  setMinutes,
  setHours,
  setSeconds,
  setMilliseconds,
  setDate,
  setMonth,
  setYear
} from '../utils/setters';
import { setDefaultTimezone, getDefaultTimezone } from '../timezone-config';

describe('Setter functions', () => {
  // Store original timezone to restore after tests
  const originalTimezone = getDefaultTimezone();
  
  // Use an ISO string with UTC time to ensure consistency across environments
  const isoDate = '2023-05-15T14:30:45.500Z'; // This is exactly 14:30:45.500 UTC
  const testDate = new Date(isoDate);
  
  beforeEach(() => {
    // Reset timezone before each test
    setDefaultTimezone('UTC');
  });
  
  afterAll(() => {
    // Reset timezone after all tests
    setDefaultTimezone(originalTimezone);
  });

  describe('setMinutes', () => {
    it('should set minutes in UTC timezone', () => {
      const result = setMinutes(testDate, 15, 'UTC');
      expect(result.getUTCMinutes()).toBe(15);
      expect(result.getUTCHours()).toBe(14); // Other parts should remain unchanged
      expect(result.getUTCDate()).toBe(15);
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const result = setMinutes(testDate, 20);
      expect(result.getUTCMinutes()).toBe(20);
    });
  });

  describe('setHours', () => {
    it('should set hours in UTC timezone', () => {
      const result = setHours(testDate, 10, 'UTC');
      expect(result.getUTCHours()).toBe(10);
      expect(result.getUTCMinutes()).toBe(30); // Other parts should remain unchanged
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const result = setHours(testDate, 8);
      expect(result.getUTCHours()).toBe(8);
    });
  });

  describe('setSeconds', () => {
    it('should set seconds in UTC timezone', () => {
      const result = setSeconds(testDate, 30, 'UTC');
      expect(result.getUTCSeconds()).toBe(30);
      expect(result.getUTCMinutes()).toBe(30); // Other parts should remain unchanged
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const result = setSeconds(testDate, 15);
      expect(result.getUTCSeconds()).toBe(15);
    });
  });

  describe('setMilliseconds', () => {
    it('should set milliseconds in UTC timezone', () => {
      const result = setMilliseconds(testDate, 250, 'UTC');
      expect(result.getUTCMilliseconds()).toBe(250);
      expect(result.getUTCSeconds()).toBe(45); // Other parts should remain unchanged
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const result = setMilliseconds(testDate, 100);
      expect(result.getUTCMilliseconds()).toBe(100);
    });
  });

  describe('setDate', () => {
    it('should set date in UTC timezone', () => {
      const result = setDate(testDate, 20, 'UTC');
      expect(result.getUTCDate()).toBe(20);
      expect(result.getUTCMonth()).toBe(4); // May (0-indexed)
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const result = setDate(testDate, 25);
      expect(result.getUTCDate()).toBe(25);
    });
  });

  describe('setMonth', () => {
    it('should set month in UTC timezone', () => {
      const result = setMonth(testDate, 6, 'UTC'); // July (0-indexed)
      expect(result.getUTCMonth()).toBe(6);
      expect(result.getUTCDate()).toBe(15); // Other parts should remain unchanged
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const result = setMonth(testDate, 11); // December (0-indexed)
      expect(result.getUTCMonth()).toBe(11);
    });
  });

  describe('setYear', () => {
    it('should set year in UTC timezone', () => {
      const result = setYear(testDate, 2025, 'UTC');
      expect(result.getUTCFullYear()).toBe(2025);
      expect(result.getUTCMonth()).toBe(4); // May (0-indexed)
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const result = setYear(testDate, 2030);
      expect(result.getUTCFullYear()).toBe(2030);
    });
  });
}); 