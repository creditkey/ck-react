import { useContext } from "react";
import currency from "currency.js";

import products from "../config/data/products.json";
import { cartContext } from "../Context";
import { actions } from "../reducers/cart";

class Product {
  static find = (category, slug) => {
    const filtered = products[category]?.filter((item) => slug === item.slug);
    return filtered?.length ? new this(filtered[0]) : null;
  };

  static forCategory = (category) =>
    products[category]?.map((item) => new this(item));

  static formattedCategory = (category) => category.split("-").join(" ");

  constructor(product) {
    this.data = product;
    //this.cartDispatch = useContext(cartContext).cartDispatch;
    this.thumbnail = `/images/products/${product.slug}/${product.thumb}`;
    this.url = `/store/products/${product.category}/${product.slug}`;

    this.id = product.id;
    this.slug = product.slug;
    this.category = product.category;
    this.name = product.name;
    this.description = product.description;
    this.salePrice = product.salePrice;
    this.originalPrice = product.price;
    this.price = product.salePrice || product.price;
    this.images = product.images;
    this.company = product.company;
    this.sku = product.sku;
  }

  formattedOriginalPrice = () => currency(this.data.price).format();
  formattedPrice = () => currency(this.price).format();

  formattedAmountSaved = () => {
    return currency(this.originalPrice - this.salePrice).format();
  };

  addToCart = () => {
    this.cartDispatch({
      type: actions.addItem,
      slug: this.slug,
      category: this.category,
    });
  };

  removeFromCart = () => {
    this.cartDispatch({
      type: actions.removeItem,
      slug: this.slug,
      category: this.category,
    });
  };

  imagePath = (id) => `/images/products/${this.slug}/${id}`;
}

export default Product;
