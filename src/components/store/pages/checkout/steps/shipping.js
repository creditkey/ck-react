import React from "react";
import CountrySelector from "../../../inputs/CountrySelector";
import StateSelector from "../../../inputs/StateSelector";

export default function ShippingStep({ address, setAddress, setStep }) {
  return (
    <div className="section--shipping-address">
      <div className="section__header">
        <h2 className="section__title">Shipping address</h2>
      </div>

      <div className="section__content">
        <div className="fieldset">
          <div className="address-fields">
            <div className="field field--required">
              <div className="field__input-wrapper">
                <label
                  className="field__label field__label--visible"
                  htmlFor="checkout_shipping_address_address1"
                >
                  Address
                </label>
                <input
                  placeholder="Address"
                  className="field__input"
                  size="30"
                  type="text"
                  name="checkout[shipping_address][address1]"
                  id="checkout_shipping_address_address1"
                  onChange={(e) => {
                    setAddress({
                      ...address,
                      street: e.target.value,
                    });
                  }}
                  value={address.street}
                />
              </div>
            </div>
            <div className="field field--optional">
              <div className="field__input-wrapper">
                <label
                  className="field__label field__label--visible"
                  htmlFor="checkout_shipping_address_address2"
                >
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  placeholder="Apartment, suite, etc. (optional)"
                  className="field__input"
                  size="30"
                  type="text"
                  name="checkout[shipping_address][address2]"
                  id="checkout_shipping_address_address2"
                  onChange={(e) => {
                    setAddress({
                      ...address,
                      suite: e.target.value,
                    });
                  }}
                  value={address.suite}
                />
              </div>
            </div>
            <div className="field field--required">
              <div className="field__input-wrapper">
                <label
                  className="field__label field__label--visible"
                  htmlFor="checkout_shipping_address_city"
                >
                  City
                </label>
                <input
                  placeholder="City"
                  className="field__input"
                  size="30"
                  type="text"
                  name="checkout[shipping_address][city]"
                  id="checkout_shipping_address_city"
                  onChange={(e) => {
                    setAddress({
                      ...address,
                      city: e.target.value,
                    });
                  }}
                  value={address.city}
                />
              </div>
            </div>
            <CountrySelector
              selected={address.country}
              onChange={(e) => {
                setAddress({
                  ...address,
                  country: e.target.value,
                });
              }}
            />
            <StateSelector
              selected={address.state}
              onChange={(e) => {
                setAddress({
                  ...address,
                  state: e.target.value,
                });
              }}
            />
            <div className="field field--required field--third">
              <div className="field__input-wrapper">
                <label
                  className="field__label field__label--visible"
                  htmlFor="checkout_shipping_address_zip"
                >
                  ZIP code
                </label>
                <input
                  placeholder="ZIP code"
                  className="field__input field__input--zip"
                  size="30"
                  type="text"
                  name="checkout[shipping_address][zip]"
                  id="checkout_shipping_address_zip"
                  onChange={(e) => {
                    setAddress({
                      ...address,
                      zip: e.target.value,
                    });
                  }}
                  value={address.zip}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="button is-danger"
        style={{ marginTop: "20px" }}
        onClick={() => setStep("payment")}
      >
        Continue to Payment
      </button>
    </div>
  );
}
