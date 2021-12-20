import React, { useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loadCheckout from "../../lib/load_checkout";
import { ispayin4 } from '../../lib/utils';

export default function CheckoutWithCreditKey({ address, cartItems, charges }) {
  const [loading, setLoading] = useState(false);

  const begin = () => {
    setLoading(true);

    return loadCheckout(
      { pi4: ispayin4() },
      { address: address, cart: cartItems, redirect: true },
      charges
    );
  };

  return (
    <button
      className="checkout-button"
      style={{ marginTop: "20px" }}
      onClick={(e) => {
        e.preventDefault();
        begin();
      }}
    >
      {loading && (
        <span className="icon">
          <FontAwesomeIcon icon={faSpinner} spin />
        </span>
      )}
      {loading && <>&nbsp;&nbsp;</>}Continue with Credit Key
    </button>
  );
}
