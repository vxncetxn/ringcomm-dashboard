import React from "react";
import ReactDOM from "react-dom";
import { IdentityContextProvider } from "react-netlify-identity";
import App from "./App";

require("typeface-montserrat");

const url = "https://ringdash-dev-build.netlify.com/";

ReactDOM.render(
  <IdentityContextProvider url={url}>
    <App />
  </IdentityContextProvider>,
  document.getElementById("root")
);
