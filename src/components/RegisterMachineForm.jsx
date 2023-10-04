import React from "react";
import { Paper, Button, Rating } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAddNewMachineMutation } from "state/api";
import FormikReactSelect from "./FormikReactSelect";
import { DatePickerField } from "./DatePickerField";

const RegisterMachineForm = ({ formSubmit }) => {
  const paperStyle = { width: "100%", height: "100%" };
  const e = {
    marginTop: "10px",
    width: "100%",
  };
  const [addNewMachine, response] = useAddNewMachineMutation();
  const btnStyle = { marginTop: 10 };

  const initialValues = {
    name: "",
  };

  const onSubmit = (values, props) => {
    console.log(values);
    addNewMachine(values);
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
                  name="ID"
                  label="ID"
                  fullWidth
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="manufacturer"
                  label="Manufacturer"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  required
                />

                <DatePickerField
                  name="DateOfPurchase"
                  label="Date Of Purchase"
                />
                <FormikReactSelect
                  style={e}
                  val={true}
                  name="Department"
                  placeholder="Department"
                  data={[
                    {
                      name: "warping",
                    },
                    {
                      name: "weaving",
                    },
                    {
                      name: "covering",
                    },
                    {
                      name: "finishing",
                    },
                    {
                      name: "winding",
                    },
                  ]}
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
                  name="NoOfHead"
                  label="No Of Heads"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="NoOfHealds"
                  label="No Of Frames"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="NoOfHooks"
                  label="No Of Hooks"
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

export default RegisterMachineForm;
