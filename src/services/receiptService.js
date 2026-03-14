import { apiRequest } from "./api";

// 🔐 Get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token"); // adjust if needed
  return {
    Authorization: `Bearer ${token}`,
  };
};

// 📄 LIST
export const getReceipts = async () => {
  return await apiRequest(
    "receipt/list",
    "GET",
    null,
    getAuthHeader()
  );
};

// ➕ STORE
export const storeReceipt = async (data) => {
  return await apiRequest(
    "receipt/store",
    "POST",
    data,
    getAuthHeader()
  );
};

// ✏ UPDATE
export const updateReceipt = async (id, data) => {
  return await apiRequest(
    `receipt/update/${id}`,
    "POST",
    data,
    getAuthHeader()
  );
};

// ❌ DELETE
export const deleteReceipt = async (id) => {
  return await apiRequest(
    `receipt/delete/${id}`,
    "POST",
    null,
    getAuthHeader()
  );
};