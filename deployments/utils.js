const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { PreReleaseDeploymentEnvs } = require('./constants');

const runShellCommand = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdOut, stdErr) => {
      if (err) {
        reject(new Error(`${stdOut.trim()} ${stdErr.trim()}`));
      } else {
        resolve(stdOut.trim());
      }
    });
  });
};

function logIntermediateStep(message) {
  console.log(`+ ${message}`);
}

async function getNewTagVersion(deploymentEnv) {
  logIntermediateStep('fetching the latest tag...');
  await runShellCommand('git fetch --tags --force');
  
  const latestTag = await runShellCommand(
    "git describe --tags $(git rev-list --tags --max-count=1) | sed 's/^v//'",
  );
  logIntermediateStep(`fetched latest tag ${latestTag} successfully.`);

  let newVersion;
  
  // Check if the latest tag is already a pre-release for the same environment
  if (latestTag.includes(`-${deploymentEnv}.`)) {
    // Extract the pre-release number and increment it
    const parts = latestTag.split(`-${deploymentEnv}.`);
    const baseVersion = parts[0];
    const prereleaseNumber = parseInt(parts[1]) + 1;
    newVersion = `${baseVersion}-${deploymentEnv}.${prereleaseNumber}`;
  } else {
    // Regular version or different environment pre-release, bump patch and add pre-release
    const [majorVersion, minorVersion, patchVersion] = latestTag.split('.');
    const sanitizedPatchVersion = patchVersion.split('-')[0];
    const updatedPatchVersion = Number(sanitizedPatchVersion) + 1;
    const patchWithPreRelease = `${updatedPatchVersion}-${deploymentEnv}`;
    newVersion = `${majorVersion}.${minorVersion}.${patchWithPreRelease}.0`;
  }

  return newVersion;
}

function updatePackageVersion({ packageFilePath, newVersion }) {
  logIntermediateStep('updating version in package files...');
  const pathToFile = path.join(__dirname, packageFilePath);
  const data = fs.readFileSync(pathToFile, 'utf8');
  const packageJson = JSON.parse(data);
  packageJson.version = newVersion;
  const updatedContent = `${JSON.stringify(packageJson, null, 2)}\n`;
  fs.writeFileSync(pathToFile, updatedContent);
}

async function createTag(version) {
  const newTag = `v${version}`;
  await runShellCommand(`git tag ${newTag}`);
  logIntermediateStep(`new tag ${newTag} created successfully`);
  return newTag;
}

async function pushChangesToRemote({ currentBranch, newTag }) {
  logIntermediateStep('pushing changes to remote branch...');
  try {
    // First push the tag
    await runShellCommand(`git push origin ${newTag}`);
    logIntermediateStep(`tag ${newTag} pushed successfully`);
    
    // Then try to push the branch changes
    try {
      await runShellCommand(`git push origin ${currentBranch}`);
      logIntermediateStep(`branch ${currentBranch} pushed successfully`);
    } catch (branchError) {
      logIntermediateStep(`branch push failed (this is normal if branch is behind remote)`);
      logIntermediateStep(`tag ${newTag} was still created and pushed successfully`);
    }
    
    console.log(`The new tag ${newTag} has been successfully pushed`);
  } catch (error) {
    console.error(`Failed to push tag ${newTag}:`, error.message);
    throw error;
  }
}

module.exports = {
  runShellCommand,
  getNewTagVersion,
  updatePackageVersion,
  logIntermediateStep,
  createTag,
  pushChangesToRemote,
};
