# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-05

### Added

- Initial release
- Checkbox UI for multiselect field
- Array storage (JSON type) instead of comma-separated strings
- Strapi v5 compatibility
- TypeScript support
- Configurable options through Content-Type Builder

### Changed

- Forked from [strapi-plugin-multiselect-field](https://github.com/fxm90/strapi-plugin-multiselect-field)
- Changed data type from `string` to `json`
- Removed delimiter option (no longer needed with array storage)
- Updated component logic to work with arrays
- Renamed plugin from `multiselect-field` to `multiselect-checkbox`

### Technical Details

- Data format: `["Option 1", "Option 2"]` instead of `"Option 1,Option 2"`
- Field type: `json` instead of `string`
- Better API responses with native array support
- Easier database queries with array fields
