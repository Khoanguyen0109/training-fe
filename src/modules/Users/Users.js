import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/DataTable";
import Layout from "../../layout/Layout";
import columns from "./columns";
import { ADD_USER, GET_USERS_LIST, REMOVE_USER } from "./store/user.actions";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const filterArray = ["name"];

  function filterFunc(item, searchText) {
    return item?.name
      ?.toString()
      .toLowerCase()
      .trim()
      .includes(searchText.toLowerCase().trim());
  }

  useEffect(() => {
    dispatch({ type: GET_USERS_LIST });
  }, []);

  function onRowClick() {}
  function addUser(data) {
    dispatch({ type: ADD_USER, payload: data });
  }

  function deleteUser(id) {
    console.log("id :>> ", id);
    dispatch({ type: REMOVE_USER, payload: id });
  }

  function editUser(id) {}

  if (!users) {
    return <div>Loading</div>;
  }
  return (
    <Layout>
      {" "}
      <DataTable
        headers={columns}
        rows={users}
        columns={columns}
        onRowClick={onRowClick}
        filterFunc={filterFunc}
        filterArray={filterArray}
        deleteAction={deleteUser}
        addAction={addUser}
        editAction={editUser}
      />
    </Layout>
  );
}

export default Users;
