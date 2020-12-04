import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect, Switch } from "react-router-dom";

import Context from "./Context";

import StoreLayout from "./components/store/layout/base";

// Hidden Dev pages
import DevPage from "./pages/DevPage";

render(
  <React.StrictMode>
    <Context>
      <BrowserRouter>
        <Switch>
          <Route path="/dev" component={DevPage} />
          <Route path="/store" component={StoreLayout} />
          <Redirect to="/store" />
        </Switch>
      </BrowserRouter>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
