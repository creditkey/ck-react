import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "../../components/theme/icons/ShoppingCartIcon";
import Layout from "../../components/theme/layout/Layout";

import { actions } from "../../reducers/cart";
import ProductList from "../../components/ProductList";

import "../../styles/cart.css";
import useCart from "../../hooks/cart";

function CartPage() {
  const { cart, cartDispatch, cartProducts, subTotal } = useCart();

  return (
    <Layout>
      <div
        id="shopify-section-static-cart"
        className="shopify-section cart--section"
        style={{ marginTop: "20px" }}
      >
        {cartProducts.length == 0 && (
          <>
            <div class="notification is-danger">
              This cart is empty. Consider one of our items below.
            </div>

            <ProductList />
          </>
        )}
        {cartProducts.length > 0 && (
          <form action="/cart" method="post">
            <header className="cart-title">
              <div className="cart-title-left">
                <h1>Your cart</h1>

                <div className="cart-title-total--small"></div>
              </div>

              <div className="cart-title-right">
                <div className="cart-title-total--large">
                  <div className="cart-title-total" data-cart-title-total="">
                    Subtotal
                    <span className="money" data-cart-total="">
                      ${subTotal}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="button-primary cart-title-button mdc-ripple-surface mdc-ripple-upgraded"
                  name="checkout"
                  aria-label="Checkout"
                >
                  <ShoppingCartIcon />
                  Checkout
                </Link>
              </div>
            </header>

            <section className="cartitems--container">
              <div className="cartitems">
                <ul className="cartitems--list">
                  {cartProducts.map((item) => (
                    <li className="cart-item" key={item.slug}>
                      <figure className="cart-item--image-wrapper">
                        <Link to={`/products/${item.slug}`}>
                          <img
                            src={`/images/products/${item.slug}/${item.thumb}`}
                            alt="product thumbnail"
                          />
                        </Link>
                      </figure>

                      <div className="cart-item--inner">
                        <div className="cart-item--content">
                          <h2 className="cart-item--content-title">
                            <Link to={`/products/${item.slug}`}>
                              {item.name}
                            </Link>
                          </h2>

                          <div className="cart-item--product-options">
                            <span className="cart-item--option-name">
                              Color&nbsp;
                            </span>
                            Silver
                          </div>

                          <div className="cart-item--content-price">
                            <span className="cart-item--price-title">
                              Price&nbsp;
                            </span>

                            <span className="money ">${item.price / 100}</span>
                          </div>
                        </div>

                        <div className="cart-item--info">
                          <div className="cart-item--quantity form-fields--qty">
                            <div className="form-field form-field--qty-select visible">
                              <div className="form-field-select-wrapper">
                                <select
                                  className="form-field-input form-field-select form-field-filled"
                                  value={cart.items[item.slug]}
                                  onChange={(e) =>
                                    cartDispatch({
                                      type: actions.changeQuantity,
                                      key: item.slug,
                                      qty: e.target.value,
                                    })
                                  }
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10+</option>
                                </select>
                                <label
                                  className="form-field-title"
                                  htmlFor="quantity_38535475272_34726810aaf210f09dfddf52d359b623"
                                >
                                  Quantity
                                </label>
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  width="8"
                                  height="6"
                                  viewBox="0 0 8 6"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    className="icon-chevron-down-left"
                                    d="M4 4.5L7 1.5"
                                    stroke="currentColor"
                                    strokeWidth="1.25"
                                    strokeLinecap="square"
                                  ></path>
                                  <path
                                    className="icon-chevron-down-right"
                                    d="M4 4.5L1 1.5"
                                    stroke="currentColor"
                                    strokeWidth="1.25"
                                    strokeLinecap="square"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="cart-item--total">
                            <div
                              className="money "
                              aria-live="polite"
                              data-cartitem-total=""
                            >
                              ${item.price / 100}
                            </div>
                          </div>

                          <div className="cart-item--remove">
                            <Link to="/cart" className="cart-item--remove-link">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                role="presentation"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={(e) =>
                                  cartDispatch({
                                    type: actions.removeItem,
                                    key: item.slug,
                                  })
                                }
                              >
                                <path d="M6.08785659,5 L9.77469752,1.31315906 L8.68684094,0.225302476 L5,3.91214341 L1.31315906,0.225302476 L0.225302476,1.31315906 L3.91214341,5 L0.225302476,8.68684094 L1.31315906,9.77469752 L5,6.08785659 L8.68684094,9.77469752 L9.77469752,8.68684094 L6.08785659,5 Z"></path>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="cart-total">
                  <div className="cart-final-total">
                    <ul
                      className="discount-list"
                      data-cart-discounts=""
                      aria-label="Discounts"
                    ></ul>

                    <div className="cart-subtotal">
                      <span>Subtotal</span>
                      <span className="money" data-cart-total="">
                        ${subTotal}
                      </span>
                    </div>
                  </div>

                  <div className="cart-shipping">
                    Shipping &amp; taxes calculated at checkout
                  </div>
                  <div className="cart-checkout">
                    <Link
                      to="/checkout"
                      className="button-primary mdc-ripple-surface mdc-ripple-upgraded"
                    >
                      <ShoppingCartIcon style={{ marginTop: "5px" }} />
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </form>
        )}
      </div>
    </Layout>
  );
}

export default CartPage;
