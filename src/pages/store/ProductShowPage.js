import React, { useState, useContext } from "react";
import ChevronRightIcon from "../../components/theme/icons/ChevronRightIcon";
import Layout from "../../components/theme/layout/Layout";
import { Link } from "react-router-dom";

import products from "../../config/data/products.json";
import { cartContext } from "../../Context";
import { actions } from "../../reducers/cart";

const getImagePath = (slug, img) => `/images/products/${slug}/${img}`;

function ProductShowPage({ match }) {
  const slug = match.params.slug;
  const product = products[slug];
  const { cartDispatch } = useContext(cartContext);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <Layout>
      <div className="container">
        <nav className="breadcrumbs-container" aria-label="Breadcrumbs">
          <Link to="/">Home</Link>

          <span className="breadcrumbs-delimiter" aria-hidden="true">
            <ChevronRightIcon />
          </span>
          <span>{product.name}</span>
        </nav>

        <div className="shopify-section product--section">
          <article className="product--outer">
            <div className="product-gallery">
              <div className="product-gallery-viewer product-gallery--has-media">
                <img
                  src={getImagePath(slug, selectedImage)}
                  alt="Product Image"
                />
              </div>
              <div className="product-gallery--navigation">
                <div className="gallery-navigation--scroller">
                  {product.images.map((img) => (
                    <button
                      className="product-gallery--media-thumbnail product-gallery--image-thumbnail"
                      type="button"
                    >
                      <span
                        className="product-gallery--media-thumbnail-img-wrapper"
                        tabIndex="-1"
                      >
                        <img
                          src={getImagePath(slug, img)}
                          alt="Image Selector"
                          className="product-gallery--media-thumbnail-img"
                          onClick={() => setSelectedImage(img)}
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-main">
              <div className="product-details">
                <h1 className="product-title">{product.name}</h1>

                <div className="product-vendor">
                  by {product.company}
                </div>

                <div className="product-pricing" aria-live="polite">
                  <div className="product--price ">
                    <div className="price--main" data-price="">
                      <span className="money">${product.price / 100}</span>
                    </div>
                  </div>
                </div>
              </div>

              <br />

              <div className="product-form--regular">
                <div>
                  <button
                    className="product-form--atc-button mdc-ripple-surface mdc-ripple-upgraded"
                    style={{ marginLeft: "-5px" }}
                    onClick={() =>
                      cartDispatch({
                        type: actions.addItem,
                        key: product.slug,
                      })
                    }
                  >
                    Add to cart
                  </button>

                  <aside className="share-buttons">
                    <span className="share-buttons--title"> Share this: </span>
                    <div className="share-buttons--list">
                      <a
                        className="share-buttons--button share-buttons--facebook"
                        target="_blank"
                        href="//www.facebook.com/sharer.php"
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
                        <span className="visually-hidden">
                          Share on Facebook
                        </span>
                      </a>
                      <a
                        className="share-buttons--button share-buttons--twitter"
                        target="_blank"
                        href="//twitter.com/share"
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
                        <span className="visually-hidden">
                          Tweet on Twitter
                        </span>
                      </a>
                      <a
                        className="share-buttons--button share-buttons--linkedin"
                        target="_blank"
                        href="//www.linkedin.com/shareArticle"
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
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="visually-hidden">
                          Share on LinkedIn
                        </span>
                      </a>
                      <a
                        className="share-buttons--button share-buttons--pinterest"
                        target="_blank"
                        href="//pinterest.com/pin/create/button/"
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
                        <span className="visually-hidden">
                          Pin on Pinterest
                        </span>
                      </a>
                    </div>
                  </aside>
                </div>
              </div>

              <div className="product-description rte">
                <p>{product.description}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
}

export default ProductShowPage;
