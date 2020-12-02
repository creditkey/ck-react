import React from "react";

export default ({ product }) => {
  return (
    <strong className="pdp-price">
      {product.formattedPrice()}
    </strong>
  );
};
