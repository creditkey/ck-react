import React from "react";
import currency from "currency.js";
import { Link } from "react-router-dom";
import Page from "../page";
import useCart from "../../../hooks/cart";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import CartItem from "../CartItem";

const CheckoutRightLevel = ({ subTotal }) => {
  return (
    <>
      <div className="level-item">
        <div>
          <p>Subtotal</p>
          <p>{subTotal}</p>
        </div>
      </div>
      <div className="level-item">
        {subTotal !== "$0.00" && (
          <Link to="/store/checkout" className="button is-danger">
            <ShoppingCartIcon />
            Checkout
          </Link>
        )}
      </div>
    </>
  );
};

export default () => {
  const { cart, subTotal } = useCart();
  const formattedSubTotal = currency(subTotal).format();

  return (
    <Page
      title="Cart"
      right={<CheckoutRightLevel subTotal={formattedSubTotal} />}
    >
      <div className="columns is-multiline">
        {cart.map((item) => <CartItem item={item} key={item.slug} />)}
      </div>

      <div className="divider">&nbsp;</div>

      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div>
              <p className="is-size-3">Subtotal</p>
              <p>Shipping & taxes calculated at checkout</p>
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <p className="is-size-3">{formattedSubTotal}</p>
          </div>
        </div>
      </div>

      <div className="level">
        <div className="level-item">
          {formattedSubTotal !== "$0.00" && (
            <Link
              to="/store/checkout"
              className="button is-danger cart-checkout-button is-medium"
            >
              <ShoppingCartIcon />
              Checkout
            </Link>
          )}
        </div>
      </div>
    </Page>
  );
};
