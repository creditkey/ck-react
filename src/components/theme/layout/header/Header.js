import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Icons
import ShoppingCartIcon from "../../icons/ShoppingCartIcon";
import SearchIcon from "../../icons/SearchIcon";
import TruckIcon from "../../icons/TruckIcon";

import "./styles.css";

import { cartContext } from "../../../../Context";

function Header() {
  const { cart } = useContext(cartContext);
  const cartCount = Object.keys(cart.items).length;

  return (
    <header className="site-header-nav--open">
      <div className="site-header-wrapper">
        <div className="site-header-main">
          <button className="site-header-menu-toggle" data-menu-toggle="">
            <div className="site-header-menu-toggle--button" tabIndex="-1">
              <span className="toggle-icon--bar toggle-icon--bar-top"></span>
              <span className="toggle-icon--bar toggle-icon--bar-middle"></span>
              <span className="toggle-icon--bar toggle-icon--bar-bottom"></span>
              <span className="visually-hidden">Menu</span>
            </div>
          </button>

          <div className="site-header-main-content small-promo-enabled">
            <div className="site-header-logo">
              <a className="site-logo" href="/">
                <img className="logo" src="/ck-mark.svg" alt="CreditKey Logo" />
              </a>
            </div>

            <div className="live-search" data-live-search="">
              <form className="live-search-form form-fields-inline">
                <input type="hidden" name="type" value="article,page,product" />
                <div className="form-field no-label">
                  <input
                    className="form-field-input live-search-form-field"
                    type="text"
                    placeholder="What are you looking for?"
                  />
                  <button className="live-search-takeover-cancel" type="button">
                    Cancel
                  </button>

                  <button
                    className="live-search-button mdc-ripple-surface mdc-ripple-upgraded"
                    type="submit"
                  >
                    <span className="search-icon search-icon--inactive">
                      <SearchIcon />
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <div className="small-promo">
              <span className="small-promo-icon small-promo-icon--svg">
                <TruckIcon />
              </span>

              <div className="small-promo-content">
                <span className="small-promo-heading">Free Shipping</span>

                <div className="small-promo-text-mobile">
                  <p>on all orders over $75</p>
                </div>

                <div className="small-promo-text-desktop">
                  <p>on all orders over $75</p>
                </div>
              </div>
            </div>
          </div>

          <div className="site-header-cart">
            <Link className="site-header-cart--button" to="/cart">
              <span className="site-header-cart--count"></span>
              <span
                className="site-header-cart--count visible"
                data-header-cart-count={cartCount}
              ></span>
              <ShoppingCartIcon />
            </Link>
          </div>
        </div>

        <div className="site-navigation-wrapper" id="site-header-nav">
          <nav className="site-navigation" aria-label="Main">
            <ul className="navmenu navmenu-depth-1">
              <li className="navmenu-item navmenu-id-home">
                <Link className="navmenu-link" to="/">
                  Home
                </Link>
                <Link className="navmenu-link" to="/products">
                  Products
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
