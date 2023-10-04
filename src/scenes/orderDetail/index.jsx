import React, { useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { setOrderId } from "state";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrderByIdQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";

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

const columns = [
  {
    field: "ID",
    headerName: "ID",
    flex: 0.2,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 0.5,
  },
  {
    field: "stage",
    headerName: "stage",
    flex: 1,
  },
  {
    field: "machines",
    headerName: "Machines",
    //   flex: 0.5,
    //   renderCell: (params) => {
    //     return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //   },
  },
  {
    field: "employees",
    headerName: "Employees",
    flex: 0.4,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
];

const OrderDetail = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const orderId = useSelector((state) => state.global.orderId);
  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  let cData = [["Elastic", "Order Quantity", "Packed Quantity"]];
  let subTilte = "";
  let done = false;

  if (data) {
    const dat = new Date(data.date);
    const sDate = new Date(data.supplyDate);
    subTilte = `Order No:${data.orderNo} 
    Ordered on:${dat.toLocaleDateString()} 
    to be supplied on/before ${sDate.toLocaleDateString()}`;
    for (const [index, value] of data.elastic.entries()) {
      const r = [
        data.elastic[index].id.name,
        data.elastic[index].quantity,
        data.packedElastic[index].quantity,
      ];
      cData.push(r);
    }
    done = true;
  }

  return done ? (
    <Box m="1.5rem 2.5rem">
      <Header title={data.customer.name} subtitle={subTilte} />
      <Box
        style={{
          marginTop: "1rem",
          height: "600px",
        }}
      >
        <Typography
          variant="h4"
          color={theme.palette.secondary[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {"Status:" + data.status}
        </Typography>
        <Chart
          chartType="BarChart"
          width="100%"
          height="570px"
          data={cData}
          options={options}
        />
      </Box>
      <Box style={{ margin: "1rem" }}>
        <Button variant="contained" style={{ marginRight: "1.5rem" }}>
          {" "}
          Mark as Closed
        </Button>
        <Button
          onClick={() => {
            dispatch(setOrderId(data._id));
            navigate("/addJobOrder");
          }}
          variant="contained"
        >
          {" "}
          Add New Job Order
        </Button>
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <Typography
          variant="h3"
          color={theme.palette.secondary[400]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          List Of Job-Orders
        </Typography>

        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  ) : null;
};

export default OrderDetail;
