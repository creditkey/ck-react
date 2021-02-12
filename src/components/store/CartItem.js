import React from "react";
import { Link } from "react-router-dom";
import Price from "./product/price"
import ProductThumb from "./product/thumb";
import Product from "../../models/product";

export default ({ item }) => {
  const product = Product.find(item.category, item.slug);

  return (
    <div className="column is-full cart-row">
      <div className="columns">
        <div className="column is-2">
          <ProductThumb product={product} />
        </div>
        <div className="column is-5 cart-v-center">
          <p>
            <Link to={product.url}>{product.name}</Link>
          </p>
          <p>{product.formattedPrice()}</p>
        </div>
        <div className="column is-2 cart-v-center">Qty: {item.qty}</div>
        <div className="column is-2 cart-v-center">
          <Price product={product} />
        </div>
        <div className="column is-1 cart-v-center">
          <button
            className="button is-info"
            onClick={() => product.removeFromCart()}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
