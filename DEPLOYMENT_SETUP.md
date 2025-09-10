# 🚀 Manual Pre-Release Deployment Setup

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

## 🎯 Manual Pre-Release Tag Creation

### GitHub Actions Workflow
**File:** `.github/workflows/create-pre-release-tag.yml`

**Triggers:**
- **Manual Only:** Via GitHub Actions UI with environment selection

**Behavior:**
- Creates pre-release tag for selected environment (dev/stag/beta)
- Tag creation triggers corresponding deployment workflow on main branch

### Usage Examples

**Manual (via GitHub Actions UI):**
1. Go to Actions → "Manual Pre-release Tag Creation"
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

### Manual Process
1. ✅ Go to GitHub Actions UI
2. ✅ Select "Manual Pre-release Tag Creation"
3. ✅ Choose environment (dev/stag/beta)
4. ✅ System fetches latest git tags
5. ✅ Calculates next version automatically
6. ✅ Updates `package.json` version
7. ✅ Updates `package-lock.json`
8. ✅ Commits changes with descriptive message
9. ✅ Creates git tag
10. ✅ Pushes tag to remote repository
11. ✅ **Tag triggers deployment workflow on main branch**

### Environment Support
- **dev:** `v1.6.1-dev.0`, `v1.6.1-dev.1`, etc. → Triggers DEV deployment
- **stag:** `v1.6.1-stag.0`, `v1.6.1-stag.1`, etc. → Triggers STAG deployment
- **beta:** `v1.6.1-beta.0`, `v1.6.1-beta.1`, etc. → Triggers BETA deployment

### Deployment Workflows
Your existing deployment workflows will automatically trigger:
- **DEV Deployment:** Triggers on `v*-dev*` tags
- **STAG Deployment:** Triggers on `v*-stag*` tags  
- **BETA Deployment:** Triggers on `v*-beta*` tags

## 🎉 Benefits

### ✅ Manual Control
- You decide when to create pre-release tags
- No automatic triggers on main branch pushes
- Full control over deployment timing

### ✅ Smart Versioning
- Automatically increments versions
- Handles pre-release numbering
- Maintains semantic versioning

### ✅ Main Branch Deployment
- All deployments happen from main branch
- No need for separate dev/stag/beta branches
- Single source of truth

### ✅ Error Handling
- Graceful handling of git conflicts
- Clear error messages
- Comprehensive logging

## 🚀 Ready to Use!

The system is now set up for manual pre-release tag creation. When you create a tag, it will automatically trigger the corresponding deployment workflow on the main branch. No separate branches needed!
