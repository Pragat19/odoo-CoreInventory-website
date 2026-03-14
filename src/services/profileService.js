import { apiRequest } from "./api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`
  };
};

// 📄 GET PROFILE
export const getProfile = async () => {
  return await apiRequest(
    "user/profile",
    "GET",
    null,
    getAuthHeader()
  );
};

// ✏ UPDATE PROFILE
export const updateProfile = async (data) => {

  const token = localStorage.getItem("token");

  return await apiRequest(
    "user/profile",
    "POST",   // ✅ Your API uses POST
    data,
    {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  );

};