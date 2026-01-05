# Modifications Made to strapi-plugin-multiselect-field

This document outlines the changes made to convert the original plugin to store data as arrays instead of comma-separated strings.

## Source

Original plugin: https://github.com/fxm90/strapi-plugin-multiselect-field

## Key Changes

### 1. Plugin Naming

- **Plugin ID**: Changed from `multiselect-field` to `multiselect-checkbox`
- **Field Name**: Changed from `multiselect-field` to `multiselect-checkbox`
- **Folder**: `backend/src/plugins/multiselect-checkbox`

### 2. Data Type Changes

#### Server-side (`server/src/register.ts`)

```typescript
// Before
type: 'string';

// After
type: 'json';
```

#### Admin-side (`admin/src/index.ts`)

```typescript
// Before
type: 'string';

// After
type: 'json';
```

### 3. Removed Delimiter Option

Removed the delimiter configuration option from `admin/src/index.ts` since we're storing as array:

- Removed `options.delimiter` field configuration
- Removed delimiter from component props

### 4. Component Logic (`admin/src/components/Multiselect/index.tsx`)

#### Before (String with delimiter)

```typescript
const selectedOptions = value ? value.split(delimiter) : [];
const nextSelectedOptionsAsString = sortedNextSelectedOptions.join(delimiter);
updateValue(nextSelectedOptionsAsString);
```

#### After (Array)

```typescript
const selectedOptions = Array.isArray(value) ? value : [];
updateValue(sortedNextSelectedOptions); // Direct array
```

### 5. Configuration

Added to `backend/config/plugins.js`:

```javascript
"multiselect-checkbox": {
  enabled: true,
  resolve: "./src/plugins/multiselect-checkbox",
},
```

## Data Format Comparison

### Before (String)

```json
{
  "field": "Option 1,Option 2,Option 3"
}
```

### After (Array)

```json
{
  "field": ["Option 1", "Option 2", "Option 3"]
}
```

## Usage in Schema

```json
{
  "fieldName": {
    "type": "customField",
    "customField": "plugin::multiselect-checkbox.multiselect-checkbox",
    "options": {
      "availableOptions": ["Option 1", "Option 2", "Option 3"]
    }
  }
}
```

## Building the Plugin

After making changes, rebuild the plugin:

```bash
cd backend/src/plugins/multiselect-checkbox
npm run build
```

Then restart Strapi.

## Benefits of Array Storage

1. **Better API responses**: Direct array instead of string parsing
2. **Type safety**: JSON arrays are properly typed
3. **Database queries**: Easier to query array fields in most databases
4. **No delimiter conflicts**: No need to worry about delimiter characters in option values
5. **Standard format**: Follows common JSON API practices
