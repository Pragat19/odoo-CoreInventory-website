import { apiRequest } from "./api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// 📄 LIST
export const getDeliveries = async () => {
  return await apiRequest(
    "delivery-order/list",
    "GET",
    null,
    getAuthHeader()
  );
};

// ➕ STORE
export const storeDelivery = async (data) => {
  return await apiRequest(
    "delivery-order/store",
    "POST",
    data,
    getAuthHeader()
  );
};

// ✏ UPDATE  ✅ ADD THIS
export const updateDelivery = async (id, data) => {
  return await apiRequest(
    `delivery-order/update/${id}`,
    "POST",
    data,
    getAuthHeader()
  );
};

// ❌ DELETE
export const deleteDelivery = async (id) => {
  return await apiRequest(
    `delivery-order/delete/${id}`,
    "POST",
    null,
    getAuthHeader()
  );
};