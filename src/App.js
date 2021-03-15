import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Provider, useSelector } from "react-redux";
import Auth from "./auth/Auth";
import { theme } from "./utils/theme/theme";

function App() {
  const user = useSelector((state) => state.auth);
  console.log("user :>> ", user);
  return (
    <ThemeProvider theme={theme}>
      <Auth>
        <div className="App">
          <header className="App-header">
            <img src="" className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Auth>
    </ThemeProvider>
  );
}

export default App;
