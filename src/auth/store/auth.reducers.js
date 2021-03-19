import * as AuthActions from "./auth.action";

const initialState = {
  user: {},
  token: null,
  error:null,
  refresh_token:null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.SET_USER_DATA:
      {
        return {
          ...state, 
          user:action.payload.user,
          toke:action.payload.access_token,
          refresh_token:action.payload.refresh_token
        };
      }

    case AuthActions.REMOVE_USER_DATA:
      return {
        ...initialState,
      };
    case AuthActions.LOGIN_FAILED:{
      return {
        ...initialState,
        error:action.payload
      }
    }
    default:
      return state;
  }
};

export default authReducer;
