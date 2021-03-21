import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router";
import { matchRoutes } from "react-router-config";
import AppContext from "../AppContex";
import hasPermission from "./hasPermission";
import roles from "./roles";

function Authorization({ children }) {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const user = useSelector((state) => state.auth.user);
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  const [accessGranted, setAccessGranted] = useState(true);

  useEffect(() => {
    const matched = matchRoutes(routes, pathname)[0];
    if (matched) {
      setAccessGranted(hasPermission(matched.route.auth, user.role));
    }
  }, [pathname, user.role]);

  useEffect(() => {
    if (!accessGranted) {
      redirectRoute();
    }
  }, [accessGranted]);

  function redirectRoute() {
    const { pathname, state } = location;
    console.log("location :>> ", location);
    const redirectUrl = state && state.redirectUrl ? state.redirectUrl : "/";
    console.log("redirectUrl :>> ", redirectUrl);
    if (!user.role) {
      history.push({
        pathname: "/login",
        state: { redirectUrl: pathname },
      });
    } else {
      history.push({
        pathname: redirectUrl,
      });
    }
  }

  return accessGranted ? <>{children}</> : null;
}

export default Authorization;
