# React Webpack Demo

A simple webpack-based React application with routing and automated releases.

## Branching Strategy

This project uses a two-branch strategy:

- **`main`** - Staging branch for development and testing
- **`prod`** - Production deployment branch with release-please automation

### Workflow

1. **Development**: Work on `main` branch
2. **Releases**: Automated releases are triggered when changes are pushed to `main`
3. **Deployment**: The `prod` branch contains the production-ready code with release automation

## Features

- Webpack 5 configuration
- React 18 with functional components
- React Router for navigation
- Two simple routes: Home and About
- Hot reloading for development

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the application for production
- `npm run dev` - Start the development server and open in browser

## Release Management

This project uses [release-please](https://github.com/googleapis/release-please) for automated releases.

### How it works:

1. **Conventional Commits**: Use conventional commit messages (feat:, fix:, chore:, etc.)
2. **Automated Releases**: When changes are pushed to `main`, release-please creates PRs for releases
3. **Version Management**: Versions are automatically bumped based on commit types

### Commit Types:
- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump)
- `BREAKING CHANGE:` - Breaking changes (major version bump)
- `chore:` - Maintenance tasks (no version bump)

## Project Structure

```
├── .github/
│   └── workflows/
│       └── release-please.yml
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   └── About.js
│   ├── App.js
│   └── index.js
├── .babelrc
├── .gitignore
├── .release-please-config.json
├── CHANGELOG.md
├── package.json
├── README.md
└── webpack.config.js
``` 