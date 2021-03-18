import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

function createValidateSchema(columns) {
  const validateSchema = {};
  columns.forEach((col) => {
    if (col.formRender?.validate) {
      validateSchema[col.id] = col.formRender.validate;
    }
  });
  return validateSchema;
}
function createDefaultValue(columns) {
  const defaultValue = {};
  columns.forEach((col) => {
    defaultValue[col.id] = col.defaultValue || "";
  });
  return defaultValue;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    display: "flex",
    flexDirection: "column",
  },
}));

function Form(props) {
  const { columns, saveAction, cancelAction, values , ...rest } = props;
  const classes = useStyles();
  const formik = useFormik({
    initialValues: values || createDefaultValue(columns),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(`values`, values);
      //   handleOpen();
      resetForm(values || createDefaultValue(columns));

      saveAction(values);
    },
    validationSchema: yup.object(createValidateSchema(columns)),
  });
  return (
    <form className={classes.content} onSubmit={formik.handleSubmit}>
      {/* { columns.map((col) =>   (
       <TextField
      {...col}
          id={col.id}
          label={col.header}
          name={col.id}
          value={formik.values[col.id]}
          onChange={formik.handleChange}
          error={formik.touched[col.id] && Boolean(formik.errors[col.id])}
          helperText={formik.touched[col.id] && formik.errors[col.id]}
        >
          {col.type === "select" &&
            col?.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
        </TextField>
      ))} */}

      {columns.map(col =>{
        if(col.formRender && typeof col.formRender.render ==='function'){
          return col.formRender.render(formik.values[col.id] , col , formik , rest)

        }
      })}
      <Button autoFocus onClick={cancelAction} color="primary">
        Cancel
      </Button>
      <Button type="submit" color="primary">
        Subscribe
      </Button>
    </form>
  );
}

Form.defaultProps = {};

export default Form;
