import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Button,
  Rating,
  Paper,
  useTheme,
  TextField,
} from "@mui/material";
import moment from "moment";
import { setOrderId } from "state";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrderByIdQuery, useGetShiftDetailQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import FormikReactSelect from "components/FormikReactSelect";
import FormikButton from "components/FormikButton";

const options = {
  title: "List of elastics in order",
  chartArea: { width: "65%", height: "80%" },
  hAxis: {
    title: "meters",
    minValue: 0,
  },
  vAxis: {
    title: "Elastic",
  },
};

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "grey",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AutoSubmitToken = () => {

  const { values, submitForm } = useFormikContext();
  React.useEffect(() => {
    values.elastic.map((value, i) =>{
      return{
        quantity:values.production,
        id:value.id
      }
    })
  }, [values, submitForm]);
  return null;
};

const ShiftDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const shiftId = useSelector((state) => state.global.shiftId);
  //   console.log(shiftId)
  const { data, isLoading } = useGetShiftDetailQuery(shiftId);
  console.log(data);
  let cData = [["Elastic", "Order Quantity", "Packed Quantity"]];
  let subTilte = "";
  let done = false;
  let ElasticInput = [];
  let noOfElastics = 0;
  let initialValues = {};
  // setNoOfElastics(data.job.elastics.length)
  if (data) {
    const dat = moment(new Date(data.shift.date)).format("DD-MM-YYYY");
    subTilte = `${dat} - ${data.shift.shift} Shift for ${data.job.customer}`;
    noOfElastics = data.job.elastics.length;
    const e = data.job.elastics.map((el) => {
      return {
        name: el.id.name,
        id: el.id._id,
        quantity: 0,
      };
    });
    initialValues = { elastic: e };

    for (let i = 0; i < noOfElastics; i++) {
      ElasticInput.push(
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 2fr 4fr",
            gridColumnGap: "20px",
            justifyContent: "stretch",
            alignItems: "stretch",
          }}
        >
          <Field
            style={{
              marginTop: "10px",
            }}
            label="Name"
            as={TextField}
            disabled
            placeholder={"Hi"}
            name={"elastic[" + i + "].name"}
          />
          <Field
            style={{
              marginTop: "10px",
            }}
            label="Id"
            as={TextField}
            disabled
            placeholder={"Hi"}
            name={"elastic[" + i + "].id"}
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
        </Box>
      );
    }
  }

  const onSubmit = (values, props) => {
    // console.log("Values",values)

    console.log(values.elastic);
    // addNewOrder(values)
    // formSubmit();
  };
  return data ? (
    <Box m="1.5rem 2.5rem">
      <Header title={"Shift Details"} subtitle={subTilte} />
      <Box
        style={{
          marginTop: "1rem",
          height: "300px",
          display: "grid",
          gridTemplateColumns: " 4fr 4fr 4fr ",
          gridColumnGap: "20px",
          justifyItems: "strech",
        }}
      >
        <Box sx={{ padding: "1rem", boxShadow: 2, border: 1 }}>
          <Typography variant="h3" fontWeight="600" component="div">
            Employee Details
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Name:{data.shift.employee.name}
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Department:{data.shift.employee.Department}
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Performance:{data.shift.employee.performance}
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Mobile:{data.shift.employee.phoneNumber}
          </Typography>
          <Typography
            marginBottom="10px"
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Role:{data.shift.employee.role}
          </Typography>
          <Rating name="read-only" value={data.shift.employee.skill} readOnly />
        </Box>
        <Box sx={{ padding: "1rem", boxShadow: 2, border: 1 }}>
          <Typography variant="h3" fontWeight="600" component="div">
            Machine Details
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            ID:{data.shift.machine.ID}
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Manufacturer:{data.shift.machine.manufacturer}
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Tapes:{data.shift.machine.NoOfHead}
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Hooks:{data.shift.machine.NoOfHooks}
          </Typography>
        </Box>
        <Box sx={{ padding: "1rem", boxShadow: 2, border: 1 }}>
          <Typography variant="h3" fontWeight="600" component="div">
            Genral Details
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Job Order Number:{data.job.jobOrderNo}
          </Typography>
          <Typography
            marginTop="10px"
            variant="h5"
            fontWeight="600"
            component="div"
          >
            Description:{data.shift.description}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          marginTop="1.5rem"
          variant="h2"
          color="secondary"
          fontWeight="600"
          component="div"
        >
          Production Entry
        </Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form noValidate>
              <Box>
                <Box style={{marginTop:"1.5rem",marginBottom:"1.5rem"}}>
               
                  <Field
            style={{
              width: "20%",
              marginRight: "3rem"
            }}
            as={TextField}
            name={"production"}
            label={"Production"}
            fullWidth
            helperText={<ErrorMessage name="phoneNumber" />}
            required
          />
                <FormikButton/>
                </Box>
                {ElasticInput}
                <Box>
                 <Button  style={{marginTop:"1.5rem",marginBottom:"1.5rem"}} variant="contained" type="submit"  color="primary">
                    Confirm
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  ) : null;
};

export default ShiftDetails;
