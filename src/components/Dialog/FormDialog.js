import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import Form from "../Form/Form";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    display: "flex",
    flexDirection: "column",
  },
}));

function FormDialog(props) {
  const {
    open,
    title,
    handleOpen,
    columns,
    saveAction,
    cancelAction,
    values,
  } = props;
  const classes = useStyles();

  function handleCancelAction() {
    handleOpen();
    cancelAction();
  }
  return (
    <Dialog
      open={open}
      onClose={handleOpen}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Form
          columns={columns}
          values={values}
          saveAction={saveAction}
          cancelAction={handleCancelAction}
        />
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}

export default FormDialog;
