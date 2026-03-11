# Architecture: ck-react

## Overview

`ck-react` is a React-based demo storefront application used to test and demonstrate the [Credit Key](https://www.creditkey.com) buy-now-pay-later checkout integration. It simulates a real e-commerce store (selling commercial refrigeration equipment) and exercises the [`creditkey-js`](https://github.com/creditkey/creditkey-js) SDK to initiate Credit Key checkout flows. The app is deployed to AWS S3 and served via CloudFront.

---

## Technology Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 (Create React App) |
| Routing | React Router DOM v6 |
| State Management | React Context API + `useReducer` |
| Styling | SCSS (Sass) + Bulma CSS framework |
| Icons | FontAwesome |
| CK SDK | `creditkey-js` (local file dependency) |
| Currency Formatting | `currency.js` |
| Build / Deploy | npm scripts + AWS S3 + CloudFront |
| Node Version | Managed via `.tool-versions` |

---

## Repository Structure

```
ck-react/
├── public/                         # Static HTML shell and public assets
├── src/
│   ├── index.js                    # Application entry point; sets up routing and context
│   ├── Context.js                  # Root React Context provider (admin + cart contexts)
│   ├── components/
│   │   ├── layout/                 # Generic layout primitives (Header, Footer, Navigation, etc.)
│   │   └── store/                  # Store-specific components
│   │       ├── layout/             # Store layout shell (base, header, footer, navigation)
│   │       ├── pages/              # Page-level components
│   │       │   ├── home.js         # Store homepage
│   │       │   ├── categories.js   # Product category listing
│   │       │   ├── freezers.js     # Freezers category page
│   │       │   ├── iceMachines.js  # Ice machines category page
│   │       │   ├── storage.js      # Storage category page
│   │       │   ├── tabletop.js     # Tabletop category page
│   │       │   ├── productShow.js  # Product detail page (PDP)
│   │       │   ├── cart.js         # Shopping cart page
│   │       │   ├── checkout/       # Multi-step checkout flow
│   │       │   │   ├── index.js    # Checkout page container
│   │       │   │   └── steps/      # Individual checkout steps
│   │       │   │       ├── contact.js
│   │       │   │       ├── shipping.js
│   │       │   │       └── payment.js
│   │       │   └── callbacks/      # Credit Key redirect callbacks
│   │       │       ├── success.js
│   │       │       └── cancelled.js
│   │       ├── product/            # Reusable product display sub-components
│   │       │   ├── grid/           # Grid-card price/savings sub-components
│   │       │   ├── image.js
│   │       │   ├── price.js
│   │       │   └── thumb.js
│   │       ├── icons/              # SVG icon components
│   │       ├── inputs/             # Form input components (CountrySelector, StateSelector)
│   │       ├── CheckoutWithCreditKey.js  # "Continue with Credit Key" button component
│   │       ├── CkPaymentOption.js  # Credit Key payment option display
│   │       ├── grid.js             # Product grid layout
│   │       ├── gridProduct.js      # Individual product card in grid
│   │       └── page.js             # Generic store page wrapper
│   ├── hooks/
│   │   └── cart.js                 # useCart hook: exposes cart state and actions
│   ├── lib/
│   │   ├── utils.js                # CK SDK client setup, utility helpers
│   │   └── load_checkout.js        # Initiates Credit Key checkout via the SDK
│   ├── models/
│   │   └── product.js              # Product model and static product data access
│   ├── reducers/
│   │   ├── cart.js                 # Cart reducer (add/remove/change quantity; persists to localStorage)
│   │   └── admin.js                # Admin/dev reducer (override email, username, price)
│   ├── pages/
│   │   └── DevPage.js              # Hidden developer page for testing scenarios
│   ├── config/
│   │   └── data/                   # Static product catalogue data
│   └── styles/                     # Global and component-scoped SCSS stylesheets
├── .env                            # Local environment variables (not committed)
├── .env.staging                    # Staging environment variables
├── .env.production                 # Production environment variables
├── .npmrc                          # npm registry configuration
├── .tool-versions                  # Node/tool version pins (asdf)
├── Makefile                        # Build and deploy targets (staging, production)
├── package.json                    # Project manifest and scripts
├── README.md                       # Project overview and quick-start
└── ARCHITECTURE.md                 # This file
```

---

## Key Architectural Concepts

### State Management

Global state is managed entirely through the React Context API with `useReducer`. There are two contexts:

- **`cartContext`** – Tracks items in the shopping cart. State is persisted to `localStorage` so the cart survives page refreshes.
- **`adminContext`** – Holds dev/test overrides (email, username, price) used on the hidden `/dev` page.

Both contexts are composed inside `src/Context.js` and provided at the application root.

### Routing

React Router DOM v6 is used with a nested route structure:

| Route | Component |
|---|---|
| `/store/*` | `StoreLayout` (all store pages) |
| `/dev` | `DevPage` (hidden developer testing page) |
| `*` | Redirects to `/store` |

Store sub-routes (home, categories, product pages, cart, checkout, callbacks) are defined inside `src/components/store/layout/base.js`.

### Credit Key Integration

The Credit Key SDK (`creditkey-js`) is initialised in `src/lib/utils.js`. Two SDK clients are created:

- **`client`** – Standard Credit Key client using `REACT_APP_PUBLIC_KEY`.
- **`pi4Client`** – Pay-in-4 variant using `REACT_APP_PI4_PUBLIC_KEY`.

The `ispayin4()` utility determines which client to use based on the hostname (i.e., whether the app is running on a `payin4.*` subdomain).

Checkout is initiated from `src/lib/load_checkout.js`, which calls `sdkClient.begin_checkout(...)` and either redirects the user to the Credit Key checkout URL or opens it as a modal, depending on the `redirect` flag.

### Styling

Styles are written in SCSS and live in `src/styles/`. Bulma is used as the base CSS framework. Component-specific stylesheets are named after their corresponding feature (e.g., `checkout.scss`, `cart.scss`, `pdp.scss`).

### Environment Configuration

Three `.env` files control environment-specific settings:

| File | Purpose |
|---|---|
| `.env` | Local development defaults |
| `.env.staging` | Staging environment (S3 + CloudFront) |
| `.env.production` | Production environment (S3 + CloudFront) |

The active environment is selected at build time via the `REACT_APP_ENV` variable (see `Makefile` and `package.json` build scripts).

### Deployment

The app is built and deployed via `make staging` or `make production`. Each target:
1. Sets `REACT_APP_ENV` and runs `npm run build`.
2. Syncs the `build/` output to the appropriate S3 bucket.
3. Creates a CloudFront invalidation to purge the CDN cache.

---

## Data Flow: Adding an Item and Checking Out

```
User clicks "Add to Cart"
  → useCart hook dispatches ADD_ITEM action
  → CartReducer updates state and persists to localStorage
  → Cart icon/count updates reactively

User navigates to Cart → Checkout
  → CheckoutPage renders multi-step form (contact → shipping → payment)
  → PaymentStep renders CheckoutWithCreditKey button

User clicks "Continue with Credit Key"
  → load_checkout.js is called with cart items, address, and charges
  → creditkey-js SDK initiates begin_checkout API call
  → User is redirected to Credit Key hosted checkout URL

On return from Credit Key:
  → /store/credit-key/success  → success.js callback page
  → /store/credit-key/cancelled → cancelled.js callback page
```

---

## Maintenance Notes

- **This file must be updated with every PR** that introduces structural changes to the repository (new directories, new services, new integrations, routing changes, state changes, or deployment changes). See `.github/copilot-instructions.md` for details.
- Product catalogue data lives in `src/config/data/` and is loaded statically via the `Product` model in `src/models/product.js`.
- The `/dev` route and `DevPage` component are intentionally not linked from the store UI and are used exclusively for manual Credit Key integration testing.
