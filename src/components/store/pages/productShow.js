import React, { useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import ck from "creditkey-js";

import Product from "../../../models/product";
import Page from "../page";
import Price from "../product/price";
import Display from "../../Display";
import useCart from "../../../hooks/cart";

export default () => {
  const { cartDispatch } = useCart();
  const { category, slug } = useParams();
  const product = Product.find(category, slug, cartDispatch);

  if (product) {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
      <Page>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <Link className="is-uppercase" to="/store">
                Home
              </Link>
            </li>
            <li>
              <Link className="is-uppercase" to={`/store/${category}`}>
                {category}
              </Link>
            </li>
            <li className="is-active">
              <Link className="is-uppercase" to="#">
                {product.name}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="columns">
          <div className="column">
            <img
              src={product.imagePath(selectedImage)}
              alt="Product Thumbnail"
            />

            <div className="columns">
              <div className="column is-full pdp-gallery-thumbnails">
                {product.images.map((img) => (
                  <img
                    key={img}
                    src={product.imagePath(img)}
                    alt="Alternate Angle"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="column">
            <h1 className="title">{product.name}</h1>
            <p className="has-text-grey pdp-company">By {product.company}</p>
            <Price product={product} />

            <div className="pdp-ck-display has-text-centered">
              <Display
                cart={[
                  new ck.CartItem(
                    product.id,
                    product.name,
                    product.price,
                    1,
                    product.sku
                  ),
                ]}
                config={{ type: "pdp", display: 'text', size: 'special' }}
                conditions={{ apply: false }}
                redirect={true}
              />
            </div>

            <div className="pdp-add-to-cart">
              <button
                className="button is-danger is-medium is-fullwidth"
                onClick={() => product.addToCart()}
              >
                <strong>Add to Cart</strong>
              </button>
            </div>

            <div>
              <strong>Share this:</strong>
              <ul className="pdp-share">
                <li>
                  <a
                    className="tag facebook"
                    target="_blank"
                    href="http://www.facebook.com/sharer.php"
                    rel="noopener noreferrer"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M16.913 13.919h-2.17v7.907h-3.215V13.92H10v-2.794h1.528V9.316c0-1.294.601-3.316 3.245-3.316l2.38.01V8.72h-1.728c-.282 0-.68.145-.68.762v1.642h2.449l-.281 2.794z"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="tag twitter"
                    target="_blank"
                    href="http://twitter.com/share"
                    rel="noopener noreferrer"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M20.218 9.925a3.083 3.083 0 0 0 1.351-1.7 6.156 6.156 0 0 1-1.952.746 3.074 3.074 0 0 0-5.238 2.804 8.727 8.727 0 0 1-6.336-3.212 3.073 3.073 0 0 0 .951 4.104 3.062 3.062 0 0 1-1.392-.385v.039c0 1.49 1.06 2.732 2.466 3.014a3.078 3.078 0 0 1-1.389.053 3.077 3.077 0 0 0 2.872 2.135A6.168 6.168 0 0 1 7 18.795a8.7 8.7 0 0 0 4.712 1.382c5.654 0 8.746-4.685 8.746-8.747 0-.133-.003-.265-.009-.397a6.248 6.248 0 0 0 1.534-1.592 6.146 6.146 0 0 1-1.765.484z"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="tag linkedin"
                    target="_blank"
                    href="http://www.linkedin.com/shareArticle"
                    rel="noopener noreferrer"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="28"
                      viewBox="-12 -10 50 50"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M9.7 9.8h4.8v2.5c.7-1.4 2.5-2.8 5.1-2.8 5.2 0 6.4 3 6.4 8.4V28h-5.2v-8.8c0-3.1-.7-4.9-2.5-4.9-2.4 0-3.4 1.9-3.4 4.9V28H9.7V9.8zm-9 18H6V9.5H.7v18.3zm6-24.2c0 2-1.5 3.5-3.4 3.5C1.5 7.1 0 5.5 0 3.6 0 1.6 1.5 0 3.3 0c1.9 0 3.4 1.6 3.4 3.6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="tag pinterest"
                    target="_blank"
                    href="http://pinterest.com/pin/create/button/"
                    rel="noopener noreferrer"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M13.914 6a7.913 7.913 0 0 0-2.885 15.281c-.07-.626-.132-1.586.028-2.27.144-.618.928-3.933.928-3.933s-.238-.475-.238-1.175c0-1.098.64-1.922 1.433-1.922.675 0 1 .507 1 1.115 0 .68-.43 1.694-.654 2.634-.188.789.395 1.43 1.172 1.43 1.405 0 2.487-1.482 2.487-3.622 0-1.894-1.361-3.219-3.306-3.219-2.251 0-3.571 1.689-3.571 3.434 0 .68.26 1.409.587 1.805.065.08.074.149.056.228-.06.25-.194.787-.22.897-.035.144-.114.176-.266.106-.987-.46-1.606-1.905-1.606-3.066 0-2.497 1.814-4.787 5.23-4.787 2.744 0 4.878 1.955 4.878 4.57 0 2.726-1.72 4.922-4.108 4.922-.801 0-1.555-.418-1.813-.91l-.495 1.88c-.178.688-.66 1.55-.983 2.075a7.914 7.914 0 0 0 10.258-7.56 7.914 7.914 0 0 0-7.913-7.912V6z"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <p className="pdp-description">{product.description}</p>
          </div>
        </div>
      </Page>
    );
  } else {
    return <Redirect to="/store" />
  }
};
