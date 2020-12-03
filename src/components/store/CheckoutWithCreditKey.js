import React from "react";
import { client } from "../../lib/utils";

export default function CheckoutWithCreditKey({ address, cartItems, charges }) {
  const returnUrl = "http://localhost:3000/credit-key/success?id=%CKKEY%&";
  const cancelUrl = "http://localhost:3000/credit-key/cancelled";
  const remoteId = new Date().getTime();

  const begin = () => {
    client
      .begin_checkout(
        cartItems,
        address,
        address,
        charges,
        remoteId,
        remoteId,
        returnUrl,
        cancelUrl,
        "modal"
      )
      .then((res) => (window.location = res.checkout_url));
  };

  return (
    <button
      className="button is-danger"
      style={{ marginTop: "20px" }}
      onClick={(e) => {
        e.preventDefault();
        begin();
      }}
    >
      Continue with Credit Key
    </button>
  );
}
