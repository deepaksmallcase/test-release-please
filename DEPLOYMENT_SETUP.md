# 🚀 Pre-Release Deployment Setup

## ✅ Cleanup Complete

### Removed Old System
- ❌ Deleted `scripts/` folder entirely
- ❌ Removed old script references from `package.json`
- ✅ Clean, streamlined setup

### Current Package.json Scripts
```json
{
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development", 
    "build:stag": "webpack --mode production",
    "build:prod": "webpack --mode production",
    "dev": "webpack serve --mode development --open",
    "test": "echo \"No tests specified\" && exit 0",
    "test:ci": "npm run test",
    "release": "release-please",
    "release:pre": "node deployments/create_pre_release_tag_cli.js"
  }
}
```

## 🎯 Auto Pre-Release on Main Branch

### GitHub Actions Workflow
**File:** `.github/workflows/create-pre-release-tag.yml`

**Triggers:**
1. **Automatic:** When code is pushed to `main` branch
2. **Manual:** Via GitHub Actions UI with environment selection

**Behavior:**
- **Push to main:** Automatically creates `stag` pre-release tag
- **Manual trigger:** Creates pre-release tag for selected environment (dev/stag/beta)

### Usage Examples

**Automatic (when pushing to main):**
```bash
git push origin main
# → Automatically creates v1.6.1-stag.0, v1.6.1-stag.1, etc.
```

**Manual (via GitHub Actions UI):**
1. Go to Actions → "Auto Pre-release Tag on Main Branch"
2. Click "Run workflow"
3. Select environment: dev/stag/beta
4. Click "Run workflow"

**Local Testing:**
```bash
npm run release:pre stag    # Creates staging pre-release
npm run release:pre dev     # Creates development pre-release  
npm run release:pre beta    # Creates beta pre-release
```

## 🔧 How It Works

### Version Calculation
- **Latest stable tag:** `v1.6.0`
- **New pre-release:** `v1.6.1-stag.0` (increments patch + adds environment)
- **Next pre-release:** `v1.6.1-stag.1` (increments pre-release number)

### Automated Process
1. ✅ Fetches latest git tags
2. ✅ Calculates next version automatically
3. ✅ Updates `package.json` version
4. ✅ Updates `package-lock.json`
5. ✅ Commits changes with descriptive message
6. ✅ Creates git tag
7. ✅ Pushes tag to remote repository

### Environment Support
- **dev:** `v1.6.1-dev.0`, `v1.6.1-dev.1`, etc.
- **stag:** `v1.6.1-stag.0`, `v1.6.1-stag.1`, etc.
- **beta:** `v1.6.1-beta.0`, `v1.6.1-beta.1`, etc.

## 🎉 Benefits

### ✅ Fully Automated
- No manual version entry required
- No interactive prompts
- Works seamlessly with CI/CD

### ✅ Smart Versioning
- Automatically increments versions
- Handles pre-release numbering
- Maintains semantic versioning

### ✅ GitHub Integration
- Triggers on main branch pushes
- Manual override available
- Proper git configuration

### ✅ Error Handling
- Graceful handling of git conflicts
- Clear error messages
- Comprehensive logging

## 🚀 Ready to Use!

The system is now clean, automated, and ready for production use. Every push to the main branch will automatically create a staging pre-release tag, and you can manually create tags for other environments as needed.
