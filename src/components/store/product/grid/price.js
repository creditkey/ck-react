import React from "react";

export default ({ product }) => {
  return (
    <strong className="has-text-danger">
      {product.formattedPrice()}
    </strong>
  );
}
