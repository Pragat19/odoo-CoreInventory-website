import { apiRequest } from "./api";

export const getLedger = async () => {

  const token = localStorage.getItem("token");

  return await apiRequest(
    "stock-ledger/list",
    "GET",
    null,
    {
      Authorization: `Bearer ${token}`
    }
  );

};