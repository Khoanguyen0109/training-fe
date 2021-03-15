import React from "react";
import roles from "../../auth/roles";
import Users from "./Users";

const defaultRoute = "/users";
const UsersConfig = {
  routes: [
    {
      path: defaultRoute,
      // component: React.lazy(() => import("./Users")),
      component: Users,
    },
  ],
  auth: [roles.ADMIN],
  menu: {
    title: "Project",
    path: defaultRoute,
    icon: "",
    order: 3,
  },
};

export default UsersConfig;
