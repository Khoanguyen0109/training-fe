import React from "react";
import ErrorPage from "./ErrorPage";

const ErrorPageConfig = {
  routes: [
    {
      path: "/errors",
      // component: React.lazy(() => import("./ErrorPage")),
      component: ErrorPage,
    },
  ],
};

export default ErrorPageConfig;
