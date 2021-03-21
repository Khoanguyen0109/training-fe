import * as UserActions from "./user.actions";

const initialState = {
  users: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActions.SET_USERS_LIST: {
      return {
        ...state,
        users: action.payload,
      };
    }

    case UserActions.UPDATE_USERS_LIST: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }

    case UserActions.REDUCE_USER_LIST: {
      console.log("action.payload :>> ", action.payload);
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id !== parseInt(action.payload)
        ),
      };
    }

    case UserActions.UPDATE_USER_INFO: {
      const taskIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      const newArray = [...state.users];
      newArray[taskIndex] = action.payload;
      return {
        ...state,
        users: newArray,
      };
    }

    default:
      return state;
  }
};

export default usersReducer;
