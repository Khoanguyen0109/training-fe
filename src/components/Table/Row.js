import {
  Button,
  Icon,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hasPermission from "../../auth/hasPermission";
import ConfirmDialog from "../CofirmDialog/ConfirmDialog";
import FormDialog from "../Dialog/FormDialog";
import Form from "../Form/Form";
import { createColumns } from "./createColumns";

const useStyles = makeStyles({
  row: {
    // minWidth: 650,
  },
  actionCell: {
    borderBlockStyle: "none",
  },
});

function Row(props) {
  const { columns, rowId, row, onRowClick, deleteAction, editAction } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ auth }) => auth.user);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  function handleOpenDeleteConfirm(e) {
    setOpenDelete(!openDelete);
  }
  function handleOpenEditConfirm(e) {
    setOpenEdit(!openEdit);
  }

  async function handleDelete() {
    await deleteAction(row.id);
    setOpenDelete(false);
  }

  return (
    <>
      <TableRow onClick={(e) => onRowClick(rowId)} className={classes.row}>
        {createColumns(columns, row).map(
          (cell) =>
            cell.tableRender && (
              <TableCell key={cell.id} align={cell.align}>
                {cell.tableRender.render
                  ? cell.tableRender.render(cell.data, row, editAction)
                  : cell.data}
              </TableCell>
            )
        )}
        <TableCell
          component="th"
          scope="row"
          align="center"
          className={classes.actionCell}
        >
          {editAction && (
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                handleOpenEditConfirm(ev);
              }}
            >
              <Edit />
            </IconButton>
          )}
          {deleteAction && (
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                handleOpenDeleteConfirm(ev);
              }}
            >
              <DeleteOutline />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <FormDialog
        open={openEdit}
        title="Edit"
        handleOpen={handleOpenEditConfirm}
      >
        <Form
          values={row}
          columns={columns}
          saveAction={editAction}
          cancelAction={handleOpenEditConfirm}
        />
      </FormDialog>
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
