import {
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { DRAWER_WIDTH } from "./config";
import { useSelector } from "react-redux";
import routes from "../routes/routes";
import Item from "./Item";
import hasPermission from "../auth/hasPermission";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}));

function SideBar(props) {
  const classes = useStyles();
  const history = useHistory();

  const currentUser = useSelector((state) => state.auth);
  const menus = () => {
    const menus = routes.filter(
      (route) => !!route.menu && hasPermission(route.auth, currentUser.role)
    );
    const orderedItems = menus.sort((a, b) => {
      const orderA = a.menu?.order;
      const orderB = b.menu?.order;
      if (orderA && orderB) {
        return orderA - orderB;
      }
      return a - b;
    });
    return orderedItems;
  };

  const handleClick = (path) => {
    history.push(path);
  };
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !props.open && classes.drawerPaperClose
        ),
      }}
      open={props.open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={props.handleDrawerOpen}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menus().map((item, index) => (
          <Item
            title={item.menu.title}
            path={item.menu.path}
            onClick={handleClick}
          ></Item>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

export default React.memo(SideBar);
