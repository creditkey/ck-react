import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";

import Context from "./Context";

// Pages
import LandingPage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductShowPage from "./pages/store/ProductShowPage";
import CartPage from "./pages/store/CartPage";
import CheckoutPage from "./pages/store/checkout/CheckoutPage";

// Credit Key Pages
import CreditKeySuccessPage from "./pages/credit-key/SuccessPage";
import CreditKeyCancelledPage from "./pages/credit-key/CancelledPage";

// Hidden Dev pages
import DevPage from "./pages/DevPage";

import "./styles/index.scss";

render(
  <React.StrictMode>
    <Context>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/products/:slug" component={ProductShowPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/dev" component={DevPage} />
          <Route
            exact
            path="/credit-key/success"
            component={CreditKeySuccessPage}
          />
          <Route
            exact
            path="/credit-key/cancelled"
            component={CreditKeyCancelledPage}
          />
          <Route exact path="/checkout" component={CheckoutPage} />

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
