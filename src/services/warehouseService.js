import { apiRequest } from "./api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// 📄 LIST
export const getWarehouses = async () => {
  return await apiRequest(
    "warehouse/list",
    "GET",
    null,
    getAuthHeader()
  );
};

// ➕ STORE
export const storeWarehouse = async (data) => {
  return await apiRequest(
    "warehouse/store",
    "POST",
    data,
    getAuthHeader()
  );
};

// ✏ UPDATE
export const updateWarehouse = async (id, data) => {
  return await apiRequest(
    `warehouse/update/${id}`,
    "POST",
    data,
    getAuthHeader()
  );
};

// ❌ DELETE
export const deleteWarehouse = async (id) => {
  return await apiRequest(
    `warehouse/delete/${id}`,
    "POST",
    null,
    getAuthHeader()
  );
};