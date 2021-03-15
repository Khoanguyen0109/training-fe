import { combineReducers } from "redux";
import authReducer from "../../auth/store/auth.reducers";

export const rootReducer = combineReducers({
  auth: authReducer,
});
