# React Webpack Demo

A simple webpack-based React application with routing.

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

## Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   └── About.js
│   ├── App.js
│   └── index.js
├── package.json
├── webpack.config.js
└── .babelrc
``` 