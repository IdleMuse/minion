import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "normalize.css";
import "./styles.scss";

import GameClient from "./components/GameClient";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <GameClient mount={rootElement} />
  </StrictMode>
);
