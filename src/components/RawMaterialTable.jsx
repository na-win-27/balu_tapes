import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import {  useNavigate } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function RawMaterialTable(props) {
    const navigate=useNavigate();
    const data=props.data;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,marginTop:"2rem" }}  aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Raw Material</TableCell>
            <TableCell align="right">Available</TableCell>
            <TableCell align="right">Required</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.item}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Button color="secondary" onClick={()=>{
                    console.log(row.id)
                }} variant="text">{row.item}</Button>
              </TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              <TableCell align="right">{(row.quantity/1000)}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
