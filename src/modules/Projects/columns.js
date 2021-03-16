import * as yup from "yup";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    id: "id",
    header: "ID ",
    align: "left",
    disablePadding: false,
    sort: true,
  },

  {
    id: "name",
    header: "Name",
    align: "left",
    disablePadding: false,
    sort: true,
    validate: yup.string("Enter your name").required("name is required"),
  },
  {
    id: "status",
    header: "Status",
    align: "left",
    type: "select",
    select: true,
    disablePadding: false,
    sort: true,
    options: ["Active", "Inactive"],
  },
  // {
  //   id: "startDate",
  //   header: "Start Date",
  //   align: "left",
  //   type: "Number",
  //   disablePadding: false,
  //   sort: true,
  //   inputProps: {
  //     min: 0,
  //     max: 100,
  //   },
  // },
];
