import { combineReducers } from "redux";
import authReducer from "../../auth/store/auth.reducers";
import projectReducer from "../../modules/Projects/store/projects.reducer";
import usersReducer from "../../modules/Users/store/users.reducer";
import globalReducer from "./global.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  users: usersReducer,
  global: globalReducer,
});
