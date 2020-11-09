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
      <div class="productgrid--masthead">
        <h1 class="collection--title">Products</h1>
      </div>

      <div class="productgrid--sidebar">
        <div class="productgrid--sidebar-section">
          <nav aria-label="Collection filters">
            <h3 class="productgrid--sidebar-title--small">Category</h3>
            <ul class="productgrid--sidebar-item filter-group">
              <li class="filter-item">
                <a href="#">
                  <span class="filter-text">Ice Machines</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <ul className="productgrid--items products-per-row-4">
        {productList.map((product) => (
          <li class="productgrid--item imagestyle--natural productitem--sale show-actions--mobile">
            <div class="productitem">
              <a
                class="productitem--image-link"
                href={`/products/${product.slug}`}
              >
                <figure class="productitem--image">
                  <img
                    src={`/images/products/${product.slug}/${product.thumb}`}
                    class="productitem--image-primary"
                    style={{ width: "201px", height: "201px" }}
                  />

                  <span class="productitem--badge badge--sale">
                    Save&nbsp;
                    <span class="money">
                      {currency(product["original-price"] - product.price).format()}
                    </span>
                  </span>
                </figure>
              </a>
              <div class="productitem--info">
                <h2 class="productitem--title">
                  <a href={`/products/${product.slug}`}>{product.name}</a>
                </h2>

                <span class="productitem--vendor">
                  <a href={`/products/${product.slug}`} title={product.company}>
                    Scotsman
                  </a>
                </span>

                <div class="productitem--price">
                  <div class="price--compare-at visible">
                    <span class="money">
                      {currency(product["original-price"]).format()}
                    </span>
                  </div>

                  <div class="price--main">
                    <span class="money">
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
