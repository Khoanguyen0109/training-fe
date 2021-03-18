import React from "react";
import { useSelector } from "react-redux";
import DataTable from "../../components/Table/DataTable";
import Layout from "../../layout/Layout";
import columns from "./columns";

function Users() {
  const users = useSelector((state) => state.users.usersList);
  const filterArray = ["name"];

  function onRowClick() {}
  function addUser() {
    return;
  }

  function filterFunc(item, searchText) {
    return item?.name
      ?.toString()
      .toLowerCase()
      .trim()
      .includes(searchText.toLowerCase().trim());
  }

  function deleteUser() {
    return;
  }

  function editUser(id) {}

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
