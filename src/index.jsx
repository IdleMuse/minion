import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "normalize.css";
import "./styles.scss";

import GameClient from "./components/GameClient";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <GameClient mount={rootElement} />
  </StrictMode>,
  rootElement
);
