import React from "react";
import { Paper, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useAddNewElasticsMutation,
  useGetRawmaterialsQuery,
  useGetCustomersQuery,
} from "state/api";
import FormikReactSelect from "./FormikReactSelect";

const RegistrationForm = ({ formSubmit }) => {
  let customers = useGetCustomersQuery();

  const { data, isLoading } = useGetRawmaterialsQuery();
  const [addNewElastic, response] = useAddNewElasticsMutation();
  // console.log("data",data)
  let rubber = [],
    weft = [],
    covering = [],
    warp = [],
    cus = [];
  if (data) {
    data.map((e) => {
      if (e.category == "warp" && e.type == "YARN") {
        warp.push(e);
      } else if (e.category == "warp" && e.type == "rubber") {
        rubber.push(e);
      } else if (e.category == "weft") {
        weft.push(e);
      } else if (e.category == "covering") {
        covering.push(e);
      }
    });
  }

  const paperStyle = { width: "100%", height: "100%" };
  const e = {
    marginTop: "10px",
    width: "100%",
  };
  const btnStyle = { marginTop: 10 };

  const initialValues = {
    name: "",
  };

  const onSubmit = (values, props) => {
    // console.log("Values",values)
    const testing = {
      width: values.width,
      elongation: values.elongation,
      recovery: values.recovery,
      strain: values.strain,
    };
    const b = {
      testingParameters: testing,
      name: values.name,
      price: values.price,
      warpSpandex: values.warpSpandex,
      warpYarnBase: values.warpYarnBase,
      warpYarnSecond: values.warpYarnSecond,
      spandexCovering: values.spandexCovering,
      spandexEnds: values.spandexEnds,
      yarnEnds: values.yarnEnds,
      pick: values.pick,
      weight: values.weight,
      customer: values.customer,
    };
    console.log(b);
    // addNewElastic(b)
    //   .unwrap()
    //   .then(() => {
    //     formSubmit();
    //   })
    //   .then((error) => {
    //     console.log(error);
    //   });
    // formSubmit();
  };
  return (
    <Paper elevation={2} style={paperStyle}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form noValidate>
            <Paper
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Paper
                style={{
                  width: "70%",
                  height: "100%",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <FormikReactSelect
                  style={e}
                  val={false}
                  name="warpYarnBase"
                  placeholder="Warp Yarn Base"
                  data={warp}
                />
                <FormikReactSelect
                  style={e}
                  val={false}
                  name="warpYarnSecond"
                  placeholder="Warp Yarn Second"
                  data={warp}
                />
                <FormikReactSelect
                  style={e}
                  val={false}
                  name="warpSpandex"
                  placeholder="Ruber"
                  data={rubber}
                />

                <FormikReactSelect
                  style={e}
                  val={false}
                  name="spandexCovering"
                  placeholder="Covering"
                  data={covering}
                />

                <FormikReactSelect
                  style={e}
                  val={false}
                  name="weftYarn"
                  placeholder="Weft"
                  data={weft}
                />
                <FormikReactSelect
                  style={e}
                  val={false}
                  name="customer"
                  placeholder="Customer"
                  data={customers.data ? customers.data : []}
                />

                <Field
                  style={e}
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  helperText={<ErrorMessage name="name" />}
                  required
                />
              </Paper>

              <Paper
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "row",
                  // alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Paper
                  style={{
                    width: "50%",

                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Field
                    style={e}
                    as={TextField}
                    name="pick"
                    label="WeftPerInch"
                    fullWidth
                    helperText={<ErrorMessage name="password" />}
                    required
                  />
                  <Field
                    style={e}
                    as={TextField}
                    name="price"
                    label="Price"
                    fullWidth
                    helperText={<ErrorMessage name="email" />}
                    required
                  />
                  <Field
                    style={e}
                    as={TextField}
                    name="spandexEnds"
                    label="spandexEnds"
                    fullWidth
                    helperText={<ErrorMessage name="phoneNumber" />}
                    required
                  />
                  <Field
                    style={e}
                    as={TextField}
                    name="yarnEnds"
                    label="yarnEnds"
                    fullWidth
                    helperText={<ErrorMessage name="confirmPassword" />}
                    required
                  />
                  <Field
                    style={e}
                    as={TextField}
                    name="weight"
                    label="Weight"
                    fullWidth
                    helperText={<ErrorMessage name="phoneNumber" />}
                    required
                  />
                </Paper>
                <Paper
                  style={{
                    width: "50%",
                    marginLeft: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Field
                    style={e}
                    as={TextField}
                    name="noOfHook"
                    label="Design Hooks"
                    fullWidth
                    required
                  />

                  <Field
                    style={e}
                    as={TextField}
                    name="width"
                    label="width"
                    required
                    fullWidth
                  />

                  <Field
                    style={e}
                    as={TextField}
                    name="elongation"
                    label="Strech"
                    fullWidth
                  />
                  <Field
                    style={e}
                    as={TextField}
                    name="recovery"
                    label="Recovery"
                    fullWidth
                    helperText={<ErrorMessage name="phoneNumber" />}
                    required
                  />
                  <Field
                    style={e}
                    as={TextField}
                    name="strain"
                    label="Strain"
                    fullWidth
                    helperText={<ErrorMessage name="phoneNumber" />}
                    required
                  />
                </Paper>
                <Paper
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
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
            </Paper>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default RegistrationForm;
