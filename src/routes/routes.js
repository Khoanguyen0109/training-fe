import { Redirect } from "react-router";
import roles from "../auth/roles";
import DashboardConfig from "../modules/Dashboard/DashboardConfig";
import LoginConfig from "../modules/Login/LoginConfig";
import ErrorPageConfig from "../modules/Maintain/ErrorPageConfig";
import ProjectsConfig from "../modules/Projects/ProjectsConfig";
import UsersConfig from "../modules/Users/UsersConfig";
import { generateRoutesFromConfigs } from "./helpers";

const routeConfig = [
  DashboardConfig,
  LoginConfig,
  ProjectsConfig,
  UsersConfig,
  ErrorPageConfig,
];

const routes = [
  ...generateRoutesFromConfigs(routeConfig, [roles.ADMIN, roles.EMPLOY]),

  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/" />,
  },

  {
    component: () => <Redirect to="/errors" />,
  },
];

export default routes;
