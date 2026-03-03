# Architecture Documentation

## Overview

This repository contains a React-based demonstration application for the Credit Key payment platform. It serves as a reference implementation showcasing how to integrate Credit Key's financing and Pay-in-4 payment options into an e-commerce storefront. The application is built with Create React App and demonstrates a modern React architecture using hooks, context API, and functional components.

## Technology Stack

### Core Technologies
- **React 18.3.1**: UI framework using functional components and hooks
- **React Router DOM 6.28.0**: Client-side routing
- **React Scripts 5.0.1**: Build tooling and development server (Create React App)
- **creditkey-js**: Credit Key SDK (local file dependency)

### UI Libraries
- **Bulma 1.0.4**: CSS framework for styling
- **FontAwesome**: Icon library
- **Sass 1.83.4**: CSS preprocessor

### Utilities
- **currency.js**: Currency formatting and calculations

### Build & Deployment
- **AWS S3**: Static site hosting
- **AWS CloudFront**: CDN distribution
- **Makefile**: Deployment automation

## Project Structure

```
/
├── public/                 # Static assets
│   ├── images/            # Product images and static media
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
│
├── src/
│   ├── components/        # Reusable React components
│   │   ├── store/        # Store-specific components
│   │   │   ├── layout/   # Layout components (Header, Footer, Navigation)
│   │   │   ├── pages/    # Page-level components
│   │   │   ├── product/  # Product-related components
│   │   │   ├── icons/    # Icon components
│   │   │   └── inputs/   # Form input components
│   │   ├── ApplyFlow.js  # Credit Key application flow
│   │   ├── CheckoutWithCreditKey.js  # Checkout integration
│   │   └── ...
│   │
│   ├── pages/            # Page components (routes)
│   │   └── DevPage.js    # Development/testing page
│   │
│   ├── reducers/         # State management reducers
│   │   ├── admin.js      # Admin state (email, pricing overrides)
│   │   └── cart.js       # Shopping cart state
│   │
│   ├── hooks/            # Custom React hooks
│   │   └── cart.js       # Cart-related hooks
│   │
│   ├── lib/              # Utility libraries
│   │   ├── load_checkout.js  # Credit Key checkout initialization
│   │   └── utils.js      # Helper functions
│   │
│   ├── models/           # Data models
│   │   └── product.js    # Product data model
│   │
│   ├── config/           # Configuration files
│   │   └── data/         # Static data/configuration
│   │
│   ├── styles/           # Global styles
│   │
│   ├── Context.js        # React Context providers
│   └── index.js          # Application entry point
│
├── .env                  # Environment variables (local)
├── .env.staging          # Staging environment variables
├── .env.production       # Production environment variables
├── Makefile              # Deployment scripts
└── package.json          # Dependencies and scripts
```

## Architecture Patterns

### State Management

The application uses React's Context API combined with useReducer hooks for state management, avoiding the need for external state management libraries like Redux.

#### Context Providers

**Location**: `src/Context.js`

Two primary contexts are defined:
- **cartContext**: Manages shopping cart state (items, quantities)
- **adminContext**: Manages administrative overrides (email, pricing for testing)

Each context uses its own reducer for state updates.

#### Reducers

**Cart Reducer** (`src/reducers/cart.js`)
- Actions: `ADD_ITEM`, `REMOVE_ITEM`, `CHANGE_QUANTITY`
- Persists state to localStorage
- Manages product quantities and cart items

**Admin Reducer** (`src/reducers/admin.js`)
- Actions: `UPDATE_EMAIL`, `UPDATE_PRICE`, `UPDATE_USERNAME`
- Provides testing/development overrides

### Component Architecture

The application follows a functional component architecture with React hooks:

- **Layout Components**: Header, Footer, Navigation (in `src/components/store/layout/`)
- **Page Components**: Full page views mapped to routes (in `src/components/store/pages/`)
- **Reusable Components**: Shared UI elements (inputs, displays, product grids)
- **Integration Components**: Credit Key-specific components for checkout and payment flows

### Routing Structure

**Main Routes** (defined in `src/index.js`):
- `/dev` - Development/testing page
- `/store/*` - Main store application
- `*` - Redirects to `/store`

**Store Routes** (defined in `src/components/store/layout/base.js`):
- `/store/` - Home page
- `/store/cart` - Shopping cart
- `/store/checkout` - Checkout page
- `/store/:category` - Category listing pages
- `/store/products/:category/:slug` - Individual product pages
- `/store/credit-key/success` - Payment success callback
- `/store/credit-key/cancelled` - Payment cancellation callback

### Credit Key Integration

The application integrates with Credit Key's SDK for financing and Pay-in-4 options:

1. **SDK Initialization**: Client instances created in `src/lib/utils.js` using environment variables
2. **Checkout Flow**: `src/lib/load_checkout.js` handles checkout initialization
3. **Payment Options**: Support for both standard Credit Key and Pay-in-4 variants
4. **Callbacks**: Success and cancellation routes handle payment flow returns

### Data Flow

1. **Product Data**: Static product data stored in `src/config/data/`
2. **Cart Management**: Items added/removed via cart reducer, persisted to localStorage
3. **Checkout**: Cart data + customer info → Credit Key SDK → Redirect or modal checkout
4. **Callbacks**: Credit Key redirects back to success/cancel routes after payment flow

## Build & Deployment Process

### Development

```bash
npm install        # Install dependencies
npm start          # Start development server (port 3000)
```

### Build

The application supports multiple environments:

```bash
npm run build                  # Build with environment from .env.${REACT_APP_ENV}
npm run build:staging         # Build for staging environment
npm run build:production      # Build for production environment
```

### Deployment

Deployment is handled via Makefile:

**Staging**:
```bash
make staging
```
- Builds with staging environment
- Syncs to S3 bucket: `demo.creditkey.tech`
- Invalidates CloudFront distribution: `E6ITSIH0ET7AS`

**Production**:
```bash
make production
```
- Builds with production environment
- Syncs to S3 bucket: `creditkey-test`
- Invalidates CloudFront distribution: `E3W1V8EI3ZGJZ0`

## Environment Configuration

Environment variables are managed through `.env` files:

- `.env` - Local development (default)
- `.env.staging` - Staging environment
- `.env.production` - Production environment

**Key Variables**:
- `REACT_APP_PUBLIC_KEY`: Credit Key public API key
- `REACT_APP_PI4_PUBLIC_KEY`: Pay-in-4 public API key
- `REACT_APP_ENV`: Environment name (staging/production)

## Testing

```bash
npm test          # Run test suite
```

Tests use React Testing Library for component testing.

## Code Style & Conventions

- **Components**: Functional components with hooks
- **File Naming**: PascalCase for component files, camelCase for utilities
- **State Management**: Context API + useReducer pattern
- **Styling**: Bulma classes + custom SCSS
- **ESLint**: Extends `react-app` configuration

## Key Dependencies

- **creditkey-js**: Local file dependency (requires sibling repository)
- Must be cloned/available at `../creditkey-js` relative to this project

## Browser Support

- Modern browsers (Chrome, Firefox, Safari)
- Production: >0.2% usage, not dead, not op_mini all
- Development: Latest Chrome, Firefox, Safari versions

## Security Considerations

- API keys are environment-specific and not committed to repository
- Customer data is ephemeral (test data only in this demo)
- HTTPS enforced in production (via CloudFront)

## Future Considerations

This is a demonstration/reference application. For production use:
- Add proper error handling and user feedback
- Implement server-side rendering for SEO
- Add analytics and monitoring
- Implement proper authentication if needed
- Add comprehensive test coverage
- Consider state management library for complex scenarios
