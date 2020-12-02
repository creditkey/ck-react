import React from "react";

export default ({ product }) => {
  return (
    <p className="grid-original-price has-text-grey">
      {product.formattedOriginalPrice()}
    </p>
  );
};
