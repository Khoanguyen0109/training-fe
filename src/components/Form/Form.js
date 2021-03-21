import { Button, makeStyles } from "@material-ui/core";
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
    if (col.formRender?.validate) {
      defaultValue[col.id] = col.defaultValue || "";
    }
  });
  return defaultValue;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minWidth: 450,

    "& .MuiFormControl-root	": {
      marginTop: 25,
    },
  },

  formActions: {
    display: "flex",
    marginTop: 30,
    justifyContent: "flex-end",
  },
}));

function Form(props) {
  const { columns, saveAction, cancelAction, values, ...rest } = props;
  const classes = useStyles();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values || createDefaultValue(columns),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      //   handleOpen();
      resetForm(values || createDefaultValue(columns));

      saveAction(values);
      cancelAction();
    },
    validationSchema: yup.object(createValidateSchema(columns)),
  });

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      {columns.map((col) => {
        if (col.formRender && typeof col.formRender.render === "function") {
          return col.formRender.render(
            formik.values[col.id],
            col,
            formik,
            rest
          );
        }
      })}
      <div className={classes.formActions}>
        <Button autoFocus onClick={cancelAction} color="primary">
          Cancel
        </Button>
        <Button type="submit " variant="contained" color="primary">
          SAve
        </Button>
      </div>
    </form>
  );
}

Form.defaultProps = {};

export default Form;
