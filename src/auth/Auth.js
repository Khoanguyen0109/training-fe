import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Splash from "../layout/Splash";
import jwtService from "../services/jwtService";
import { loginFailed, loginSuccess, REMOVE_USER_DATA } from "./store/auth.action";

function Auth({ children }) {
  const [waitToCheck, setWaitToCheck] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([jwtCheck()]).then(() => setWaitToCheck(false));
  }, []);

  function jwtCheck() {
    new Promise((resolve) => {
      jwtService.on("onAutoLogin", () => {
        // this.props.showMessage({ message: "Logging in..." });

        /**
         * Sign in and retrieve user data from Api
         */
        jwtService
          .signInWithToken()
          .then((data) => {
            dispatch(loginSuccess(data));
            resolve();
          })
          .catch((error) => {
            dispatch(loginFailed(error));
            // this.props.showMessage({ message: error });
            resolve();
          });
      });

      jwtService.on("onAutoLogout", (message) => {
        if (message) {
          // this.props.showMessage({ message });
        }
        dispatch({ type: REMOVE_USER_DATA });
        resolve();
      });

      jwtService.on("onNoAccessToken", () => {
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    });
    return;
  }
  return waitToCheck ? <Splash /> : <> {children}</>;
}

export default Auth;
