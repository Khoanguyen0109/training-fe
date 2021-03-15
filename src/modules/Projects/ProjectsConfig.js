import React from "react";

const defaultRoute = "/projects";
const ProjectsConfig = {
  routes: [
    {
      path: defaultRoute,
      component: React.lazy(() => import("./Projects")),
    },
    {
      path: `${defaultRoute}/:projectId`,
      component: React.lazy(() => import("./ProjectInfo")),
    },
    {
      path: `${defaultRoute}/:projectId/tasks`,
      component: React.lazy(() => import("./Tasks/Tasks")),
    },
  ],
};

export default ProjectsConfig;
