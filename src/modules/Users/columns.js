import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
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
    tableRender: {},
    formRender: {
      render: (text, record, form) => {
        return (
          <TextField
            {...record}
            id={record.id}
            label={record.header}
            name={record.id}
            value={text}
            InputLabelProps={{ shrink: true }}
            onChange={form.handleChange}
            error={form.touched[record.id] && Boolean(form.errors[record.id])}
            helperText={form.touched[record.id] && form.errors[record.id]}
          ></TextField>
        );
      },
      validate: yup.string("Enter user name").required("name is required"),
    },
  },
  {
    id: "email",
    header: "Email",
    align: "left",
    disablePadding: false,
    sort: true,
    tableRender: {},
    formRender: {
      render: (text, record, form) => {
        return (
          <TextField
            {...record}
            id={record.id}
            label={record.header}
            name={record.id}
            value={text}
            InputLabelProps={{ shrink: true }}
            onChange={form.handleChange}
            error={form.touched[record.id] && Boolean(form.errors[record.id])}
            helperText={form.touched[record.id] && form.errors[record.id]}
          ></TextField>
        );
      },
      validate: yup.string("Enter user email").required("email is required"),
    },
  },
  {
    id: "role",
    header: "Role",
    align: "center",
    type: "select",
    select: true,
    disablePadding: false,
    tableRender: {},
    defaultValue: 0,
    options: ["ADMIN", "EMPLOY"],
    formRender: {
      render: (text, record, form) => {
        return (
          <FormControl>
            <InputLabel shrink id="select-user">
              Users
            </InputLabel>
            <Select
              labelId="select-user"
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
          </FormControl>
        );
      },
      validate: yup.string("Enter user role").required("role is required"),
    },
  },

  {
    id: "password",
    header: "Password",
    align: "left",
    disablePadding: false,
    sort: true,
    type: "password",
    tableRender: false,
    defaultValue: "",
    formRender: {
      render: (text, record, form) => {
        return (
          <TextField
            {...record}
            id={record.id}
            label={record.header}
            name={record.id}
            InputLabelProps={{ shrink: true }}
            value={text}
            onChange={form.handleChange}
            error={form.touched[record.id] && Boolean(form.errors[record.id])}
            helperText={form.touched[record.id] && form.errors[record.id]}
          ></TextField>
        );
      },
      validate: yup
        .string("Enter user password")
        .required("password is required"),
    },
  },
  {
    id: "confirm_password",
    header: "Confirm Password",
    align: "left",
    disablePadding: false,
    type: "password",
    sort: true,
    tableRender: false,
    defaultValue: "",
    formRender: {
      render: (text, record, form) => {
        return (
          <TextField
            {...record}
            id={record.id}
            label={record.header}
            InputLabelProps={{ shrink: true }}
            name={record.id}
            value={text}
            onChange={form.handleChange}
            error={form.touched[record.id] && Boolean(form.errors[record.id])}
            helperText={form.touched[record.id] && form.errors[record.id]}
          ></TextField>
        );
      },
      validate: yup
        .string()
        .oneOf([yup.ref("password")], "Password's not match")
        .required("Required!"),
    },
  },
];
