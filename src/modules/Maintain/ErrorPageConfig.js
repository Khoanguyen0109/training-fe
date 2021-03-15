import React from "react";

const ErrorPageConfig = {
  routes: [
    {
      path: "/errors",
      component: React.lazy(() => import("./ErrorPage")),
    },
  ],
};

export default ErrorPageConfig;
