import React from "react";
import ReactDOM from "react-dom/client";
import Heart from "./components/heart";
import { ThreeJS } from "./components/three";
import { main } from "./game";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThreeJS script={main} />
    <Heart />
  </React.StrictMode>
);
