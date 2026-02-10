import React from "react";
import { Navigate, useParams } from "react-router-dom";

import Page from "../page";
import Grid from "../grid";
import GridProduct from "../gridProduct";
import Product from "../../../models/product";

export default () => {
  const { category } = useParams();
  const products = Product.forCategory(category);

  if (!products) return <Navigate to="/store" replace />;
  const items = products.map((product) => <GridProduct product={product} />);

  return (
    <Page title={Product.formattedCategory(category)}>
      <Grid items={items} />
    </Page>
  );
};
