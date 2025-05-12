import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { TimezoneContextType } from './types';
import { getDefaultTimezone, setDefaultTimezone } from './timezone-config';

/**
 * Context for managing timezone across the application
 */
const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

export interface TimezoneProviderProps {
  /**
   * Child components that will have access to the timezone context
   */
  children: ReactNode;
  
  /**
   * Default timezone to use (IANA timezone format)
   * If not provided, the global default timezone will be used
   */
  defaultTimezone?: string;
  
  /**
   * Whether to sync changes with global default timezone
   * When true, changes to this context's timezone will update the global default
   * @default false
   */
  syncWithGlobal?: boolean;
}

/**
 * Provider component that makes the timezone context available to child components
 */
export const TimezoneProvider: React.FC<TimezoneProviderProps> = ({
  children,
  defaultTimezone,
  syncWithGlobal = false
}) => {
  // Use the provided defaultTimezone or fall back to the global default
  const initialTimezone = defaultTimezone || getDefaultTimezone();
  const [timezone, setTimezoneState] = useState(initialTimezone);
  
  // Custom setter that optionally syncs with global default
  const setTimezone = (newTimezone: string) => {
    setTimezoneState(newTimezone);
    if (syncWithGlobal) {
      setDefaultTimezone(newTimezone);
    }
  };
  
  // Update context if global default changes (when not syncing)
  useEffect(() => {
    if (!syncWithGlobal && !defaultTimezone) {
      setTimezoneState(getDefaultTimezone());
    }
  }, [syncWithGlobal, defaultTimezone]);

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
};

/**
 * Hook to access the timezone context from a component
 * @returns Timezone context object with current timezone and setter function
 * @throws Error if used outside of a TimezoneProvider
 */
export const useTimezoneContext = (): TimezoneContextType => {
  const context = useContext(TimezoneContext);
  if (context === undefined) {
    throw new Error('useTimezoneContext must be used within a TimezoneProvider');
  }
  return context;
};