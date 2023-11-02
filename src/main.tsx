import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import AuthContextProvider from "./context/Auth.tsx";
import StoreProvider from "./redux/store/index.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
