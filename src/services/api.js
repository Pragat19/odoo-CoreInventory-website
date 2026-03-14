const BASE_URL = "https://odoo-core-inventory.gecpalanpur.com/api/";

export async function apiRequest(endpoint, method = "GET", body = null, headers = {}) {

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  const data = await response.json();

  if (!response.ok) {

    // 👇 Use backend "error" field first
    const errorMessage =
      data?.error ||
      data?.message ||
      "API Error";

    throw new Error(errorMessage);
  }

  return data;
}