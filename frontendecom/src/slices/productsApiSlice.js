import { apiSlice } from "./apislice";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/api/products',
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productsApiSlice;
