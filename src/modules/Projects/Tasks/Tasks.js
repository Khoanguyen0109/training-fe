import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../components/Table/DataTable";
import { UPDATE_TASK_STATUS } from "../store/projects.actions";
import columns from "./columns";

function Tasks() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.projects.tasks);
  const filterArray=['name']

  function filterFunc(item, searchText) {
    return item?.name
      ?.toString()
      .toLowerCase()
      .trim()
      .includes(searchText.toLowerCase().trim());
  }
  
  useEffect(() => {}, []);
  function addTask() {
    return 
  }

  function deleteTask() {
    return 
  }

  function editAction(id){
    dispatch({type:UPDATE_TASK_STATUS ,payload: id})
  }

  function onRowClick() {}


  return (
    <div>
      {" "}
      <DataTable
        headers={columns}
        rows={tasks}
        columns={columns}
        onRowClick={onRowClick} 
        filterFunc={filterFunc}
        filterFunc={filterFunc}
        filterArray={filterArray}
        deleteAction={deleteTask}
        addAction={addTask}
        editAction={editAction}
      />
    </div>
  );
}

export default Tasks;
