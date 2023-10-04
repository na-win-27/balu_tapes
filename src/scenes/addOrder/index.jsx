import React, { useState } from "react";
import { Paper, Button, useTheme, Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetElasticsQuery,
  useGetCustomersQuery,
  useAddNewOrderMutation,
} from "state/api";
import FormikReactSelect from "../../components/FormikReactSelect";
import Header from "components/Header";
import { DatePickerField } from "components/DatePickerField";

const AddOrder = () => {
  const theme = useTheme();
  let customers = useGetCustomersQuery();
  const [addNewOrder, response] = useAddNewOrderMutation();
  const { data, isLoading } = useGetElasticsQuery();
  const [noOfElastics, setNoOfElastics] = useState(6);
  // const orderId = useSelector((state) => state.global.orderId);
  let ElasticInput = [];

  for (let i = 0; i < noOfElastics; i++) {
    ElasticInput.push(
      <Paper
        style={{
          display: "grid",
          gridTemplateColumns: "6fr 4fr",
          gridColumnGap: "20px",
          justifyContent: "stretch",
          alignItems: "stretch",
        }}
      >
        <FormikReactSelect
         val={false}
          style={{
            marginTop: "10px",
          }}
          name={"elastic[" + i + "].id"}
          placeholder={"elastic" + (i + 1)}
          data={data ? data : []}
        />
        <Field
          style={{
            width: "70%",
            marginLeft: 40,
          }}
          as={TextField}
          name={"elastic[" + i + "].quantity"}
          label={"quantity" + (i + 1)}
          fullWidth
          helperText={<ErrorMessage name="phoneNumber" />}
          required
        />
      </Paper>
    );
  }

  const e = {
    marginTop: "10px",
    width: "60%",
  };
  const btnStyle = { marginTop: 10 };

  const initialValues = {};

  const onSubmit = (values, props) => {
    // console.log("Values",values)

    console.log(values);
    addNewOrder(values)
    // formSubmit();
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add New Order" subtitle="Add Details of New Order" />
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
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "inherit",
                  width: "100%",
                }}
              >
                <Paper
                  style={{
                    width: "40%",
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
                    name="orderNo"
                    label="Order Number"
                    fullWidth
                    helperText={<ErrorMessage name="email" />}
                    required
                  />
                  <DatePickerField name="supplyDate" label="Supply Date" />
                  <FormikReactSelect
                 val={false}
                    style={{
                      width: "60%",
                    }}
                    name="customer"
                    placeholder="Customer"
                    data={customers.data ? customers.data : []}
                  />
                  <TextField
                    style={e}
                    onChange={(event) => {
                      if (event.target.value <= 24) {
                        setNoOfElastics(event.target.value);
                      }
                    }}
                    value={noOfElastics}
                    id="outlined-basic"
                    label="Number of Elastics"
                    variant="outlined"
                  />
                </Paper>

                <Paper
                  style={{
                    width: "70%",
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
                    {ElasticInput}
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

export default AddOrder;
