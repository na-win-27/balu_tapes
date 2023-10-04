import React, { useState } from "react";
import { Paper, Button, useTheme, Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetElasticsQuery,
  useGetCustomersQuery,
  useAddNewOrderMutation,
  useGetMachinesQuery,
  useGetEmployeesQuery,
  useAddShiftMutation,
} from "state/api";
import FormikReactSelect from "../../components/FormikReactSelect";
import Header from "components/Header";
import { DatePickerField } from "components/DatePickerField";

const AddShiftDetails = () => {
  const job = useSelector((state) => state.global.jobOrderDetail);
  // console.log(job);
  const theme = useTheme();
  let machines = useGetMachinesQuery();
  let employees = useGetEmployeesQuery();
  // console.log(machines.data);
  const [addShift, response] = useAddShiftMutation();
  const { data, isLoading } = useGetElasticsQuery();
  let initialValues = {};
  // const orderId = useSelector((state) => state.global.orderId);
  let ElasticInput = [];

  if (job) {
    const d = new Date().toLocaleDateString();
    initialValues = { job: job._id,stage:job.stage };
  }

  const e = {
    marginTop: "20px",
 
  };
  const btnStyle = { marginTop: 10 };

  const onSubmit = (values, props) => {
    // console.log("Values",values)

    console.log(values);
    addShift(values)
    // formSubmit();
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Shift Details" subtitle="Add Details of New Order" />
      <Paper
        style={{
          backgroundColor: "#d3d4de",
          marginTop: "1.5rem",
        }}
      >
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form noValidate>
              <Paper
                style={{
                  display: "grid",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "inherit",
                  width: "100%",
                }}
              >
                <Paper
                  style={{
                 
                    height: "100%",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <DatePickerField name="date" label="Date" />
                  <Field
                    style={e}
                    as={TextField}
                    name="job"
                    label="Order Number"
                    fullWidth
                    helperText={<ErrorMessage name="email" />}
                    required
                  />

<Field
                    style={e}
                    as={TextField}
                    name="stage"
                    label="Stage"
                    fullWidth
                    helperText={<ErrorMessage name="email" />}
                    required
                  />
                  <FormikReactSelect
                    val={false}
                    identi={true}
                    style={{
                      width: "60%",
                    }}
                    name="machine"
                    placeholder="Machine"
                    data={machines.data ? machines.data : []}
                  />

                  <FormikReactSelect
                    val={true}
                    style={{
                      width: "60%",
                    }}
                    name="shift"
                    placeholder="Shift"
                    data={[{ name: "Day" }, { name: "Night" }]}
                  />
                </Paper>

                <Paper
                  style={{
        
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Paper
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Field
                      style={e}
                      as={TextField}
                      name="description"
                      label="Description"
                      fullWidth
                      multiple
                      helperText={<ErrorMessage name="email" />}
                      required
                    />

                    <FormikReactSelect
                      val={false}
                      name="employee"
                      placeholder="Employee"
                      data={employees.data ? employees.data : []}
                    />
                  </Paper>
                  <Button
                    type="submit"
                    style={btnStyle}
                    variant="outline"
                    color="primary"
                  >
                    Add Order
                  </Button>
                </Paper>
              </Paper>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddShiftDetails;
