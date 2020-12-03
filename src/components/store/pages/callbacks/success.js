import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Page from "../../page";

export default () => {
  const query = new URLSearchParams(useLocation().search);
  const creditKeyId = query.get("id");
  const [checkoutStatus, setCheckoutStatus] = useState(undefined);

  useEffect(() => {
    // Call the Credit Key API t
    fetch(
      `http://localhost:8080/api/credit-key/complete_checkout?id=${creditKeyId}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCheckoutStatus(json);
      });
  }, [creditKeyId]);

  return (
    <Page title="Success">
      <div className="column">
        {!checkoutStatus && <p>Please wait while we load your order...</p>}
      </div>
    </Page>
  );
};
