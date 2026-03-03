# GitHub Copilot Instructions for ck-react

## General Guidelines

This repository contains a React-based demonstration application for Credit Key payment integration. When working on this codebase, follow these guidelines:

### Code Style and Conventions

- Use functional components with React hooks (no class components)
- Use Context API with useReducer for state management (this is appropriate for the current scope of this demo application; consider more robust state management libraries like Redux or Zustand for complex production applications with extensive global state needs)
- Follow existing naming conventions:
  - PascalCase for component files
  - camelCase for utility files and functions
- Use Bulma CSS classes for styling, with custom SCSS as needed
- Maintain existing ESLint configuration (extends `react-app`)

### Architecture Maintenance

**IMPORTANT**: Always maintain the `ARCHITECTURE.md` file with each PR that makes significant changes:

1. **When to Update ARCHITECTURE.md**:
   - Adding new components, pages, or major features
   - Modifying the folder structure
   - Changing state management patterns
   - Adding/removing dependencies
   - Changing build or deployment processes
   - Updating routing structure
   - Modifying environment configuration

2. **How to Update ARCHITECTURE.md**:
   - Update the relevant sections to reflect your changes
   - Keep descriptions concise but comprehensive
   - Update the project structure diagram if folders/files change
   - Document any new patterns or conventions introduced
   - Ensure consistency with existing documentation style

3. **What to Document**:
   - Purpose and scope of new components/features
   - Integration points with existing code
   - New dependencies and why they were added
   - Changes to data flow or state management
   - New environment variables or configuration

### Technology Stack Considerations

- **React 18+**: Use modern hooks (useState, useEffect, useContext, useReducer)
- **React Router v6**: Use the new routing API (Routes, Route, Navigate)
- **creditkey-js**: This is a local dependency from a sibling repository
- Maintain compatibility with browsers as specified in package.json

### State Management

- Use **cartContext** for shopping cart state
- Use **adminContext** for administrative/testing overrides
- Keep reducers pure and predictable
- Persist cart state to localStorage where appropriate

### Component Patterns

- **Layout Components**: Header, Footer, Navigation in `src/components/store/layout/`
- **Page Components**: Full-page views in `src/components/store/pages/`
- **Reusable Components**: Shared UI elements in `src/components/`
- Keep components focused and single-responsibility

### Credit Key Integration

- Initialize SDK clients in `src/lib/utils.js`
- Use environment variables for API keys (never hardcode)
- Support both Credit Key and Pay-in-4 variants
- Handle checkout callbacks properly (success/cancelled routes)

### Testing

- Add tests for new components using React Testing Library
- Follow existing test patterns
- Run `npm test` before submitting PR
- Maintain or improve test coverage

### Build and Deployment

- Do not modify deployment scripts without coordinating with team
- Test builds locally before pushing: `npm run build:staging` or `npm run build:production`
- Environment-specific configuration lives in `.env.{environment}` files
- Never commit API keys or secrets

### File Organization

- Place new components in appropriate directories based on their purpose
- Keep related files together (component + styles + tests)
- Update imports if moving files
- Follow existing folder structure patterns

### Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for architectural changes
- Add JSDoc comments for complex functions
- Document non-obvious code decisions

### Security

- Never commit sensitive data (API keys, credentials)
- Validate user inputs
- Use HTTPS in production
- Follow security best practices for React applications

## PR Checklist

Before submitting your PR, ensure:

- [ ] Code follows existing style and conventions
- [ ] ARCHITECTURE.md is updated if architectural changes were made
- [ ] README.md is updated if user-facing changes were made
- [ ] Tests are added/updated for new functionality
- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in development mode
- [ ] No new ESLint warnings introduced
- [ ] Environment variables are properly configured (not hardcoded)
- [ ] Changes are documented in PR description

## Questions?

If you're unsure about how to implement something:
1. Check ARCHITECTURE.md for patterns and conventions
2. Look for similar existing implementations in the codebase
3. Consult with the team before making major architectural changes
