import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import Provider from "./context/Provider.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
