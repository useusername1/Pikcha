import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { TokenRenewalProvider } from "./context/TokenRenewalContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <TokenRenewalProvider>
        <App />
      </TokenRenewalProvider>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
