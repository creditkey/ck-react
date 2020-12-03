import React from "react";

export default ({ product, image }) => {
  return (
    <img
      src={`/images/products/${product.slug}/${product.images[image]}`}
      alt={image}
    />
  );
}
