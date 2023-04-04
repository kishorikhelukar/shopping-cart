//import axiosInstance from "./axios";
import axios from "axios";
const BaseURL = "https://fakestoreapi.com/";
const Service = {
  //getAllProducts
  getAllProducts: async function () {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log("all products>>>", response.data);
      return response.data;
    } catch (error) {
      const { name, message } = error;
      const response = `${name} => ${message}`;
      return response;
    }
  },
  //getSingleProduct
  getSingleProduct: async function () {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/1");
      console.log("all products>>>", response.data);
      return response.data;
    } catch (error) {
      const { name, message } = error;
      const response = `${name} => ${message}`;
      return response;
    }
  },
};
export default Service;
