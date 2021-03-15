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
  menu: {
    title: "Project",
    path: defaultRoute,
    icon: "",
    order: 2,
  },
};

export default ProjectsConfig;
