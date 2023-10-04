import React, { useState } from "react";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Modal,
  Paper
} from "@mui/material";
import { useGetCustomersQuery, useGetRawmaterialsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import RegisterRawMaterialForm from "components/RegisterRawMaterialForm";



const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'grey',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const RawMaterial = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetRawmaterialsQuery();
  const [modalOpen, setmodalOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.2,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "supplier",
      headerName: "supplier",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
    //   flex: 0.5,
    //   renderCell: (params) => {
    //     return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //   },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.4,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   flex: 0.5,
    // },
  ];

  return (
    <Box m="1.5rem 2.5rem">
       <Modal
        open={modalOpen}
        onClose={() => setmodalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
      <Box sx={style}>
      <Paper style={{
        marginBottom:10,
        height:40,
        backgroundColor:"gold"
      }}>
        HI
      </Paper>
      <RegisterRawMaterialForm formSubmit={()=>{
        setmodalOpen(false);
      }} />
      
      </Box>
      </Modal>
      <Header title="Raw Materials" subtitle="List of Raw Materials" />
      <Button onClick={() => setmodalOpen(true)}> ADD Raw Materials</Button>
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default RawMaterial;
