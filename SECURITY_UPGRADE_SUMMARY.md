# Security Upgrade Summary

## Overview
This document summarizes the dependency upgrades performed to address security vulnerabilities in the ck-react repository.

## Vulnerability Reduction

### Cumulative (all security work to date)
- **Original baseline**: 21 vulnerabilities (15 moderate, 6 high) — before any security remediation
- **Current state**: 11 vulnerabilities (9 low, 2 moderate, 0 high, 0 critical)
- **Improvement**: Eliminated all high-severity vulnerabilities (100% reduction in high/critical issues)

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
- **nth-check**: Upgraded to 2.1.1 (fixes high severity ReDoS vulnerability)
- **postcss**: Upgraded to 8.4.49 (fixes moderate severity parsing vulnerability)
- **serialize-javascript**: Upgraded to 7.0.5 (fixes GHSA-5c6j-r48x-rmvq — RCE via RegExp.flags/Date.toISOString and DoS via crafted array-like objects)
- **underscore**: Upgraded to 1.13.8 (fixes CVE-2026-27601 — unlimited recursion in _.flatten and _.isEqual)

**Note**: Initially added webpack-dev-server override to v5.2.3, but this was removed due to breaking API incompatibility with react-scripts@5.0.1. The webpack-dev-server vulnerabilities (GHSA-9jgg-88mc-972h, GHSA-4v9v-hfq4-rm2v) are moderate severity, dev-time only, and require accessing a malicious website while the dev server is running.

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
All remaining 11 vulnerabilities are:
- **Severity**: Low (9) and Moderate (2) only (no high or critical)
- **Packages**:
  - jest-related packages (9 low vulnerabilities)
    - **Root Cause**: react-scripts@5.0.1 depends on jest@27.x
  - webpack-dev-server@4.15.2 (2 moderate vulnerabilities)
    - **Issues**: Source code theft when accessing malicious website ([GHSA-9jgg-88mc-972h](https://github.com/advisories/GHSA-9jgg-88mc-972h), [GHSA-4v9v-hfq4-rm2v](https://github.com/advisories/GHSA-4v9v-hfq4-rm2v))
    - **Impact**: Development time only, requires user to visit malicious site while dev server is running
    - **Root Cause**: react-scripts@5.0.1 depends on webpack-dev-server@4.x; upgrading to v5.x breaks compatibility
- **Resolution Path**: 
  - Wait for react-scripts update (unlikely as CRA is in maintenance mode)
  - OR migrate to Vite/other modern build tool (recommended for future)

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
- ✅ Application builds successfully
- ✅ No compilation errors
- ✅ React 18 rendering works correctly
- ✅ React Router v6 navigation works correctly

## Recommendations

### Short Term
The current state is significantly improved with all high-severity vulnerabilities eliminated. The remaining moderate eslint vulnerabilities are acceptable for development/build time tools.

### Long Term
Consider migrating from Create React App (react-scripts) to a modern build tool like:
- **Vite**: Modern, fast, better maintained
- **Next.js**: If server-side rendering is needed
- **Remix**: For advanced routing and data loading

This would eliminate the eslint vulnerabilities and provide better performance and developer experience.
