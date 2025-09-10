#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Creates a pre-release tag using release-please version calculation
 * Usage: node scripts/create-prerelease-simple.js <environment> [branch]
 */

function createPrereleaseTag() {
  const environment = process.argv[2];
  const branch = process.argv[3] || 'main';
  
  if (!environment) {
    console.error('❌ Error: Environment is required');
    console.log('Usage: node scripts/create-prerelease-simple.js <environment> [branch]');
    console.log('Environments: dev, stag, beta');
    process.exit(1);
  }

  const validEnvironments = ['dev', 'stag', 'beta'];
  if (!validEnvironments.includes(environment)) {
    console.error(`❌ Error: Invalid environment. Must be one of: ${validEnvironments.join(', ')}`);
    process.exit(1);
  }

  console.log('🚀 Creating Pre-release Tag with Release-Please');
  console.log('==============================================');
  console.log(`🎯 Environment: ${environment}`);
  console.log(`🌿 Branch: ${branch}`);
  console.log('');

  try {
    // Fetch latest tags
    console.log('📥 Fetching latest tags...');
    execSync('git fetch --tags --force', { stdio: 'inherit' });

    // Get the latest tag
    const latestTag = execSync('git describe --tags $(git rev-list --tags --max-count=1) | sed "s/^v//"', { 
      encoding: 'utf8' 
    }).trim();
    
    console.log(`📋 Latest tag: ${latestTag}`);

    // Calculate next version
    const [major, minor, patch] = latestTag.split('.');
    const nextPatch = parseInt(patch) + 1;
    const prereleaseVersion = `${major}.${minor}.${nextPatch}-${environment}.0`;
    
    console.log(`📦 Next pre-release version: ${prereleaseVersion}`);

    // Update package.json
    console.log('📝 Updating package.json...');
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = prereleaseVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    // Update package-lock.json
    console.log('📝 Updating package-lock.json...');
    execSync('npm i --package-lock-only --ignore-scripts', { stdio: 'inherit' });

    // Commit changes
    console.log('💾 Committing changes...');
    execSync('git add package.json package-lock.json', { stdio: 'inherit' });
    execSync(`git commit -m "chore: bump version to ${prereleaseVersion}"`, { stdio: 'inherit' });

    // Create and push tag
    const tagName = `v${prereleaseVersion}`;
    console.log(`🏷️  Creating tag: ${tagName}`);
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    
    console.log(`📤 Pushing tag: ${tagName}`);
    execSync(`git push origin ${tagName}`, { stdio: 'inherit' });

    console.log('');
    console.log('🎉 Pre-release tag created successfully!');
    console.log(`📦 Version: ${prereleaseVersion}`);
    console.log(`🏷️  Tag: ${tagName}`);
    console.log(`🌍 Environment: ${environment}`);
    console.log(`🌿 Branch: ${branch}`);

  } catch (error) {
    console.error('❌ Error creating pre-release tag:', error.message);
    process.exit(1);
  }
}

createPrereleaseTag();
