import { ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./auth/Auth";
import { theme } from "./utils/theme/theme";
import routes from "./routes/routes";
import Authorization from "./auth/Authorization";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "./AppContex";
import { renderRoutes } from "react-router-config";
import Notifier from "./components/Noitfier/Notifier";

function App() {
  const user = useSelector((state) => state.auth);
  const [openDrawer, setOpenDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <AppContext.Provider
      value={{
        routes,
        openDrawer,
        handleDrawerOpen,
      }}
    >
      <ThemeProvider theme={theme}>
        <Notifier />

        <Auth>
          <Router>
            <Authorization>
              <AppContext.Consumer>
                {({ routes }) => {
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
