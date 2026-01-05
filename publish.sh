#!/bin/bash

# Publish script for strapi-plugin-multiselect-checkbox

echo "🚀 Publishing @tunghtml/strapi-plugin-multiselect-checkbox"
echo ""

# Check if logged in
echo "📝 Checking npm login status..."
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to npm"
    echo "Please run: npm login"
    exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""

# Build the plugin
echo "🔨 Building plugin..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Publish
echo "📦 Publishing to npm..."
npm publish --access public

if [ $? -ne 0 ]; then
    echo "❌ Publish failed"
    exit 1
fi

echo ""
echo "✅ Successfully published!"
echo ""
echo "📍 Package URL: https://www.npmjs.com/package/@tunghtml/strapi-plugin-multiselect-checkbox"
echo "📍 GitHub URL: https://github.com/finnwasabi/strapi-plugin-multiselect-checkbox"
echo ""
echo "To install in your project:"
echo "  yarn add @tunghtml/strapi-plugin-multiselect-checkbox"
echo ""
