import React from "react";

export default ({ product }) => {
  if (product.salePrice) {
    return (
      <div className="sale-price has-background-danger grid-amount-saved has-text-white">
        Save {product.formattedAmountSaved()}
      </div>
    );
  } else {
    return null;
  }
}
