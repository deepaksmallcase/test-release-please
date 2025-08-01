# 🚀 Deployment Process

This document outlines the deployment process for different environments in the React Webpack Demo application.

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
2. Deployment takes approximately **15 minutes**
3. You'll receive notifications on the environment-specific channels:
   - **DEV**: `sc-dev-investment-argocd`
   - **STAG**: `sc-stag-investment-argocd`

### Step 3: Deployment Notifications

Look for the following notifications:

```
✅ DEV/STAG deployment completed successfully!
Environment: DEV/STAG
Tag: v1.2.3-dev
Commit: abc123def456
```

## 🧪 For BETA Environment

### Step 1: Generate Tag

Same as DEV/STAG process, but select `beta` as the environment.

### Step 2: Infrastructure PR

1. Once the build/image is created, a PR will be raised on the infrastructure repository
2. The PR requires approval from a **code-owner**
3. You'll be notified on the `sc-prod-investment-argocd` channel

### Step 3: ArgoCD Sync

After the infrastructure PR is merged:
1. ArgoCD will sync the changes
2. You'll receive an ArgoCD sync notification
3. Deployment will be live in the BETA environment

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
2. Production builds are created
3. You'll be notified on the `sc-prod-investment-argocd` channel

### Step 5: Infrastructure Approval

1. A PR will be created for production infrastructure changes
2. Requires approval from a **code-owner**
3. Once merged, changes go live in **5 minutes**

### Step 6: Live Deployment

1. ArgoCD syncs the changes
2. You'll receive an ArgoCD sync notification
3. Application is now live in production

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

1. **Code Owners**: Production deployments require code-owner approval
2. **Rollback**: Each environment supports rollback procedures
3. **Monitoring**: All deployments are monitored and logged
4. **Security**: Production deployments have additional security checks 