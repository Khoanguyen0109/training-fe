import * as AuthActions from "./auth.action";

const initialState = {
  user: {},
  token: null,
  role: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case AuthActions.REMOVE_USER_DATA:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
