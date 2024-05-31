import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoadingPage from "./components/loadingPage";
import GlobalStyle from "./utils/reset";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {" "}
    <App />
    <GlobalStyle />
    <LoadingPage />
  </React.StrictMode>
);
