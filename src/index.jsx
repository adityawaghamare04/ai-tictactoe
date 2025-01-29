import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import PlayersProvider from "./contexts/players.context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <PlayersProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PlayersProvider>
);
