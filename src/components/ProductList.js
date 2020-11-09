import React from "react";
import products from "../config/data/products.json";
import currency from "currency.js";

const productList = [
  products["ice-machine"],
  products["ice-machine"],
  products["ice-machine"],
  products["ice-machine"],
  products["ice-machine"],
  products["ice-machine"],
  products["ice-machine"],
  products["ice-machine"],
];

export default function ProductList() {
  return (
    <div
      className="productgrid--outer layout--has-sidebar productgrid-gridview"
      style={{ marginTop: "10px" }}
    >
      <div className="productgrid--masthead">
        <h1 className="collection--title">Products</h1>
      </div>

      <div className="productgrid--sidebar">
        <div className="productgrid--sidebar-section">
          <nav aria-label="Collection filters">
            <h3 className="productgrid--sidebar-title--small">Category</h3>
            <ul className="productgrid--sidebar-item filter-group">
              <li className="filter-item">
                <a href="/products/ice-machine">
                  <span className="filter-text">Ice Machines</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <ul className="productgrid--items products-per-row-4">
        {productList.map((product, index) => (
          <li className="productgrid--item imagestyle--natural productitem--sale show-actions--mobile" key={index}>
            <div className="productitem">
              <a
                className="productitem--image-link"
                href={`/products/${product.slug}`}
              >
                <figure className="productitem--image">
                  <img
                    src={`/images/products/${product.slug}/${product.thumb}`}
                    className="productitem--image-primary"
                    style={{ width: "201px", height: "201px" }}
                    alt="Product Thumbnail"
                  />

                  <span className="productitem--badge badge--sale">
                    Save&nbsp;
                    <span className="money">
                      {currency(product["original-price"] - product.price).format()}
                    </span>
                  </span>
                </figure>
              </a>
              <div className="productitem--info">
                <h2 className="productitem--title">
                  <a href={`/products/${product.slug}`}>{product.name}</a>
                </h2>

                <span className="productitem--vendor">
                  <a href={`/products/${product.slug}`} title={product.company}>
                    Scotsman
                  </a>
                </span>

                <div className="productitem--price">
                  <div className="price--compare-at visible">
                    <span className="money">
                      {currency(product["original-price"]).format()}
                    </span>
                  </div>

                  <div className="price--main">
                    <span className="money">
                      {currency(product["price"]).format()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
