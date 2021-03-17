import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import DataTable from "../../../components/Table/DataTable";
import columns from "./columns";

function Tasks() {
  const headers = columns.map((col) => col.header);

  const tasks = useSelector((state) => state.projects.tasks);

  useEffect(() => {}, []);

  function addTask() {}

  function deleteTask() {}

  function onRowClick() {}
  function filterSearch(item) {
    return true;
  }

  return (
    <div>
      {" "}
      <DataTable
        headers={headers}
        rows={tasks}
        columns={columns}
        onRowClick={onRowClick} 
        filterSearch={filterSearch}
        deleteAction={deleteTask}
        addAction={addTask}
      />
    </div>
  );
}

export default Tasks;
