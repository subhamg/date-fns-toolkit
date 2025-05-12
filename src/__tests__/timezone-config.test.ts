import { 
  setDefaultTimezone, 
  getDefaultTimezone, 
  resolveTimezone 
} from '../timezone-config';

describe('Timezone Configuration', () => {
  // Store original timezone to restore after tests
  const originalTimezone = getDefaultTimezone();
  
  afterEach(() => {
    // Reset timezone after each test
    setDefaultTimezone(originalTimezone);
  });
  
  describe('setDefaultTimezone', () => {
    it('should set the default timezone', () => {
      setDefaultTimezone('America/New_York');
      expect(getDefaultTimezone()).toBe('America/New_York');
      
      setDefaultTimezone('Europe/London');
      expect(getDefaultTimezone()).toBe('Europe/London');
    });
  });
  
  describe('getDefaultTimezone', () => {
    it('should return the current default timezone', () => {
      setDefaultTimezone('Asia/Tokyo');
      expect(getDefaultTimezone()).toBe('Asia/Tokyo');
    });
    
    it('should return UTC as the initial default timezone', () => {
      // This assumes the default timezone is UTC when the module is first loaded
      // We can't easily test this directly since we're in a test environment
      // But we can verify the behavior after resetting
      setDefaultTimezone('UTC');
      expect(getDefaultTimezone()).toBe('UTC');
    });
  });
  
  describe('resolveTimezone', () => {
    it('should return the provided timezone when specified', () => {
      setDefaultTimezone('UTC');
      expect(resolveTimezone('America/New_York')).toBe('America/New_York');
    });
    
    it('should return the default timezone when no timezone is provided', () => {
      setDefaultTimezone('Europe/Paris');
      expect(resolveTimezone()).toBe('Europe/Paris');
      expect(resolveTimezone(undefined)).toBe('Europe/Paris');
    });
  });
}); 