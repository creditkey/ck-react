import React from "react";

export default ({ product }) => {
  return (
    <strong>
      {product.formattedPrice()}
    </strong>
  );
}
