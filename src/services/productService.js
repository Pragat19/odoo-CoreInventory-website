import { apiRequest } from "./api";
import { API_ENDPOINTS } from "./endpoints";

export const storeProduct = async (data) => {

  return apiRequest(
    API_ENDPOINTS.PRODUCT.STORE,
    "POST",
    data
  );

};

export const getProducts = async () => {

  return apiRequest(
    API_ENDPOINTS.PRODUCT.LIST,
    "GET"
  );

};

export const deleteProduct = async (id) => {

  return apiRequest(
    API_ENDPOINTS.PRODUCT.DELETE(id),
    "POST"
  );

};

export const updateProduct = async (id, data) => {

  return apiRequest(
    API_ENDPOINTS.PRODUCT.UPDATE(id),
    "POST",
    data
  );

};