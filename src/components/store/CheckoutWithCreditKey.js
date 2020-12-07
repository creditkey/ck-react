import React, { useState } from "react";
import ck from 'creditkey-js';
import {
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { client } from "../../lib/utils";
import loadCheckout from '../../lib/load_checkout';

export default function CheckoutWithCreditKey({ address, cartItems, charges }) {
  const [loading, setLoading] = useState(false);

  const begin = () => {
    setLoading(true);

    return loadCheckout(
      {}, 
      { address: address, cart: cartItems, redirect: true }, 
      charges, 
    );
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
