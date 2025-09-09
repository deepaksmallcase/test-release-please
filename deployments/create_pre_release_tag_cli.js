const {
  createTag,
  runShellCommand,
  logIntermediateStep,
  pushChangesToRemote,
  updatePackageVersion,
  getNewTagVersion,
} = require('./utils');

// Load version info
const versionInfo = require('./version.json');

async function main() {
  console.log('🚀 Pre-Release Tag Creator (Deployments v2.0)');
  console.log('==============================================');
  console.log('✅ Using NEW deployments code with automated version calculation');
  console.log(`📋 Version: ${versionInfo.version} - ${versionInfo.description}`);
  console.log('');

  const deploymentEnv = process.argv.slice(2)[0];
  
  if (!deploymentEnv) {
    console.error('❌ Error: Deployment environment is required');
    console.log('Usage: node deployments/create_pre_release_tag_cli.js <env>');
    console.log('Environments: dev, stag, beta');
    process.exit(1);
  }

  console.log(`🎯 Target environment: ${deploymentEnv}`);
  console.log('');

  const newVersion = await getNewTagVersion(deploymentEnv);

  updatePackageVersion({ packageFilePath: '../package.json', newVersion });
  
  logIntermediateStep('update package-lock');
  await runShellCommand('npm i --package-lock-only --ignore-scripts');

  logIntermediateStep('committing changes');
  await runShellCommand("git config user.name 'github-actions[bot]'");
  await runShellCommand(
    "git config user.email 'github-actions[bot]@users.noreply.github.com'",
  );
  await runShellCommand(`git add package.json package-lock.json`);
  await runShellCommand(`git commit -m "chore: bump version to ${newVersion}"`);

  const newTag = await createTag(newVersion);

  const currentBranch = await runShellCommand(
    'git rev-parse --abbrev-ref HEAD',
  );
  await pushChangesToRemote({ currentBranch, newTag });
  
  console.log('');
  console.log('🎉 Pre-release tag created successfully!');
  console.log(`📦 New version: ${newVersion}`);
  console.log(`🏷️  New tag: ${newTag}`);
  console.log(`🌿 Branch: ${currentBranch}`);
  console.log(`🌍 Environment: ${deploymentEnv}`);
  console.log('');
  console.log('✅ This was created using the NEW deployments code (v2.0)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
