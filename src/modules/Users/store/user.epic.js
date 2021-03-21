import axios from "axios";
import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { enqueueFailedSnackbar } from "../../../redux/actions/global.actions";
import {
  ADD_USER,
  EDIT_USER_INFO,
  GET_USERS_LIST,
  REDUCE_USER_LIST,
  REMOVE_USER,
  SET_USERS_LIST,
  UPDATE_USERS_LIST,
  UPDATE_USER_INFO,
} from "./user.actions";

const API = `http://localhost:5000/users`;

export const getUsersListEpic = (action$) => {
  return action$.pipe(
    ofType(GET_USERS_LIST),
    switchMap((action) =>
      from(axios.get(`${API}`)).pipe(
        mergeMap((res) => {
          return of({ type: SET_USERS_LIST, payload: res.data.users });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      )
    )
  );
};

export const createUseEpic = (action$) => {
  return action$.pipe(
    ofType(ADD_USER),
    switchMap((action) => {
      console.log("action :>> ", action);
      return from(axios.post(`${API}`, action.payload)).pipe(
        mergeMap((res) => {
          return of({ type: UPDATE_USERS_LIST, payload: res.data.user });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      );
    })
  );
};

export const removeUseEpic = (action$) => {
  return action$.pipe(
    ofType(REMOVE_USER),
    switchMap((action) =>
      from(axios.delete(`${API}/${action.payload}`)).pipe(
        mergeMap((res) => {
          return of({ type: REDUCE_USER_LIST, payload: res.data });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      )
    )
  );
};

export const updateUserEpic = (action$) => {
  return action$.pipe(
    ofType(EDIT_USER_INFO),
    switchMap((action) =>
      from(axios.put(`${API}/${action.payload.id}`, action.payload.data)).pipe(
        mergeMap((res) => {
          return of({ type: UPDATE_USER_INFO, payload: res.data.user });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      )
    )
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default [getUsersListEpic, createUseEpic, removeUseEpic, updateUserEpic];
