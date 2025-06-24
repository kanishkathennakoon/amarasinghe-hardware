import { apiSlice } from "./apiSlice";

export const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesReport: builder.query({
      query: () => ({
        url: "/api/reports/sales",
        method: "GET",
      }),
    }),
    getProductSalesReport: builder.query({
      query: ({ from, to } = {}) => {
        let url = "/api/reports/sales/products";
        const params = [];
        if (from) params.push(`from=${from}`);
        if (to) params.push(`to=${to}`);
        if (params.length) url += `?${params.join("&")}`;
        return { url, method: "GET" };
      },
    }),
    getDailySalesReport: builder.query({
      query: ({ from, to } = {}) => {
        let url = "/api/reports/sales/daily";
        const params = [];
        if (from) params.push(`from=${from}`);
        if (to) params.push(`to=${to}`);
        if (params.length) url += `?${params.join("&")}`;
        return { url, method: "GET" };
      },
    }),
    getMonthlySalesReport: builder.query({
      query: ({ from, to } = {}) => {
        let url = "/api/reports/sales/monthly";
        const params = [];
        if (from) params.push(`from=${from}`);
        if (to) params.push(`to=${to}`);
        if (params.length) url += `?${params.join("&")}`;
        return { url, method: "GET" };
      },
    }),
  }),
});

export const {
  useGetSalesReportQuery,
  useGetProductSalesReportQuery,
  useGetDailySalesReportQuery,
  useGetMonthlySalesReportQuery,
} = reportsApiSlice;
