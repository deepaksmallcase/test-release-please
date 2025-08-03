#!/usr/bin/env node
const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createPreReleaseTag() {
  try {
    console.log("🚀 Pre-Release Tag Creator");
    console.log("========================\n");

    // Get current version from package.json
    const packageJson = JSON.parse(execSync("cat package.json", { encoding: 'utf8' }));
    const currentVersion = packageJson.version;
    
    console.log(`Current version: ${currentVersion}\n`);

    // Ask for environment
    const environment = await question("Select environment (dev/stag/beta): ");
    const validEnvironments = ['dev', 'stag', 'beta'];
    
    if (!validEnvironments.includes(environment)) {
      console.error(`❌ Invalid environment. Must be one of: ${validEnvironments.join(', ')}`);
      process.exit(1);
    }

    // Ask for version
    const suggestedVersion = `${currentVersion}-${environment}.1`;
    const version = await question(`Enter version tag (suggested: ${suggestedVersion}): `);
    
    if (!version) {
      console.error("❌ Version is required");
      process.exit(1);
    }

    // Validate version format
    const versionRegex = /^v\d+\.\d+\.\d+(-[a-z]+\.\d+)?$/;
    if (!versionRegex.test(version)) {
      console.error("❌ Invalid version format. Must be like: v1.2.3 or v1.2.3-stag.1");
      process.exit(1);
    }

    // Confirm
    const confirm = await question(`\nCreate tag "${version}" for ${environment} environment? (y/N): `);
    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      console.log("❌ Cancelled");
      process.exit(0);
    }

    // Create tag
    console.log(`\nCreating tag: ${version} for ${environment} environment`);
    execSync(`git tag ${version}`, { stdio: 'inherit' });
    
    // Push tag
    console.log(`Pushing tag: ${version}`);
    execSync(`git push origin ${version}`, { stdio: 'inherit' });
    
    console.log(`\n✅ Successfully created and pushed tag: ${version}`);
    console.log(`Environment: ${environment}`);
    console.log(`This will trigger the ${environment} deployment workflow`);
    
  } catch (error) {
    console.error("❌ Error creating pre-release tag:", error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createPreReleaseTag(); 