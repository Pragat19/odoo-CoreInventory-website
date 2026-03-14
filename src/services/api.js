const BASE_URL = "https://odoo-core-inventory.gecpalanpur.com/api/";

export async function apiRequest(
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) {

  // ✅ Get token from localStorage
  const token = localStorage.getItem("token");

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",

      // ✅ Automatically attach token if exists
      ...(token && { Authorization: `Bearer ${token}` }),

      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  const data = await response.json();

  if (!response.ok) {

    const errorMessage =
      data?.error ||
      data?.message ||
      "API Error";

    throw new Error(errorMessage);
  }

  return data;
}