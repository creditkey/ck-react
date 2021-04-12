import React from "react";

import products from "../../../config/data/products.json";
import Page from "../page";
import Grid from "../grid";
import GridProduct from "../gridProduct";

export default () => {
  const items = products['tabletop'].map((product) => <GridProduct product={product} />);

  return (
    <Page title="tabletop">
      <Grid items={items} />
    </Page>
  );
};
