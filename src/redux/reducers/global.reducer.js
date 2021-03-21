import {
  CLOSE_SNACKBAR,
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
} from "../actions/global.actions";

const initialState = {
  error: null,
  loading: false,
  notifications: [],
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };
    case CLOSE_SNACKBAR: {
      console.log("state.noti :>> ", state.notifications);
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };
    }

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        ),
      };

    default:
      return state;
  }
};

export default globalReducer;
