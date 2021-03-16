import {
  Button,
  Icon,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Action } from "rxjs/internal/scheduler/Action";
import hasPermission from "../../auth/hasPermission";
import ConfirmDialog from "../CofirmDialog/ConfirmDialog";
import Cell from "./Cell";

const useStyles = makeStyles({
  row: {
    // minWidth: 650,
  },
  deleteCell: {
    borderBlockStyle: "none",
  },
});

function Row(props) {
  const { rowId, row, onRowClick, deleteAction } = props;
  const classes = useStyles();
  const currentUser = useSelector(({ auth }) => auth.user);
  const [openDelete, setOpenDelete] = useState(false);

  function handleOpenDeleteConfirm(e) {
    setOpenDelete(!openDelete);
  }

  async function handleDelete() {
    await deleteAction();
    setOpenDelete(false);
  }

  return (
    <>
      <TableRow onClick={(e) => onRowClick(rowId)} className={classes.row}>
        {row.map(
          (cell, index) =>
            cell.sort && <Cell key={index} rowId={rowId} cell={cell} />
        )}
        {hasPermission(row.auth, currentUser.role) && (
          <TableCell
            component="th"
            scope="row"
            align="center"
            className={classes.deleteCell}
          >
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                handleOpenDeleteConfirm(ev);
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </TableCell>
        )}
        <TableCell className={classes.deleteCell}>
          <Button>Delete</Button>
        </TableCell>
      </TableRow>
      <ConfirmDialog
        id={row.id}
        title="Are you sure to Delete this?"
        messages=""
        open={openDelete}
        handleClose={handleOpenDeleteConfirm}
        confirmFunction={handleDelete}
      />
    </>
  );
}

export default Row;
