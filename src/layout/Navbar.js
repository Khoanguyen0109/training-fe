import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Badge,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import jwtService from '../services/jwtService'
import React from "react";
import clsx from "clsx";
import { DRAWER_WIDTH } from "./config";
import { useDispatch } from "react-redux";
import { REMOVE_USER_DATA } from "../auth/store/auth.action";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()

  
  function handleLogout(){
    dispatch({
      type:REMOVE_USER_DATA
    })
    jwtService.logout()
    history.push({
			pathname: '/'
		});
  } 
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, props.open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          className={clsx(
            classes.menuButton,
            props.open && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Button onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(Navbar);
