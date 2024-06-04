import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/material-icons";
import "@/styles/index.css";

const root = document.getElementById("root") as HTMLElement;
const app = ReactDOM.createRoot(root);

app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
