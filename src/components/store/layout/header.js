import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import SearchIcon from "../icons/SearchIcon";

import useCart from "../../../hooks/cart";

export default () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const burgerClick = () => setMenuOpen(!menuOpen);
  const menuState = () => (menuOpen ? "is-active" : "");
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <Link to="/store">
                <img
                  className="atlas-logo"
                  src="/images/atlas-logo.png"
                  alt="Atlas Logo"
                />
              </Link>
            </div>
          </div>

          <div className="level-item is-expanded">
            <div className="field has-addons search">
              <p className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="What are you looking for?"
                />
              </p>
              <div className="control">
                <Link to="/store" className="button is-danger">
                  <SearchIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="level-right">
            <div className="level-item">
              <a href="#" className="button is-danger">
                CREATE A FREE ACCOUNT
              </a>
            </div>

            <div className="level-item">
              <Link to="/store/cart">
                <ShoppingCartIcon className="has-text-black" />
              </Link>
              <span className="tag is-info shopping-count">{cart.length}</span>
            </div>
          </div>
        </div>

        <nav className="navbar" role="navigation" aria-label="main">
          <div className="navbar-brand">
            <a
              role="button"
              className={`navbar-burger ${menuState()}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={burgerClick}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div
            className={`navbar-menu is-uppercase has-text-weight-semibold ${menuState()}`}
          >
            <div className="navbar-start">
              <Link
                className="navbar-item"
                to="/store/ice-machines"
                onClick={closeMenu}
              >
                Ice Machines
              </Link>
              <Link
                className="navbar-item"
                to="/store/ice-machines"
                onClick={closeMenu}
              >
                Commercial Refrigeration
              </Link>
              <Link
                className="navbar-item"
                to="/store/ice-machines"
                onClick={closeMenu}
              >
                Storage & Transport
              </Link>
              <Link
                className="navbar-item"
                to="/store/ice-machines"
                onClick={closeMenu}
              >
                Tabletop
              </Link>
              <Link
                className="navbar-item"
                to="/store/ice-machines"
                onClick={closeMenu}
              >
                Disposables
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <hr className="navbar-divider" />
    </header>
  );
};
