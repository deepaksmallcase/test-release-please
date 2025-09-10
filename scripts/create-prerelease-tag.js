#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Creates a pre-release tag using release-please with environment selection
 * Usage: node scripts/create-prerelease-tag.js <environment> [branch]
 */

function createPrereleaseTag() {
  const environment = process.argv[2];
  const branch = process.argv[3] || 'main';
  
  if (!environment) {
    console.error('❌ Error: Environment is required');
    console.log('Usage: node scripts/create-prerelease-tag.js <environment> [branch]');
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
    // Create temporary release-please config
    const tempConfigPath = 'release-please-prerelease.json';
    const config = {
      "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
      "bootstrap-sha": "75e32df06af5f8023b7b38b38354751d7223fce4",
      "include-component-in-tag": false,
      "changelog-path": "CHANGELOG.md",
      "branches": [
        { 
          "branch": branch, 
          "prerelease": true,
          "prerelease-label": environment
        }
      ],
      "packages": {
        ".": {
          "release-type": "node",
          "package-name": "react-webpack-demo",
          "extra-files": [
            "package.json"
          ]
        }
      }
    };

    fs.writeFileSync(tempConfigPath, JSON.stringify(config, null, 2));
    console.log('✅ Created temporary release-please config');

    // Run release-please to create the release
    console.log('🔄 Running release-please...');
    execSync(`npx release-please release --config-file=${tempConfigPath} --prerelease`, { 
      stdio: 'inherit' 
    });

    console.log('');
    console.log('🎉 Pre-release tag created successfully!');
    console.log(`📦 Environment: ${environment}`);
    console.log(`🌿 Branch: ${branch}`);

  } catch (error) {
    console.error('❌ Error creating pre-release tag:', error.message);
    process.exit(1);
  } finally {
    // Cleanup
    try {
      if (fs.existsSync('release-please-prerelease.json')) {
        fs.unlinkSync('release-please-prerelease.json');
        console.log('🧹 Cleaned up temporary files');
      }
    } catch (cleanupError) {
      console.warn('⚠️ Warning: Could not clean up temporary files');
    }
  }
}

createPrereleaseTag();
