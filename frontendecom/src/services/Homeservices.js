import React from 'react';
import axios from 'axios';

export const getProductDetails = async () => {
  try{
  // const response = await axiosInstance.get("https://66a4aa6f5dc27a3c19097b3e.mockapi.io/api/sm/PRODUCTLIST");
  const response = await axios.get("https://66a4aa6f5dc27a3c19097b3e.mockapi.io/api/sm/PRODUCTLIST");
  console.log(response);
  return response.data;
  }
  catch(error){
    console.log("error");
    throw new Error( error.response.data.message || "Not able to fetch product details" );
  }
  
}
