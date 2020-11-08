import "./constants/index.scss";
import "./index.scss";
import { render } from "react-dom";
import React = require("react");
import App from "./app";

window.oncontextmenu = (e: MouseEvent) => {
  return e.target instanceof HTMLInputElement && e.target.type == "text";
};

const appElm = document.createElement("div");
appElm.classList.add("container");
document.body.appendChild(appElm);

window.addEventListener("load", async () => {
  setTimeout(() => {
    render(<App />, appElm);
  }, 1000);
});
