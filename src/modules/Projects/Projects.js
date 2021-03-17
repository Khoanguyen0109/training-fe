import { Box, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import DataTable from "../../components/Table/DataTable";
import Layout from "../../layout/Layout";
import columns from "./columns";

function Projects() {
  const headers = columns.map((col) => col.header);
  const projects = useSelector(state => state.projects.projectsList)
  const history = useHistory();

  useEffect(()=>{},[])

  function onRowClick(id) {
    history.push(`/projects/${id}`);
  }

  function filterSearch(item) {
    return true;
  }

  function addProject(){

  }

  function deleteProject(id) {}

  console.log(`headers`, headers)
  return (
    <Layout>
      {" "}
      <DataTable
        headers={headers}
        rows={projects}
        columns={columns}
        onRowClick={onRowClick}
        filterSearch={filterSearch}
        deleteAction={deleteProject}
        addAction={addProject}
      />
    </Layout>
  );
}

export default Projects;
