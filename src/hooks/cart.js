import { useContext } from "react";
import { cartContext } from "../Context";

import { actions } from "../reducers/cart";
import Product from "../models/product";

function buildProductList(cart) {
  const cartProducts = [];
  let subTotal = 0;

  cart.forEach((item) => {
    const product = Product.find(item.category, item.slug);
    product.qty = 1;
    cartProducts.push(product);
    subTotal += product.price;
  });

  return { cartProducts, subTotal };
}

export default function useCart() {
  const { cart, cartDispatch } = useContext(cartContext);
  const { cartProducts, subTotal } = buildProductList(cart);
  const taxes = subTotal * 0.08;
  const total = subTotal + taxes;

  const addProductToCart = (product) => {
    return cartDispatch({
      type: actions.addItem,
      slug: product.slug,
      category: product.category,
    });
  };

  const removeProductFromCart = (product) => {
    return cartDispatch({
      type: actions.removeItem,
      slug: product.slug,
      category: product.category,
    });
  };

  return {
    cart,
    cartDispatch,
    cartProducts,
    subTotal,
    taxes,
    total,
    addProductToCart,
    removeProductFromCart,
  };
}
