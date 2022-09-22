import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.js";
import { BrowserRouter } from "react-router-dom";

import "./styles/reset.scss";
import "./styles/common.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
window.Kakao.init("c32bfa26820f7092d59f17e12a5beb1f");
window.Kakao.isInitialized();
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </BrowserRouter>
);
