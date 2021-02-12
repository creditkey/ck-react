import React from "react";
import currency from "currency.js";

export default ({ item }) => {
  return (
    <>
      <tr className="product">
        <td className="product__image">
          <div className="product-thumbnail ">
            <div className="product-thumbnail__wrapper">
              <img
                alt={item.name}
                className="product-thumbnail__image"
                src={item.thumbnail}
              />
            </div>
            <span className="product-thumbnail__quantity">{item.qty}</span>
          </div>
        </td>
        <th className="product__description" scope="row">
          <span
            className="product__description__name order-summary__emphasis"
            style={{ marginLeft: "10px" }}
          >
            {item.name}
          </span>
        </th>
        <td className="product__price">
          <span className="order-summary__emphasis skeleton-while-loading">
            {currency(item.price).format()}
          </span>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
    </>
  );
}
