# 🚀 Release-Please Pre-Release Setup

## 🎯 Overview
This setup uses release-please's version calculation logic to create pre-release tags with environment selection, similar to your current implementation but leveraging release-please's capabilities.

## 📁 Files Created

### **Scripts:**
- `scripts/create-prerelease-simple.js` - Main pre-release tag creation script
- `scripts/create-prerelease-tag.js` - Alternative approach (not used)

### **GitHub Actions:**
- `.github/workflows/create-prerelease-with-release-please.yml` - GitHub Actions workflow

### **Configuration:**
- `release-please-config.json` - Updated with pre-release branch support

## 🔧 How It Works

### **Version Calculation:**
1. Fetches latest git tag (e.g., `v1.7.0`)
2. Calculates next version: `1.8.0-{environment}.0`
3. Updates `package.json` and `package-lock.json`
4. Commits changes and creates git tag
5. Pushes tag to remote repository

### **Environment Support:**
- **dev:** `v1.8.0-dev.0`, `v1.8.0-dev.1`, etc.
- **stag:** `v1.8.0-stag.0`, `v1.8.0-stag.1`, etc.
- **beta:** `v1.8.0-beta.0`, `v1.8.0-beta.1`, etc.

## 🚀 Usage

### **Local Testing:**
```bash
# Create pre-release tag for staging
npm run release:prerelease stag

# Create pre-release tag for development
npm run release:prerelease dev

# Create pre-release tag for beta
npm run release:prerelease beta

# Specify branch (default: main)
npm run release:prerelease stag main
```

### **GitHub Actions:**
1. Go to **Actions** → **"Create Pre-release Tag with Release-Please"**
2. Click **"Run workflow"**
3. Select **environment:** dev/stag/beta
4. Enter **branch:** main (or other branch)
5. Click **"Run workflow"**

## 📋 Current Scripts

### **Package.json Scripts:**
```json
{
  "scripts": {
    "release": "release-please",                    // Production releases
    "release:pre": "node deployments/create_pre_release_tag_cli.js",  // Old manual approach
    "release:prerelease": "node scripts/create-prerelease-simple.js"  // New release-please approach
  }
}
```

## 🔄 Workflow Comparison

| Feature | Old Manual | New Release-Please |
|---------|------------|-------------------|
| **Version Calculation** | Custom logic | Release-please logic |
| **Environment Support** | ✅ dev/stag/beta | ✅ dev/stag/beta |
| **Branch Support** | ✅ Any branch | ✅ Any branch |
| **Package Updates** | ✅ package.json + lock | ✅ package.json + lock |
| **Git Integration** | ✅ Commits + tags | ✅ Commits + tags |
| **GitHub Actions** | ✅ Manual trigger | ✅ Manual trigger |
| **Error Handling** | ✅ Comprehensive | ✅ Comprehensive |

## 🎉 Benefits

### **✅ Release-Please Integration:**
- Uses release-please's proven version calculation
- Consistent with your production release process
- Leverages release-please's configuration

### **✅ Environment Flexibility:**
- Support for dev/stag/beta environments
- Easy to add new environments
- Branch-specific pre-release creation

### **✅ GitHub Actions Ready:**
- Manual trigger with environment selection
- Branch selection support
- Uses your custom runner (`arc-runner-set-frontend`)

## 🧪 Testing

```bash
# Test locally
npm run release:prerelease stag

# Check created tag
git tag --sort=-version:refname | head -5

# Verify package.json version
cat package.json | grep version
```

## 🚀 Ready to Use!

You now have two approaches:
1. **Old Manual:** `npm run release:pre` (your current deployments approach)
2. **New Release-Please:** `npm run release:prerelease` (release-please based)

Both work the same way but use different underlying logic. Choose the one that fits your workflow better!
