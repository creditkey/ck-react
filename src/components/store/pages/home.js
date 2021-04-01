import React from "react";
import Page from "../page";

export default () => {
  return (
    <Page title="Home">
      <div className="columns is-multiline">
        <div className="column is-full">
          <img alt="banner1" src="/images/banners/home-page-banner1.jpg" />
        </div>
        <div className="column is-one-third">
          <img alt="banner2" src="/images/banners/home-page-banner2.jpg" />
        </div>
        <div className="column is-two-thirds">
          <img alt="banner3" src="/images/banners/home-page-banner3.jpg" />
        </div>
      </div>
    </Page>
  );
};
