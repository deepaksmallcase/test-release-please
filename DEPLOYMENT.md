# 🚀 Deployment Process (Testing Setup)

This document outlines the deployment process for different environments in the React Webpack Demo application. **This is a testing setup** - actual deployment commands are simulated for demonstration purposes.

## 📋 Environment Overview

- **DEV** - Development environment for testing
- **STAG** - Staging environment for pre-production testing
- **BETA** - Beta environment with infrastructure approval workflow
- **PRODUCTION** - Production environment with full approval workflow

## 🛠️ For DEV or STAG Environment

### Step 1: Create Pre-release Tag

1. Go to the **Actions** tab on GitHub
2. Choose the **[Create Pre-release Tag](/.github/workflows/create-pre-release-tag.yml)** workflow
3. Fill in the required inputs:
   - **Branch**: Select the branch you want to deploy (e.g., `main`)
   - **Environment**: Choose `dev` or `stag`
   - **Version**: Enter version tag (e.g., `v1.2.3-dev` or `v1.2.3-stag`)

### Step 2: Automated Deployment

1. The tag will trigger the environment-specific CI workflow
2. **Simulated deployment** takes approximately **2-3 minutes**
3. You'll see deployment logs in the GitHub Actions tab
4. In a real setup, you'd receive notifications on the environment-specific channels:
   - **DEV**: `sc-dev-investment-argocd`
   - **STAG**: `sc-stag-investment-argocd`

### Step 3: Deployment Notifications

Look for the following notifications in GitHub Actions logs:

```
✅ DEV/STAG deployment simulation completed!
Environment: DEV/STAG
Tag: v1.2.3-dev
Commit: abc123def456
```

**Note**: This is a simulation - in a real setup, you'd receive actual deployment notifications.

## 🧪 For BETA Environment

### Step 1: Generate Tag

Same as DEV/STAG process, but select `beta` as the environment.

### Step 2: Infrastructure PR

1. Once the build is completed, a **simulated PR** will be created for the infrastructure repository
2. The PR would require approval from a **code-owner** in a real setup
3. You'll see the PR details in the GitHub Actions logs
4. In a real setup, you'd be notified on the `sc-prod-investment-argocd` channel

### Step 3: ArgoCD Sync

After the infrastructure PR is merged (in a real setup):
1. ArgoCD would sync the changes
2. You'd receive an ArgoCD sync notification
3. Deployment would be live in the BETA environment

**Note**: This is simulated - you'll see the sync details in GitHub Actions logs.

## 🔥 For PRODUCTION Environment

### Step 1: Merge to Production Branch

1. Merge your release branch to the **production** branch
2. This triggers the release-please workflow

### Step 2: Release-Please PR

1. Wait for a PR from the GitHub bot (1-3 minutes)
2. The PR will update the version and CHANGELOG
3. Review and merge the PR

### Step 3: Automated Release

1. After merging the PR, a GitHub action will:
   - Generate a release tag
   - Create a GitHub release
   - Takes approximately 1 minute

### Step 4: Production Deployment

1. The tag triggers the production CI workflow
2. **Simulated production builds** are created
3. You'll see the build details in GitHub Actions logs
4. In a real setup, you'd be notified on the `sc-prod-investment-argocd` channel

### Step 5: Infrastructure Approval

1. A **simulated PR** will be created for production infrastructure changes
2. Would require approval from a **code-owner** in a real setup
3. You'll see the PR details in GitHub Actions logs
4. In a real setup, once merged, changes would go live in **5 minutes**

### Step 6: Live Deployment

1. **Simulated ArgoCD sync** of the changes
2. You'll see the sync details in GitHub Actions logs
3. In a real setup, the application would be live in production

**Note**: This is a simulation - you can see all the deployment steps in the GitHub Actions logs.

## 📝 Tag Naming Convention

- **DEV**: `v1.2.3-dev`
- **STAG**: `v1.2.3-stag`
- **BETA**: `v1.2.3-beta`
- **PRODUCTION**: `v1.2.3`

## 🔧 Workflow Files

- `create-pre-release-tag.yml` - Manual tag creation workflow
- `dev-deployment.yml` - DEV environment deployment
- `stag-deployment.yml` - STAG environment deployment
- `beta-deployment.yml` - BETA environment deployment
- `prod-deployment.yml` - PRODUCTION environment deployment
- `release-please.yml` - Automated release management

## 📞 Notification Channels

- **DEV**: `sc-dev-investment-argocd`
- **STAG**: `sc-stag-investment-argocd`
- **BETA**: `sc-prod-investment-argocd`
- **PRODUCTION**: `sc-prod-investment-argocd`

## ⚠️ Important Notes

1. **Code Owners**: Production deployments would require code-owner approval in a real setup
2. **Rollback**: Each environment would support rollback procedures in a real setup
3. **Monitoring**: All deployments are logged in GitHub Actions
4. **Security**: Production deployments would have additional security checks in a real setup
5. **Testing Setup**: This is a simulation - actual deployment commands are replaced with echo statements 