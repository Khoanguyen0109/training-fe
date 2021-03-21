import { combineEpics } from "redux-observable";
import authEpics from "../../auth/store/auth.epics";
import projectsEpic from "../../modules/Projects/store/projects.epic";
import usersEpic from "../../modules/Users/store/user.epic";
export const rootEpic = combineEpics(
  ...authEpics,
  ...projectsEpic,
  ...usersEpic
);
