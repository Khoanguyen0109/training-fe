/* eslint-disable import/no-anonymous-default-export */
import { Switch, TextField } from "@material-ui/core";
import * as yup from "yup";
import { UPDATE_TASK_STATUS } from "../store/projects.actions";

export default [
  {
    id: "id",
    header: "ID ",
    align: "left",
    disablePadding: false,
    sort: false,
    tableRender: false,
  },

  {
    id: "name",
    header: "Name",
    align: "left",
    disablePadding: false,
    sort: true,
    tableRender: {

    },
    formRender: {
      render: (text, record, form) => {
        return (
          <TextField
            {...record}
            id={record.id}
            label={record.header}
            name={record.id}
            value={text}
            onChange={form.handleChange}
            error={form.touched[record.id] && Boolean(form.errors[record.id])}
            helperText={form.touched[record.id] && form.errors[record.id]}
          ></TextField>
        );
      },
      validate: yup.string("Enter your name").required("name is required"),
    },
  },
  {
    id: "status",
    header: "Status",
    align: "left",
    select: true,
    disablePadding: false,
    sort: true,

    tableRender: {
      render:(text , record , action) =>{
      return  <Switch
        checked={text }
        name="checkedA"
        onChange={()=>{
          action(record.id)

        }
        }
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      }

    },

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
