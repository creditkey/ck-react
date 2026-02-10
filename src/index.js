import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";

import Context from "./Context";

import StoreLayout from "./components/store/layout/base";

// Hidden Dev pages
import DevPage from "./pages/DevPage";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/dev" element={<DevPage />} />
          <Route path="/store/*" element={<StoreLayout />} />
          <Route path="*" element={<Navigate to="/store" replace />} />
        </Routes>
      </BrowserRouter>
    </Context>
  </React.StrictMode>
);
