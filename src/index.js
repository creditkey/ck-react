import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";

import Context from "./Context";

import StoreLayout from "./components/store/layout/base";

// Hidden Dev pages
import DevPage from "./pages/DevPage";

render(
  <React.StrictMode>
    <Context>
      <BrowserRouter>
        <Route path="/store" component={StoreLayout} />
        <Route path="/dev" component={DevPage} />
        <Redirect to="/store" />
      </BrowserRouter>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
