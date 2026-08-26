# ck-react Repository Instructions

## Purpose and workflow

`ck-react` is a React demonstration application for Credit Key financing and
Pay-in-4 integrations. It uses the local `creditkey-js` dependency from
`../creditkey-js`; keep that dependency relationship intact.

Use the scripts defined in `package.json`:

```bash
npm start
npm test
npm run build:staging
npm run build:production
```

The build scripts load `.env.staging` or `.env.production`. Do not commit API
keys, credentials, or other sensitive environment values.

## Implementation rules

- Prefer functional React components and hooks. Do not introduce class
  components; legacy class-based code may be refactored incrementally.
- Use React Router v6 APIs and preserve the established checkout success and
  cancelled callback routes.
- Keep cart state in `cartContext` and administrative/testing overrides in
  `adminContext`. Reducers must remain pure and predictable; persist cart data
  to `localStorage` where appropriate.
- Follow existing naming and layout conventions: PascalCase component files,
  camelCase utility files and functions, and focused components. Use Bulma
  classes with custom SCSS as needed.
- Initialize Credit Key SDK clients in `src/lib/utils.js`, use environment
  variables for API keys, and preserve both Credit Key and Pay-in-4 payment
  flows.
- Maintain the existing `react-app` ESLint configuration. Validate user input
  and use HTTPS in production.

## Verification and documentation

- Add or update focused React Testing Library tests for behavior changes, then
  run the relevant checks from `package.json` before completion.
- Update `README.md` for user-facing, setup, usage, or environment changes.
  Update `ARCHITECTURE.md` for significant component, routing, state,
  dependency, build/deployment, or environment-configuration changes.
- Inspect the final diff and ensure it contains no secrets, generated artifacts,
  or unrelated edits.

## References

- [README](README.md)
- [Architecture](ARCHITECTURE.md)
