import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Machines from "scenes/machines";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import RawMaterial from "scenes/RawMaterial";
import Employees from "scenes/employees";
import Orders from "scenes/orders";
import AddOrder from "scenes/addOrder";
import OrderDetail from "scenes/orderDetail";
import AddJobOrder from "scenes/addJobOrder";
import JobOrders from "scenes/jobOrders";
import JobOrderDetail from "scenes/jobOrderDetail";
import addShiftDetails from "scenes/addShiftDetails";
import AddShiftDetails from "scenes/addShiftDetails";
import ShiftDetails from "scenes/shiftDetails";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/elastics" element={<Products />} />
              <Route path="/addOrders" element={<AddOrder />} />
              <Route path="/jobOrderDetail" element={<JobOrderDetail/>} />
              <Route path="/orderDetail" element={<OrderDetail/>} />
              <Route path="/addJobOrder" element={<AddJobOrder />} />
              <Route path="/Job" element={<JobOrders/>} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/raw-materials" element={<RawMaterial />} />
              <Route path="/employees" element={<Employees/>} />
              <Route path="/machines" element={<Machines/>} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/addShiftDetails" element={<AddShiftDetails />} />
              <Route path="/shiftDetails" element={< ShiftDetails/>} />
              <Route path="/addProduction" element={<AddOrder />} />
              <Route path="/addWastage" element={<AddOrder />} />
              <Route path="/addPackingDetails" element={<AddOrder />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
