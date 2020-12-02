import React from "react";
import { Link } from "react-router-dom";

export default (props) => {
  return (
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
  );
};
