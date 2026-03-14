import { apiRequest } from "./api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// 📄 LIST
export const getStockAdjustments = async () => {
  return await apiRequest(
    "stock-adjustment/list",
    "GET",
    null,
    getAuthHeader()
  );
};

// ➕ STORE
export const storeStockAdjustment = async (data) => {
  return await apiRequest(
    "stock-adjustment/store",
    "POST",
    data,
    getAuthHeader()
  );
};

// ✏ UPDATE
export const updateStockAdjustment = async (id, data) => {
  return await apiRequest(
    `stock-adjustment/update/${id}`,
    "POST",
    data,
    getAuthHeader()
  );
};

// ❌ DELETE
export const deleteStockAdjustment = async (id) => {
  return await apiRequest(
    `stock-adjustment/delete/${id}`,
    "POST",
    null,
    getAuthHeader()
  );
};