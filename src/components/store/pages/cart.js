import React from "react";
import currency from "currency.js";
import { Link } from "react-router-dom";

import Product from "../../../models/product";
import Page from "../page";
import ProductThumb from "../product/thumb";
import Price from "../product/price";
import useCart from "../../../hooks/cart";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";

const CheckoutRightLevel = ({subTotal}) => {
  return (
    <>
      <div className="level-item">
        <div>
          <p>Subtotal</p>
          <p>{subTotal}</p>
        </div>
      </div>
      <div className="level-item">
        <Link
          to="/store/checkout"
          className="button is-danger"
        >
          <ShoppingCartIcon />
          Checkout
        </Link>
      </div>
    </>
  );
}

export default () => {
  const { cart, subTotal } = useCart();
  const formattedSubTotal = currency(subTotal).format();

  return (
    <Page
      title="Cart"
      right={<CheckoutRightLevel subTotal={formattedSubTotal} />}
    >
      <div className="columns is-multiline">
        {cart.map((item) => {
          const product = Product.find(item.category, item.slug);

          return (
            <div className="column is-full cart-row" key={item.slug}>
              <div className="columns">
                <div className="column is-2">
                  <ProductThumb product={product} />
                </div>
                <div className="column is-5 cart-v-center">
                  <p>
                    <Link to={product.url}>{product.name}</Link>
                  </p>
                  <p>{product.formattedPrice()}</p>
                </div>
                <div className="column is-2 cart-v-center">Qty: {item.qty}</div>
                <div className="column is-2 cart-v-center">
                  <Price product={product} />
                </div>
                <div className="column is-1 cart-v-center">
                  <button
                    className="button is-info"
                    onClick={() => product.removeFromCart()}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
          <Link
            to="/store/checkout"
            className="button is-danger cart-checkout-button is-medium"
          >
            <ShoppingCartIcon />
            Checkout
          </Link>
        </div>
      </div>
    </Page>
  );
};
