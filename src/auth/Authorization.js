import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

function Authorization({ children }) {
  const role = useSelector((state) => state.auth.role);
  if (!role) {
    return <Redirect to="/login" />;
  } else {
  }
  return <>{children}</>;
}

export default Authorization;
