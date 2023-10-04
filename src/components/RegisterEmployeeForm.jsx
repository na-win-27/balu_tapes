import React from "react";
import { Paper, Button, Rating } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAddNewEmployeeMutation } from "state/api";
import FormikReactSelect from "./FormikReactSelect";

const RegisterEmployeeForm = ({ formSubmit }) => {
  const paperStyle = { width: "100%", height: "100%" };
  const e = {
    marginTop: "10px",
    width: "100%",
  };
  const [addNewEmployee, response] = useAddNewEmployeeMutation();
  const btnStyle = { marginTop: 10 };

  const initialValues = {
    name: "",
  };

  const onSubmit = (values, props) => {
    addNewEmployee(values);
    formSubmit();
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
                  name="aadhar"
                  label="Aadhar Number"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  required
                />
                   <FormikReactSelect
                  style={e}
                  val={true}
                  name="state"
                  placeholder="state"
                  data={[
                    {
                      key: "AN",
                      name: "Andaman and Nicobar Islands",
                    
                    },
                    {
                      key: "AP",
                      name: "Andhra Pradesh",
                    },
                    {
                      key: "AR",
                      name: "Arunachal Pradesh",
                    },
                    {
                      key: "AS",
                      name: "Assam",
                    },
                    {
                      key: "BR",
                      name: "Bihar",
                    },
                    {
                      key: "CG",
                      name: "Chandigarh",
                    },
                    {
                      key: "CH",
                      name: "Chhattisgarh",
                    },
                    {
                      key: "DH",
                      name: "Dadra and Nagar Haveli",
                    },
                    {
                      key: "DD",
                      name: "Daman and Diu",
                    },
                    {
                      key: "DL",
                      name: "Delhi",
                    },
                    {
                      key: "GA",
                      name: "Goa",
                    },
                    {
                      key: "GJ",
                      name: "Gujarat",
                    },
                    {
                      key: "HR",
                      name: "Haryana",
                    },
                    {
                      key: "HP",
                      name: "Himachal Pradesh",
                    },
                    {
                      key: "JK",
                      name: "Jammu and Kashmir",
                    },
                    {
                      key: "JH",
                      name: "Jharkhand",
                    },
                    {
                      key: "KA",
                      name: "Karnataka",
                    },
                    {
                      key: "KL",
                      name: "Kerala",
                    },
                    {
                      key: "LD",
                      name: "Lakshadweep",
                    },
                    {
                      key: "MP",
                      name: "Madhya Pradesh",
                    },
                    {
                      key: "MH",
                      name: "Maharashtra",
                    },
                    {
                      key: "MN",
                      name: "Manipur",
                    },
                    {
                      key: "ML",
                      name: "Meghalaya",
                    },
                    {
                      key: "MZ",
                      name: "Mizoram",
                    },
                    {
                      key: "NL",
                      name: "Nagaland",
                    },
                    {
                      key: "OR",
                      name: "Odisha",
                    },
                    {
                      key: "PY",
                      name: "Puducherry",
                    },
                    {
                      key: "PB",
                      name: "Punjab",
                    },
                    {
                      key: "RJ",
                      name: "Rajasthan",
                    },
                    {
                      key: "SK",
                      name: "Sikkim",
                    },
                    {
                      key: "TN",
                      name: "Tamil Nadu",
                    },
                    {
                      key: "TS",
                      name: "Telangana",
                    },
                    {
                      key: "TR",
                      name: "Tripura",
                    },
                    {
                      key: "UK",
                      name: "Uttar Pradesh",
                    },
                    {
                      key: "UP",
                      name: "Uttarakhand",
                    },
                    {
                      key: "WB",
                      name: "West Bengal",
                    },
                  ]}
                />
               
              <FormikReactSelect
                  style={e}
                  val={true}
                  name="Department"
                  placeholder="Department"
                  data={[
                    {
                      name: "Management",
                    },
                    {
                      name: "Product Developer",
                    },
                    {
                      name: "Production Control",
                    },
                    {
                      name: "Warping",
                    },
                    {
                      name: "Covering",
                    },
                    {
                      name: "Weaving",
                    },
                    {
                      name: "Finishing",
                    },
                    {
                      name: "Packing",
                    },
                    {
                      name: "Checking",
                    },
                    ]}/>
                     <Field
                  style={e}
                  as={TextField}
                  name="phoneNumber"
                  label="Mobile"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
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
                  name="salary"
                  label="Salary"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="role"
                  label="Role"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
               
                 <Field
                  style={e}
                  as={TextField}
                  name="skill"
                  disabled={true}
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
                <Field name="skill" label="Skill" >
                  {({ field }) => (
                    <Rating
                      name="skill"
                      label="Skill Level"
                      fullWidth
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                </Field>
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

export default RegisterEmployeeForm;
