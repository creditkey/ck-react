# ck-react Repository Instructions

## Repository map and local setup

`ck-react` is a React demonstration application for Credit Key financing and
Pay-in-4 integrations. It uses the local `creditkey-js` dependency from
`../creditkey-js`; keep that dependency relationship intact.

`public/` contains static assets and the application HTML shell. `src/`
contains the React application, including components, contexts, reducers, and
SDK utilities.

Use Node.js `>=20`. Before installing dependencies, set
`FONTAWESOME_NPM_AUTH_TOKEN`; `.npmrc` uses it to authenticate to the Font
Awesome npm registry. Then install with:

```bash
npm ci
```

The package scripts are:

```bash
npm start
npm test
npm run build
npm run build:staging
npm run build:production
npm run eject
```

The build scripts load `.env.staging` or `.env.production`. Do not commit
secrets, private credentials, or other sensitive environment values. Public
frontend configuration, including the demo's `REACT_APP_PUBLIC_KEY` and
`REACT_APP_PI4_PUBLIC_KEY`, may be committed as documented in
`ARCHITECTURE.md`.

## Implementation rules

- Prefer functional React components and hooks. Do not introduce class
  components; legacy class-based code may be refactored incrementally.
- Use React Router v6 APIs and preserve the established checkout success and
  cancelled callback routes.
- Keep cart state in `cartContext` and administrative/testing overrides in
  `adminContext`. `src/reducers/cart.js` is a legacy exception: its reducer
  paths persist cart data to `localStorage`. Do not describe it as pure; any
  change must preserve this persistence behavior or explicitly handle its
  migration.
- Follow the repository’s existing file-naming conventions; component filenames are mixed case. Prefer camelCase for new utility files and functions, while recognizing that legacy utility code may use other naming conventions.
- Do not modify deployment scripts without coordinating with the team.
- Use focused components and Bulma classes with custom SCSS as needed.
- Initialize Credit Key SDK clients in `src/lib/utils.js`, use environment
  variables for API keys, and preserve both Credit Key and Pay-in-4 payment
  flows.
- Maintain the existing `react-app` ESLint configuration. Validate user input
  and use HTTPS in production.

## Verification and documentation

- Add or update focused React Testing Library tests for behavior changes, then
  run the relevant checks from `package.json` before completion.
- For deterministic verification, run `CI=true npm test -- --watchAll=false --passWithNoTests` for tests, `npx eslint "src/**/*.{js,jsx}"` for linting, and `npm run build:staging` (or `npm run build:production`) for a build.
- No database migrations apply to this Create React App repository.
- Update `README.md` for user-facing, setup, usage, or environment changes.
  Update `ARCHITECTURE.md` for significant component, routing, state,
  dependency, build/deployment, or environment-configuration changes.
- Inspect the final diff and ensure it contains no secrets, generated artifacts,
  or unrelated edits.

## References

- [README](README.md)
- [Architecture](ARCHITECTURE.md)
- [Shortcut story 24453](https://app.shortcut.com/credit-key/story/24453)
