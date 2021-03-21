import { Icon, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router";

function Item(props) {
  const { title, path, onClick, icon } = props;
  const location = useLocation();
  const pathname = location.pathname;
  const selected = path === pathname;

  return (
    <ListItem button selected={selected} onClick={() => onClick(path)}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  );
}

export default Item;
