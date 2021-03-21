import axios from "axios";
import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { enqueueFailedSnackbar } from "../../../redux/actions/global.actions";
import {
  ADD_PROJECT,
  ADD_TASK,
  EDIT_TASK_INFO,
  GET_PROJECTS_LIST,
  GET_PROJECT_INFO,
  GET_TASKS_LIST,
  REDUCE_PROJECT_LIST,
  REDUCE_TASK_LIST,
  REMOVE_PROJECT,
  REMOVE_TASK,
  SET_PROJECTS_LIST,
  SET_PROJECT_INFO,
  SET_TASKS_LIST,
  UPDATE_PROJECTS_LIST,
  UPDATE_PROJECT_INFO,
  UPDATE_TASK_INFO,
  UPDATE_TASK_LIST,
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
          return of(enqueueFailedSnackbar(error.response.data.error));
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
          return of(enqueueFailedSnackbar(error.response.data.error));
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
          return of({ type: SET_PROJECT_INFO, payload: res.data.project });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      )
    )
  );
};

export const updateProjectInfoEpic = (action$) => {
  return action$.pipe(
    ofType(UPDATE_PROJECT_INFO),
    switchMap((action) =>
      from(axios.put(`${API}/${action.payload.id}`, action.payload.data)).pipe(
        mergeMap((res) => {
          return of({ type: SET_PROJECT_INFO, payload: res.data.project });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      )
    )
  );
};

export const getTaskListEpic = (action$) => {
  return action$.pipe(
    ofType(GET_TASKS_LIST),
    switchMap((action) =>
      from(axios.get(`${API}/${action.payload.projectId}/tasks`)).pipe(
        mergeMap((res) => {
          return of({ type: SET_TASKS_LIST, payload: res.data.tasks });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      )
    )
  );
};

export const createTaskEpic = (action$) => {
  return action$.pipe(
    ofType(ADD_TASK),
    switchMap((action) =>
      from(
        axios.post(
          `${API}/${action.payload.projectId}/tasks`,
          action.payload.data
        )
      ).pipe(
        mergeMap((res) => {
          return of({ type: UPDATE_TASK_LIST, payload: res.data.task });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      )
    )
  );
};

export const removeTaskEpic = (action$) => {
  return action$.pipe(
    ofType(REMOVE_TASK),
    switchMap((action) =>
      from(
        axios.delete(
          `${API}/${action.payload.projectId}/tasks/${action.payload.id}`
        )
      ).pipe(
        mergeMap((res) => {
          return of({ type: REDUCE_TASK_LIST, payload: res.data });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      )
    )
  );
};

export const updateTaskEpic = (action$) => {
  return action$.pipe(
    ofType(EDIT_TASK_INFO),
    switchMap((action) =>
      from(
        axios.put(
          `${API}/${action.payload.projectId}/tasks/${action.payload.id}`,
          action.payload.data
        )
      ).pipe(
        mergeMap((res) => {
          return of({ type: UPDATE_TASK_INFO, payload: res.data.task });
        }),
        catchError((error) => {
          return of(enqueueFailedSnackbar(error.response.data.error));
        })
      )
    )
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  getProjectListEpic,
  createProjectEpic,
  removeProjectEpic,
  getOneProjectEpic,
  updateProjectInfoEpic,
  getTaskListEpic,
  createTaskEpic,
  updateTaskEpic,
  removeTaskEpic,
];
