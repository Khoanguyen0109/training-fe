import { combineReducers } from "redux";
import authReducer from "../../auth/store/auth.reducers";
import projectReducer from "../../modules/Projects/store/projects.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer
});
