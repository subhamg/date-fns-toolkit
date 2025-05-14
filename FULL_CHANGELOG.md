# date-fns-toolkit - Complete Changelog

This document provides a detailed history of all changes made to the date-fns-toolkit package.

## Version 1.1.0 (2025-05-14)

### Added
- Added timezone-aware versions of all date-fns functions
- Added `isEqual` function with timezone awareness
- Added `isWithinInterval` function with timezone awareness
- Added `formatISO` function with timezone awareness
- Added `parseISO` function with timezone awareness
- Added `isSameOrAfter` function with timezone awareness
- Added `isSameOrBefore` function with timezone awareness
- Added setter functions: `setMinutes`, `setHours`, `setSeconds`, `setMilliseconds`, `setDate`, `setMonth`, `setYear`
- Added time operations: `addMinutes`, `subWeeks`, `addWeeks`, `startOfISOWeek`, `endOfISOWeek`, `getUnixTime`, `getDaysInMonth`
- Added difference functions: `differenceInMilliseconds`, `differenceInDays`, `differenceInYears`, `differenceInMonths`, `differenceInWeeks`, `differenceInHours`, `differenceInMinutes`, `differenceInSeconds`
- Added validation functions: `isValid`
- Fixed `parse` function to be timezone-aware
- Updated core/index.ts to properly re-export all date-fns and date-fns-tz functions
- All date-fns functions now use the global timezone by default
- Added comprehensive example in examples/timezone-aware-functions.js

### Fixed
- Fixed issue where some date-fns functions were using system timezone instead of global timezone
- Fixed naming conflicts between date-fns and date-fns-tz exports

## Version 1.0.9 (2025-05-14)

### Added
- Created dedicated Next.js example file (examples/nextjs-example.jsx) showing best practices for using the library in Next.js applications
- Enhanced documentation with clearer Next.js integration instructions
- Added "Latest Version" section to README.md for better version tracking
- Added specific import recommendations for different JavaScript environments

### Fixed
- Updated documentation to reference the latest version throughout all files
- Improved compatibility with various JavaScript environments
- Fixed remaining ESM/CommonJS interoperability issues
- Enhanced error handling for timezone detection in browser environments

### Changed
- Optimized package size by improving the bundling process
- Updated all documentation references to use version 1.0.9

### Developer Experience
- Improved release process documentation
- Enhanced test coverage for core functionality

## Version 1.0.8 (2025-05-14)

### Fixed
- Fixed "exports is not defined in ES module scope" error in Next.js
- Updated src/core/index.ts to use proper ESM export syntax
- Updated src/utils/relative.ts to fix import conflicts
- Enhanced documentation with clearer Next.js integration instructions

### Changed
- Improved module format handling in package.json exports field
- Updated rollup configuration to generate more compatible output formats

## Version 1.0.7 (2025-05-14)

### Fixed
- Resolved Next.js compatibility issues with module parsing
- Added Next.js configuration guide and example
- Fixed rollup.config.js to properly handle CommonJS and ESM outputs

### Added
- Created NEXT_JS_USAGE.md with detailed instructions for Next.js users
- Added webpack configuration examples for Next.js

## Version 1.0.5 (2024-05-13)

### Bug Fixes
- Removed unused isServer parameter in next.config.js

## Version 1.0.3 (2025-05-13)

### Fixed
- Resolved Next.js compatibility issues with module parsing
- Added Next.js configuration guide and example
- Fixed rollup.config.js to properly handle CommonJS and ESM outputs

## Version 1.0.2 (2025-05-13)

### Added
- Added comprehensive documentation
- Added relative time formatting functions
- Added date range functions

### Fixed
- Fixed name conflicts between date-fns and date-fns-tz exports

## Version 1.0.1 (2025-05-13)

### Added
- Initial release with core functionality
- Timezone-aware date operations
- React integration with hooks and context

## Version 1.0.0 (2025-05-13)

### Initial Release
- Core date-fns and date-fns-tz functionality
- Global default timezone configuration
- React hooks and components
- TypeScript support 