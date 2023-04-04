import { createAsyncThunk } from "@reduxjs/toolkit";
import Service from "../../../../service/Service";
const ProductsThunkAPI = {
 //get user all products:
 getAllProductsAsync: createAsyncThunk("product/getAllProducts", async () => {
  const response = await Service.getAllProducts();
  console.log("response middleware",response)
  return response;
}),

//get user all products:
getSingleProductAsync: createAsyncThunk("product/getSingleProduct", async () => {
  const response = await Service.getSingleProduct();
  console.log("response middleware single",response)
  return response;
}),

};
export default ProductsThunkAPI;
