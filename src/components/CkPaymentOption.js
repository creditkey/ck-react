import React, { useEffect, useState } from "react";
import ck from "creditkey-js";
import { client, makePhoneNumber } from "../lib/utils";
import useCart from "../hooks/cart";
import currency from "currency.js";

export default function CkPaymentOption(props) {
  const { cart, cartProducts, subTotal, total, taxes } = useCart();
  const [display, setDisplay] = useState();
  const address = new ck.Address(
    props.contactInfo.firstName,
    props.contactInfo.lastName,
    "Toys R US",
    props.contactInfo.email,
    props.address.street,
    props.address.suite,
    props.address.city,
    props.address.state,
    props.address.zip,
    makePhoneNumber()
  );
  const cartItems = cartProducts.map(
    (item) =>
      new ck.CartItem(
        item.id,
        item.name,
        currency(item.price).format(),
        item.sku,
        cart.items[item.slug]
      )
  );
  const charges = new ck.Charges(subTotal, 0, taxes, 0, total);
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

  useEffect(() => {
    client
      .get_marketing_display(charges, "checkout", "text", "small")
      .then((res) => setDisplay(res));
  }, []);

  return (
    <div
      className="is-size-6 checkout"
      dangerouslySetInnerHTML={{ __html: display }}
    />
  );
}
