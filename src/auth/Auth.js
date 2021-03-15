import React, { useEffect, useState } from "react";
import Splash from "../layout/Splash";

function Auth({ children }) {
  const [waitToCheck, setWaitToCheck] = useState(true);

  useEffect(() => {
    Promise.all([jwtCheck(), authOCheck()]).then(setWaitToCheck(false));
  });

  async function authOCheck() {
    return;
  }
  async function jwtCheck() {
    console.log("jwtCheck :>> ");
    return;
  }
  return waitToCheck ? <Splash /> : <> {children}</>;
}

export default Auth;
