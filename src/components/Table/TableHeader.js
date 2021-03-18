import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import hasPermission from "../../auth/hasPermission";

function TableHeader({ headers, order, ...props }) {
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  const currentUser = useSelector(({ auth }) => auth.user);

  console.log(`headers`, headers)
  return (
    <TableHead>
      <TableRow className="bg-grey-A800">
        {headers.map((col) => {
          if (col.auth &&   !hasPermission(col.auth, currentUser.role)) {
            return null;
          }
          return (
           col.tableRender&& <TableCell
              key={col.id}
              align={col.align}
              padding={col.disablePadding ? "none" : "default"}
              sortDirection={order.id === col.id ? order.direction : false}
              className="text-white font-bold"
            >
              {col.tableRender && (
                <Tooltip
                  title="Sort"
                  placement={
                    col.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={order.id === col.id}
                    direction={order.direction}
                    onClick={createSortHandler(col.id)}
                  >
                    {col.header}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
