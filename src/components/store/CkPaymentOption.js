import React, { useEffect, useState } from "react";
import ck from "creditkey-js";
import { client } from "../../lib/utils";
import useCart from "../../hooks/cart";

export default function CkPaymentOption() {
  const { subTotal, total, taxes } = useCart();
  const [display, setDisplay] = useState();

  const charges = new ck.Charges(subTotal, 0, taxes, 0, total);

  useEffect(() => {
    client
      .get_marketing_display(charges, "checkout", "text", "small")
      .then((res) => setDisplay(res));
  }, [charges]);

  return (
    <div
      className="is-size-6 checkout"
      dangerouslySetInnerHTML={{ __html: display }}
    />
  );
}
