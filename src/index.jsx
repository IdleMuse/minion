import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "normalize.css";
import "./styles.scss";

import GameClient from "./components/GameClient";
import DocumentTitle from "react-document-title";

const rootElement = document.getElementById("root");
const documentTitles = {
  development: "dev - Minion Cards",
  production: "prod - Minion Cards",
  test: "test - Minion Cards"
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <DocumentTitle title={documentTitles[process.env.NODE_ENV]} >
      <GameClient mount={rootElement} />
    </DocumentTitle>
  </StrictMode>
);
