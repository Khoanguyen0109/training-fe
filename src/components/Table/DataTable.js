import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Row from "./Row";
import TableHeader from "./TableHeader";
import { ToastContainer, toast } from "react-toastify";
import { creatColumns } from "../../utils/createColumns";
import { columns } from "./columns";
import { saveGrades, SAVE_GRADES } from "../../redux/actions/grade.action";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    maxWidth: 650,
    margin: "auto",
  },

  error: {
    color: "red",
  },
});

function DataTable(props) {
  const { headers, rows, action } = props;
  const classes = useStyles();
  const [tableRows, setTableRows] = useState(rows);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const total = useMemo(
    () =>
      tableRows.reduce((total, obj) => parseFloat(obj?.weight || 0) + total, 0),
    [tableRows]
  );

  function onAdd() {
    if (
      tableRows.length > 0 &&
      (!tableRows[tableRows.length - 1].name ||
        !tableRows[tableRows.length - 1].type)
    ) {
      return;
    }
    setTableRows(() => [
      ...tableRows,
      {
        id: tableRows[tableRows.length - 1]?.id + 1 || 1,
        name: "",
        type: "",
        weight: 100 - total < 0 ? 0 : 100 - total,
      },
    ]);
  }

  function onEdit(id, key, data) {
    const editIndex = tableRows.findIndex((row) => row.id === id);
    setTableRows(
      [...tableRows].map((row) => {
        if (row.id === id) {
          return {
            ...row,
            [key]: data,
          };
        }
        return row;
      })
    );
  }

  function onDelete(id) {
    setTableRows(() => tableRows.filter((row) => row.id !== id));
    onSave();
  }

  function onSave() {
    if (checkAllFilled() || total > 100) {
      return;
    } else if (checkDuplicate()) {
    } else {
      dispatch(action(tableRows));
    }
  }

  function checkDuplicate() {
    return (
      new Set([...tableRows].map((row) => row.name)).size !==
      [...tableRows].map((row) => row.name).length
    );
  }
  function checkAllFilled() {
    return tableRows.find((row) => !row.name || !row.type || row.weight === "");
  }

  return (
    <>
      <TableContainer
        component={Paper}
        onClickAway={() => console.log(" clecik âsasdasd")}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHeader headers={headers} />
          <TableBody>
            {tableRows.map((row, index) => {
              const rowData = creatColumns(columns, row);
              return (
                <Row
                  key={index}
                  id={index}
                  rowId={row.id}
                  row={rowData}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onSave={onSave}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={onAdd}>Add</Button>
      <Button onClick={onSave}>Save</Button>
      <Typography className={total > 100 ? classes.error : ""}>
        {total?.toFixed(2)}
      </Typography>
    </>
  );
}

// DataTable.defaultProps ={
//   // editable:true,
//   headers:[],
//   data:[],
// }

export default DataTable;
