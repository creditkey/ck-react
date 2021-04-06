import React from "react";

export default function ContactStep({ address, setAddress, setStep }) {
  return (
    <div className="section--contact-information">
      <div className="section__header">
        <div className="layout-flex layout-flex--tight-vertical layout-flex--loose-horizontal layout-flex--wrap">
          <h2
            className="section__title layout-flex__item layout-flex__item--stretch"
            id="main-header"
            tabIndex="-1"
          >
            Contact information
          </h2>
        </div>
      </div>
      <div className="section__content">
        <div className="fieldset">
          <div className="field field--required">
            <div className="field__input-wrapper">
              <label
                className="field__label field__label--visible"
                htmlFor="checkout_email"
              >
                Email
              </label>
              <input
                placeholder="Email"
                className="field__input"
                size="30"
                type="email"
                name="checkout[email]"
                id="checkout_email"
                onChange={(e) => {
                  setAddress({
                    ...address,
                    email: e.target.value,
                  });
                }}
                value={address.email}
              />
            </div>
          </div>
          <div className="field field--optional field--half">
            <div className="field__input-wrapper">
              <label
                className="field__label field__label--visible"
                htmlFor="checkout_shipping_address_first_name"
              >
                First name
              </label>
              <input
                placeholder="First name"
                className="field__input"
                size="30"
                type="text"
                name="checkout[shipping_address][first_name]"
                id="checkout_shipping_address_first_name"
                onChange={(e) => {
                  setAddress({
                    ...address,
                    first_name: e.target.value,
                  });
                }}
                value={address.first_name}
              />
            </div>
          </div>
          <div className="field field--required field--half">
            <div className="field__input-wrapper">
              <label
                className="field__label field__label--visible"
                htmlFor="checkout_shipping_address_last_name"
              >
                Last name
              </label>
              <input
                placeholder="Last name"
                className="field__input"
                aria-required="true"
                size="30"
                type="text"
                name="checkout[shipping_address][last_name]"
                id="checkout_shipping_address_last_name"
                onChange={(e) => {
                  setAddress({
                    ...address,
                    last_name: e.target.value,
                  });
                }}
                value={address.last_name}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="button is-danger"
        style={{ marginTop: "20px" }}
        onClick={() => setStep("shipping")}
      >
        Continue to Shipping
      </button>
    </div>
  );
}
