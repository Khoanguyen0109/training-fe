import { Box, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import DataTable from "../../components/Table/DataTable";
import Layout from "../../layout/Layout";
import columns from "./columns";
import { ADD_PROJECT, REMOVE_PROJECT } from "./store/projects.actions";

function Projects() {
  const headers = columns.map((col) => col.header);
  const projects = useSelector(state => state.projects.projectsList)
  const users = useSelector(state=> state.users.usersList)
  const filterArray=['name']
  const history = useHistory();
  
  const dispatch= useDispatch()
  useEffect(()=>{

    //fetch Project
  },[])

  function filterFunc(item, searchText) {
    return item?.name
      ?.toString()
      .toLowerCase()
      .trim()
      .includes(searchText.toLowerCase().trim());
  }

  function onRowClick(id) {
    history.push(`/projects/${id}`);
  }



  function addProject(data){
    dispatch({
      type:ADD_PROJECT,
      payload: data
    })


  }

  function deleteProject(id) {
    console.log(`id`, id)
    dispatch({
      type:REMOVE_PROJECT,
      payload: id
    })

  }

  console.log(`headers`, headers)
  return (
    <Layout>
      {" "}
      <DataTable
        headers={headers}
        rows={projects}
        columns={columns}
        filterFunc={filterFunc}
        onRowClick={onRowClick}
        filterArray={filterArray}
        deleteAction={deleteProject}
        addAction={addProject}
        users={users}
      />
    </Layout>
  );
}

export default Projects;
