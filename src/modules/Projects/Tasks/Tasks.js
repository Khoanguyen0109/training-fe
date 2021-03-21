import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import DataTable from "../../../components/Table/DataTable";
import {
  ADD_TASK,
  EDIT_TASK_INFO,
  GET_TASKS_LIST,
  REMOVE_TASK,
  UPDATE_TASK_STATUS,
} from "../store/projects.actions";
import columns from "./columns";

function Tasks() {
  const params = useParams();
  const { projectId } = params;
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.projects.tasks);
  const filterArray = ["name"];

  function filterFunc(item, searchText) {
    return item?.name
      ?.toString()
      .toLowerCase()
      .trim()
      .includes(searchText.toLowerCase().trim());
  }

  useEffect(() => {
    dispatch({
      type: GET_TASKS_LIST,
      payload: {
        projectId,
      },
    });
  }, [projectId]);

  function addTask(data) {
    dispatch({
      type: ADD_TASK,
      payload: {
        projectId,
        data,
      },
    });
  }

  function deleteTask(id) {
    dispatch({
      type: REMOVE_TASK,
      payload: {
        projectId,
        id,
      },
    });
  }

  function editAction(data) {
    dispatch({
      type: EDIT_TASK_INFO,
      payload: {
        projectId,
        id: data.id,
        data,
      },
    });
  }

  function onRowClick(id) {}

  return (
    <>
      {" "}
      <DataTable
        headers={columns}
        rows={tasks}
        columns={columns}
        onRowClick={onRowClick}
        filterFunc={filterFunc}
        filterArray={filterArray}
        deleteAction={deleteTask}
        addAction={addTask}
        editAction={editAction}
      />
    </>
  );
}

export default Tasks;
