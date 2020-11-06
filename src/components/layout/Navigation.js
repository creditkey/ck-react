import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="/store">
          <img className="logo" src="/ck-mark.svg" alt="CreditKey Logo" />
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/store" className="navbar-item">
            Demo Store
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
