import React, { useState } from "react";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Modal,
  Paper
} from "@mui/material";
import {   useGetMachinesQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import RegisterMachineForm from "components/RegisterMachineForm";



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


const Machines = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetMachinesQuery();
  const [modalOpen, setmodalOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const columns = [
    {
      field: "ID",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      flex: 0.5,
    },
    {
      field: "NoOfHead",
      headerName: "No Of Heads",
      flex: 1,
    },
    {
      field: "NoOfHooks",
      headerName: "No Of Hooks",
      flex: 0.5,
    //   renderCell: (params) => {
    //     return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //   },
    },
    {
      field: "orderRunning",
      headerName: "Status",
      flex: 0.4,
    },
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    
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
      <RegisterMachineForm formSubmit={()=>{
        setmodalOpen(false);
      }} />
      
      </Box>
      </Modal>
      <Header title="Machines" subtitle="List of Machines" />
      <Button onClick={() => setmodalOpen(true)}> ADD Machine</Button>
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

export default Machines;
