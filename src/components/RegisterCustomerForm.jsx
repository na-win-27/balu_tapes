import React from "react";
import { Paper, Button, Rating } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAddNewCustomerMutation } from "state/api";
import FormikReactSelect from "./FormikReactSelect";

const RegisterCustomerForm = ({ formSubmit }) => {
  const paperStyle = { width: "100%", height: "100%" };
  const e = {
    marginTop: "10px",
    width: "100%",
  };
  const [addNewCustomer, response] = useAddNewCustomerMutation();
  const btnStyle = { marginTop: 10 };

  const initialValues = {
    name: "",
  };

  const onSubmit = (values, props) => {
    console.log(values);
    addNewCustomer(values);
  };
  return (
    <Paper elevation={2} style={paperStyle}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form noValidate>
            <Paper
              style={{
                display: "grid",
                gridTemplateColumns: "5fr 4fr",
                gridColumnGap: "50px",
                justifyContent: "stretch",
                alignItems: "stretch",
              }}
            >
              <Paper
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Field
                  style={e}
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  required
                />
                  <Field
                  
                  as={(props)=>(<TextField {...props} style={e} 
                  multiline  rows={4} />)}
                  name="address"
                  label="Address"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  required
                />
               
              </Paper>

              <Paper
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "space-around",
                }}
              >
                <Field
                  style={e}
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
                 <Field
                  style={e}
                  as={TextField}
                  name="gstin"
                  label="GSTIN"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />

                <Button
                  type="submit"
                  style={btnStyle}
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </Paper>
            </Paper>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default RegisterCustomerForm;
