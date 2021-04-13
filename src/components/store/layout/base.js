import React from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import HomePage from "../pages/home";
import CategoriesIndexPage from "../pages/categories";
import ProductShowPage from "../pages/productShow";
import CartPage from "../pages/cart";
import CheckoutPage from "../pages/checkout";

// Credit Key Pages
import CreditKeySuccessPage from "../pages/callbacks/success";
import CreditKeyCancelledPage from "../pages/callbacks/cancelled";

import Header from "./header";
import Footer from "./footer";

export default (props) => {
  return (
    <>
      <section className="top-banner has-text-centered">
        <img
          className="is-centered"
          src="/images/banners/home-page-top-banner.png"
          alt="Home Page Top Banner"
        />
        <a href="#">BUY NOW, PAY LATER WITH CREDIT KEY  <span>PREQUALIFY NOW</span></a>
      </section>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/store/checkout" component={CheckoutPage} />
          <Route exact path="/store" component={HomePage} />
          <Route exact path="/store/cart" component={CartPage} />
          <Route exact path="/store/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/store/:category"
            component={CategoriesIndexPage}
          />
          <Route
            exact
            path="/store/products/:category/:slug"
            component={ProductShowPage}
          />
          <Route
            exact
            path="/store/credit-key/success"
            component={CreditKeySuccessPage}
          />
          <Route
            exact
            path="/store/credit-key/cancelled"
            component={CreditKeyCancelledPage}
          />
        </Switch>
        </div>
      <Footer />
    </>
  );
};
