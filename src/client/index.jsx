import "./foundation/side-effects";

import { loadableReady } from '@loadable/component';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./foundation/App";

loadableReady(() => {
  const root = document.getElementById("root");
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root,
  );
});
