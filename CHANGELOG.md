# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<!-- CHANGELOG will be automatically updated by semantic-release -->

## [1.0.8] - 2024-05-25

### Fixed
- Fixed "exports is not defined in ES module scope" error in Next.js
- Updated src/core/index.ts to use proper ESM export syntax
- Updated src/utils/relative.ts to fix import conflicts
- Enhanced documentation with clearer Next.js integration instructions

## [1.0.7] - 2024-05-23

### Fixed
- Resolved Next.js compatibility issues with module parsing
- Added Next.js configuration guide and example
- Fixed rollup.config.js to properly handle CommonJS and ESM outputs

## [1.0.5](https://github.com/subhamg/date-fns-toolkit/compare/v1.0.4...v1.0.5) (2025-05-13)


### Bug Fixes

* remove unused isServer parameter in next.config.js ([5494aaf](https://github.com/subhamg/date-fns-toolkit/commit/5494aafd7208136469b21206bdc6f4d0966fb597))

## [1.0.3] - 2024-05-20

### Fixed
- Resolved Next.js compatibility issues with module parsing
- Added Next.js configuration guide and example
- Fixed rollup.config.js to properly handle CommonJS and ESM outputs

## [1.0.2] - 2024-05-15

### Added
- Added comprehensive documentation
- Added relative time formatting functions
- Added date range functions

### Fixed
- Fixed name conflicts between date-fns and date-fns-tz exports

## [1.0.1] - 2024-05-10

### Added
- Initial release with core functionality
- Timezone-aware date operations
- React integration with hooks and context
