import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import * as yup from "yup";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    id: "id",
    header: "ID ",
    align: "left",
    disablePadding: false,
    tableRender: false,
    formRender: {},
  },

  {
    id: "name",
    header: "Project Name",
    align: "left",
    disablePadding: false,
    tableRender: true,
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
      validate: yup.string("Enter your name").required("name is required"),
    },
  },

  {
    id: "description",
    header: "Description",
    align: "left",
    tableRender: false,
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
            multiline
            rows={3}
            rowsMax={4}
            onChange={form.handleChange}
            error={form.touched[record.id] && Boolean(form.errors[record.id])}
            helperText={form.touched[record.id] && form.errors[record.id]}
          ></TextField>
        );
      },
    },
  },

  {
    id: "users",
    header: "Users",
    align: "left",
    type: "select",
    disablePadding: false,
    defaultValue: [],
    tableRender: false,
    formRender: {
      render: (text, record, form, rest) => {
        console.log("rest.users :>> ", rest.users);
        return (
          <FormControl>
            <InputLabel shrink id="select-user">
              Users
            </InputLabel>
            <Select
              labelId="select-user"
              {...record}
              select
              multiple
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
              {rest?.users?.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
      // validate: yup.string("Enter your name").required("name is required"),
    },
  },
  // {
  //   id: "status",
  //   header: "Status",
  //   align: "left",
  //   type: "select",
  //   select: true,
  //   disablePadding: false,
  //   tableRender: {},
  //   defaultValue: 0,
  //   options: [
  //     {
  //       id: 1,
  //       status: "Active",
  //     },
  //     {
  //       id: 0,
  //       status: "Inactive",
  //     },
  //   ],
  //   formRender: {
  //     render: (text, record, form) => {
  //       return (
  //         <Select
  //           {...record}
  //           defaultValue={0}
  //           id={record.id}
  //           label={record.header}
  //           name={record.id}
  //           value={text}
  //           onChange={form.handleChange}
  //           error={form.touched[record.id] && Boolean(form.errors[record.id])}
  //           helperText={form.touched[record.id] && form.errors[record.id]}
  //           MenuProps={{
  //             getContentAnchorEl: null,
  //             anchorOrigin: {
  //               vertical: "bottom",
  //               horizontal: "left",
  //             },
  //           }}
  //         >
  //           {record?.options?.map((option) => (
  //             <MenuItem key={option.id} value={option.id}>
  //               {option.status}
  //             </MenuItem>
  //           ))}
  //         </Select>
  //       );
  //     },
  //   },
  // },
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
  // {
  //   id: "action",
  //   header: "Action",
  //   align: "left",
  //   disablePadding: false,
  //   auth:['ADMIN'],
  //   tableRender:{
  //     render:()=>{

  //     }
  //   }
  // },
];
