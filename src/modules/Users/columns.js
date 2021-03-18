import { MenuItem, Select, TextField } from "@material-ui/core";
import * as yup from "yup";

/* eslint-disable import/no-anonymous-default-export */
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
        id: "email",
        header: "Email",
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
          validate: yup.string("Enter your email").required("email is required"),
        },
      },
      {
        id: "role",
        header: "Role",
        align: "left",
        type: "select",
        select: true,
        disablePadding: false,
        tableRender: {},
        defaultValue: 0,
        options: ['ADMIN' ,'EMPLOY'
        ],
        formRender: {
          render: (text, record, form) => {
            return (
              <Select
                {...record}
                defaultValue={0}
                id={record.id}
                label={record.header}
                name={record.id}
                value={text}
                onChange={form.handleChange}
                error={form.touched[record.id] && Boolean(form.errors[record.id])}
                helperText={form.touched[record.id] && form.errors[record.id]}
                MenuProps={{
                  getContentAnchorEl: null,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                }}
              >
                {record?.options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            );
          },
        },
      },
]