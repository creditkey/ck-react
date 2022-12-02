import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "../../page";
import request from "../../../../lib/request";

export default () => {
  const query = new URLSearchParams(useLocation().search);
  const creditKeyId = query.get("id");
  const [loading, setLoading] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(undefined);

  useEffect(() => {
    // complete order with backend
    if (creditKeyId) {
      setLoading(true);
      request(`${ process.env.REACT_APP_BACKEND_URL }${ creditKeyId }`, {})
        .then((res) => {
          if (res) {
            setCheckoutStatus({ status: 200, ...res });
            setLoading(false);
          }
        })
        .catch(err => {
          setCheckoutStatus(err);
          setLoading(false);
        })
    }
  }, [creditKeyId]);

  if (loading) {
    return (
      <div className="p-6 is-flex is-flex-direction-column is-justify-content-center is-align-items-center" style={{ minHeight: '70vh' }}>
        <FontAwesomeIcon icon={faSpinner} spin className="is-size-2"/>
        <h3 className="title is-3 my-4">Order Processing</h3>
      </div>
    );
  }

  return (
    <Page>
      <div className="columns">

        <div className="column is-7">
          {checkoutStatus && checkoutStatus?.status !== 200 &&
            <article className="message is-danger">
              <div className="message-body">
                An error occurred. Please contact Credit Key technical support for further assistance.
              </div>
            </article>
          }
          <div className="thank-you">
            
              <img className="blue-checkmark" src="/images/blue_checkmark.png" alt="Blue Checkmark"/>
            
            <div className="thank-you-text">
              <p>Order #{creditKeyId}</p>
              <div className="title">Thank you!</div>
            </div>
          </div>
          
          
            <div className="content-box">
              <img className="shipping-map" src="/images/shipping_map.jpg" alt="Blue Checkmark"/>
              <div role="table" className="content-box__row content-box__row--tight-spacing-vertical">    
                  <h2>Your order is confirmed</h2>
                  <p>You’ll receive an email when your order is ready.</p>
              </div>
            </div>
          
        <br></br>
          <div className="section--contact-information">
        
          <div className="content-box">
            <div role="table" className="content-box__row content-box__row--tight-spacing-vertical">
              <div role="row" className="review-block">
                <div className="review-block__inner">
                  <div className="review-block__label">
                    <strong>Customer information</strong>
                    <p>david@lancastersupplies.com</p>
                  </div>
                  
                </div>
              </div>
              <div className="review-block">
                <div className="review-block__inner">
                  <div className="">
                  <strong>Ship to</strong>
                  <p>571 W Pico Blvd, Los Angeles, CA 90062</p>
                  </div>
                </div>
                
              </div>
              <div role="row" className="review-block">
                <div className="review-block__inner">
                  <div role="rowheader" className="review-block__label">
                    Method
                  </div>
                  <div role="cell" className="review-block__content">
                    <bdo dir="ltr">Standard Shipping · Free </bdo>
                  </div>
                </div>
              </div>
            </div>
          </div>
        

        <div className="section">
          <div className="section__header">
            <p className="section__text">All transactions are secure and encrypted.</p>
          </div>
        </div>
    </div>   
        </div>
          <div className="column is-5"></div>
      </div>
    </Page>
  );
};
