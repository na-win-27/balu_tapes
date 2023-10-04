import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, useTheme, Button, useMediaQuery } from "@mui/material";
import { useGetJobOrdersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { setJobOrderId } from "state";
import {  useNavigate } from "react-router-dom";



const JobOrders = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetJobOrdersQuery();
  console.log(data);
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const columns = [
    {
      field: "jobOrderNo",
      headerName: "Job Order Number",
      flex: 0.1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.1,
    },
    {
      field: "stage",
      headerName: "Status",
      flex: 0.2,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 0.15,
      renderCell: (params) => {
        return params.formattedValue.customer;
      },
    },
    {
      field: "machinesh",
      headerName: "Machines",
      // renderCell: (params) => {
      //   return params.formattedValue.map(
      //     (elastic) => elastic.id.name + "  ,  "
      //   );
      // },
      flex: 1,
    },
    
  ];
  const [searchInput, setSearchInput] = useState("");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Job Orders" subtitle="List of Job Orders" />

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
        
        <DataGrid
          onRowClick={(params)=>{
            dispatch(setJobOrderId(params.row._id))
            navigate('/jobOrderDetail')
          }}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default JobOrders;
