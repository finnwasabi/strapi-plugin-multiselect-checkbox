# @tunghtml/strapi-plugin-multiselect-checkbox

A Strapi v5 custom field plugin with checkbox UI that stores selected values as an **array of strings** (JSON type) instead of comma-separated strings.

![Strapi Version](https://img.shields.io/badge/strapi-v5-blue)
![npm version](https://img.shields.io/npm/v/@tunghtml/strapi-plugin-multiselect-checkbox)
![License](https://img.shields.io/npm/l/@tunghtml/strapi-plugin-multiselect-checkbox)

## ✨ Features

- ✅ **Checkbox UI** for intuitive multi-selection
- ✅ **Array Storage** - Stores data as `["Option 1", "Option 2"]` instead of `"Option 1,Option 2"`
- ✅ **JSON Type** - Uses Strapi's JSON field type for proper array handling
- ✅ **Strapi v5** compatible
- ✅ **TypeScript** support
- ✅ **Easy Configuration** - Define options directly in Content-Type Builder

## 📦 Installation

```bash
npm install @tunghtml/strapi-plugin-multiselect-checkbox
```

or with yarn:

```bash
yarn add @tunghtml/strapi-plugin-multiselect-checkbox
```

## 🔧 Configuration

Add the plugin to your `config/plugins.js` (or `config/plugins.ts`):

```javascript
module.exports = {
  // ...
  'multiselect-checkbox': {
    enabled: true,
  },
};
```

Then restart your Strapi application.

## 🎯 Usage

### 1. Add Field in Content-Type Builder

1. Go to **Content-Type Builder**
2. Select a content type or create a new one
3. Click **Add another field**
4. Choose **Custom** tab
5. Select **Multiselect Checkbox**
6. Configure your field:
   - **Name**: Field name
   - **Available Options**: Enter options (one per line)
7. Click **Finish** and **Save**

### 2. Use in Content Manager

The field will appear as a list of checkboxes in the Content Manager. Select multiple options and save.

### 3. API Response

The API will return selected values as an array:

```json
{
  "id": 1,
  "myField": ["Option 1", "Option 3", "Option 5"]
}
```

## 📊 Data Format Comparison

### This Plugin (Array)

```json
{
  "field": ["Option 1", "Option 2", "Option 3"]
}
```

### Other Plugins (String)

```json
{
  "field": "Option 1,Option 2,Option 3"
}
```

## 🎨 Example Schema

```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product"
  },
  "attributes": {
    "sizes": {
      "type": "customField",
      "customField": "plugin::multiselect-checkbox.multiselect-checkbox",
      "options": {
        "availableOptions": ["Small", "Medium", "Large", "XL"]
      }
    }
  }
}
```

## 🔍 Querying Data

Since data is stored as JSON array, you can query it using Strapi's filters:

```javascript
// Find entries where field contains "Option 1"
const entries = await strapi.entityService.findMany('api::product.product', {
  filters: {
    sizes: {
      $contains: 'Small',
    },
  },
});
```

## 🛠️ Development

### Build the Plugin

```bash
npm run build
```

### Watch Mode

```bash
npm run watch
```

## 🙏 Credits

This plugin is based on [strapi-plugin-multiselect-field](https://github.com/fxm90/strapi-plugin-multiselect-field) by Felix M., modified to store data as arrays instead of comma-separated strings.

## 📝 License

MIT

## 🐛 Issues

Found a bug? Please report it on [GitHub Issues](https://github.com/finnwasabi/strapi-plugin-multiselect-checkbox/issues).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Author

**Tung Le**

- GitHub: [@finnwasabi](https://github.com/finnwasabi)
- Email: tunghtml@gmail.com
