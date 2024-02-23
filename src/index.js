import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect, Switch } from "react-router-dom";

import Context from "./Context";

import StoreLayout from "./components/store/layout/base";

// Hidden Dev pages
import DevPage from "./pages/DevPage";
import SpikePage from "./pages/SpikePage";

render(
  <React.StrictMode>
    <Context>
      <BrowserRouter>
        <Switch>
          <Route path="/spike" component={SpikePage} />
          <Route path="/dev" component={DevPage} />
          <Route path="/store" component={StoreLayout} />
          <Redirect to="/store" />
        </Switch>
      </BrowserRouter>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
