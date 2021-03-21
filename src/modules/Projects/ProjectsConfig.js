import React from "react";
import ProjectInfo from "./ProjectInfo";
import Projects from "./Projects";
import Task from "./Tasks/Tasks";

const defaultRoute = "/projects";
const ProjectsConfig = {
  routes: [
    {
      path: defaultRoute,
      // component: React.lazy(() => import("./Projects")),
      component: Projects,
      menu: {
        title: "Projects",
        path: defaultRoute,
        icon: "account_balance_wallet",
        order: 2,
      },
      exact: true,
    },
    {
      path: `${defaultRoute}/:projectId`,
      // component: React.lazy(() => import("./ProjectInfo")),
      component: ProjectInfo,
    },
    {
      path: `${defaultRoute}/:projectId/tasks`,
      // component: React.lazy(() => import("./Tasks/Tasks")),
      component: Task,
    },
  ],
};

export default ProjectsConfig;
