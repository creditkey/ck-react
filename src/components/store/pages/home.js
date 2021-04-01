import React from "react";
import Page from "../page";

export default () => {
  return (
    <div className="homepage-wrapper">
      <div className="columns is-multiline">
        <div className="column is-full">
          <img src="/images/banners/home-page-banner1.jpg" />
        </div>
        <div className="column is-one-third">
          <img src="/images/banners/home-page-banner2.jpg" />
        </div>
        <div className="column is-two-thirds">
          <img src="/images/banners/home-page-banner3.jpg" />
        </div>
      </div>
    </div>
  );
};
