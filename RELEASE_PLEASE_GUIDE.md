# Release Please Implementation Guide

This repository uses Release Please for automated version management and deployment. This guide explains how to use the complete release workflow.

## 🚀 Quick Start

### Development Flow

1. **Make changes on feature branch:**
   ```bash
   git checkout -b feature/new-feature
   # Make your changes
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

2. **Create Pull Request to `main`:**
   - Create PR from your feature branch to `main`
   - Use conventional commit messages (see below)

3. **Merge to `main` and then to `prod`:**
   ```bash
   # After PR is merged to main
   git checkout main
   git pull origin main
   git checkout prod
   git merge main
   git push origin prod
   ```

### Staging Deployment

For testing before production release:

```bash
# Interactive CLI
npm run tag:staging

# Or direct command
npm run release:staging stag v1.2.3-stag.1
```

### Production Release

Production releases are automatic when you merge to `prod` branch:

1. Merge your changes to `prod` branch
2. Release Please creates a PR with version bump and changelog
3. Review and merge the PR
4. Release Please creates GitHub release and tag
5. Tag triggers production deployment

## 📋 Conventional Commits

Use these commit types for automatic versioning:

- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump)
- `BREAKING CHANGE:` - Breaking changes (major version bump)
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples:

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login button not working"
git commit -m "BREAKING CHANGE: remove deprecated API endpoint"
```

## 🔄 Complete Flow Explained

### 1. Development Phase
```bash
# Work on feature branch
git checkout -b feature/new-feature
# Make changes with conventional commits
git commit -m "feat: add new feature"
# Push and create PR to main
git push origin feature/new-feature
```

### 2. Staging Phase
```bash
# After merging to main, create staging tag
npm run tag:staging
# Select 'stag' environment
# Enter version like 'v1.2.3-stag.1'
# This triggers staging deployment
```

### 3. Production Release Phase
```bash
# Merge main to prod branch
git checkout prod
git merge main
git push origin prod
# Release Please creates PR with version bump
# Review and merge the PR
# Release Please creates GitHub release
# Tag triggers production deployment
```

## 📁 File Structure

```
├── .release-please-config.json     # Release Please configuration
├── .release-please-manifest.json   # Version manifest
├── .github/workflows/
│   ├── release-please.yml         # Main release workflow
│   ├── prod-deployment.yml        # Production deployment
│   ├── stag-deployment.yml        # Staging deployment
│   └── create-pre-release-tag.yml # Manual tag creation
├── scripts/
│   ├── create_pre_release_tag.js      # Direct tag creation
│   └── create_pre_release_tag_cli.js  # Interactive CLI
└── CHANGELOG.md                   # Auto-generated changelog
```

## 🛠️ Available Scripts

```bash
# Build scripts
npm run build        # Production build
npm run build:dev    # Development build
npm run build:stag   # Staging build
npm run build:prod   # Production build

# Release scripts
npm run release      # Run Release Please locally
npm run tag:staging  # Interactive staging tag creation
npm run release:staging <env> <version>  # Direct tag creation
```

## 🔧 Configuration

### Release Please Config (`.release-please-config.json`)
- `bootstrap-sha`: Initial commit SHA for version tracking
- `packages`: Package configuration
- `changelog-sections`: Sections for different commit types

### Manifest (`.release-please-manifest.json`)
- Tracks current version for each package

## 🚨 Troubleshooting

### Common Issues

1. **Release Please not creating PR:**
   - Check that you're pushing to `prod` branch
   - Verify conventional commit messages
   - Check GitHub Actions logs

2. **Staging deployment not working:**
   - Ensure tag format is correct (e.g., `v1.2.3-stag.1`)
   - Check GitHub Actions workflow triggers

3. **Version conflicts:**
   - Check `.release-please-manifest.json` version
   - Verify `package.json` version matches

### Debug Commands

```bash
# Check current version
cat .release-please-manifest.json

# Run Release Please locally
npm run release

# Check recent commits
git log --oneline -10
```

## 📊 Version Bumping Rules

- `feat:` → Minor version bump (1.2.3 → 1.3.0)
- `fix:` → Patch version bump (1.2.3 → 1.2.4)
- `BREAKING CHANGE:` → Major version bump (1.2.3 → 2.0.0)
- Other types → No version bump

## 🔐 Security

- Uses `GITHUB_TOKEN` for authentication
- For additional permissions, create Personal Access Token
- Add as `RELEASE_PLEASE_TOKEN` secret in repository settings

## 📞 Support

For issues with Release Please setup:
1. Check GitHub Actions logs
2. Verify commit message format
3. Ensure proper branch structure
4. Review configuration files 