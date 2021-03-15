import { TableCell, TableHead } from "@material-ui/core";
import React from "react";

function TableHeader({ headers }) {
  return (
    <TableHead>
      {headers.map((header, key) => (
        <TableCell key={key} align={header.align} {...header}>
          {header.title}
        </TableCell>
      ))}
    </TableHead>
  );
}

export default TableHeader;
