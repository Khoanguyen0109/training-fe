import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { amber, red, blue, green, grey } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  title: {
    backgroundColor: theme.palette.primary,
    color: "#fffff",
    display: "flex",
    width: "100%",
    fontSize: "14px",
    alignItem: "center",
  },
  icon: {
    marginRight: "8px",
  },
  content: {
    backgroundColor: "#fffff",
  },
  message: {
    color: grey[800],
    fontSize: "18px",
    marginTop: "10px",
  },
  cancelBtn: {
    color: grey[800],
  },
  acceptBtn: {
    backgroundColor: theme.palette.primary,
    color: "#fffff",

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  success: {
    backgroundColor: green[500],
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: green[300],
    },
  },

  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.getContrastText(theme.palette.error.dark),
    "&:hover": {
      backgroundColor: red[300],
    },
  },
  info: {
    backgroundColor: blue[500],
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: blue[300],
    },
  },
  warning: {
    backgroundColor: "#EB942B",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: amber[300],
    },
  },
}));

const variantIcon = {
  success: "check_circle",
  warning: "warning",
  error: "error_outline",
  info: "info",
};

export default function ConfirmDialog(props) {
  const { variant, open, handleClose, message, title, confirmFunction } = props;
  const classes = useStyles();

  return (
    <Dialog
      className="overflow-hidden  md:min-w-640"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // paperWidthMd
    >
      <DialogTitle
        className={clsx(variant ? classes[variant] : classes.title)}
        id="alert-dialog-title"
      >
        {variant && variantIcon[variant] && (
          <Icon className="mr-8" color="inherit">
            {variantIcon[variant]}
          </Icon>
        )}
        <h3>{title}</h3>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText
          id="alert-dialog-description"
          className={classes.message}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.content}>
        <Button className={classes.cancelBtn} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className={clsx(variant ? classes[variant] : classes.acceptBtn)}
          onClick={confirmFunction}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
