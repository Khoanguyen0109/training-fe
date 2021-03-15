import React from "react";
import roles from "../../auth/roles";

const defaultRoute = "/users";
const UsersConfig = {
  routes: [
    {
      path: defaultRoute,
      component: React.lazy(() => import("./Users")),
    },
  ],
  auth: roles.ADMIN,
};

export default UsersConfig;
