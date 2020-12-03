import React from "react";
import Page from "../page";

export default () => {
  return (
    <Page title="Home">
      <div className="columns is-multiline">
        <div className="column is-full">
          <div className="button is-info is-fullwidth">One</div>
        </div>
        <div className="column is-one-third">
          <div className="button is-info is-fullwidth">Two</div>
        </div>
        <div className="column is-two-thirds">
          <div className="button is-info is-fullwidth">Three</div>
        </div>
      </div>
    </Page>
  );
};
