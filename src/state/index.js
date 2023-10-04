import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "",
  orderId:"",
  jobOrderId:"",
  jobOrderDetail:{},
  shiftId:"",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setOrderId:(state,d) => {
      
      state.orderId=d.payload
    },
    setShiftId:(state,d) => {
      
      state.shiftId=d.payload
    },
    setJobOrderId:(state,d) => {
      
      state.jobOrderId=d.payload
    },
    setJobOrderDetail:(state,d) => {
      
      state.jobOrderDetail=d.payload
    }
  },
});

export const { setMode,setOrderId ,setJobOrderId,setJobOrderDetail,setShiftId} = globalSlice.actions;

export default globalSlice.reducer;
