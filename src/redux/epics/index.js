import { combineEpics } from "redux-observable";
import authEpics from "../../auth/store/auth.epics";
import projectsEpic from "../../modules/Projects/store/projects.epic";

export const rootEpic = combineEpics(
    ...authEpics,
    ...projectsEpic
);
