# Testing Release Please Setup

This guide helps you test the complete Release Please implementation.

## 🧪 Test Scenarios

### Test 1: Verify Configuration Files

```bash
# Check if all required files exist
ls -la .release-please-config.json
ls -la .release-please-manifest.json
ls -la .github/workflows/release-please.yml
ls -la scripts/create_pre_release_tag.js
ls -la scripts/create_pre_release_tag_cli.js
```

### Test 2: Test Pre-release Tag Creation

```bash
# Test the CLI script
npm run tag:staging

# Or test direct command
npm run release:staging stag v1.0.1-stag.1
```

### Test 3: Test Build Scripts

```bash
# Test all build scripts
npm run build
npm run build:dev
npm run build:stag
npm run build:prod
```

### Test 4: Simulate Production Release

1. **Create a test feature:**
   ```bash
   git checkout -b test-release-please
   # Make a small change
   echo "// Test comment" >> src/App.js
   git add .
   git commit -m "feat: test release please setup"
   git push origin test-release-please
   ```

2. **Create PR to main:**
   - Create PR from `test-release-please` to `main`
   - Merge the PR

3. **Merge to prod (if prod branch exists):**
   ```bash
   git checkout prod
   git merge main
   git push origin prod
   ```

4. **Watch Release Please:**
   - Check GitHub Actions tab
   - Look for "Release Please" workflow
   - Should create a PR with version bump

## 🔍 Verification Checklist

- [ ] `.release-please-config.json` exists and is valid JSON
- [ ] `.release-please-manifest.json` exists and matches package.json version
- [ ] GitHub workflows are in `.github/workflows/`
- [ ] Scripts are executable (`chmod +x scripts/*.js`)
- [ ] Package.json has all required scripts
- [ ] CHANGELOG.md exists and is properly formatted

## 🚨 Common Test Issues

### Issue: Scripts not executable
```bash
# Fix: Make scripts executable
chmod +x scripts/*.js
```

### Issue: Release Please not triggering
```bash
# Check: Ensure you're pushing to prod branch
git branch
git push origin prod
```

### Issue: Invalid version format
```bash
# Fix: Use correct format
npm run release:staging stag v1.0.1-stag.1
```

## 📊 Expected Results

### After successful setup:

1. **Pre-release tags** should trigger staging deployment
2. **Merges to prod** should create Release Please PR
3. **Version bumps** should follow semantic versioning
4. **CHANGELOG.md** should be auto-updated
5. **GitHub releases** should be created automatically

### Version Bumping Examples:

- `feat: new feature` → 1.0.0 → 1.1.0
- `fix: bug fix` → 1.0.0 → 1.0.1
- `BREAKING CHANGE: major change` → 1.0.0 → 2.0.0

## 🎯 Success Criteria

✅ All configuration files exist and are valid
✅ Scripts are executable and working
✅ GitHub workflows are properly configured
✅ Pre-release tags trigger staging deployment
✅ Production releases create proper PRs
✅ Version bumping follows semantic versioning
✅ CHANGELOG.md is auto-generated
✅ GitHub releases are created automatically

## 📞 Troubleshooting

If tests fail:

1. Check GitHub Actions logs
2. Verify commit message format
3. Ensure proper branch structure
4. Review configuration files
5. Check file permissions on scripts 