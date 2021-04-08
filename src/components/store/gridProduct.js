import React from "react";
import { Link } from "react-router-dom";

import ProductThumb from "./product/thumb";
import AmountSaved from "./product/grid/amountSaved";
import OriginalPrice from "./product/grid/originalPrice";
import Price from "./product/grid/price";

export default ({ product }) => {
  return (
    <div className="card grid-product">
      <Link to={product.url}>
        <div className="card-image">
          <figure className="image">
            <ProductThumb product={product} />
            {/* <AmountSaved product={product} /> */}
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <h4>{product.name}</h4>
            <p className="grid-company has-text-grey">{product.company}</p>
            {/* <OriginalPrice product={product} /> */}
            <Price product={product} />
          </div>
        </div>
      </Link>
    </div>
  );
}
