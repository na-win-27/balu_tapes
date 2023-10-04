import React,{useState} from "react";
import {
  Box,
  Button,
  useTheme,
  Typography,
  Modal,
  Paper
} from "@mui/material";
import { setJobOrderDetail ,setShiftId} from "state";
import { useSelector, useDispatch } from "react-redux";
import { useGetJobOrderByIdQuery ,useGetShiftByJobQuery} from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import { display } from "@mui/system";



const columns = [
  {
    field: "employee",
    headerName: "Employee",
    flex: 0.2,
    renderCell: (params) => {
      console.log(params.value)
      return params.value.name
    },
  },
  {
    field: "date",
    headerName: "Date",
    flex: 0.5,
        renderCell: (params) => {
        return params.value.date
      },
  },
  {
    field: "shift",
    headerName: "Shift",
    flex: 1,
    renderCell: (params) => {
      return params.value.shift
    },
  },
  {
    field: "production",
    headerName: "Production",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.production
      },
  },
];

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

const JobOrderDetail = () => {
  const [close,setClose]=useState(false);
  const [stage,setStage]=useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  let cData = [
    [
      "Elastic",
      "Order Quantity",
      "Produced Quantity",
      "Packed Quantity",
      "Wastage Quantity",
    ],
  ];
  const jobOrderId = useSelector((state) => state.global.jobOrderId);
  const { data, isLoading } = useGetJobOrderByIdQuery(jobOrderId);
  const shiftByJob=useGetShiftByJobQuery(jobOrderId);
  console.log(shiftByJob.data);
  const dispatch=useDispatch();
  dispatch(setJobOrderDetail(data));
  // console.log(data);
  let done = false;

  if (data) {
    for (const [index, value] of data.elastics.entries()) {
      const r = [
        data.elastics[index].id.name,
        data.elastics[index].quantity,
        data.producedElastic[index].quantity,
        data.packedElastic[index].quantity,
        data.wastageElastic[index].quantity,
      ];
      cData.push(r);
    }
    done = true;
  }

  return done ? (
    <Box m="1.5rem 2.5rem">
           <Modal
        open={close}
        onClose={() => setClose(false)}
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
     
      
      </Box>
      </Modal>
      <Modal
        open={stage}
        onClose={() => setStage(false)}
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
     
      
      </Box>
      </Modal>
      <Header
        title={data.customer}
        subtitle={`Job Order Number:${data.jobOrderNo} Instructed On:${new Date(
          data.date
        ).toLocaleDateString()}`}
      />

      <Box
        style={{
          marginTop: "1rem",
          height: "780px",
        }}
      >
        <Typography
          variant="h4"
          color={theme.palette.secondary[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {"Status:" + data.stage}
        </Typography>
        
        <Box style={{ margin: "2.5rem"  ,marginRight:"2rem",marginLeft:"2rem", display:"flex", justifyContent:"flex-start" }}>

        <Button variant="contained" onClick={()=>{navigate('/addShiftDetails')}} style={{ marginRight: "1.5rem" }}>
          Add Next Shift Details
        </Button>

        <Button variant="contained"  onClick={()=>{setStage(true)}} style={{ marginRight: "1.5rem" }}>
          Add To Next Stage 
        </Button>

        <Button variant="contained" onClick={()=>{setClose(true)}} style={{ marginRight: "1.5rem" }}>
          Mark as Closed
        </Button>


        <Button variant="contained" onClick={()=>{navigate('/addWastage')}} style={{ marginRight: "1.5rem" }}>
          Add Wastage
        </Button>

        <Button variant="contained"  onClick={()=>{navigate('/addPackingDetails')}} style={{ marginRight: "1.5rem" }}>
          Add Packing Details
        </Button>
       
        </Box>

        <Box
        mt="40px"
        mb="100px"
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
          sx={{ mb: "15px" }}
        >
          List Of Shift Details
        </Typography>

        <DataGrid
         onRowClick={(params)=>{
          dispatch(setShiftId(params.row._id))
          navigate('/shiftDetails')
        }}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={shiftByJob.data  || []}
          columns={columns}
        />
      </Box>
        <Chart
          chartType="BarChart"
          width="100%"
          height="720px"
          data={cData}
          options={options}
        />
      </Box>
    </Box>
  ) : null;
};

export default JobOrderDetail;
