import React, { useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import ck from "creditkey-js";

import Product from "../../../models/product";
import Page from "../page";
import Price from "../product/price";
import Display from "../../Display";

export default () => {
  const { category, slug } = useParams();
  const product = Product.find(category, slug);

  if (product) {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
      <Page>
        <div className="columns pdp">
          <div className="column">
            <img
              src={product.imagePath(selectedImage)}
              alt="Product Thumbnail"
            />

            <div className="columns">
              <div className="column is-full gallery-thumbnails">
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

            <div className="ck-display has-text-centered">
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

            <div className="add-to-cart">
              <button
                className="button is-medium is-fullwidth"
                onClick={() => product.addToCart()}
              >
                <strong>Add to Cart</strong>
              </button>
            </div>

            <div className="buy-it-now">
              <button
                className="button is-medium is-fullwidth"
                onClick={() => product.addToCart()}
              >
                <strong>Buy It Now</strong>
              </button>
            </div>

            <p className="description">{product.description}</p>

            <div className="share">
              <img src="/images/social/share_this.png" alt="share this links"/>
            </div>
            
          </div>
        </div>
      </Page>
    );
  } else {
    return <Redirect to="/store" />
  }
};
