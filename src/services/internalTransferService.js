import { apiRequest } from "./api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// 📄 LIST
export const getTransfers = async () => {
  return await apiRequest(
    "internal-transfer/list",
    "GET",
    null,
    getAuthHeader()
  );
};

// ➕ STORE
export const storeTransfer = async (data) => {
  return await apiRequest(
    "internal-transfer/store",
    "POST",
    data,
    getAuthHeader()
  );
};

// ✏ UPDATE
export const updateTransfer = async (id, data) => {
  return await apiRequest(
    `internal-transfer/update/${id}`,
    "POST",
    data,
    getAuthHeader()
  );
};

// ❌ DELETE
export const deleteTransfer = async (id) => {
  return await apiRequest(
    `internal-transfer/delete/${id}`,
    "POST",
    null,
    getAuthHeader()
  );
};