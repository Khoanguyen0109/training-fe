import { makeStyles, MenuItem, TableCell } from "@material-ui/core";
import React from "react";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    "&[type=number]": {
      "-moz-appearance": "textfield",
    },
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

function Cell(props) {
  const { rowId, cell, onEdit, onSave } = props;
  const classes = useStyles();
  return (
    <TableCell>
      <TextField
        {...cell}
        onBlur={(e) => onSave()}
        onChange={(e) => {
          if (
            cell.type === "Number" &&
            (parseFloat(e.target.value) > 100 ||
              parseFloat(e.target.value) < 0 ||
              !validateNumber(e.target.value) ||
              (e.target.value && !validateDecimal(parseFloat(e.target.value))))
          ) {
            return;
          }
          onEdit(rowId, cell.id, e.target.value);
        }}
        SelectProps={{
          MenuProps: {
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            classes: {
              list: classes.list,
            },
            PopoverClasses: {
              paper: classes.paper,
            },
          },
        }}
        value={cell.data}
        InputProps={{
          classes: {
            input: classes.input,
          },
          disableUnderline: true,
        }}
      >
        {cell.type === "select" &&
          cell?.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
      </TextField>
    </TableCell>
  );
}

export default Cell;

function validateDecimal(decimalValue) {
  const rx = /^\d+(?:\.\d{1,2})?$/;

  if (rx.test(decimalValue)) {
    return true;
  } else {
    return false;
  }
}

function validateNumber(value) {
  return !isNaN(value);
}
