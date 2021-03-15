import React from "react";

const DashboardConfig = {
  routes: [
    {
      path: "/",
      component: React.lazy(() => import("./Dashboard")),
    },
  ],
};

export default DashboardConfig;
