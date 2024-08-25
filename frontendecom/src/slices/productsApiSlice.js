import { apiSlice } from "./apislice";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'http://localhost:5000/api/products',
    }),
    getProductByName: builder.query({
      query: (name) => `http://localhost:5000/api/products/${name}`, // Dynamic endpoint based on name
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery , useGetProductByNameQuery } = productsApiSlice;

export const { useLazyGetProductByNameQuery } = productsApiSlice;