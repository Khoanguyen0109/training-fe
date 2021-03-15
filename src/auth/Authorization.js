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

  const appContext = useContext(AppContext);
  const { routes } = appContext;
  const role = useSelector((state) => state.auth.role);
  const [accessGranted, setAccessGranted] = useState(true);

  useEffect(() => {
    const matched = matchRoutes(routes, pathname)[0];
    console.log("matched", matched);
    if (matched) {
      setAccessGranted(hasPermission(matched.route.auth, role));
    } else {
      setAccessGranted(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!accessGranted) {
      redirectRoute();
    }
  }, [accessGranted]);

  function redirectRoute() {
    const { pathname, state } = location;
    const redirectUrl = state && state.redirectUrl ? state.redirectUrl : "/";

    if (!role) {
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
