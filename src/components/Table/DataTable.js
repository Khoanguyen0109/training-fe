import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  makeStyles,
  Button,
  Typography,
  TextField,
  TablePagination,
} from "@material-ui/core";
import _ from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Row from "./Row";
import { createColumns } from "./createColumns";
import TableHeader from "./TableHeader";
import { ref } from "yup";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import Form from "../Form/Form";
import FormDialog from "../Dialog/FormDialog";

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
  const {
    headers,
    rows,
    filterArray,
    filterFunc,
    onRowClick,
    deleteAction,
    addAction,
    editAction,
    columns,
    ...rest
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const tableRef = useRef(null);

  const [filter, setFilter] = useState(rows);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  const [openAddForm, setOpenAddForm] = useState(false);
  function handleOpenAddForm() {
    setOpenAddForm(!openAddForm);
  }

  useEffect(() => {
    console.log(`render table`)
    if (searchText.length !== 0) {
      setFilter(_.filter(rows, (item) => filterFunc(item , searchText)));
    } else {
      setFilter(rows);
    }
  }, [rows, searchText]);



  /// Table Function
  function scrollToView() {
    tableRef.current.scrollIntoView();
  }

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";
    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }
    setOrder({
      direction,
      id,
    });
  }

  function handleChangePage(event, value) {
    setPage(value);
    scrollToView();
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    scrollToView();
  }

  return (
    <>
      <div>
        <TextField
          id=""
          label="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          autoComplete
        />{" "}
        <Button onClick={handleOpenAddForm}>Add</Button>
      </div>


      <FormDialog 
      open={openAddForm} 
      title="Add"
      handleOpen={handleOpenAddForm}
      >
        <Form
        columns={columns}
        saveAction={addAction}
        cancelAction={handleOpenAddForm}
       {...rest}

        />
      </FormDialog>
      <TableContainer ref={tableRef} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHeader
            headers={columns}
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={filter.length}
          />
          <TableBody>
            {_.orderBy(filter, [filterArray], [order.direction])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Row
                  columns={columns}
                    key={row.id}
                    rowId={row.id}
                    row={row}
                    onRowClick={onRowClick}
                    deleteAction={deleteAction || null}
                    editAction={editAction || null}

                  />
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filter.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableContainer>
    </>
  );
}

export default DataTable;
