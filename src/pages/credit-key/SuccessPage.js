import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/theme/layout/Layout";

function CreditKeySuccessPage() {
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
    <Layout>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Success</h1>
            <h2 className="subtitle">Order Confirmation</h2>
          </div>
        </div>
      </section>

      <div className="column">
        {!checkoutStatus && <p>Please wait while we load your order...</p>}
      </div>
    </Layout>
  );
}

export default CreditKeySuccessPage;
