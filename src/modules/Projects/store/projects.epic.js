import axios from "axios";
import { tap } from "lodash";
import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import {
  ADD_PROJECT,
  GET_PROJECTS_LIST,
  GET_PROJECT_INFO,
  REDUCE_PROJECT_LIST,
  REMOVE_PROJECT,
  SET_PROJECTS_LIST,
  SET_PROJECT_INFO,
  UPDATE_PROJECTS_LIST,
  UPDATE_PROJECT_INFO,
} from "./projects.actions";

const API = `http://localhost:5000/projects`;

export const getProjectListEpic = (action$) =>
  action$.pipe(
    ofType(GET_PROJECTS_LIST),
    switchMap((action) =>
      from(axios.get(`${API}`)).pipe(
        mergeMap((res) => {
          return of({ type: SET_PROJECTS_LIST, payload: res.data.projects });
        }),
        catchError((error) => {
          console.log(`error`, error);
          return of({ type: SET_PROJECTS_LIST, payload: [] });
        })
      )
    )
  );

export const createProjectEpic = (action$) =>
  action$.pipe(
    ofType(ADD_PROJECT),
    switchMap((action) =>
      from(axios.post(`${API}`, action.payload)).pipe(
        mergeMap((res) => {
          return of({ type: UPDATE_PROJECTS_LIST, payload: res.data.project });
        }),
        catchError((error) => {
          console.log(`error`, error);
        })
      )
    )
  );

export const removeProjectEpic = (action$) => {
  return action$.pipe(
    ofType(REMOVE_PROJECT),
    switchMap((action) =>
      from(axios.delete(`${API}/${action.payload}`)).pipe(
        mergeMap((res) => {
          return of({ type: REDUCE_PROJECT_LIST, payload: action.payload });
        }),
        catchError((error) => {
          console.log(`error`, error);
        })
      )
    )
  );
};

export const getOneProjectEpic = (action$) => {
  return action$.pipe(
    ofType(GET_PROJECT_INFO),
    switchMap((action) =>
      from(axios.get(`${API}/${action.payload}`)).pipe(
        mergeMap((res) => {
            
          return of({ type: SET_PROJECT_INFO, payload: action.payload });
        }),
        catchError((error) => {
          console.log(`error`, error);
        })
      )
    )
  );
};

export const updateProjectInfoEpic = (action$) => {
  return action$.pipe(
    ofType(UPDATE_PROJECT_INFO),
    switchMap((action) =>
      from(axios.put(`${API}/${action.payload.id}`, action.payload)).pipe(
        tap((data) => console.log("HTTP response:", data)),

        mergeMap((res) => {
          return of({ type: SET_PROJECT_INFO, payload: action.payload });
        }),
        catchError((error) => {
          console.log(`error`, error);
        })
      )
    )
  );
};

export default [
  getProjectListEpic,
  createProjectEpic,
  removeProjectEpic,
  getOneProjectEpic,
  updateProjectInfoEpic,
];
