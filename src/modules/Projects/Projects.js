import { Box, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import DataTable from "../../components/Table/DataTable";
import Layout from "../../layout/Layout";
import columns from "./columns";

function Projects() {
  const headers = columns.map((col) => col.header);
  const data = [];
  const history = useHistory();

  function onRowClick(id) {
    history.push(`/projects/${id}`);
  }

  function filterSearch(item) {
    return true;
  }

  function deleteAction(id) {}

  return (
    <Layout>
      {" "}
      <DataTable
        headers={headers}
        rows={data}
        columns={columns}
        onRowClick={onRowClick}
        filterSearch={filterSearch}
        deleteAction={deleteAction}
      />
    </Layout>
  );
}

export default Projects;
