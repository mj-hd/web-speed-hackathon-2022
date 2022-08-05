import "./foundation/side-effects";

import React from "react";
import ReactDOM from "react-dom";

import { App } from "./foundation/App";

const placeholder = document.getElementById("placeholder");
const root = document.getElementById("root");
placeholder.remove();
ReactDOM.render(<App />, root);

