import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { useSelector } from "react-redux";
import Auth from "./auth/Auth";
import { theme } from "./utils/theme/theme";
import routes from "./routes/routes";
import Authorization from "./auth/Authorization";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout/Layout";
import AppContext from "./AppContex";
import { renderRoutes } from "react-router-config";

function App() {
  const user = useSelector((state) => state.auth);
  console.log("routes", routes);
  return (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <ThemeProvider theme={theme}>
        <Auth>
          <Router>
            <Authorization>
              <AppContext.Consumer>
                {({ routes }) => {
                  console.log("routes", routes);
                  return <>{renderRoutes(routes)}</>;
                }}
              </AppContext.Consumer>{" "}
            </Authorization>
          </Router>
        </Auth>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
