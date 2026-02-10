This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependency Updates (February 2026)

This project has been updated to use modern, secure versions of all dependencies:

- **React 18.3.1** (upgraded from 16.13.1)
- **React Router v6.28.0** (upgraded from v5.2.0)  
- **React Scripts 5.0.1** (upgraded from 5.0.0)
- **Babel 7.26.10** (upgraded from 7.10.x)
- **FontAwesome 6.7.2** (upgraded from 1.2.x/5.11.x)
- **Sass 1.83.4** (upgraded from 1.53.0)
- **Bulma 1.0.2** (upgraded from 0.9.0)

### Security Status

The upgrade reduced vulnerabilities from **43 to 3 moderate** severity issues:

- **Remaining vulnerabilities**: 3 moderate severity issues in `webpack-dev-server` (CVE-2025-30360)
  - **Scope**: Development environment only (not in production builds)
  - **Risk**: Requires accessing a malicious website while dev server is running on a non-Chromium browser
  - **Mitigation**: The issue is limited to local development environments. Production builds are not affected.
  - **Note**: react-scripts 5.0.1 does not support webpack-dev-server 5.2.1+ which contains the fix. Upgrading would require ejecting from Create React App or waiting for a new react-scripts version.

Run `npm audit` to see the current security status.

## Getting Started

### `yarn install` 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
