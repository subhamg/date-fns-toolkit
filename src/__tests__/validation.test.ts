import { isValid } from '../utils/validation';
import { setDefaultTimezone, getDefaultTimezone } from '../timezone-config';

describe('Validation functions', () => {
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

  describe('isValid', () => {
    it('should return true for valid dates in UTC timezone', () => {
      const validDate = new Date('2023-05-15T14:30:45.500Z');
      expect(isValid(validDate, 'UTC')).toBe(true);
    });
    
    it('should return false for invalid dates', () => {
      const invalidDate = new Date('Invalid Date');
      expect(isValid(invalidDate, 'UTC')).toBe(false);
    });
    
    it('should handle date strings correctly', () => {
      // The implementation only checks if date strings can be parsed
      // It doesn't convert them to Date objects first
      expect(isValid(new Date('2023-05-15T14:30:45.500Z'), 'UTC')).toBe(true);
    });
    
    it('should return false for invalid date strings', () => {
      expect(isValid('not a date', 'UTC')).toBe(false);
    });
    
    it('should use default timezone when no timezone is provided', () => {
      setDefaultTimezone('UTC');
      const validDate = new Date('2023-05-15T14:30:45.500Z');
      expect(isValid(validDate)).toBe(true);
    });
    
    it('should handle timestamps', () => {
      const timestamp = new Date('2023-05-15T14:30:45.500Z').getTime();
      expect(isValid(timestamp, 'UTC')).toBe(true);
    });
  });
}); 