# Publishing Guide

This guide explains how to publish the plugin to GitHub and npm.

## Prerequisites

1. GitHub account with access to https://github.com/finnwasabi/strapi-plugin-multiselect-checkbox
2. npm account with access to publish under `@tunghtml` scope
3. Git and npm installed locally

## Step 1: Push to GitHub

The repository has been initialized and committed. Now push to GitHub:

```bash
# Make sure you're in the plugin directory
cd backend/src/plugins/multiselect-checkbox

# Push to GitHub (you may need to create the repo on GitHub first)
git push -u origin main
```

If the repository doesn't exist on GitHub yet:

1. Go to https://github.com/new
2. Create repository: `strapi-plugin-multiselect-checkbox`
3. Don't initialize with README (we already have one)
4. Then run the push command above

## Step 2: Publish to npm

### First Time Setup

If you haven't logged in to npm yet:

```bash
npm login
```

Enter your npm credentials.

### Publish the Package

```bash
# Make sure you're in the plugin directory
cd backend/src/plugins/multiselect-checkbox

# Build the plugin first
npm run build

# Publish to npm (scoped package)
npm publish --access public
```

The `--access public` flag is required for scoped packages (@tunghtml/...) to be publicly accessible.

## Step 3: Verify Publication

### GitHub

Visit: https://github.com/finnwasabi/strapi-plugin-multiselect-checkbox

### npm

Visit: https://www.npmjs.com/package/@tunghtml/strapi-plugin-multiselect-checkbox

Or test installation:

```bash
npm info @tunghtml/strapi-plugin-multiselect-checkbox
```

## Future Updates

When you make changes and want to publish a new version:

1. Update version in `package.json`:

   ```json
   {
     "version": "1.0.1"
   }
   ```

2. Update `CHANGELOG.md` with changes

3. Commit and push to GitHub:

   ```bash
   git add .
   git commit -m "Version 1.0.1: Description of changes"
   git push
   ```

4. Create a git tag:

   ```bash
   git tag v1.0.1
   git push --tags
   ```

5. Rebuild and publish to npm:
   ```bash
   npm run build
   npm publish
   ```

## Version Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backwards compatible

## Troubleshooting

### npm publish fails with "403 Forbidden"

- Make sure you're logged in: `npm whoami`
- Check package name is available: `npm info @tunghtml/strapi-plugin-multiselect-checkbox`
- Verify you have permission to publish under `@tunghtml` scope

### Git push fails

- Make sure the repository exists on GitHub
- Check your GitHub authentication (SSH key or personal access token)
- Verify remote URL: `git remote -v`

### Build fails

- Check TypeScript errors: `npm run test:ts:back` and `npm run test:ts:front`
- Ensure all dependencies are installed: `npm install`

## Support

For issues or questions:

- GitHub Issues: https://github.com/finnwasabi/strapi-plugin-multiselect-checkbox/issues
- Email: tunghtml@gmail.com
