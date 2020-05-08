import React from "react";
import ReactDOM from "react-dom";
import { IdentityContextProvider } from "react-netlify-identity";
import { ReactQueryConfigProvider } from "react-query";

import App from "./App";

require("typeface-montserrat");

const url = "https://ringdash-dev-build.netlify.app/";

const queryConfig = {
  // Global
  suspense: false,
  useErrorBoundary: undefined, // Defaults to the value of `suspense` if not defined otherwise
  throwOnError: false,
  refetchAllOnWindowFocus: false,

  // useQuery
  retry: 3,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  staleTime: 0,
  cacheTime: 5 * 60 * 1000,
  refetchOnMount: false
};

ReactDOM.render(
  <IdentityContextProvider url={url}>
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>
  </IdentityContextProvider>,
  document.getElementById("root")
);
