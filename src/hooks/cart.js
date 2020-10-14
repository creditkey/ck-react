import { useContext } from "react";
import { cartContext } from "../Context";
import products from "../config/data/products.json";

function buildProductList(cart) {
  const cartProducts = [];
  let subTotal = 0;

  Object.keys(cart.items).forEach((key) => {
    const product = products[key];
    cartProducts.push(product);
    subTotal += product.price * cart.items[key];
  });

  subTotal = subTotal / 100;
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
