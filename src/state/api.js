import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/general/'}),
  reducerPath: "adminApi",
  tagTypes: [
    "Elastics",
    "Employees",
    "Customers",
    "RawMaterials",
    "Transactions",
    "Geography",
    "Sales",
    "Shifts",
    "Machines",
    "Performance",
    "Dashboard",
    "Orders",
    "JobOrders",
    "RawMaterialRequired"
  ],
  endpoints: (build) => ({
    getElastics: build.query({
      query: () => "elastic",
      providesTags: ["Elastics"],
    }),
    getRawmaterials: build.query({
      query: () => "rawMaterials",
      providesTags: ["RawMaterials"],
    }),
    getMachines: build.query({
      query: () => "machines",
      providesTags: ["Machines"],
    }),
    getCustomers: build.query({
      query: () => "customers",
      providesTags: ["Customers"],
    }),
    getOrders: build.query({
      query: () => "orders",
      providesTags: ["Orders"],
    }),
    getJobOrders: build.query({
      query: () => "jobOrders",
      providesTags: ["JobOrders"],
    }),
    getOrderById: build.query({
      query: (id) => `order?id=${id}`,
      providesTags: ["Orders"],
    }),
    getJobOrderById: build.query({
      query: (id) => `jobOrder?id=${id}`,
      providesTags: ["JobOrders"],
    }),
    getShiftByJob: build.query({
      query: (id) => `shift?id=${id}`,
      providesTags: ["Shifts"],
    }),
    getShiftDetail: build.query({
      query: (id) => `shiftDetail?id=${id}`,
      providesTags: ["Shifts"],
    }),
    addNewRawMaterialRequired: build.mutation({
      query: (payload) => ({
        url: 'rawMatRequired',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['RawMaterialRequired'],
    }),
    getEmployees: build.query({
      query: () => "employees",
      providesTags: ["Employees"],
    }),
    addNewElastics: build.mutation({
      query: (payload) => ({
        url: 'elastic',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Elastic'],
    }),
    addNewEmployee: build.mutation({
      query: (payload) => ({
        url: 'employee',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Elastic'],
    }),
    addNewOrder: build.mutation({
      query: (payload) => ({
        url: 'orders',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Orders'],
    }),
    addShift: build.mutation({
      query: (payload) => ({
        url: 'shifts',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Shifts'],
    }),
    addNewCustomer: build.mutation({
      query: (payload) => ({
        url: 'customer',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Orders'],
    }),
    addNewMachine: build.mutation({
      query: (payload) => ({
        url: 'machine',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Orders'],
    }),
    addNewRawMaterial: build.mutation({
      query: (payload) => ({
        url: 'rawMaterials',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Orders'],
    }),
    addNewRawMaterialApproved: build.mutation({
      query: (payload) => ({
        url: 'rawMaterialApproved',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['RawMaterials'],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetElasticsQuery,
  // useGetRawmaterialsQuery,
  useAddNewElasticsMutation,
  useAddNewEmployeeMutation,
  useAddNewRawMaterialMutation,
  useAddNewOrderMutation,
  useAddNewCustomerMutation,
  useAddNewMachineMutation,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useGetOrderByIdQuery,
  useGetRawmaterialsQuery,
  useGetEmployeesQuery,
  useGetMachinesQuery,
  useGetOrdersQuery,
  useAddNewRawMaterialRequiredMutation,
  useAddNewRawMaterialApprovedMutation,
  useGetJobOrdersQuery,
  useGetJobOrderByIdQuery,
  useAddShiftMutation,
  useGetShiftByJobQuery,
  useGetShiftDetailQuery,
} = api;
