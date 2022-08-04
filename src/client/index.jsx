import "./foundation/side-effects";

import React from "react";
import ReactDOM from "react-dom";

import { App } from "./foundation/App";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");
ReactDOM.hydrate(
  <BrowserRouter>
    <App sheet={null} />
  </BrowserRouter>,
  root,
);
