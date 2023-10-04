import React, { useState } from "react";
import { Paper, Button, useTheme, Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { useFormikContext, Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetOrderByIdQuery,
  useAddNewRawMaterialRequiredMutation,
  useAddNewRawMaterialApprovedMutation,
} from "state/api";
import { useNavigate } from "react-router-dom";
import FormikReactSelect from "../../components/FormikReactSelect";
import Header from "components/Header";
import { DatePickerField } from "components/DatePickerField";
import RawMaterialTable from "components/RawMaterialTable";

const AddJobOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [values, setValues] = useState();
  const [rawReq, setRawReq] = useState();
  const [addRawMaterialRequired, response] =
    useAddNewRawMaterialRequiredMutation();
  const [addRawMaterialApproved, res] = useAddNewRawMaterialApprovedMutation();
  let ElasticInput = [];
  const orderId = useSelector((state) => state.global.orderId);
  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  let noOfElastics = 0;
  let initialValues = {};

  if (data) {
    noOfElastics = data.elastic.length;
    const d = new Date().toLocaleDateString();
    const elas = data.elastic.map((e, i) => {
      const x = e.quantity - data.packedElastic[i].quantity;
      return { quantity: x, id: e.id };
    });
    initialValues = { elastic: elas, orderNo: data.orderNo, date: d };
  }
  // console.log(initialValues);
  for (let i = 0; i < noOfElastics; i++) {
    ElasticInput.push(
      <Paper
        style={{
          display: "grid",
          gridTemplateColumns: "6fr 3fr 0.3fr",
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
          disabled={true}
          name={"elastic[" + i + "].id"}
          placeholder={data.elastic[i].id.name}
          data={data.elastic ? data.elastic : []}
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
        <IconButton
          onClick={() => {
            // ElasticInput.splice(i, 1);
            // values.elastic.splice(i, 1);
          }}
        >
          gjn
        </IconButton>
      </Paper>
    );
  }

  const e = {
    marginTop: "10px",
    width: "60%",
  };
  const btnStyle = { marginTop: 10 };

  const onSubmit = (values, props) => {
    //   values.elastic=values.elastic.map(e =>{
    //       if (e.quantity>0) {
    //           return e
    //       } else {

    //       }
    //   })
    setValues(values);
    addRawMaterialRequired(values)
      .unwrap()
      .then((res) => {
        setRawReq(res);
      });

    // addNewOrder(values)
    // formSubmit();
  };
  //   const { values, submitForm } = useFormikContext();
  return data ? (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Job Order" subtitle="Add Details of Job Order" />
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
                  <Field
                    style={e}
                    as={TextField}
                    name="jobOrderNo"
                    label="Job Order Number"
                    fullWidth
                    helperText={<ErrorMessage name="email" />}
                    required
                  />

                  {/* <FormikReactSelect
             val={false}
                style={{
                  width: "60%",
                }}
                name="customer"
                placeholder="Customer"
                data={data.elastic ? data.elastic : []}
              />
             */}
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
                    {data.elastic.map((elastic, i) => {
                      return (
                        <Paper
                          style={{
                            display: "grid",
                            gridTemplateColumns: "6fr 3fr 0.3fr",
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
                            disabled={true}
                            name={"elastic[" + i + "].id"}
                            placeholder={data.elastic[i].id.name}
                            data={data.elastic ? data.elastic : []}
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
                          <IconButton onClick={() => {}}>gjn</IconButton>
                        </Paper>
                      );
                    })}
                    {/* {ElasticInput} */}
                  </Paper>
                  <Button
                    type="submit"
                    style={btnStyle}
                    variant="outline"
                    color="primary"
                  >
                    Check Inventory and Raw Materials
                  </Button>
                </Paper>
              </Paper>
            </Form>
          )}
        </Formik>
      </Paper>
      {rawReq ? (
        <Box style={{ marginTop: "3rem", padding: "1rem" }}>
          <Header title="Raw Materials Required" />
          <RawMaterialTable data={rawReq.qreq} />
          <Button
            style={{ marginTop: "1.5rem", marginLeft: "1rem" }}
            onClick={() => {
              // console.log(rawReq)

              addRawMaterialApproved({
                rawMaterialsRequirements: rawReq.r,
                elastics: values.elastic,
                stage: "Warping&Covering",
                status: "open",
                jobOrderNo: values.jobOrderNo,
                date: values.date,
                po_id:data._id,
                customer:data.customer.name
              });
            }}
            variant="contained"
          >
            Approve
          </Button>
        </Box>
      ) : null}
    </Box>
  ) : null;
};

export default AddJobOrder;
