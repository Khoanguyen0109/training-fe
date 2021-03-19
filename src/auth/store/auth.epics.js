import { combineEpics, ofType } from "redux-observable";
import axios from "axios";
import jwtService from "../../services/jwtService";
import { mergeMap, catchError, switchMap, map, tap } from "rxjs/operators";
import { from, of } from "rxjs";

import {
  LOGIN,
  loginFailed,
  loginSuccess,
  LOGOUT,
  SET_USER_DATA,
} from "./auth.action";

// const API = process.env.REACT_APP_BASE_URL;
const API = "http://localhost:5000";

export const loginEpic = (action$) => {
  return action$.pipe(
    ofType(LOGIN),
    mergeMap((action) => {
      const { email, password } = action.payload;
      return from(jwtService.signInWithEmailAndPassword(email, password)).pipe(
        tap((data) => console.log("HTTP response:", data)),
        mergeMap((data) => {
          console.log(`data`, data)

          if (data.error) {
            console.log(`data`, data)
            return of(loginFailed(data.error));
          }
          return of(loginSuccess(data));
        }),

        catchError((data) => {
          console.log(`data`, data)
          return of(loginFailed(data.error));
        })
      );
    })
  );
};

// export const logoutEpic = (action$) => {
//   return action$.pipe(
//     ofType(LOGOUT),
//     mergeMap((action) => {
//       return from(jwtService.logout()).pipe(
//         mergeMap((data) => {
//           if (data.error) {
//             return of(loginFailed(data.error));
//           }
//           return of({ type: SET_USER_DATA, payload: null });
//         })
//       );
//     })
//   );
// };


export default [loginEpic
];
