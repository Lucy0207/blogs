// eslint-disable-next-line import/default
import ReactDOM from "react-dom/client";
// eslint-disable-next-line import/default
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./components/App/App";
import "./index.css";
import { store } from "./store/store";

// eslint-disable-next-line import/no-named-as-default-member
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
