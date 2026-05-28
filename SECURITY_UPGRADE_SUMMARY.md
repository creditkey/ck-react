# Security Upgrade Summary

## Overview
This document summarizes the dependency upgrades performed to address security vulnerabilities in the ck-react repository.

## Vulnerability Reduction

### Cumulative (all security work to date)
- **Original baseline**: 21 vulnerabilities (15 moderate, 6 high) — before any security remediation
- **Current state**: 15 vulnerabilities (9 low, 6 moderate, 0 high, 0 critical)
- **Improvement**: Eliminated all high-severity findings from the latest Vanta scope and reduced the moderate count, while retaining the `react-scripts`-compatible `webpack-dev-server` 4.x line

### This PR (sc-22722)
- **Before**: 18 vulnerabilities (9 low, 7 moderate, 2 high) — as reported by `npm audit` at start of sc-22722
- **After**: 15 vulnerabilities (9 low, 6 moderate, 0 high, 0 critical)
- **Improvement**: Remediated the high-severity findings for `@babel/plugin-transform-modules-systemjs` and `fast-uri`, plus the `postcss` and `uuid` findings; `webpack-dev-server` remains on 4.15.2 because 5.2.4 is not compatible with `react-scripts@5.0.1`

### This PR (sc-21281)
- **Before**: 30 vulnerabilities (10 low, 4 moderate, 16 high) — as reported by `npm audit` at start of sc-21281
- **After**: 11 vulnerabilities (9 low, 2 moderate, 0 high, 0 critical)
- **Improvement**: Resolved all 16 high-severity vulnerabilities identified in this sprint

## Major Dependency Upgrades

### Core Dependencies
- **React**: 16.13.1 → 18.3.1 (major version upgrade)
- **React DOM**: 16.13.1 → 18.3.1 (major version upgrade)
- **React Router DOM**: 5.2.0 → 6.28.0 (major version upgrade)

### UI and Styling
- **FontAwesome Core**: 1.2.24 → 6.7.2 (major version upgrade)
- **FontAwesome Icons**: 5.11.1 → 6.7.2 (major version upgrade)
- **FontAwesome React**: 0.1.4 → 0.2.6 (removed private registry requirement)
- **Bulma**: 0.9.0 → 1.0.4 (major version upgrade)

### Build Tools
- **Babel Core**: 7.10.5 → 7.26.0
- **Babel Preset Env**: 7.10.4 → 7.26.0
- **Sass**: 1.53.0 → 1.83.4

### Testing
- **Testing Library React**: 11.2.6 → 16.3.2

### Other
- **Currency.js**: 2.0.3 → 2.0.4
- **creditkey-js**: Kept as local file dependency `file:../creditkey-js`

## Security Overrides Applied
Added npm overrides to force secure versions of vulnerable sub-dependencies:
- **@babel/plugin-transform-modules-systemjs**: Upgraded to 7.29.4 (fixes CVE-2026-44728)
- **fast-uri**: Upgraded to 3.1.2 (fixes CVE-2026-6321, CVE-2026-6322)
- **nth-check**: Upgraded to 2.1.1 (fixes high severity ReDoS vulnerability)
- **postcss**: Upgraded to 8.5.15 (fixes CVE-2026-41305)
- **serialize-javascript**: Upgraded to 7.0.5 (fixes GHSA-5c6j-r48x-rmvq — RCE via RegExp.flags/Date.toISOString and DoS via crafted array-like objects)
- **underscore**: Upgraded to 1.13.8 (fixes CVE-2026-27601 — unlimited recursion in _.flatten and _.isEqual)
- **uuid**: Upgraded to 11.1.1 (fixes CVE-2026-41907)
- **webpack-dev-server**: Kept on 4.15.2 because `react-scripts@5.0.1` is incompatible with 5.2.4; forcing 5.2.4 caused `npm start` to fail
- **ws**: Upgraded to 8.20.1 (removes remaining moderate advisory in transitive tree)

**Note**: The lockfile now resolves `webpack-dev-server` to v4.15.2 via a `react-scripts`-scoped override. The Vanta-listed `webpack-dev-server` moderate findings remain open until the app can move off `react-scripts` or otherwise adopt a compatible 5.x dev-server path.

## Vanta High Vulnerability Remediation (sc-21281)
The following high-severity vulnerabilities identified by Vanta/Dependabot were remediated:

| Package | Vulnerable Range | Fix Applied | Method |
|---------|-----------------|-------------|--------|
| jsonpath | ≤ 1.2.1 (CVE-2026-1615) | 1.3.0 | `npm audit fix` |
| minimatch | < 3.1.3 (CVE-2026-26996, CVE-2026-27903, CVE-2026-27904) | 3.1.5 | `npm audit fix` |
| minimatch | 5.0.0–5.1.7 (CVE-2026-26996, CVE-2026-27903, CVE-2026-27904) | 5.1.9 | `npm audit fix` |
| rollup | < 2.80.0 (CVE-2026-27606) | 2.80.0 | `npm audit fix` |
| immutable | 5.0.0–5.1.4 (CVE-2026-29063) | 5.1.5 | `npm audit fix` |
| svgo | 2.1.0–2.8.0 (CVE-2026-29074) | 2.8.2 | `npm audit fix` |
| lodash | ≤ 4.17.23 (GHSA-r5fr-rjxr-66jc, GHSA-f23m-r3pf-42rh) | 4.18.1 | `npm audit fix` |
| path-to-regexp | < 0.1.13 (GHSA-37ch-88jc-xwx2) | 0.1.13 | `npm audit fix` |
| serialize-javascript | ≤ 7.0.2 (GHSA-5c6j-r48x-rmvq) | 7.0.5 | override in package.json |
| underscore | ≤ 1.13.7 (CVE-2026-27601) | 1.13.8 | override in package.json |

## Remaining Vulnerabilities
The remaining vulnerabilities are limited to the `react-scripts@5.0.1` toolchain:
- **Severity**: Low (9), Moderate (6), no high/critical
- **Packages**:
  - `webpack-dev-server` 4.15.2 and its `react-scripts` dev-server chain (`@pmmmwh/react-refresh-webpack-plugin`, `express`, `body-parser`, `qs`)
  - Jest/jsdom transitive dependencies via `react-scripts@5.0.1`
- **Resolution Path**:
  - Wait for upstream `react-scripts` maintenance updates, or
  - Migrate from CRA/react-scripts to a modern maintained toolchain (for example, Vite)

## Code Changes for Compatibility

### React 18 Migration
Updated rendering API in `src/index.js`:
```javascript
// Before (React 16)
import { render } from "react-dom";
render(<App />, document.getElementById("root"));

// After (React 18)
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

### React Router v6 Migration
Updated routing API across multiple files:
- `Switch` → `Routes`
- `Redirect` → `Navigate`
- `component={Component}` → `element={<Component />}`
- Removed `exact` prop (default behavior in v6)
- Updated route paths (removed `/store` prefix in nested routes)

## Testing
- ✅ `npm ci`
- ✅ `npm test -- --watchAll=false` (CRA test runner starts; no repository tests are defined)
- ⚠️ `npm run build` is blocked in this sandbox because `creditkey-js` is a required sibling checkout (`file:../creditkey-js`) and is not present here
- ⚠️ `npm start` with `webpack-dev-server` 5.2.4 was not kept because it failed under `react-scripts@5.0.1`

## Recommendations

### Short Term
The current state has no non-low vulnerabilities in the npm audit output. The remaining low-severity findings are in older jest/jsdom transitive packages from `react-scripts`.

### Long Term
Consider migrating from Create React App (react-scripts) to a modern build tool like:
- **Vite**: Modern, fast, better maintained
- **Next.js**: If server-side rendering is needed
- **Remix**: For advanced routing and data loading

This would eliminate the eslint vulnerabilities and provide better performance and developer experience.
