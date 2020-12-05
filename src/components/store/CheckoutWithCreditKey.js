import React, { useState } from "react";
import ck from 'creditkey-js';
import {
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { client } from "../../lib/utils";

export default function CheckoutWithCreditKey({ address, cartItems, charges }) {
  const returnUrl = "http://localhost:3000/store/credit-key/success?id=%CKKEY%&";
  const cancelUrl = "http://localhost:3000/store/credit-key/cancelled";
  const [loading, setLoading] = useState(false);
  const remoteId = new Date().getTime();

  const begin = () => {
    setLoading(true);

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
        "redirect"
      )
      .then(res => ck.checkout(res.checkout_url, 'redirect'));
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
      {loading && <span className="icon">
        <FontAwesomeIcon icon={faSpinner} spin />
      </span>}
      {loading && <>&nbsp;&nbsp;</>}Continue with Credit Key
    </button>
  );
}
