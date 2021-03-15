import React from "react";
import Dashboard from "./Dashboard";

const defaultRoute = "/";
const DashboardConfig = {
  routes: [
    {
      path: "/",
      // component: React.lazy(() => import("./Dashboard")),
      component: Dashboard,
      exact: true,
    },
  ],
  menu: {
    title: "Dashboard",
    path: defaultRoute,
    icon: "",
    order: 1,
  },
};

export default DashboardConfig;
