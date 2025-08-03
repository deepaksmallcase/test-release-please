#!/usr/bin/env node
const { execSync } = require("child_process");

const args = process.argv.slice(2);
const [environment, version] = args;

if (!environment || !version) {
  console.error("Usage: node create_pre_release_tag.js <environment> <version>");
  console.error("Example: node create_pre_release_tag.js stag v1.2.3-stag.1");
  process.exit(1);
}

try {
  // Validate environment
  const validEnvironments = ['dev', 'stag', 'beta'];
  if (!validEnvironments.includes(environment)) {
    console.error(`Invalid environment. Must be one of: ${validEnvironments.join(', ')}`);
    process.exit(1);
  }

  // Validate version format
  const versionRegex = /^v\d+\.\d+\.\d+(-[a-z]+\.\d+)?$/;
  if (!versionRegex.test(version)) {
    console.error("Invalid version format. Must be like: v1.2.3 or v1.2.3-stag.1");
    process.exit(1);
  }

  // Create tag
  console.log(`Creating tag: ${version} for ${environment} environment`);
  execSync(`git tag ${version}`, { stdio: 'inherit' });
  
  // Push tag
  console.log(`Pushing tag: ${version}`);
  execSync(`git push origin ${version}`, { stdio: 'inherit' });
  
  console.log(`✅ Successfully created and pushed tag: ${version}`);
  console.log(`Environment: ${environment}`);
  console.log(`This will trigger the ${environment} deployment workflow`);
  
} catch (error) {
  console.error("❌ Error creating pre-release tag:", error.message);
  process.exit(1);
}
