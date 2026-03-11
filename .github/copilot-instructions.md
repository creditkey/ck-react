# GitHub Copilot Instructions for ck-react

This file provides context and instructions for GitHub Copilot when working in this repository.

## Repository Purpose

`ck-react` is a React-based demo storefront used to test and demonstrate the Credit Key buy-now-pay-later checkout integration. It is not a production customer-facing application; it exists to exercise the `creditkey-js` SDK in realistic e-commerce scenarios.

## Architecture

See [`ARCHITECTURE.md`](../ARCHITECTURE.md) for a full description of the repository structure, technology stack, state management, routing, and deployment pipeline.

## Maintaining ARCHITECTURE.md

**Every pull request that introduces structural changes to this repository must include an update to `ARCHITECTURE.md`.**

Update `ARCHITECTURE.md` whenever a PR:
- Adds or removes top-level directories or significant subdirectories under `src/`
- Adds, renames, or removes pages, routes, or layout components
- Introduces new state management patterns, reducers, or contexts
- Changes how the Credit Key SDK is initialised or how checkout is triggered
- Adds new environment variables or changes environment configuration
- Modifies the build or deployment pipeline (Makefile, npm scripts, CI)
- Adds new external dependencies that affect the architectural overview
- Introduces new utility libraries, hooks, or shared services

Minor changes (bug fixes, style tweaks, copy changes, or adding a new product to the catalogue) do not require an `ARCHITECTURE.md` update.

## Code Style & Conventions

- **React functional components only** – no class components.
- **State** is managed via React Context API + `useReducer`. Do not introduce Redux or other state management libraries.
- **Routing** uses React Router DOM v6 (`<Routes>` / `<Route>`). All store routes are nested under `/store/*`.
- **Styling** uses SCSS + Bulma. Add component-scoped styles in `src/styles/` using the existing naming conventions.
- **Hooks** belong in `src/hooks/`. Keep hook logic focused and side-effect free where possible.
- **Utility functions** belong in `src/lib/utils.js` or a new file under `src/lib/` if sufficiently distinct.
- **Environment variables** must be prefixed with `REACT_APP_` to be accessible at runtime.
- Keep components small and focused; extract sub-components into the appropriate subdirectory (e.g., `src/components/store/product/` for product display sub-components).

## Testing

Tests use `@testing-library/react`. Run the test suite with:

```bash
npm test
```

Add test coverage for new hooks, utility functions, and any non-trivial component logic.

## Deployment

- **Staging**: `make staging`
- **Production**: `make production`

Both targets build the app with the appropriate `.env` file and sync the output to AWS S3, followed by a CloudFront cache invalidation.
