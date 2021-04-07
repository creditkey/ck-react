import React, { useState } from "react";
import ck from "creditkey-js";
import CkPaymentOption from "../../../CkPaymentOption";
import CheckoutWithCreditKey from "../../../CheckoutWithCreditKey";
import { makePhoneNumber } from "../../../../../lib/utils";
import useCart from "../../../../../hooks/cart";
import CountrySelector from "../../../inputs/CountrySelector";
import StateSelector from "../../../inputs/StateSelector";

export default function PaymentStep({ address, setStep }) {
  const { cartProducts, subTotal, total, taxes } = useCart();
  const [method, setMethod] = useState("creditkey");
  const ckAddress = new ck.Address(
    address.first_name,
    address.last_name,
    "Credit Key",
    address.email,
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
    <div className="section--contact-information">
      <div class="section">
        <div class="content-box">
          <div role="table" class="content-box__row content-box__row--tight-spacing-vertical">
            <div role="row" class="review-block">
              <div class="review-block__inner">
                <div role="rowheader" class="review-block__label">
                  Contact
                </div>
                <div role="cell" class="review-block__content">
                  <bdo dir="ltr">customer@company.com</bdo>
                </div>
              </div>
              <div role="cell" class="review-block__link">
                <a class="link--small" href="#">
                  <span aria-hidden="true">Change</span></a>
              </div>
            </div>
            <div role="row" class="review-block">
              <div class="review-block__inner">
                <div role="rowheader" class="review-block__label">
                  Ship to
                </div>
                <div role="cell" class="review-block__content">
                  <bdo dir="ltr">33 East 14th Street, New York NY 10001</bdo>
                </div>
              </div>
              <div role="cell" class="review-block__link">
                <a class="link--small" href="#">
                  <span aria-hidden="true">Change</span></a>
              </div>
            </div>
            <div role="row" class="review-block">
              <div class="review-block__inner">
                <div role="rowheader" class="review-block__label">
                  Method
                </div>
                <div role="cell" class="review-block__content">
                  <bdo dir="ltr">Standard Shipping · Free </bdo>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section__header">
          <h2 class="section__title" id="main-header">Payment</h2>
          <p class="section__text">All transactions are secure and encrypted.</p>
        </div>



        <div class="content-box">
          <div role="table" class="content-box__row content-box__row--tight-spacing-vertical">
          <div role="row" class="review-block">
                <div class="review-block__inner">
                <input
                  className="radio-right"
                  type="radio"
                  name="paymentMethod"
                  defaultChecked={method === "credit"}
                  onClick={() => setMethod("credit")}
                /><label>Credit Card</label><div class="radio__label__accessory">
      
                <ul className="payment-icons" >
                    <li class="payment-icon payment-icon--visa"></li>
                    <li class="payment-icon payment-icon--master"></li>
                    <li class="payment-icon payment-icon--american-express"></li>
                    <li class="payment-icon payment-icon--discover"></li>
                    <li class="payment-icon-list__more">
                      <small class="content-box__small-text">
                        and more…
                      </small>
                    </li>
                </ul>
              </div>
                  
                </div>
              </div>

            <div role="row" class="review-block">
              <div class="review-block__inner">
                <input
                  className="radio-right"
                  type="radio"
                  name="paymentMethod"
                  defaultChecked={method === "ach"}
                  onClick={() => setMethod("ach")}
                /><label>Check / ACH</label>

                
              </div>
            </div>

            <div role="row" class="review-block">
              <div class="review-block__inner">
                <input
                  className="radio-right credit-key-radio"
                  type="radio"
                  name="paymentMethod"
                  defaultChecked={method === "creditkey"}
                  onClick={() => setMethod("creditkey")}
                />
                <label
                style={{ display: "inline", height: "22px",float: "left", clear: "both", paddingTop: '12px' }}
              ></label>
              <img style={{ display: "inline", height: "24px"}} className="logo" src="/images/ck-checkout.png" alt="CreditKey Logo" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
        {method === "credit" && (
            <button
              className="checkout-button"
              style={{ marginTop: "20px" }}
              onClick={() => {
                alert("This is not the option you came here for.");
              }}
            >
              Continue with Credit Card
            </button>
          )}
          {method === "ach" && (
            <button
              className="checkout-button"
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
    </div>
  );
}
