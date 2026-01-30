import React from "react";
import { Routes, Route } from "react-router-dom";

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

        <a href="#">BUY NOW, PAY LATER WITH CREDIT KEY  <span>PREQUALIFY NOW</span></a>
      </section>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/:category"
            element={<CategoriesIndexPage />}
          />
          <Route
            path="/products/:category/:slug"
            element={<ProductShowPage />}
          />
          <Route
            path="/credit-key/success"
            element={<CreditKeySuccessPage />}
          />
          <Route
            path="/credit-key/cancelled"
            element={<CreditKeyCancelledPage />}
          />
        </Routes>
        </div>
      <Footer />
    </>
  );
};
