import { ListItem } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router";

function Item(props) {
  const { title, path, onClick } = props;
  const location = useLocation();
  const pathname = location.pathname;
  const selected = path === pathname;

  return (
    <ListItem button selected={selected} onClick={() => onClick(path)}>
      {title}
    </ListItem>
  );
}

export default Item;
