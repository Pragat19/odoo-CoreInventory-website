import { apiRequest } from "./api";
import { API_ENDPOINTS } from "./endpoints";

export const getCategories = async () => {

  return apiRequest(
    API_ENDPOINTS.MASTER_CATEGORY.LIST,
    "GET"
  );

};