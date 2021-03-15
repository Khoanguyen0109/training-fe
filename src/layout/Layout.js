import { CssBaseline, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Panel from "./Panel";
import SideBar from "./SideBar";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
function Layout({ children }) {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Panel>{children}</Panel>
    </div>
  );
}

export default Layout;
