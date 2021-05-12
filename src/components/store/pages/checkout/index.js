import React, { useState } from "react";
import { Link } from "react-router-dom";
import currency from "currency.js";
import ContactStep from "./steps/contact";
import ShippingStep from "./steps/shipping";
import PaymentStep from "./steps/payment";
import useCart from "../../../../hooks/cart";

function cartItem(item, cart) {
  return (
    <>
      <tr className="product" key={item.slug}>
        <td className="product__image">
          <div className="product-thumbnail ">
            <div className="product-thumbnail__wrapper">
              <img
                alt={item.name}
                className="product-thumbnail__image"
                src={item.thumbnail}
              />
            </div>
            <span className="product-thumbnail__quantity">{item.qty}</span>
          </div>
        </td>
        <th className="product__description" scope="row">
          <span
            className="product__description__name order-summary__emphasis"
            style={{ marginLeft: "10px" }}
          >
            {item.name}
          </span>
        </th>
        <td className="product__price">
          <span className="order-summary__emphasis skeleton-while-loading">
            {currency(item.price).format()}
          </span>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
    </>
  );
}

function CheckoutPage() {
  const { cart, cartProducts, subTotal, taxes, total } = useCart();
  const [address, setAddress] = useState({
    first_name: 'David',
    last_name: 'Lancaster',
    email: `salesdemo+${new Date().getTime()}@creditkey.com`,
    street: "10571 W Pico Blvd",
    suite: "",
    country: "United States",
    city: "Los Angeles",
    state: "CA",
    zip: "90062",
  });
  const [step, setStep] = useState("payment");

  const isActive = (link) => {
    if (step === link) {
      return { fontWeight: "bold" };
    }
  };

  return (
    <div className="checkout-wrap">
      <div className="columns">
        <div className="column is-two-thirds">
          <main className="main__content">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb " role="list">
                <li className="breadcrumb__item breadcrumb__item--completed">
                  <Link className="breadcrumb__link" to="/store/cart">Cart</Link>
                  <span>></span>
                </li>
                <li className="breadcrumb__item breadcrumb__item--current">
                  &nbsp;&nbsp;<span className="breadcrumb__text">Payment</span>
                </li>
              </ol>
            </nav>
            <div className="step">
              <form className="edit_checkout animate-floating-labels">
                <div className="step__sections">
                  {step === "contact" && (
                    <ContactStep
                      address={address}
                      setAddress={setAddress}
                      setStep={setStep}
                    />
                  )}
                  {step === "shipping" && (
                    <ShippingStep
                      address={address}
                      setAddress={setAddress}
                      setStep={setStep}
                    />
                  )}
                  {step === "payment" && (
                    <PaymentStep
                      address={address}
                      setStep={setStep}
                    />
                  )}
                </div>
              </form>
            </div>
          </main>
        </div>
        <div className="column sidebar">
          <div className="sidebar__content">
            <div
              id="order-summary"
              className="order-summary order-summary--is-collapsed"
              style={{ marginTop: "35px" }}
            >
              <div className="order-summary__sections">
                <div className="order-summary__section order-summary__section--product-list">
                  <div className="order-summary__section__content">
                    <table className="product-table">
                      <tbody data-order-summary-section="line-items">
                        {cartProducts.map((item) => cartItem(item, cart))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="order-summary__section order-summary__section--total-lines">
                  <table className="total-line-table">
                    <tbody className="total-line-table__tbody">
                      <tr className="total-line total-line--subtotal">
                        <th className="total-line__name" scope="row">
                          Subtotal
                              </th>
                        <td className="total-line__price">
                          <span
                            className="order-summary__emphasis skeleton-while-loading"
                            data-checkout-subtotal-price-target="59000"
                          >
                            {currency(subTotal).format()}
                          </span>
                        </td>
                      </tr>

                      <tr className="total-line total-line--shipping">
                        <th className="total-line__name" scope="row">
                          <span>Shipping</span>
                        </th>
                        <td className="total-line__price">
                          <span
                            className="skeleton-while-loading order-summary__small-text"
                            data-checkout-total-shipping-target="0">Free</span>
                        </td>
                      </tr>

                      <tr className="total-line total-line--taxes">
                        <th className="total-line__name" scope="row">Taxes</th>
                        <td className="total-line__price">
                          <span className="order-summary__emphasis skeleton-while-loading">
                            {currency(taxes).format()}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="total-line-table__footer">
                      <tr className="total-line">
                        <th
                          className="total-line__name payment-due-label"
                          scope="row"
                        >
                          <span className="payment-due-label__total">Total</span>
                        </th>
                        <td className="total-line__price payment-due">
                          <span className="payment-due__currency remove-while-loading">USD</span>
                          <span className="payment-due__price skeleton-while-loading--lg">
                            {currency(total).format()}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div id="partial-icon-symbols" className="icon-symbols">
              <svg xmlns="http://www.w3.org/2000/svg">
                <symbol id="info">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 11h1v7h-2v-5c-.552 0-1-.448-1-1s.448-1 1-1h1zm0 13C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM10.5 7.5c0-.828.666-1.5 1.5-1.5.828 0 1.5.666 1.5 1.5 0 .828-.666 1.5-1.5 1.5-.828 0-1.5-.666-1.5-1.5z"></path>
                  </svg>
                </symbol>
                <symbol id="caret-down">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                    <path d="M0 3h10L5 8" fillRule="nonzero"></path>
                  </svg>
                </symbol>
                <symbol id="powered-by-google">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116 15">
                    <path
                      fill="#737373"
                      d="M4.025 3.572c1.612 0 2.655 1.283 2.655 3.27 0 1.974-1.05 3.27-2.655 3.27-.902 0-1.63-.393-1.974-1.06h-.09v3.057H.95V3.68h.96v1.054h.094c.404-.726 1.16-1.166 2.02-1.166zm-.24 5.63c1.16 0 1.852-.884 1.852-2.36 0-1.477-.692-2.362-1.846-2.362-1.14 0-1.86.91-1.86 2.362 0 1.447.72 2.36 1.857 2.36zm7.072.91c-1.798 0-2.912-1.243-2.912-3.27 0-2.033 1.114-3.27 2.912-3.27 1.8 0 2.913 1.237 2.913 3.27 0 2.027-1.114 3.27-2.913 3.27zm0-.91c1.196 0 1.87-.866 1.87-2.36 0-1.5-.674-2.362-1.87-2.362-1.195 0-1.87.862-1.87 2.362 0 1.494.675 2.36 1.87 2.36zm12.206-5.518H22.05l-1.244 5.05h-.094L19.3 3.684h-.966l-1.412 5.05h-.094l-1.242-5.05h-1.02L16.336 10h1.02l1.406-4.887h.093L20.268 10h1.025l1.77-6.316zm3.632.78c-1.008 0-1.71.737-1.787 1.856h3.48c-.023-1.12-.69-1.857-1.693-1.857zm1.664 3.9h1.005c-.305 1.085-1.277 1.747-2.66 1.747-1.752 0-2.848-1.262-2.848-3.26 0-1.987 1.113-3.276 2.847-3.276 1.705 0 2.742 1.213 2.742 3.176v.386h-4.542v.047c.053 1.248.75 2.04 1.822 2.04.815 0 1.366-.3 1.63-.857zM31.03 10h1.01V6.086c0-.89.696-1.535 1.657-1.535.2 0 .563.038.645.06V3.6c-.13-.018-.34-.03-.504-.03-.838 0-1.565.434-1.752 1.05h-.094v-.938h-.96V10zm6.915-5.537c-1.008 0-1.71.738-1.787 1.857h3.48c-.023-1.12-.69-1.857-1.693-1.857zm1.664 3.902h1.005c-.304 1.084-1.277 1.746-2.66 1.746-1.752 0-2.848-1.262-2.848-3.26 0-1.987 1.113-3.276 2.847-3.276 1.705 0 2.742 1.213 2.742 3.176v.386h-4.542v.047c.053 1.248.75 2.04 1.822 2.04.815 0 1.366-.3 1.63-.857zm5.01 1.746c-1.62 0-2.657-1.28-2.657-3.266 0-1.98 1.05-3.27 2.654-3.27.878 0 1.622.416 1.98 1.108h.087V1.177h1.008V10h-.96V8.992h-.094c-.4.703-1.15 1.12-2.02 1.12zm.232-5.63c-1.15 0-1.846.89-1.846 2.364 0 1.476.69 2.36 1.846 2.36 1.148 0 1.857-.9 1.857-2.36 0-1.447-.715-2.362-1.857-2.362zm7.875-3.115h1.024v3.123c.23-.3.507-.53.827-.688.32-.16.668-.238 1.043-.238.78 0 1.416.27 1.9.806.49.537.73 1.33.73 2.376 0 .992-.24 1.817-.72 2.473-.48.656-1.145.984-1.997.984-.476 0-.88-.114-1.207-.344-.195-.137-.404-.356-.627-.657v.8h-.97V1.363zm4.02 7.225c.284-.454.426-1.05.426-1.794 0-.66-.142-1.207-.425-1.64-.283-.434-.7-.65-1.25-.65-.48 0-.9.177-1.264.532-.36.356-.542.942-.542 1.758 0 .59.075 1.068.223 1.435.277.694.795 1.04 1.553 1.04.57 0 .998-.227 1.28-.68zM63.4 3.726h1.167c-.148.402-.478 1.32-.99 2.754-.383 1.077-.703 1.956-.96 2.635-.61 1.602-1.04 2.578-1.29 2.93-.25.35-.68.527-1.29.527-.147 0-.262-.006-.342-.017-.08-.012-.178-.034-.296-.065v-.96c.183.05.316.08.4.093.08.012.152.018.215.018.195 0 .338-.03.43-.094.092-.065.17-.144.232-.237.02-.033.09-.193.21-.48.122-.29.21-.506.264-.646l-2.32-6.457h1.196l1.68 5.11 1.694-5.11zM73.994 5.282V6.87h3.814c-.117.89-.416 1.54-.87 1.998-.557.555-1.427 1.16-2.944 1.16-2.35 0-4.184-1.882-4.184-4.217 0-2.332 1.835-4.215 4.184-4.215 1.264 0 2.192.497 2.873 1.135l1.122-1.117C77.04.697 75.77 0 73.99 0c-3.218 0-5.923 2.606-5.923 5.805 0 3.2 2.705 5.804 5.923 5.804 1.738 0 3.048-.57 4.073-1.628 1.05-1.045 1.382-2.522 1.382-3.71 0-.366-.028-.708-.087-.992h-5.37zm10.222-1.29c-2.082 0-3.78 1.574-3.78 3.748 0 2.154 1.698 3.747 3.78 3.747S87.998 9.9 87.998 7.74c0-2.174-1.7-3.748-3.782-3.748zm0 6.018c-1.14 0-2.127-.935-2.127-2.27 0-1.348.983-2.27 2.124-2.27 1.142 0 2.128.922 2.128 2.27 0 1.335-.986 2.27-2.128 2.27zm18.54-5.18h-.06c-.37-.438-1.083-.838-1.985-.838-1.88 0-3.52 1.632-3.52 3.748 0 2.102 1.64 3.747 3.52 3.747.905 0 1.618-.4 1.988-.852h.06v.523c0 1.432-.773 2.2-2.012 2.2-1.012 0-1.64-.723-1.9-1.336l-1.44.593c.414.994 1.51 2.213 3.34 2.213 1.94 0 3.58-1.135 3.58-3.902v-6.74h-1.57v.645zm-1.9 5.18c-1.144 0-2.013-.968-2.013-2.27 0-1.323.87-2.27 2.01-2.27 1.13 0 2.012.967 2.012 2.282.006 1.31-.882 2.258-2.01 2.258zM92.65 3.992c-2.084 0-3.783 1.574-3.783 3.748 0 2.154 1.7 3.747 3.782 3.747 2.08 0 3.78-1.587 3.78-3.747 0-2.174-1.7-3.748-3.78-3.748zm0 6.018c-1.143 0-2.13-.935-2.13-2.27 0-1.348.987-2.27 2.13-2.27 1.14 0 2.126.922 2.126 2.27 0 1.335-.986 2.27-2.127 2.27zM105.622.155h1.628v11.332h-1.628m6.655-1.477c-.843 0-1.44-.38-1.83-1.135l5.04-2.07-.168-.426c-.314-.84-1.274-2.39-3.227-2.39-1.94 0-3.554 1.516-3.554 3.75 0 2.1 1.595 3.745 3.736 3.745 1.725 0 2.724-1.05 3.14-1.658l-1.285-.852c-.427.62-1.01 1.032-1.854 1.032zm-.117-4.612c.668 0 1.24.342 1.427.826l-3.405 1.4c0-1.574 1.122-2.226 1.978-2.226z"
                    ></path>
                  </svg>
                </symbol>
                <symbol id="close">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M15.1 2.3L13.7.9 8 6.6 2.3.9.9 2.3 6.6 8 .9 13.7l1.4 1.4L8 9.4l5.7 5.7 1.4-1.4L9.4 8"></path>
                  </svg>
                </symbol>
                <symbol id="spinner-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0v2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8h2z"></path>
                  </svg>
                </symbol>
                <symbol id="chevron-right">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                    <path d="M2 1l1-1 4 4 1 1-1 1-4 4-1-1 4-4"></path>
                  </svg>
                </symbol>
                <symbol id="down-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                    <path d="M10.817 7.624l-4.375 4.2c-.245.235-.64.235-.884 0l-4.375-4.2c-.244-.234-.244-.614 0-.848.245-.235.64-.235.884 0L5.375 9.95V.6c0-.332.28-.6.625-.6s.625.268.625.6v9.35l3.308-3.174c.122-.117.282-.176.442-.176.16 0 .32.06.442.176.244.234.244.614 0 .848"></path>
                  </svg>
                </symbol>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
