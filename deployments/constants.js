const PreReleaseDeploymentEnvs = /** @type {const} */ ({
  DEVELOPMENT: 'dev',
  STAGING: 'stag',
  BETA: 'beta',
});

const ValidPreReleaseDeploymentEnvs = [
  PreReleaseDeploymentEnvs.DEVELOPMENT,
  PreReleaseDeploymentEnvs.STAGING,
  PreReleaseDeploymentEnvs.BETA,
];

module.exports = { PreReleaseDeploymentEnvs, ValidPreReleaseDeploymentEnvs };
