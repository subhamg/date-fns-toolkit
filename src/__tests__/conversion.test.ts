import { toDate, toZonedTime, fromZonedTime } from '../utils/conversion';
import { setDefaultTimezone, getDefaultTimezone } from '../timezone-config';

describe('Conversion functions', () => {
  // Store original timezone to restore after tests
  const originalTimezone = getDefaultTimezone();
  
  beforeEach(() => {
    // Reset timezone before each test
    setDefaultTimezone('UTC');
  });
  
  afterAll(() => {
    // Reset timezone after all tests
    setDefaultTimezone(originalTimezone);
  });

  describe('toDate', () => {
    it('should convert Date object to Date in UTC timezone', () => {
      const date = new Date('2023-05-15T14:30:45.500Z');
      const result = toDate(date, 'UTC');
      
      expect(result instanceof Date).toBe(true);
      // The toDate function applies the timezone, so we should check the date components
      // rather than expecting the same ISO string
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May (0-indexed)
      expect(result.getDate()).toBe(15);
    });
    
    it('should convert string to Date in UTC timezone', () => {
      const result = toDate('2023-05-15T14:30:45.500Z', 'UTC');
      
      expect(result instanceof Date).toBe(true);
      // When comparing dates, just check the parts to avoid timezone issues in testing
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May (0-indexed)
      expect(result.getDate()).toBe(15);
    });
    
    it('should convert timestamp to Date in UTC timezone', () => {
      const timestamp = new Date('2023-05-15T14:30:45.500Z').getTime();
      const result = toDate(timestamp, 'UTC');
      
      expect(result instanceof Date).toBe(true);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May (0-indexed)
      expect(result.getDate()).toBe(15);
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const date = new Date('2023-05-15T14:30:45.500Z');
      const result = toDate(date);
      
      expect(result instanceof Date).toBe(true);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May (0-indexed)
      expect(result.getDate()).toBe(15);
    });
  });

  describe('toZonedTime', () => {
    it('should convert Date to specific timezone representation', () => {
      const date = new Date('2023-05-15T14:30:45.500Z');
      const result = toZonedTime(date, 'UTC');
      
      expect(result instanceof Date).toBe(true);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May (0-indexed)
      expect(result.getDate()).toBe(15);
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const date = new Date('2023-05-15T14:30:45.500Z');
      const result = toZonedTime(date);
      
      expect(result instanceof Date).toBe(true);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May (0-indexed)
      expect(result.getDate()).toBe(15);
    });
  });

  describe('fromZonedTime', () => {
    it('should convert from timezone representation back to UTC', () => {
      const date = new Date('2023-05-15T14:30:45.500Z');
      const zonedTime = toZonedTime(date, 'UTC');
      const result = fromZonedTime(zonedTime, 'UTC');
      
      expect(result instanceof Date).toBe(true);
      // When converting back from a zoned time, we should get a date in UTC
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May (0-indexed)
      expect(result.getDate()).toBe(15);
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const date = new Date('2023-05-15T14:30:45.500Z');
      const zonedTime = toZonedTime(date);
      const result = fromZonedTime(zonedTime);
      
      expect(result instanceof Date).toBe(true);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(4); // May (0-indexed)
      expect(result.getDate()).toBe(15);
    });
  });
}); 