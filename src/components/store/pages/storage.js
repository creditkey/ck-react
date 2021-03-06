import React from "react";

import products from "../../../config/data/products.json";
import Page from "../page";
import Grid from "../grid";
import GridProduct from "../gridProduct";

export default () => {
  const items = products['storage'].map((product) => <GridProduct product={product} />);

  return (
    <Page title="storage">
      <Grid items={items} />
    </Page>
  );
};
