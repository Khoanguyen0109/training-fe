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
      menu: {
        title: "Users",
        path: defaultRoute,
        icon: "person",
        order: 3,
      },
    },
  ],
  auth: [roles.ADMIN],
};

export default UsersConfig;
