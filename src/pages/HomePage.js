import React from "react";
import Layout from "../components/theme/layout/Layout";

function HomePage() {
  return (
    <Layout>
      <div
        className="productgrid--outer"
        style={{ marginTop: "10px" }}
      >
        <h1>I am the home page.</h1>

        <p>You should buy stuff from us!</p>
      </div>
    </Layout>
  );
}

export default HomePage;
