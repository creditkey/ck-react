import React, { useState } from "react";
import ck from "creditkey-js";
import CkPaymentOption from "../../../CkPaymentOption";
import CheckoutWithCreditKey from "../../../CheckoutWithCreditKey";
import { makePhoneNumber } from "../../../../../lib/utils";
import useCart from "../../../../../hooks/cart";

export default function PaymentStep({ address, contactInfo, setStep }) {
  const { cartProducts, subTotal, total, taxes } = useCart();
  const [method, setMethod] = useState("creditkey");
  const ckAddress = new ck.Address(
    contactInfo.firstName,
    contactInfo.lastName,
    "Credit Key",
    contactInfo.email,
    address.street,
    address.suite,
    address.city,
    address.state,
    address.zip,
    makePhoneNumber()
  );
  const ckCartItems = cartProducts.map(
    (item) =>
      new ck.CartItem(
        item.id,
        item.name,
        item.formattedPrice(),
        item.sku,
        item.slug
      )
  );
  const ckCharges = new ck.Charges(subTotal, 0, taxes, 0, total);

  return (
    <div className="section section--contact-information">
      <div className="section__header">
        <div className="layout-flex layout-flex--tight-vertical layout-flex--loose-horizontal layout-flex--wrap">
          <h2 className="section__title layout-flex__item layout-flex__item--stretch">
            Payment
          </h2>
        </div>
      </div>
      <div>
        <div className="columns">
          <div className="column is-1">
            <div>
              <input
                className="radio-right"
                type="radio"
                name="paymentMethod"
                defaultChecked={method === "ach"}
                onClick={() => setMethod("ach")}
              />
            </div>
            <div>
              <input
                className="radio-right credit-key-radio"
                type="radio"
                name="paymentMethod"
                defaultChecked={method === "creditkey"}
                onClick={() => setMethod("creditkey")}
              />
            </div>
          </div>

          <div className="column">
            <div>
              <label>Check / ACH</label>
            </div>
            <div>
              <label
                style={{ display: "inline", float: "left", clear: "both", paddingTop: '12px' }}
              >
                <CkPaymentOption />
              </label>
            </div>
          </div>
        </div>
      </div>

      {method === "ach" && (
        <button
          className="button is-danger"
          style={{ marginTop: "20px" }}
          onClick={() => {
            alert("This is not the option you came here for.");
          }}
        >
          Continue with Check / ACH
        </button>
      )}

      {method === "creditkey" && (
        <CheckoutWithCreditKey
          address={ckAddress}
          cartItems={ckCartItems}
          charges={ckCharges}
        />
      )}
    </div>
  );
}
