import React from "react";
import { Link } from "react-router-dom";

// Icons
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import SearchIcon from "../icons/SearchIcon";

import useCart from "../../../hooks/cart";

export default () => {
  const { cart } = useCart();

  return (
    <header>
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main">
          <div className="navbar-brand">
            <img
              className="atlas-logo"
              src="/images/atlas-logo.png"
              alt="Atlas Logo"
            />

            <a
              href="#"
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className="navbar-item is-expanded">
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

          <div className="navbar-end">
            <div className="navbar-item">
              <a href="#" className="button is-danger">CREATE A FREE ACCOUNT</a>
            </div>

            <div className="navbar-item">
              <Link to="/store/cart">
                <ShoppingCartIcon className="has-text-black" />
              </Link>
              <span className="tag is-info shopping-count">{cart.length}</span>
            </div>
          </div>
        </nav>
        <nav className="navbar" role="navigation" aria-label="navigation">
          <div className="navbar-menu is-uppercase has-text-weight-semibold">
            <div className="navbar-start">
              <Link className="navbar-item" to="/store/ice-machines">
                Ice Machines
              </Link>
              <Link className="navbar-item" to="/store/ice-machines">
                Commercial Refrigeration
              </Link>
              <Link className="navbar-item" to="/store/ice-machines">
                Storage & Transport
              </Link>
              <Link className="navbar-item" to="/store/ice-machines">
                Tabletop
              </Link>
              <Link className="navbar-item" to="/store/ice-machines">
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
