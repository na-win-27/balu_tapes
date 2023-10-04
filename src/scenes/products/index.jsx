import React, { useState } from "react";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Modal,
  Paper
} from "@mui/material";
import Header from "components/Header";
import {  useGetElasticsQuery } from "state/api";
import RegistrationForm from "components/RegistrationForm";
import { DataGrid } from "@mui/x-data-grid";

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



// const Product = ({
//   _id,
//   name,
//   description,
//   price,
//   rating,
//   category,
//   supply,
//   stat,
// }) => {
//   const theme = useTheme();
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <Card
//       sx={{
//         height:"100%",
//         backgroundImage: "none",
//         backgroundColor: theme.palette.background.alt,
//         borderRadius: "0.55rem",
//       }}
//     >
//       <CardContent>
//         <Typography
//           sx={{ fontSize: 14 }}
//           color={theme.palette.secondary[700]}
//           gutterBottom
//         >
//           {category}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {name}
//         </Typography>
//         <Typography color={theme.palette.secondary[400]}>
//           ${Number(price).toFixed(2)}
//         </Typography>
//         <Button
//         style={{marginLeft:-12}}
//           variant="primary"
//           size="small"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           See More
//         </Button>
//       </CardContent>
//       <CardActions>
//       </CardActions>
//     </Card>
//   );
// };

const Products = () => {
  const { data, isLoading } = useGetElasticsQuery();
  const theme = useTheme();
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.1,
    },
    {
      field: "weight",
      headerName: "Weight",
      flex: 0.1,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 0.2,
       renderCell: (params) => {
        //  console.log(params)
         return params.formattedValue.name;
       },
    },
    {
      field: "noOfHook",
      headerName: "No_of_Hooks",
      flex: 0.1,
    },
    {
      field: "width",
      headerName: "Width",
      flex: 0.1,
    },
    {
      field: "quantitySold",
      headerName: "Quantity Sold",
      flex: 0.15,
      renderCell: (params) => {
        //  console.log(params)
         return params.formattedValue.quantitySold || 0;
       },
    },
    
  ];
  
  // console.log(data);
  
  const [modalOpen, setmodalOpen] = useState(false);



  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const form=()=>{
    setmodalOpen(false);
    window.location.reload(true);
  }

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
      <RegistrationForm formSubmit={()=>form()}/>
      
      </Box>
      </Modal>

      <Header
        title="PRODUCTS"
        subtitle="See your list of products."
      />
      <Button onClick={() => setmodalOpen(true)}> ADD ELASTIC</Button>
      {data || !isLoading ? (
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
          // mt="20px"
          // display="grid"
          // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          // justifyContent="space-between"
          // rowGap="20px"
          // columnGap="1.33%"
          // sx={{
          //   "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          // }}
        >
          {/* {data.map((e) => (
            <Product
              key={e._id}
              _id={e._id}
              name={e.name}
              description={e.noOfHook}
              price={e.price}
              rating={e.spandexEnds}
              category={e.customer.name}
              supply={e.weight}
              stat={e._id}
            />
          ))} */}
           <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
