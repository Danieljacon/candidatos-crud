import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CandidatoProvider } from "./contexts/CandidatoContext";

ReactDOM.render(
  <CandidatoProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CandidatoProvider>,
  document.getElementById("root")
);
