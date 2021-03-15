import { Button, makeStyles, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import DeleteButton from "../buttons/DeleteButton";
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
  const { rowId, row, onDelete, onEdit, onSave } = props;
  const classes = useStyles();
  console.log("row", row);
  return (
    <>
      <TableRow className={classes.row}>
        {row.map(
          (cell, index) =>
            cell.sort && (
              <Cell
                key={index}
                rowId={rowId}
                cell={cell}
                onEdit={onEdit}
                onSave={onSave}
              />
            )
        )}
        <TableCell className={classes.deleteCell}>
          <Button
            onClick={() => {
              onDelete(rowId);
            }}
          >
            <DeleteButton />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
