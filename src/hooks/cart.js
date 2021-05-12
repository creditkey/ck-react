import { useContext } from "react";
import { cartContext } from "../Context";

import Product from "../models/product";

function buildProductList(cart) {
  const cartProducts = [];
  let subTotal = 0;

  cart.forEach((item) => {
    const product = Product.find(item.category, item.slug);
    // product.qty = item.qty;
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

  return {
    cart,
    cartDispatch,
    cartProducts,
    subTotal,
    taxes,
    total,
  };
}
